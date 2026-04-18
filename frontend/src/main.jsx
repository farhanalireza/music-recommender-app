import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound';

const OriginalRoot = document.getElementById('root');

window.addEventListener('error', (e) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100vw';
  errorDiv.style.height = '100vh';
  errorDiv.style.backgroundColor = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '999999';
  errorDiv.style.overflow = 'auto';
  errorDiv.innerHTML = `<h2>Unhandled Error</h2><pre>${e.error?.stack || e.message}</pre>`;
  document.body.appendChild(errorDiv);
});

createRoot(OriginalRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

