import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';

const MarketListing = () => {
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
        { field: "", headerName:"UnitNumber" },
        { field: "", headerName:"Unit Type" },
        { field: "", headerName:"Market Listing Type" },
        { field: "", headerName:"Listing Platform" },
        { field: "", headerName:"Listing Date" },
        { field: "", headerName:"Listing Duration" },
        { field: "", headerName:"Listing End Date" },
        { field: "", headerName:"Listing Status" },
        { field: "", headerName:"Purpose" },
      ]);
    return (
        <div>
           {/*  <Header title="Property Setup >> List">
                  <Button className="btn pull-right">Search</Button>    
                  <Link className="btn pull-right" to="/property-setup/create">New Property</Link>
              </Header> */}
        <Card title="Market Listing">
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
  
  export default MarketListing;