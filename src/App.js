import './App.css'
import { SynthPad } from './components/web_audio/SynthPad'
import { Keyboard } from './components/UI/KeyComponents/Keyboard'

function App() {

  return (
    <div className="App">
      <SynthPad />
      <Keyboard />
    </div>
  );
}

export default App