<h1 align="center">Welcome to use-click-outside 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/use-click-outside">
    <img alt="Version" src="https://img.shields.io/npm/v/use-click-outside.svg">
  </a>
</p>

> React hook to execute callback when a click is happened outside of component.

## Install

```sh
yarn add use-click-outside
```

## Usage

```jsx
import React, { useRef } from 'react';
import useClickOutside from 'use-click-outside';

const Modal = ({ onClose }) => {
  const ref = useRef();
  useClickOutside(ref, onClose);

  return <dialog ref={ref}>Hello, World!</dialog>;
};
```

Or if you need a custom event type instead of default 'click', third parameter can be passed:

```js
  useClickOutside(ref, onClose, 'mousedown');
```

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
