import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';

const UiSetupList = () => {
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
  
    const containerStyle = useMemo(() => ({ width: "100%", height: 100 }), []);
    const gridStyle = useMemo(() => ({ height: 500, width: "100%" }), []);
  
    const [colDefs, setColDefs] = useState([
        { field: "", headerName:"Address Type" },
        { field: "", headerName:"Address 1" },
        { field: "", headerName:"Address 2" },
        { field: "", headerName:"Phone" },
        { field: "", headerName:"Country" },
        { field: "", headerName:"State" },
        { field: "", headerName:"City" },
        { field: "", headerName:"Zip Code" },
      ]);
      const [colDefs1, setColDefs1] = useState([
        { field: "", headerName:"S.NO" },
        { field: "", headerName:"Streets" },
        { field: "", headerName:"Description" },
        
      ]);
    return (
        <Card title="List View">
                <div
                className="ag-theme-quartz" // applying the grid theme
                >
                <CrGridTable
                    //rowData={items}
                    columnDefs={colDefs1}
  
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
    );
  }
  
  export default UiSetupList;