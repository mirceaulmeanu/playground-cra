import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {ServiceFactory} from './services/service-factory';
import {LocalStorageService} from './services/storage/local-storage.service';
import {SessionStorageService} from './services/storage/session-storage.service';

const localStorage = new LocalStorageService();
const sessionStorage = new SessionStorageService();

const services = new ServiceFactory(localStorage, sessionStorage);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App services={services} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
