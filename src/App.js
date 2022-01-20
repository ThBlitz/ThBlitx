// import Menu from './components/Menu';
import Test_Component from './components/Test_Component';
// import Nav_Button from './components/Nav_Button';
import Menu_Button from './components/Menu_Button';
// import Slot_Letter_Anim from './components/Slot_Letter_Anim';
import Sloth_Anim from './components/Sloth_Anim';
// import './App.css';
import Star from './components/Star';
import Star_Dust from './components/Star_Dust';


function App() {
  return (
    <>
    <div className='container'>
      {/* <Sloth_Anim animLetters = {['Hi.There','Th.Blitz']} animLengths = {[1,2,3,4,5,6,7,8]}/> */}
      {/* <Star angle = {'45deg'} shift={['blueshift','purplish']} star_size={'8em'}/> */}
      <Star_Dust/>
    </div>
    </>
  );
}

export default App;
