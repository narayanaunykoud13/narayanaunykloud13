
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { FormRow, PageHeader, Container, isset, $ajax_post, FormControl, CrGridTable,GlobalList} from '../../../Library/Library';
import Header from '../../../Components/Header';
import { Link } from 'react-router-dom';
import { Tabs, Drawer, Button, Select, DatePicker, Row, Col, Layout, Modal, Checkbox, Input, Form, Space } from 'antd';



import { Card } from 'antd';
import Search from 'antd/es/transfer/search';
import { FilterOutlined} from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;


const ScreenBuilderListMode = () => {
   
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [screens, setScreens] = useState([
    { screen: 'Screen 1', modes: ['List', 'View'], permalink: 'screen1', type: 'Application', key: 1 },
    { screen: 'Screen 2', modes: ['Create', 'View'], permalink: 'screen2', type: 'Inquiry', key: 2 },
    { screen: 'Screen 3', modes: ['List', 'Create'], permalink: 'screen3', type: 'Agreements', key: 3 },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const { modes, permalink, type } = values;
      const newScreen = {
        screen: `Screen ${screens.length + 1}`,
        modes,
        permalink,
        type,
        key: screens.length + 1
      };
      setScreens([...screens, newScreen]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };


  const [items, setItems] = useState([]);
  
  const fetchData = async () => {
    try {
      $ajax_post('post', 's/p/1001', Search, function(records){
          //  alert(records.length)
          setItems(records);
          console.log("s/p/1001",records)
      })
      
    } catch (error) {
        console.error('There was an error!', error);
    }
};

  useEffect(() => {
      fetchData();
  }, []);

  const defaultColDef = useMemo(() => {
      return {
        flex: 1,
        minWidth: 150,
        filter: "agTextColumnFilter",
        menuTabs: ["filterMenuTab"],
      };
    }, []);
  const gridRef = useRef();
  const onFilterTextBoxChanged = useCallback(() => {
  gridRef.current.api.setGridOption(
    "quickFilterText",
    document.getElementById("filter-text-box").value
  );
  }, []);

  const containerStyle = useMemo(() => ({ width: "100%", height: 800 }), []);
  const gridStyle = useMemo(() => ({ height: 800, width: "100%" }), []);
  const fields = {};
  console.log("fields",fields)

  const [selectedOption, setSelectedState] = useState('');

  const handleCountryChange = (newValue) => {
    setSelectedState(newValue);
  };
  const [colDefs, setColDefs] = useState([
      /* { 
        headerCheckboxSelection: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerName:"Select", 
      },
      {
        field: "name", 
        headerName:"Property ID", 
        enableRowGroup: true,
        cellRenderer: (params) => {
            return <Link to={"/property-setup/view/1/primary-information"}>{params.value}</Link>;
        }
      }, */
      { field: "sno", headerName:"S.No", valueGetter: (params) => params.node.rowIndex + 1},
      {
        field: "property", 
        headerName:"Property", 
        enableRowGroup: true,
        cellRenderer: (params) => {
           return <Link to={`/property-setup/view/${params.data.id}/primary-information`}>{params.value}</Link>;
        }
      },
      { field: "property_typeText", headerName:"Property Type"},
      { field: "countryText", headerName:"Counrty"},
      { field: "stateText", headerName:"state"},
    ]);


    const sideDrawerTabsContent = [
        {
          key: '1',
          label: 'Settings',
          children: <div>
                <div className="container-fluid">
                    <FormRow>
                        <FormControl label="Screen Name">
                            <Input  name="screen_name" value="Application"/>
                        </FormControl>
                        <FormControl label="Screen Type">
                            <GlobalList listId="custrecord_rioo_property_status" name="property_status" recordType="customrecord_rioo_property_setup" />
                        </FormControl>
                        <FormControl label="Screen Data Source">
                            <GlobalList listId="custrecord_rioo_property_status" name="property_status" recordType="customrecord_rioo_property_setup" />
                        </FormControl>
                    </FormRow>
                </div>
            </div>,
        },
        {
          key: '2',
          label: 'Fields',
          children: <p>Fields content goes here...</p>,
        },
        {
          key: '3',
          label: 'Filters',
          children: <div>
            <div className="container-fluid">
                <FormRow>
                    <FormControl label="Field">
                        <Input  name="screen_name" value="Application"/>
                    </FormControl>
                    <FormControl label="Condition">
                        <GlobalList listId="custrecord_rioo_property_status" name="property_status" recordType="customrecord_rioo_property_setup" />
                    </FormControl>
                    <FormControl label="Value">
                        <GlobalList listId="custrecord_rioo_property_status" name="property_status" recordType="customrecord_rioo_property_setup" />
                    </FormControl>
                </FormRow>
            </div>
        </div>,
        },
        {
          key: '4',
          label: 'Tab Links',
          children: <div>
                <div className="container-fluid">
                    <FormRow>
                        <FormControl label="Tab Name">
                            <Input  name="screen_name" value="List"/>
                        </FormControl>
                        <FormControl label="Tab Link">
                        <Input  name="screen_name" value="#/application/list"/>
                        </FormControl>
                    </FormRow>
                    <FormRow>
                        <FormControl label="Tab Name">
                            <Input  name="screen_name" value="Pinned List"/>
                        </FormControl>
                        <FormControl label="Tab Link">
                        <Input  name="screen_name" value="#/application/pinnedlist"/>
                        </FormControl>
                    </FormRow>
                </div>
            </div>,
        },
      ];

  return (
      <div>
            <Header title="Screen Builder >> List">
                <Button onClick={showModal} className="btn pull-right">Settings</Button>
            </Header>
            <PageHeader>
                <Link className="btn btn-primary pull-left" to="/property-setup/create">New Property</Link>
                <Button className="btn pull-left"><FilterOutlined /></Button>    
            </PageHeader>
          
          <br/>
          <Card>
          <div className="row">
                        <div className="col-md-4">
                            <FormControl label="Country">
                                <GlobalList listId="custrecord_rioo_country"  recordType="customrecord_rioo_property_setup"/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            
                            <FormControl label="State">
                                <GlobalList listId="custrecord_rioo_state"  recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Property Type">
                                 <GlobalList listId="custrecord_rioo_property_tpe" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                        </div>
               </div >
               </Card>
              <div
              className="ag-theme-quartz" // applying the grid theme
              >
              <CrGridTable
                  rowData={items}
                  columnDefs={colDefs}

                  ref={gridRef}
                  defaultColDef={defaultColDef}
                  // onGridReady={onGridReady}
                  rowDragManaged={true}
                  reactiveCustomComponents={true}
                  rowMultiSelectWithClick={true}
                  multiSortKey="ctrl"
              />
              </div>

            <Drawer
              width="60%"
        title="Create a Screen"
        open={isModalVisible}
        onOk={handleOk}
        onClose={handleCancel}
      >
        <div className="sidebarTabs">
          <Tabs defaultActiveKey="1" items={sideDrawerTabsContent} />
        </div>
        
      </Drawer>
      </div>
  );
}

export default ScreenBuilderListMode;
