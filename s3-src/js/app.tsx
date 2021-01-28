declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export class Hello extends React.Component {
    render() {
        return (
            <div/>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));