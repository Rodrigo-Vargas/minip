var React = require('react');
var PropTypes = React.PropTypes;
var Task = require('./task.jsx');
var ItemTypes = require('./constants.jsx').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;

const taskListTarget = {
  drop: function (props, monitor, component) {
    var item = monitor.getItem();
    
    var listItems = component.state.listItems;
    var newItem = { 
                    id : props.listItems.length + 1,
                    name : item.name,
                    parentList : item.parentList
                  };

    listItems.push(newItem)
    component.setState( { listItems : listItems } );  

    return { moved: true };
  },
  canDrop: function(props, monitor) {
    var sourceList = monitor.getItem().parentList;
    var targetList = props.name;

    return sourceList !=  targetList;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class TaskList extends React.Component {
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    listItems: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      listItems: props.listItems,
      newItemDescription: "",
      name: props.name
    }

    this.add = this.add.bind(this);
    this.onNewItemChange = this.onNewItemChange.bind(this);
  }

  add() {
    var listItems = this.state.listItems;
    var length = this.state.listItems.length + 1;
    listItems.push({ id : length, name : this.state.newItemDescription })
    this.setState( { listItems : listItems } );
    this.state.newItemDescription = "";
  }

  onNewItemChange(event){
    this.setState({newItemDescription: event.target.value});
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  onItemDelete(itemId){
    var updatedList = this.state.listItems.filter(function(item){
      return item.id != itemId
    });

    this.setState( { listItems : updatedList});
  }

  render(){
    var connectDropTarget = this.props.connectDropTarget;

    const listItems = this.state.listItems.map((item) =>
      <Task key={item.id} id={item.id} name={item.name} parentList={this.state.name} onDelete={this.onItemDelete.bind(this)} />
    );

    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    
    return connectDropTarget(
      <div className="list">
        <h3>{this.state.name}</h3>
        <ul className="items">
          { listItems}
        </ul>
        <div className="form-group">
          <input className="form-control" value={this.state.newItemDescription} onChange={this.onNewItemChange} />
        </div>

        <a className="btn btn-default" onClick={this.add}>Add Item</a>
        {isOver &&
          <div>
            <span>The card will be moved to here!</span>
          </div>
        }
        {canDrop &&
          <div>
            <span>Can drop.</span>
          </div>
        }
      </div>
    );
  }
}

module.exports = DropTarget(ItemTypes.TASK, taskListTarget, collect)(TaskList);
