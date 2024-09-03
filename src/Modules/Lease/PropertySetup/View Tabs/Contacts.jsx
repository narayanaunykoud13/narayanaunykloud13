import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';

const Contacts = () => {
    const [items, setItems] = useState([]);
    
    /* const fetchData = async () => {
        try {
          $ajax_post('post', 'l/i/1001.1', '', function(records){
              //  alert(records.length)
              setItems(records);
          })
          
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
      useEffect(() => {
          fetchData();
      }, []); */
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
  
    const [colDefs, setColDefs] = useState([
        { field: "", headerName:"S.No" },
        { field: "", headerName:"Contact" },
        { field: "", headerName:"Contact Type" },
        { field: "", headerName:"Phone Number" },
        { field: "", headerName:"	Email" },
      ]);
    return (
        <div>
           {/*  <Header title="Property Setup >> List">
                  <Button className="btn pull-right">Search</Button>    
                  <Link className="btn pull-right" to="/property-setup/create">New Property</Link>
              </Header> */}
        <Card title="Contact Info">
             <Button className="btn pull-left">Add Contact</Button>
                <div
                className="ag-theme-quartz" // applying the grid theme
                >
                <CrGridTable
                    //rowData={items}
                    columnDefs={colDefs}
  
                   // ref={gridRef}
                    defaultColDef={defaultColDef}
                    // onGridReady={onGridReady}
                    rowDragManaged={true}
                    reactiveCustomComponents={true}
                    rowMultiSelectWithClick={true}
                    multiSortKey="ctrl"
                />
                </div>
        </Card>
        </div>
    );
  }
  
  export default Contacts;