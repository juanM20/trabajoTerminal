import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Audio from '../../web_audio/Audio'


const KeyStyle = styled.div`
  width: 80px;
  height: 260px;
  border: 1px solid black;
`


export const Key = (props) => {

  const [firstPlay, setFirstPlay] = useState(true);

  const oscillatorGainNode = useRef()
  const oscillatorNode = useRef()

  const initializeOscillatorGain = () => {

    oscillatorGainNode.current = Audio.context.createGain()
    oscillatorGainNode.current.gain.setValueAtTime(0, Audio.context.currentTime)
    oscillatorGainNode.current.connect(Audio.masterGainNode)

    oscillatorNode.current = Audio.context.createOscillator()
    oscillatorNode.current.type = 'sine'
    oscillatorNode.current.frequency.setValueAtTime(props.frequency, Audio.context.currentTime)
    oscillatorNode.current.connect(oscillatorGainNode.current)

    console.log("initial oscillatorNode", oscillatorNode.current)
  }

  useEffect(initializeOscillatorGain, [props.frequency])

  const KeyStyled = styled(KeyStyle)`
    background-color: ${props.colorKey};
    color: ${props.colorKey === 'white' ? 'black' : 'white'};
  `

  const play = () => {
    console.log('key:', props.note, props.frequency, props.colorKey)
    // console.log("play oscillatorNode", oscillatorNode.current)
    // console.log("play oscillatorGainNode", oscillatorGainNode.current)

    if (firstPlay) {
      oscillatorNode.current.start()
      setFirstPlay(false)
    }

    oscillatorGainNode.current.gain.setTargetAtTime(0.7, Audio.context.currentTime, 0.001)

  }

  const pause = () => {
    oscillatorGainNode.current.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
  }

  const handleKeyDown = (event) => {
    console.log('User pressed:', event.key)
  }

  return (
    <div className='key' tabIndex={-1} onMouseDown={play} onMouseUp={pause} onKeyDown={handleKeyDown}>
      <KeyStyled>{props.note}</KeyStyled>
    </div>
  )
}
