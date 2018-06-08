import React, { Component }
from 'react';


export class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: {}
        }
    }

    componentDidMount() {
        this.graphNodes(this.state.nodes);
    }

    render() {
        return (
            <div>Yo</div>
        );
    }

    graphNodes = (nodes) => {

    }
}