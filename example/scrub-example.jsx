import React, {useRef, useState} from 'react'
import {Scrub} from 'react-fpoint'
import Cube from './cube'

const codeExample = `
import {Scrub} from 'react-fpoint'

function handleScrubMove(e) {
  const pageX = e.touches ? e.touches[0].pageX : e.pageX
  const pageY = e.touches ? e.touches[0].pageY : e.pageY
  
  // ...
}

return (
  <Scrub
    onScrubMove={handleScrubMove}
  >
    {children}
  </Scrub>
)
`

const throttle = (fn, wait) => {
  let pending = false
  return function() {
    if (pending) return;
    fn.apply(this, arguments)
    pending = true
    setTimeout(
      () => pending = false,
      wait
    )
  }
}

function ScrubExample() {
  const [posState, setPosState] = useState({pageX: 0, offsetX: 0})
  const scrubRef = useRef(null)
  function extractPos(e) {
    const parentBcr = scrubRef.current.getBoundingClientRect()

    const pageX = e.touches ? e.touches[0].pageX : e.pageX
    const pageY = e.touches ? e.touches[0].pageY : e.pageY


    const offsetX = Math.min(Math.max(0, pageX - parentBcr.left), parentBcr.width)
    const offsetY = Math.min(Math.max(0, pageY - parentBcr.top), parentBcr.height)
    return {pageX, pageY, offsetX, offsetY}
  }
  
  const onScrubMove = throttle((e) => { 
    const posState = extractPos(e)
    setPosState(posState)
  }, 200)
  
  const leftPercent = posState.offsetX / document.body.clientWidth * 100
  const topPercent = posState.offsetY / document.body.clientHeight * 100
  return (
    <div>
      <h2>Example</h2>
      <small>Use mouse or finger (touch screen) to scrub the cube</small>
      <Scrub
        ref={scrubRef}
        onScrubMove={onScrubMove}  
      >
        <div className='scrub-example'>
          <Cube 
            x={Math.floor(leftPercent / 100 * 360)} 
            y={Math.floor(topPercent / 100 * 360)} 
          />
        </div>
      </Scrub>
      
      <h2>Usage</h2>
      <code>
        <pre>
          {codeExample}
        </pre>
      </code>
    </div>
  )
}

export default ScrubExample
