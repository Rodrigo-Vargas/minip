import React from 'react';
import ReactDOM from 'react-dom';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      newItemDescription: ""
    }

    // This binding is necessary to make `this` work in the callback
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
    var listItems = [];
    listItems.push({ id : 1, name: this.props.listItems });
    this.setState({ listItems : listItems });
  }

  componentWillUnmount() {

  }

  render(){
    const listItems = this.state.listItems.map((item) =>
      <li key={item.id}>
        { item.name }
      </li>
    );

    return (
      <div>
        <h1>Hello World</h1>
        <ul>
          { listItems}
        </ul>

        <input value={this.state.newItemDescription} onChange={this.onNewItemChange} />

        <a onClick={this.add}>Add Item</a>

      </div>
    );
  }
}

function H1 (props){
  return <h1>Hello, {props.name}</h1>;
}

const element = <H1 name="Rodrigo Vargas 2" />;

ReactDOM.render(
  <List listItems='Teste' />,
  document.getElementById('root')
);

