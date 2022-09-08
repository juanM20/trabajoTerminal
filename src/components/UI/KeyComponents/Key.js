import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Audio from '../../web_audio/Audio'

export const Key = (props) => {

  let oscillatorGainNode = null;
  let oscillatorNode = null;

  const initializeOscillatorGain = () => {

    oscillatorGainNode = Audio.context.createGain()
    oscillatorGainNode.gain.setValueAtTime(0, Audio.context.currentTime)
    oscillatorGainNode.connect(Audio.masterGainNode)

    oscillatorNode = Audio.context.createOscillator()
    oscillatorNode.type = 'sine'
    oscillatorNode.frequency.setValueAtTime(props.frequency, Audio.context.currentTime)
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorNode.start()

    console.log("initial oscillatorNode", oscillatorNode);
  }

  useEffect(initializeOscillatorGain, [props.frequency])

  const KeyStyled = styled.div`
    width: 80px;
    height: 260px;
    border: 1px solid black;
    background-color: ${props.colorKey};
    color: ${props.colorKey === 'white' ? 'black' : 'white'};
  `

  const play = () => {
    console.log('key:', props.note, props.frequency, props.colorKey)
    console.log("play oscillatorNode", oscillatorNode);
    console.log("play oscillatorGainNode", oscillatorGainNode);
    oscillatorGainNode.gain.setTargetAtTime(0.6, Audio.context.currentTime, 0.001)
  }

  const pause = () => {
    oscillatorGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
  }

  return (
    <div className='key' onMouseDown={play} onMouseUp={pause}>
      <KeyStyled>{props.note}</KeyStyled>
    </div>
  )
}
