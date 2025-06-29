import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MathJaxContext } from 'better-react-mathjax';

const config = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MathJaxContext config={config}>
    <App />
  </MathJaxContext>
);
