var React = require('react');
var PropTypes = React.PropTypes;
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var DragSource = require('react-dnd').DragSource;
var TaskList = require('./tasklist.jsx');

class Board extends React.Component {
  moveTask(toX, toY) {
    var knightPosition = [toX, toY];
    console.log(knightPosition);
    emitChange();
  }

  render() {
    var listItems = [ { id : 1, name: 'Test'}];
    var listItems2 = [ { id : 1, name: 'Test 2'}];

    return(
      <div>
        <TaskList name="To do" listItems={listItems} />
        <TaskList name="Done" listItems={listItems2} />
      </div>
    );
  }
}

module.exports = DragDropContext(HTML5Backend)(Board);