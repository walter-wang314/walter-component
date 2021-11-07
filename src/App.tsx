import React from 'react';
import { Menu } from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <Menu className="hello" mode="horizontal">
        <SubMenu title={'介绍'}>
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
          <MenuItem>3</MenuItem>
        </SubMenu>
        <SubMenu title={'关于'}>
          <MenuItem>222</MenuItem>
          <MenuItem>333</MenuItem>
          <MenuItem>444</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
