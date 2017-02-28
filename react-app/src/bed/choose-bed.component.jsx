import React, { Component } from 'react';

class ChooseBed extends Component {
  constructor(props){
    super(props);
    this.state = {

    };

  this.handleClick = this.handleClick.bind(this);

  }

  handleClick (event) {
    console.log(event.target.value);
    this.props.assignWebSocketId(event.target.value);
    this.props.changeViewState('requestButton');
  }

  render(){
    let buttons = '';
    let rooms = {
      1: [
        {
          id: 1,
          patient_id: 1,
          room_id: 1
        },
        {
          id: 2,
          patient_id: 2,
          room_id: 1
        }
      ],
      2: [
        {
          id: 3,
          patient_id: 3,
          room_id: 2
        },
        {
          id: 4,
          patient_id: 4,
          room_id: 2
        }
      ]
    }

    if (this.props.bedList[0]) {
    console.log('only logs if props list is not empty');
    buttons = this.props.bedList.map( item => {
      return <button className="button is-large is-40-wide" key={item.id} value={item.id} onClick={this.handleClick}>Bed {item.id}</button>
    })
    }
    return (
      <section className="hero is-light is-fullheight">
        <div className="hero nice-background is-fullheight">
        </div>
        <div className="hero-body ">
          <div className="container has-text-centered">
            <div>
              <div className="columns">

                <div className="column no-padding">
                </div>
                <div className="column is-10 no-padding">
                  <div className="sort-beds">
                    <button className="button is-large is-40-wide">
                      Rooms
                    </button>
                    <button className="button is-large is-40-wide">
                      All Beds
                    </button>
                  </div>
                  <hr className="less-margin"/>
                  <div className="handle-overflow">
                    {buttons}
                  </div>
                </div>
                <div className="column no-padding">
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