import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';

class Charts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    };
    this.getNewData = this.getNewData.bind(this);
    this.doughtnutData = this.doughtnutData.bind(this);
  }

  componentDidMount () {
    this.getNewData();
    setInterval(() => {
      this.getNewData();
    }, 5000);
  }

  getNewData () {
    axios
    .get('http://localhost:8080/api/requests')
    .then((results) => {
      console.log('request results', results);
      this.setState({data: results.data});
      console.log('state', this.state);
    })
  }

  doughtnutData(sinceTime) {

    let food = 0;
    let bathroom = 0;
    let medicine = 0;
    let other = 0;
    let emergency = 0;
    this.state.data.forEach(item => {
      switch(item.request_type_id) {
        case 1:
          food += 1;
          break;
        case 2:
          bathroom += 1;
          break;
        case 3:
          medicine += 1;
          break
        case 4:
          other += 1;
          break;
        case 5:
          emergency += 1;
          break;
      }
    })
    // TODO sort by value
    let sortData = [food, bathroom, medicine, other, emergency].sort(function (a, b) {
      return a.value - b.value;
    });
    let colorArr = []
    return {
      labels: [
        'Food',
        'Bathroom',
        'Medicine',
        'Other',
        'Emergency',
      ],
      datasets: [{
        data: [food, bathroom, medicine, other, emergency],
        backgroundColor: [
        '#3273DC',
        '#F5B278',
        '#00C4A7',
        '#FFDD57',
        '#FF3860',
        ],
        hoverBackgroundColor: [
        '#3273DC',
        '#F5B278',
        '#00C4A7',
        '#FFDD57',
        '#FF3860',
        ]
      }]
    };
  }
  render () {

    let requestTypeData = this.doughtnutData()

    return (
      <ReactCSSTransitionGroup
        transitionName="fadeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <h1 className='title is-1'>Charts</h1>
          <Doughnut data={requestTypeData} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Charts;
