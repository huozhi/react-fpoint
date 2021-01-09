import React, {forwardRef, useRef, useEffect} from 'react'
import {fscrub} from 'fpoint'
import combineRefs from './lib/combine-refs'
import {createHandlerProxy} from './common' 
import {SliderProps, SliderHandlerTypes, ReleaseHandler, HandlerMap} from './@types'

const scrubOptions = {
  touch: true,
  mouse: true,
}

const hoverOptions = {
  touch: false,
  mouse: false,
  hover: true,
}

const Slider = forwardRef(function Slider(props: SliderProps, ref) {
  const {
    component: HostComponent,
    style,
    onScrubStart,
    onScrubMove,
    onScrubEnd,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
    ...rest
  } = props

  const handlers: SliderHandlerTypes = {
    onScrubStart,
    onScrubMove,
    onScrubEnd,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
  }

  const innerRef = useRef(null)
  
  // NOTE: to avoid handlers change frequently causing fscrub to reattach,
  // give a map here to update handler during renfer.
  // when the handler executed, proxiedHandler will read the map to get the latest handler.
  const handlersRef = useRef(handlers as HandlerMap)
  handlersRef.current = handlers as HandlerMap
  const proxyHandler = createHandlerProxy(handlersRef.current)

  useEffect(() => {
    const dom = innerRef.current as unknown as HTMLElement
    
    const releaseScrub = fscrub(dom, {
      onStart: proxyHandler('onScrubStart'),
      onMove: proxyHandler('onScrubMove'),
      onEnd: proxyHandler('onScrubEnd'),
    }, scrubOptions)

    const releaseHover = fscrub(dom, {
      onStart: proxyHandler('onHoverStart'),
      onMove: proxyHandler('onHoverMove'),
      onEnd: proxyHandler('onHoverEnd'),
    }, hoverOptions)

    return () => {
      releaseScrub()
      releaseHover()
    }
  }, [])

  return (
    <HostComponent {...rest} ref={combineRefs(ref, innerRef)} style={{...style, touchAction: 'none'}} />
  )
})

Slider.defaultProps = {
  component: 'div',
  onScrubStart() {},
  onScrubMove() {},
  onScrubEnd() {},
  onHoverStart() {},
  onHoverMove() {},
  onHoverEnd() {},
}

export default Slider
