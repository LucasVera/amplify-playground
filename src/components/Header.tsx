
import { css } from '@emotion/css';
import React from 'react';
import { Link } from 'react-router-dom';
import { darkThemeBgColor } from '../util/constants';

function Header() {
  return (
    <div className={containerStyle}>
      <Link className={linkStyle} to="/">Home</Link>
      <Link className={linkStyle} to="/create-todo">Create Todo</Link>
    </div>
  );
}

export default Header;

const containerStyle = css({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  border: `1px solid ${darkThemeBgColor}`,
  padding: '10px',
});
const linkStyle = css({
  textDecoration: 'none',
  padding: '5px',
  ":hover": {
    color: 'darkblue'
  }
});
