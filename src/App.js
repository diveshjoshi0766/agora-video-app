import './App.css';
import Options from './components/options/Options';
import {useEffect} from "react"
import Randomstring from 'randomstring';
function App() {

//storing all the demo users in the localstoage 
  useEffect(() => {
    localStorage.setItem("1", Randomstring.generate());
    localStorage.setItem("2", Randomstring.generate());
    localStorage.setItem("3", Randomstring.generate());
    localStorage.setItem("4", Randomstring.generate());
    localStorage.setItem("5", Randomstring.generate());
    localStorage.setItem("6", Randomstring.generate());
    localStorage.setItem("7", Randomstring.generate());
    localStorage.setItem("8", Randomstring.generate());
    localStorage.setItem("9", Randomstring.generate());
    localStorage.setItem("10", Randomstring.generate());
  }, []);

  return (
    <div className="App">
      <Options></Options>
    </div>
  );
}

export default App;
