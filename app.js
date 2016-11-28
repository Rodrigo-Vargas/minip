import React from 'react';
import ReactDOM from 'react-dom';

/*const element = {
  type: 'h1',
  className: 'test',
  props:{    
    children: 'Hello, world!'
  }
}
*/

function H1 (props){
  return <h1>Hello, {props.name}</h1>;
}

const element = <H1 name="Rodrigo" />;

ReactDOM.render(
  element,
  document.getElementById('root')
);