import React, { useState } from 'react'
import {Tap} from 'react-fpoint'

const codeExample = `
import {Tap} from 'react-fpoint'

function handleTouchClick(e) {
  const {offsetX, offsetY} = e
  // ...
}

function handleMouseClick(e) {
  // ...
}

return (
  <Tap
    onTouchClick={handleTouchClick}
    onMouseClick={handleMouseClick}
  >
    {children}
  </Tap>
)
`

export default function TapExample() {
  const [glitterState, setGlitterState] = useState({visible: false})
  const [position, setPosition] = useState({x: 0, y: 0})
  function setGlitterPosition(event, type) {
    const {offsetX, offsetY} = event
    setPosition({x: offsetX, y: offsetY})
    setGlitterState({type, visible: true})
  }
  
  return (
    <div className='tap-example'>
      <h2>Example</h2>
      <small>Use mouse or finger (touch screen) to scrub the cube</small>
      <Tap
        className='square'
        onTouchClick={(e) => { setGlitterPosition(e, 'touch') }}
        onMouseClick={(e) => { setGlitterPosition(e, 'mouse') }}
      >
        <div
          style={{
            visibility: glitterState.visible ? 'visible' : 'hidden',
            left: (position.x - 20) + 'px',
            top: (position.y - 20) + 'px',
          }}
          className={`glitter ${glitterState.visible ? 'glitter--animating' : ''}`} 
          type={glitterState.type}
          onAnimationEnd={() => {
            setGlitterState({visible: false})
          }}
        />
      </Tap>
       
      <code>
        <pre>
          {codeExample}
        </pre>
      </code>
    </div>
  )  
}
