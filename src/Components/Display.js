import React, { Component } from 'react';

const Plant = props => (
    <tr>
        <td>{props.plant.id}</td>
        <td><h3>{props.plant.name}</h3></td>
        <td>{props.plant.location}</td>
        <td></td>
    </tr>
)

export default class PlantList extends Component {
    constructor(props) {
        super(props);
        this.state = {plants: [] }
    }

    componentDidMount() {
        
    }
}