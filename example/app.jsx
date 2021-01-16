import React from 'react'
import ReactDOM from 'react-dom'
import ScrubExample from './scrub-example'

function App() {
  return (
    <div className='app'>
      <h1>React Fpoint</h1>
      <p>A set of react components make mouse and touch experience easier</p>
      <ScrubExample />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
