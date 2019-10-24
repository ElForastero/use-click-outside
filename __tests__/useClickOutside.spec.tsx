import React, { useRef } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import useClickOutside from '../src/useClickOutside';

type WrapperProps = {
  handler: () => void;
  eventType?: string;
};

/**
 * Wrapper component to lower code boilerplate
 */
const Wrapper: React.FC<WrapperProps> = ({
  handler,
  eventType = undefined,
}) => {
  const ref = useRef();
  useClickOutside(ref, handler, eventType);

  return (
    <div>
      parent
      <div ref={ref}>child</div>
    </div>
  );
};

describe('Main tests package', () => {
  it('renders without crushing', () => {
    const handler = jest.fn();
    const { getByText } = render(<Wrapper handler={handler} />);

    expect(getByText('child')).toBeDefined();
  });

  it("doesn't handle click inside", () => {
    const handler = jest.fn();
    const { getByText } = render(<Wrapper handler={handler} />);

    getByText('child').click();
    expect(handler).not.toBeCalled();
  });

  it('handles click outside', () => {
    const handler = jest.fn();
    const { getByText } = render(<Wrapper handler={handler} />);

    getByText('parent').click();
    expect(handler).toBeCalled();
  });

  it('handles touch outside', () => {
    const handler = jest.fn();
    const { getByText } = render(<Wrapper handler={handler} />);

    fireEvent.touchStart(getByText('parent'));
    expect(handler).toBeCalled();
  });

  it('handles custom mousedown event', () => {
    const handler = jest.fn();
    const { getByText } = render(
      <Wrapper handler={handler} eventType="mousedown" />
    );

    fireEvent.mouseDown(getByText('parent'));
    expect(handler).toBeCalled();
  });

  // @todo Test in Shadow DOM
  // it('handles click in shadow dom', () => {
  //   const handler = jest.fn();
  //   const div = document.createElement('div');
  //   const shadow = div.attachShadow({ mode: 'open' });
  //
  //   const { getByText, debug } = render(<Wrapper handler={handler} />, {
  //     container: document.body.appendChild(shadow as unknown as HTMLElement),
  //   });
  //   debug();
  //
  //   // getByText('parent').click();
  //   // expect(handler).toBeCalled();
  // });
});
