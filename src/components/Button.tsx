import { css } from '@emotion/css';
import { ButtonHTMLAttributes, FormEventHandler, MouseEventHandler } from 'react';
import { darkThemeBgColor } from '../util/constants';

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
};

function Button({
  onClick = () => { },
  text,
  disabled = false,
  type = ButtonType.button,
}: {
  onClick?: MouseEventHandler,
  text: string,
  disabled?: boolean,
  type?: ButtonType,
}) {
  return (
    <button
      className={btnStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;

const btnStyle = css({
  padding: '10px',
  margin: '25px',
  backgroundColor: `${darkThemeBgColor}`,
  border: '1px solid gray',
  borderRadius: '10px',
  color: 'white',
  cursor: 'pointer',
});
