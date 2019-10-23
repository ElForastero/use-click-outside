import React, { useRef } from 'react';
import useClickOutside from './useClickOutside';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

type WrapperProps = {
  handler: () => void,
}

const Wrapper: React.FC<WrapperProps> = ({ handler }) => {
  const ref = useRef(null);
  useClickOutside(ref, handler);

  return <div ref={ref}>Hello, World!</div>;
};

describe('Main tests package', () => {
  it('renders without crushing', () => {
    const { getByText } = render(<Wrapper handler={console.log}/>);

    expect(getByText('Hello, World!')).toBeDefined();
  });
});
