import React, { useRef } from 'react';
import useClickOutside from '../src/useClickOutside';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const Wrapper = ({ handler }) => {
  const ref = useRef(null);
  useClickOutside(ref, handler);

  return <div ref={ref}>Hello, World!</div>;
};

describe('Main tests package', () => {
  it('renders without crushing', () => {
    const handler = jest.fn();
    const { getByText } = render(<Wrapper />);

    expect(getByText('Hello, World!')).toBeDefined();
  });
});
