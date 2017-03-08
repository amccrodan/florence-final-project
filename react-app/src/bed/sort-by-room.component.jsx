import React, { Component } from 'react';

class SortByRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms: this.props.rooms,
      buttons: []
    };
    this.handleRoom = this.handleRoom.bind(this);
  }

  componentDidMount () {
    let rooms = this.state.rooms;
    let buttons = this.state.buttons;
    for (let room in rooms) {
      buttons.push(
        <button
        className='button is-large is-80-wide'
        key={'room' + room}
        value={room}
        data='room'
        onClick={this.handleRoom}>
          Room {room}
        </button>
      );
    };
    this.setState({buttons:buttons});
  }

  handleRoom (event) {
    const resetState = []
    this.state.buttons.forEach(button => {
      if (button.props['data'] === 'room') {
        resetState.push(button);
      }
    })

    this.state.buttons = resetState;

    const bedButtons = this.state.rooms[event.target.value].map(item => {
      return (
          <button
          className='button is-large is-40-wide'
          key={'bed' + item.id}
          value={item.id}
          data='bed'
          onClick={this.props.handleBedClick}>Bed {item.id}
          </button>
      )
    });

    this.state.buttons.splice.apply(this.state.buttons, [parseInt(event.target.value), 0].concat(bedButtons));
    const newButtons = this.state.buttons;
    this.setState({buttons: newButtons});
  }

  render() {
    return (
    <div>
      {this.state.buttons}
    </div>
    );
  }
}
export default SortByRoom
