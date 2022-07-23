import React from 'react';
import axios from "axios";

const Plant = props => (
  <tr>
    <td>{props.plant.plantname}</td>
    <td>{props.plant.location}</td>
    <td>{props.plant.daysbetweenwatering} days</td>
    <td>{props.plant.description}</td>
  </tr>
)

export default class PlantList extends React.Component {
  constructor(props) {
    super(props);

      this.state = { plants: [] };
  }

  componentDidMount() {
    this.getPlants();
  }

  getPlants = async () => {
    await axios
      .get('http://localhost:7000/plants' )
      .then(response => this.setState({ plants: response.data }))
      .catch((err) => {
        console.log(err);
      })
  }

  plantList() {
    return this.state.plants.map(currentplant => {
      return <Plant
              plant={currentplant}
              key={currentplant._id}
              />
    })
  }
  render() {
    return (
      <div>
          <table className="plantlist">
           <thead>
              <tr>
                <th>Plant Name</th>
                <th>Location</th>
                <th>Days Between Watering</th>
                <th>Some Notes</th>
              </tr>
            </thead>
            <tbody>
              { this.plantList() }
            </tbody>   
          </table>
      </div>
    )
  }
}