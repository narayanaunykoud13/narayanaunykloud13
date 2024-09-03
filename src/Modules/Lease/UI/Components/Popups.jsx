import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { ModalOpen, Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';
import FormElements from '../Components/FormElements'
const UiSetupPopups = () => {
    const [items, setItems] = useState([]);
  
    const [drawerVisible, setDrawerVisible] = useState(false);

    const openPopup = () => {
        setDrawerVisible(true);
    };

    const closePopup = () => {
        setDrawerVisible(false);
    };

    const handleSave = () => {
        // Handle save logic here
        closePopup();
    };
    const savefun = () => {
      // savefun
      closePopup();
    }
    return (
      <>
        <Card title="Popup Types">
             <Button className="btn pull-left" onClick={openPopup}>Open Side Popup</Button>
             <Button className="btn pull-left">Open Center Popup</Button>
             <Button className="btn pull-left">Open Full Popup</Button>
        </Card>
        <ModalOpen header="Hello Modal" open={drawerVisible} footer={<Button type="button" onClick={savefun}>Save</Button>}>
            <FormElements/>
        </ModalOpen>
      </>
    );
  }
  
  export default UiSetupPopups;