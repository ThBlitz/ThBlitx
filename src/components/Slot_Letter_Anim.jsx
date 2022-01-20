import React, { Component } from 'react';
import './Slot_Letter_Anim.css';



export default class Slot_Letter_Anim extends Component {

  constructor(props) {
    super(props);
    
    this.Animate = this.Animate.bind(this);
    this.Prepare = this.Prepare.bind(this);
    this.Set = this.Set.bind(this);
    this.StartAnimation = this.StartAnimation.bind(this);
    this.Vibrate = this.Vibrate.bind(this);

    this.animation_in_progress = false;
    this.divswitch = 'div1';
    this.firstanim = false;
    this.InitialDelay = 2000;
    this.EnableInitialDelay = true;

    this.wait = delay => new Promise(resolve => 
      setTimeout(resolve, delay));

    this.state = {
      Div1 : '',
      Div1Position : '',
      Div1Color : '',
      Div1Anim : '',
      Div2 : '',
      Div2Position : '',
      Div2Color : '',
      Div2Anim : '',
      Div3 : '',
      Div3Position : '',
      Div3Color : '',
      Div3Anim : '',
      DummyLetter : 'M',
    };
  }

  componentDidMount() {
    this.Animate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.Animation_Array !== prevProps.Animation_Array) {
      this.setState({FirstAnim : true})
      this.Animate();
      console.log('inside if loop');
    }
  }

  Prepare(animateArray, tempPosition, divswitch, i) {

    if (divswitch === 'div1') {
      this.setState({
        Div1Position : animateArray[i],
        Div1 : animateArray[i+1],
        Div1Color : animateArray[i+2],
        Div1Anim : ''
      });

      if (this.state.Div2Position === 'top') {
        tempPosition = 'bottom';
      } else {
        tempPosition = 'top';
      }

    } else if (divswitch === 'div2') {
      this.setState({
        Div3Position : animateArray[i],
        Div3 : animateArray[i+1],
        Div3Color : animateArray[i+2],
        Div3Anim : ''
      });

      if (this.state.Div1Position === 'top') {
        tempPosition = 'bottom';
      } else {
        tempPosition = 'top';
      }

    } else {
      this.setState({
        Div2Position : animateArray[i],
        Div2 : animateArray[i+1],
        Div2Color : animateArray[i+2],
        Div2Anim : ''
      })

      if (this.state.Div3Position === 'top') {
        tempPosition = 'bottom';
      } else {
        tempPosition = 'top';
      }
    }

    return tempPosition;
  };

  Set(animateArray, tempPosition, divswitch) {


    if (divswitch === 'div1') {
      
      this.setState({
        Div3Position : tempPosition,
        Div2Position : 'center',
        Div3Anim : tempPosition==='top'?'center-top':'center-bottom',
        Div2Anim : tempPosition==='top'?'bottom-center':'top-center'
      })
      divswitch = 'div2';
    } else if (divswitch === 'div2') {
      this.setState({
        Div2Position : tempPosition,
        Div1Position : 'center',
        Div2Anim : tempPosition==='top'?'center-top':'center-bottom',
        Div1Anim : tempPosition==='top'?'bottom-center':'top-center'
        
      })
      divswitch = 'div3'
    } else {
      this.setState({
        Div1Position : tempPosition,
        Div3Position : 'center',
        Div1Anim : tempPosition==='top'?'center-top':'center-bottom',
        Div3Anim : tempPosition==='top'?'bottom-center':'top-center'
        
      })
      divswitch = 'div1'
    }

    return divswitch;
  }

  StartAnimation() {
    if (this.animation_in_progress === false) {
      this.Animate();
    } else {
      console.log("WARNING : animation_in_progress",this.animation_in_progress);
    }
  }

  async Vibrate() {

    if (this.animation_in_progress === false) {
      
      this.animation_in_progress = true;

      if (this.state.Div1Position === 'center') {
        this.setState({Div1Anim : 'vibrate'});
      } else if (this.state.Div2Position === 'center') {
        this.setState({Div2Anim : 'vibrate'});
      } else if (this.state.Div3Position === 'center') {
        this.setState({Div3Anim : 'vibrate'});
      }
  
      await this.wait(600);
      
      this.setState({
        Div1Anim : '',
        Div2Anim : '',
        Div3Anim : ''
      })
      this.animation_in_progress = false;
    }
  }

  async Animate() {

    let tempPosition = 'top';
    let divswitch = this.divswitch;
    let animateArray = this.props.Animation_Array;
    let limit = animateArray.length;
    let i = 0;
    if (this.firstanim === false) {
      i = 6;
      this.setState({
        Div3 : animateArray[1],
        Div3Position : 'center',
        Div3Color : animateArray[2],
        Div2Position : animateArray[3],
        Div2 : animateArray[4],
        Div2Color : animateArray[5],
        Div1 : '',
        Div1Position : '',
        Div1Color : '',
      });
      this.firstanim = true;
    }

    if( this.EnableInitialDelay === true) {
      await this.wait(this.InitialDelay);
      this.EnableInitialDelay = false;
    }
    this.animation_in_progress = true;

    while (i <= limit) {

      if (this.animation_in_progress === false) {
        this.animation_in_progress = true;
        console.log('missed-animation_in_progress',this.animation_in_progress)
      }

      tempPosition = this.Prepare(animateArray, tempPosition, divswitch, i);
      divswitch = this.Set(animateArray, tempPosition,divswitch);

      i = i + 3;
     
      await this.wait(this.props.Animation_Delay);
    };

    this.divswitch = divswitch;
    await this.wait(160);
    this.setState({
      Div1Anim : '',
      Div2Anim : '',
      Div3Anim : ''
    })
    this.animation_in_progress = false;
    this.Vibrate();
  }

  render() {
    return (
      <>
        <div className='slot-letter-container' onClick={this.StartAnimation} onMouseOver={this.Vibrate}>
          <div className={`slot-letter slot-letter-${this.state.Div1Position}
           slot-letter-${this.state.Div1Anim}`} 
             style={{color : this.state.Div1Color}}>
            {this.state.Div1}
          </div>
          <div className={`slot-letter slot-letter-${this.state.Div2Position} 
          slot-letter-${this.state.Div2Anim}`}
           style={{color : this.state.Div2Color}} >
            {this.state.Div2}
          </div>
          <div className={`slot-letter slot-letter-${this.state.Div3Position} 
          slot-letter-${this.state.Div3Anim}`}
           style={{color : this.state.Div3Color}}>
            {this.state.Div3}
          </div>
          <div className="dummy-slot-letter">
            {this.state.DummyLetter}
          </div>
        </div>
    </>
    )
  }
}
