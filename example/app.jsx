import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import ScrubExample from './scrub-example'
import TapExample from './tap-example'

function App() {
  const [tab, setTab] = useState(location.hash.replace(/#/, '') || 'scrub')
  return (
    <div className='app'>
      <h1>React Fpoint</h1>
      <p>A set of react components make mouse and touch experience easier</p>
      <nav>
        {['scrub', 'tap'].map(tab => (
          <span 
            className='tab' 
            key={tab} 
            onClick={() => { setTab(tab); location.hash = `#${tab}` }}
          >
            {`> ${tab}`}
          </span>
        ))}
      </nav>
      {tab === 'scrub' && <ScrubExample />}
      {tab === 'tap' && <TapExample />}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
