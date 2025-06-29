import React from 'react';

const Button = ({ text, buttoncolor,textcolor, onClick }) => {
  const style = {
    backgroundColor: buttoncolor,
    border: 'none',
    color: textcolor,
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return <button style={style} onClick={onClick}>{text}</button>;
};

export default Button;
