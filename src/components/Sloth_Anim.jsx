import React, { Component } from 'react';
import './Sloth_Anim.css';
import Slot_Letter_Anim from './Slot_Letter_Anim';

// This is Slot_Letter_Array

// props.animate_letters = ['','']
// props.animation_length = [8,8,8,8...8]
// props.animation_speed = [[200,1000],[400,1000],...[]]

export default class Sloth_Anim extends Component {

  constructor(props) {
    super(props);
    this.randOMizer = this.randOMizer.bind(this);
    this.PrepareStartEndArray = this.PrepareStartEndArray.bind(this);
    this.PrepareRandAnimArray = this.PrepareRandAnimArray.bind(this);
    this.PrepareFinalAnimArray = this.PrepareFinalAnimArray.bind(this);
    
    this.animLetters = this.props.animLetters;
    this.animLengths = this.props.animLengths;
    this.animSpeeds = [];

    this.randAnimArray = [];

    this.startArray = [];
    this.endArray = [];

    this.finalAnimArray = [];

    this.characterPool = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
  'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g',
  'h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    this.colorPool = [ 'white','purple','yellow','blue','green','red','orange'];

    this.directionPool = ['top','bottom'];

    this.state = {
      SlotLetterAnimsArray : []
    };
  }

  componentDidMount() {
    this.PrepareStartEndArray();
    this.PrepareRandAnimArray();
    this.PrepareFinalAnimArray();
    this.PrepareSlotLetterAnimsArray();
  }

  PrepareSlotLetterAnimsArray() {
    let finalArray = this.finalAnimArray;
    let numOfSlots = finalArray.length;
    let slotArray = [];

    for (let i = 0; i < numOfSlots; i++) {
      slotArray.push(
        <Slot_Letter_Anim Animation_Array = {finalArray[i]} Animation_Delay = {300}/>
      );
    }

    this.setState({
      SlotLetterAnimsArray : slotArray
    })

  }

  PrepareStartEndArray() {
    let tempArray = [];
    let startarray = this.animLetters[0];
    let endarray = this.animLetters[1];

    for (let i = 0 ; i < startarray.length ; i++) {
      tempArray.push(startarray.charAt(i));
    }
    
    this.startArray = tempArray;
    tempArray = [];

    for (let i = 0 ; i < endarray.length ; i++) {
      tempArray.push(endarray.charAt(i));
    }
    this.endArray = tempArray;
  }

  PrepareRandAnimArray() {
    let animLengths = this.props.animLengths;
    let animLengthsArray = [];
    let tempArray = [];

    for (let i = 0 ; i < animLengths.length; i++) {
      for (let j = 0; j < animLengths[i]; j++) {
        tempArray.push(this.randOMizer(this.directionPool));
        tempArray.push(this.randOMizer(this.characterPool));
        tempArray.push(this.randOMizer(this.colorPool));
      }
      animLengthsArray.push(tempArray);
      tempArray = [];
    }
    this.randAnimArray = animLengthsArray;
  }

  PrepareFinalAnimArray() {
    let tempStart = this.startArray;
    let tempEnd = this.endArray;
    let randanimarray = this.randAnimArray;

    for (let i = 0; i < randanimarray.length;i++) {
      randanimarray[i].unshift('white');
      randanimarray[i].unshift(tempStart[i]);
      randanimarray[i].unshift(this.randOMizer(this.directionPool));
      randanimarray[i].push(this.randOMizer(this.directionPool));
      randanimarray[i].push(tempEnd[i]);
      randanimarray[i].push('white');
    }
    
    this.finalAnimArray = randanimarray;
    
  }

  randOMizer(fromArray) {
    let fromArrayLen = fromArray.length;
    
    let randElement = fromArray[Math.floor(Math.random() * fromArrayLen)];
    
    return randElement;
  }

  render() {

    return (
      <>
        <div className='slot-letter-array-container'>
          
          {this.state.SlotLetterAnimsArray}
        
        </div>
      </>
    );
  }
}
