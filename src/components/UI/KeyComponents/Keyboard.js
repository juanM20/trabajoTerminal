import { useEffect, useState } from 'react'
import { Key } from './Key'
import { frequencies } from '../../web_audio/frequencies'
import Audio from '../../web_audio/Audio'
import './Keyboard.css'

export const Keyboard = () => {

  const [masterGainValue, setMasterGainValue] = useState(0);

  const initializeMasterGain = () => {
    Audio.masterGainNode.gain.setValueAtTime(.2, Audio.context.currentTime)
    Audio.masterGainNode.connect(Audio.context.destination)
    setMasterGainValue(.5)

  }

  const changeMasterVolume = (e) => {
    Audio.masterGainNode.gain.setValueAtTime(parseInt(e.target.value / 100), Audio.context.currentTime)
    setMasterGainValue(e.target.value / 100)
  }

  useEffect(initializeMasterGain)

  return (
    <div className='keyboard'>
      {frequencies.map((freq, index) => {
        return <Key key={index} note={freq.note} frequency={freq.freq} colorKey={freq.color} />
      })}
    </div>
  )
}
