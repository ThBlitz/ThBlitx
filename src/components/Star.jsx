import React, { Component } from 'react';
import './Star.css';

export default class Star extends Component {
  
  constructor(props) {
    super(props);
    this.MakeStar = this.MakeStar.bind(this);


    this.angle = this.props.angle;
    this.star_size = this.props.star_size;
    this.shift = this.props.shift;

    this.state = {
      angle : this.angle==='45deg'?'rotate-45deg':'',
      coreType : '',
      lineType : ''
    }
  }
  
  componentDidMount() {
    this.MakeStar();
  }

  MakeStar() {
    let shift_type = this.shift;
    let line_type = '';
    let coretype = '';
    
    if (shift_type === 'redish') {
      coretype = 'redshift-redish-core';
      line_type = 'redshift-redish-lines';
    } else if (shift_type === 'yelloish') {
      coretype = 'redshift-yelloish-core';
      line_type = 'redshift-yelloish-lines';
    } else if (shift_type === 'bluish') {
      coretype = 'blueshift-bluish-core';
      line_type = 'blueshift-bluish-lines';
    } else if (shift_type === 'purplish') {
      coretype = 'blueshift-purplish-core';
      line_type = 'blueshift-purplish-lines';
    } else {
      console.log('Stars.jsx, shift type : ', shift_type);
    }

    this.setState({
      coreType : coretype,
      lineType : line_type
    })
  }

  render() {
    return (
      <>
      {/* //remove this later */}
        
        <div className={`dummy-star ${this.state.angle}`} 
        style={{'--star-size' : this.props.star_size, top : this.props.position[0], left : this.props.position[1]}}
        >
          <div className={`dummy-star-core ${this.state.coreType}`}></div>
          <div className={`dummy-star-lines ${this.state.lineType}`}></div>
          <div className={`dummy-star-lines vertical ${this.state.lineType}`}></div>
        </div>
        
      </> 
    )
  }
}
