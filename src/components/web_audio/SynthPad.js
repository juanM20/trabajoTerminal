

import { useState, useEffect } from 'react'
import Audio from './Audio'

export const SynthPad = () => {

  const [masterGainValue, setMasterGainValue] = useState(0)
  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [selectedOscillatorNodeIndex, setSelectedOscillatorNodeIndex] = useState(-1)

  const initializeMasterGain = () => {
    Audio.masterGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
    Audio.masterGainNode.connect(Audio.context.destination)
    setMasterGainValue(.5)
  }

  useEffect(initializeMasterGain, [])

  const changeMasterVolume = (e) => {
    Audio.masterGainNode.gain.setValueAtTime(parseInt(e.target.value / 100), Audio.context.currentTime)
    setMasterGainValue(e.target.value / 100)
  }

  const addOscillatorNode = () => {
    const oscillatorGainNode = Audio.context.createGain()
    oscillatorGainNode.gain.setValueAtTime(0, Audio.context.currentTime)
    oscillatorGainNode.connect(Audio.masterGainNode)

    const oscillatorNode = Audio.context.createOscillator()
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorNode.start()

    // and type is set to 'sine' by default.
    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      oscillatorGainNode: oscillatorGainNode,
      frequency: oscillatorNode.frequency.value,
      type: oscillatorNode.type,
      gain: 0
    }

    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setSelectedOscillatorNodeIndex(oscillatorNodes.length)
  }

  const changeSelectedOscillatorNode = e => {
    setSelectedOscillatorNodeIndex(e.target.value)
  }

  const updateSelectedOscillatorFrequency = e => {
    //update selected OscillatorNode to the selected frequency
    if (selectedOscillatorNodeIndex >= 0) {
      const oscillatorNodesCopy = [...oscillatorNodes]
      const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]

      // set the frequency of the OscillatorNode
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(e.target.value, Audio.context.currentTime)

      // set the value stored in state for the frequency
      selectedOscillatorNode.frequency = e.target.value
      setOscillatorNodes(oscillatorNodesCopy)
    }
  }

  const updateSelectedOscillatorType = (e) => {
    //update selected OscillatorNode to the selected type
    if (selectedOscillatorNodeIndex >= 0) {
      const oscillatorNodesCopy = [...oscillatorNodes]
      const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]

      // set the type of the OscillatorNode
      selectedOscillatorNode.oscillatorNode.type = e.target.value

      // set the value stored in state for the type
      selectedOscillatorNode.type = e.target.value
      setOscillatorNodes(oscillatorNodesCopy)
    }
  }

  const updateSelectedOscillatorVolume = (e) => {
    //update selected OscillatorNode's GainNode to the selected value
    if (selectedOscillatorNodeIndex >= 0) {
      const oscillatorNodesCopy = [...oscillatorNodes]
      const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]

      // set the gain of the OscillatorNode's GainNode
      selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(
        e.target.value / 100, Audio.context.currentTime
      )

      // set the value stored in state for the gain
      selectedOscillatorNode.gain = e.target.value
      setOscillatorNodes(oscillatorNodesCopy)
    }
  }

  const oscillatorSelectOptions = oscillatorNodes.map((oscillatorNode, i) => (
    <option key={`oscillator-${i}`} value={i}>Oscillator {i}</option>
  ))

  const play = () => {
    Audio.masterGainNode.gain.setTargetAtTime(masterGainValue, Audio.context.currentTime, 0.001)
  }

  const pause = () => {
    Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
  }

  return (
    <div className="SynthPad">

      <button onClick={addOscillatorNode}>Add New Oscillator</button>
      <select
        onChange={changeSelectedOscillatorNode}
        value={selectedOscillatorNodeIndex}
        className='select-oscillator'
      >
        {oscillatorSelectOptions}
      </select>

      <input type="number"
        value={selectedOscillatorNodeIndex >= 0 ? oscillatorNodes[selectedOscillatorNodeIndex].frequency : ''}
        onChange={updateSelectedOscillatorFrequency}
        className='frequency'
      />

      <select
        value={selectedOscillatorNodeIndex >= 0 ? oscillatorNodes[selectedOscillatorNodeIndex].type : ''}
        onChange={updateSelectedOscillatorType}
        className='wave-type'
      >
        <option value="sine">sine</option>
        <option value="sawtooth">sawtooth</option>
        <option value="square">square</option>
        <option value="triangle">triangle</option>
      </select>



      <p>Oscillator Volume: </p>
      <input
        type="range"
        min='0'
        max='100'
        value={selectedOscillatorNodeIndex >= 0 ? oscillatorNodes[selectedOscillatorNodeIndex].gain : 0}
        onChange={updateSelectedOscillatorVolume}
        className="oscillator-volume"
      />
      <p>Master Volume: </p>
      <input
        type="range"
        min="0"
        max="100"
        value={masterGainValue * 100}
        onChange={changeMasterVolume}
        className='pad-volume'
      />

      <button className='play' onMouseDown={play} onMouseUp={pause}>Play</button>
    </div>
  )
}
