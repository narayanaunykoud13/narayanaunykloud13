import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList } from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout, Tabs } from 'antd';
import { Card } from 'antd';

const { TabPane } = Tabs;


const Communication = () => {
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
        { field: "", headerName:"Notes" },
        { field: "", headerName:"Created By" },
      ]);
      const [colDefs1, setColDefs1] = useState([
        { field: "", headerName:"S.No" },
        { field: "", headerName:"File Name" },
        { field: "", headerName:"Description" },
        { field: "", headerName:"File Size" },
      ]);
      return (
        <div>
            {/* Header component */}
            <Card title="Communication & Documentation">
                <Tabs defaultActiveKey="notes">
                    <TabPane tab="Notes" key="notes">
                        <div className="ag-theme-quartz">
                            
                            <Button className="btn pull-left">Add Notes</Button>
                            <CrGridTable
                                columnDefs={colDefs}
                                defaultColDef={defaultColDef}
                                rowDragManaged={true}
                                reactiveCustomComponents={true}
                                rowMultiSelectWithClick={true}
                                multiSortKey="ctrl"
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Documents" key="documents">
                        <div className="ag-theme-quartz">
                            
                            <Button className="btn pull-left">Add Document</Button>
                            <CrGridTable
                                columnDefs={colDefs1}
                                defaultColDef={defaultColDef}
                                rowDragManaged={true}
                                reactiveCustomComponents={true}
                                rowMultiSelectWithClick={true}
                                multiSortKey="ctrl"
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
  }
  
  export default Communication;