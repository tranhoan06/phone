import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDOM.render(<App/>, document.getElementById('root'))

const root = document.getElementById('root');
const ReactRoot = ReactDOM.createRoot(root)

ReactRoot.render(<App/>)