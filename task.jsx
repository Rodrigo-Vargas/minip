var React = require('react');
var PropTypes = React.PropTypes;
var DragSource = require('react-dnd').DragSource;
var ItemTypes = require('./constants.jsx').ItemTypes;

const taskSource = {
  beginDrag(props){
    return props;
  },
  endDrag(props, monitor){
    if (monitor.getDropResult())
      props.onDelete(props.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Task extends React.Component {
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      parentList: props.parentList,
      id: props.id,
      name: props.name
    }
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(){
    this.props.onDelete(this.props.id);
  }

  render() {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

   return connectDragSource(
     <li className="item">
        <span>{this.props.name}</span>
        <a onClick={this.onDelete}>X</a>
      </li>
    )
  }
}

module.exports = DragSource(ItemTypes.TASK, taskSource, collect)(Task);