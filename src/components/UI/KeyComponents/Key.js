import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Audio from '../../web_audio/Audio'

export const Key = (props) => {


  const [masterGainValue, setMasterGainValue] = useState(0)

  const initializeMasterGain = () => {
    Audio.masterGainNode.gain.setValueAtTime(.2, Audio.context.currentTime)
    Audio.masterGainNode.connect(Audio.context.destination)
    setMasterGainValue(.5)

    const oscillatorGainNode = Audio.context.createGain()
    oscillatorGainNode.gain.setValueAtTime(.1, Audio.context.currentTime)
    oscillatorGainNode.connect(Audio.masterGainNode)

    const oscillatorNode = Audio.context.createOscillator()
    oscillatorNode.type = 'sine'
    oscillatorNode.frequency.setValueAtTime(props.frequency, Audio.context.currentTime)
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorNode.start()

  }

  useEffect(initializeMasterGain, [props.frequency])



  const KeyStyled = styled.div`
    width: 80px;
    height: 260px;
    border: 1px solid black;
    background-color: ${props.colorKey};
    color: ${props.colorKey === 'white' ? 'black' : 'white'};
  `

  const play = () => {
    console.log('key:', props.note, props.frequency, props.colorKey)
    Audio.masterGainNode.gain.setTargetAtTime(masterGainValue, Audio.context.currentTime, 0.001)
  }

  const pause = () => {
    Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
  }

  return (
    <div className='key' onMouseDown={play} onMouseUp={pause}>
      <KeyStyled>{props.note}</KeyStyled>
    </div>
  )
}
