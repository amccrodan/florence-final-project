import React, { Component } from 'react';
import SortByRoom from './sort-by-room.component.jsx'

class ChooseBed extends Component {
  constructor(props){
    super(props);
    this.state = {
      bedSort: 'all',
      rooms: {},
      roomsClass: '',
      allClass: 'active',
    };
  this.handleClick = this.handleClick.bind(this);
  this.handleSort = this.handleSort.bind(this);
  this.isActive = this.isActive.bind(this);
  }

  isActive (bedSort) {
    if (bedSort === 'all') {
      this.setState({roomsClass: '', allClass: 'active'})
    }
    if (bedSort === 'rooms') {
      this.setState({roomsClass: 'active', allClass: ''})
    }
  }

  handleClick (event) {
    this.props.assignWebSocketId(parseInt(event.target.value));
    this.props.changeRequestState({bed_id: event.target.value}, () => {
      this.props.getPatientInfo(() => {
        this.props.changeViewState('requestButton');
      });
    });
  }

  handleSort(event) {
    this.setState({bedSort: event.target.value});
    this.isActive(event.target.value);
  }

  render(){
    let buttons = '';
    if (this.state.bedSort === 'all') {
      buttons = this.props.bedList.map( item => {
        return <button className='button is-large is-40-wide' key={item.id} value={item.id} onClick={this.handleClick}>Bed {item.id}</button>
      })
    }
    if (this.state.bedSort === 'rooms') {
      let rooms = {};
      this.props.bedList.forEach(item => {
        if (rooms[item.room_id]) {
          rooms[item.room_id].push(item);
        } else {
          rooms[item.room_id] = [item];
        }
      });
      buttons = <SortByRoom
        rooms={rooms}
        handleBedClick={this.handleClick}
        />
    }
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero-body '>
          <div className='container has-text-centered'>
            <div>
              <div className='columns'>
                <div className='column no-padding'>
                </div>
                <div className='column is-10 no-padding'>
                  <div className='sort-beds'>
                    <button
                    className={`button is-large is-40-wide ${this.state.roomsClass}`}
                    value='rooms'
                    onClick={this.handleSort}>
                      Rooms
                    </button>
                    <button
                    className={`button is-large is-40-wide ${this.state.allClass}`}
                    value='all'
                    onClick={this.handleSort}>
                      All Beds
                    </button>
                  </div>
                  <hr className='less-margin'/>
                  <div className='handle-overflow'>
                    {buttons}
                  </div>
                </div>
                <div className='column no-padding'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ChooseBed
