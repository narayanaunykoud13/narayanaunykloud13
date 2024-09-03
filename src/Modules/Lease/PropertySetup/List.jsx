import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { PageHeader, Container, isset, $ajax_post, FormControl, CrGridTable,GlobalList} from '../../../Library/Library';
import Header from '../../../Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';
import Search from 'antd/es/transfer/search';
import { FilterOutlined} from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;


const PropertySetupList = () => {
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
  return (
      <div>
          <Header title="Property Setup >> List">
                
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
      </div>
  );
}

export default PropertySetupList;
