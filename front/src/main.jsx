import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.href = "/imagefront/Nouveauprojet1.png";
favicon.type = "image/x-icon";
document.head.appendChild(favicon);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
