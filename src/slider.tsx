import React, {forwardRef, useRef, useEffect, useCallback} from 'react'
import {fscrub} from 'fpoint'
import combineRefs from './lib/combine-refs'

type HandlerTypes = {
  onScrubStart?(e?: Event): void;
  onScrubMove?(e?: Event): void;
  onScrubEnd?(e?: Event): void;
  onHoverStart?(e?: Event): void;
  onHoverMove?(e?: Event): void;
  onHoverEnd?(e?: Event): void;
}

type ReleaseHandler = () => void

type SliderProps = {
  component: string | React.ComponentType<any>,
  style: React.CSSProperties,
} & HandlerTypes

type MapType = {[key: string]: (e?: Event) => void}

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

  const handlers: HandlerTypes = {
    onScrubStart,
    onScrubMove,
    onScrubEnd,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
  }

  const innerRef = useRef(null)
  const handlersRef = useRef(handlers as MapType)

  // NOTE: to avoid handlers change frequently causing fscrub to reattach,
  // give a map here to update handler during renfer.
  // when the handler executed, proxiedHandler will read the map to get the latest handler.
  handlersRef.current = handlers as MapType

  const proxiedHandler = useCallback((name: string) => (event?: Event) => {
    const handler = handlersRef.current[name] || ((event: Event) => {})
    handler(event)
  }, [])

  useEffect(() => {
    const dom = innerRef.current
    const releaseHandles: Array<ReleaseHandler> = []
    if (dom) {
      const release = fscrub(dom, {
        onStart: proxiedHandler('onScrubStart'),
        onMove: proxiedHandler('onScrubMove'),
        onEnd: proxiedHandler('onScrubEnd'),
      }, scrubOptions)
      releaseHandles.push(release)
    }
    if (dom) {
      const release = fscrub(dom, {
        onStart: proxiedHandler('onHoverStart'),
        onMove: proxiedHandler('onHoverMove'),
        onEnd: proxiedHandler('onHoverEnd'),
      }, hoverOptions)
      releaseHandles.push(release)
    }
    return () => {
      releaseHandles.forEach(release => release())
    }
  }, [proxiedHandler])

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
