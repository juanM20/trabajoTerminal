import { Key } from './Key'
import { frequencies } from '../../web_audio/frequencies'
import './Keyboard.css'

export const Keyboard = () => {

  return (
    <div className='keyboard'>
      {frequencies.map((freq) => {
        return <Key note={freq.note} frequency={freq.freq} colorKey={freq.color} />
      })}
    </div>
  )
}
