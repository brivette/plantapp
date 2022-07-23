import React from 'react';
import axios from "axios";

const Watering = props => (
  <tr>
    <td>{props.watering.plantname}</td>
    <td>{props.watering.date}</td>
    <td>{props.watering.health}</td>
    <td>{props.watering.comment}</td>
  </tr>
)

export default class WateringList extends React.Component {
  constructor(props) {
    super(props);

      this.state = { waterings: [] };
  }

  componentDidMount() {
    this.getWaterings();
  }

  getWaterings = async () => {
    await axios
      .get('http://localhost:7000/watering' )
      .then(response => this.setState({ waterings: response.data }))
      .catch((err) => {
        console.log(err);
      })
  }

  wateringList() {
    return this.state.waterings.map(currentwatering => {
      return <Watering
              watering={currentwatering}
              key={currentwatering._id}
              />
    })
  }
  render() {
    return (
      <div>
          <table>
           <thead>
              <tr>
                <th>Plant Name</th>
                <th>Date</th>
                <th>Health</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              { this.wateringList() }
            </tbody>   
          </table>
      </div>
    )
  }
}