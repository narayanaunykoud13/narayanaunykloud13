import React from "react";
// import { useState } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button, ConfigProvider, Flex } from 'antd';
import Header from '@/Components/Header';

function App() {
  // const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const handleChangeCreate = () => {
    navigate("/property-setup/create");
  };
  const handleChangeView = () => {
    navigate("/property-setup/view");
  };

  return (
    <>
      <Header title="Welcome to APP" />
      <Flex className='menuBlock'>
        <ol className='menuBlock_list'>        
          <li><Link to="/ui-setup/list">UI</Link></li>
          <li><Link to="/property-setup/list">Property Setup</Link></li>
          <li><Link to="/amenity-setup/list">Amenity Setup</Link></li>
          <li><Link to="/ui-master/list/super-admin">UI Master</Link></li>
          <li><Link to="/ui-master/home">UI Master Home</Link></li>
          <li><Link to="/dashboard">Manage Menu</Link></li>
        </ol>
        <Flex>
            <Button className="btn btn-primary"  size="small" onClick={handleChangeCreate}> Create </Button>
            <Button className="btn" type="light" size="small" onClick={handleChangeView}> View </Button>
        </Flex>
      </Flex>

      <ConfigProvider
          theme={{
            token: {
              fontFamily: "Lexend Deca",
            },
          }}
         />
    </>
  )
}

export default App
