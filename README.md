# React Fpoint
> A set of react components make mouse & touching easier

![npm-version](https://img.shields.io/npm/v/react-fpoint.svg) ![license](https://img.shields.io/npm/l/react-fpoint.svg)

Checkout the [fpoint](https://github.com/huozhi/fpoint) project for details that how it works internally and why I design this. In a short word it provides you the easy way to handle the mouse and touch interactions individually and flexibly. unlike browser throwing you bunch of native events (pointer, mouse and touch events), fpoint understands how to capture user inputs and recognize them as an action, with the original input source identified.

## Quick Start

[react-fpoint.vercel.app](https://react-fpoint.vercel.app)

```sh
npm i -S react-fpoint
```
### `<Scurb>`

`Scrub` component let you to easily attach handlers to track mouse dragging or finger scrubbing interactions. You could use it to build your custom slider, touch screen or any other advanced components you like.

#### Example

```js
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
```

#### Component Props

```ts
component?: string | ReactComponent
onScrubStart?(e?: Event): void;
onScrubMove?(e?: Event): void;
onScrubEnd?(e?: Event): void;
onHoverStart?(e?: Event): void;
onHoverMove?(e?: Event): void;
onHoverEnd?(e?: Event): void;
```

Other props will be directly applied onto it.

### `<Tap>`

`Tap` component let you easily distinguish between touch and mouse clicks. Sometimes we're also struggling to separate mouse hover or touch enter among desktop and mobile devices. This component give you power to track every single phase during an complete interaction.

#### Example

```js
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
```

#### Component Props

```ts
component?: string | ReactComponent
onTouchDown?(e?: Event): void;
onTouchUp?(e?: Event): void;
onTouchClick?(e?: Event): void;
onMouseDown?(e?: Event): void;
onMouseUp?(e?: Event): void;
onMouseClick?(e?: Event): void;
onHoverEnter?(e?: Event): void;
onHoverLeave?(e?: Event): void;
```

Other props will be directly applied onto it.
## Development

For main library

```sh
yarn
yarn build
```

For example pages

```sh
cd ./example
yarn
yarn start
```
## LICENSE

MIT
