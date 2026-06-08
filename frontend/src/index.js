import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css'; 
import './i18n';             
import './App.css'; // Главное, чтобы этот импорт был последним
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);