import Star from './Star';
import React, { Component } from 'react'
import './Star_Dust.css';

export default class Star_Dust extends Component {

  constructor(props) {
    super(props);
    this.randOMizer = this.randOMizer.bind(this);
    this.randNum = this.randNum.bind(this);
    this.Canvas = this.Canvas.bind(this);
    
    this.starDensity = [.94,.059,.001];
    this.numberOfStars = 400;
    this.shiftPool = ['redish', 'yelloish', 'bluish', 'purplish'];
    this.anglePool = [''];
    this.starSizePool = [['.2em','.5em','1em'],
     ['2em','3em','4em','5em'], ['6em','7em','8em']];

    this.state = {
      stars : []
    }

  }

  componentDidMount() {
    this.Canvas();
  }

  Canvas() {
    let numofstars = this.numberOfStars;
    let star_density = this.starDensity;
    let stararray = [];
    let stararraydivs = [];
    let temparray = [];
    let star_sizes_array = [];

    for (let i = 0; i < this.starSizePool.length; i++) {
      for (let j = 0; j < Math.floor(star_density[i]*numofstars); j++) {
        star_sizes_array.push(this.randOMizer(this.starSizePool[i]));
      }
    }

    console.log(star_sizes_array);
    
    for (let i = 0; i < numofstars; i++) {
      temparray.push(this.randOMizer(this.shiftPool));
      temparray.push(this.randOMizer(this.anglePool));
      temparray.push(star_sizes_array[i]);
      temparray.push(this.randNum(100) + '%');
      temparray.push(this.randNum(100) + '%');
      stararray.push(temparray);
      temparray = [];
    }

    for (let i = 0; i < stararray.length; i++) {
      stararraydivs.push(
          <Star angle={stararray[i][1]} star_size={stararray[i][2]} shift = {stararray[i][0]} 
          position = {[stararray[i][3],stararray[i][4]]}/>
        
      )
    }
    this.setState({ stars : stararraydivs});

  }

  randNum(number) {
    return Math.floor(Math.random() * number);
  }

  randOMizer(fromArray) {
    let fromArrayLen = fromArray.length;
    
    let randElement = fromArray[Math.floor(Math.random() * fromArrayLen)];
    
    return randElement;
  }

  render() {
    return (
      <>
        <div className='deep-space-container'>
          {this.state.stars}
        </div>
      </>
    )
  }
}
