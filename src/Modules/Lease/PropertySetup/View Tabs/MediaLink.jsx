import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout, Tabs } from 'antd';
import { Card } from 'antd';

const { TabPane } = Tabs;

const MediaLink = () => {
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
        { field: "", headerName:"Document Size" },
        { field: "", headerName:"Document Link" },
        { field: "", headerName:"	Status" },
      ]);
      const [colDefs1, setColDefs1] = useState([
        { field: "", headerName:"S.No" },
        { field: "", headerName:"Document SIZE" },
        { field: "", headerName:"Document Link" },
        { field: "", headerName:"	Status" },
      ]);
      const [colDefs2, setColDefs2] = useState([
        { field: "", headerName:"S.No" },
        { field: "", headerName:"Platform Name" },
        { field: "", headerName:"	URL" },
      ]);
      return (
        <div>
            {/* Header component */}
            
            <Card title="Media Link">
                <Tabs defaultActiveKey="photos">
                    <TabPane tab="Photos" key="photos">
                        <div className="ag-theme-quartz">
                            
                            <Button className="btn pull-left">Add Photos</Button>
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
                    <TabPane tab="Videos" key="videos">
                        <div className="ag-theme-quartz">
                            
                            <Button className="btn pull-left">Add Videos</Button>
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
                    <TabPane tab="Social Media" key="socialMedia">
                        <div className="ag-theme-quartz">
                            
                            <Button className="btn pull-left">Add URL</Button>
                            <CrGridTable
                                columnDefs={colDefs2}
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
  
  export default MediaLink;