import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Button } from 'antd';
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Visualgo from './Visualgo/Visualgo';

// const { SubMenu } = Menu;
// const { Header, Content, Sider } = Layout;

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Visualgo />
    </div>
  );
}

export default App;
