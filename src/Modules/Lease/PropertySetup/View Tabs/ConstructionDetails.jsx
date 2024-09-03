import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { FormRow,Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';
import { useParams } from 'react-router-dom';


import { Card } from 'antd';

const ConstructionDetails = ({data}) => {
    console.log("ConstructionDetails",data)
    const prop = data;
  const subsidiary_list = [];
  const source_from_subsidiary = function(){

  }
  const fields = {};
  let { ScreenMode } = useParams();
  const isEditMode = ScreenMode === 'edit';
  const SCID = {
      "yes_or_no": {
        "VAL_YES": 1,
        "VAL_NO": 1
      },
      "property_type": {
        "VAL_PROPERTY_TYPE_MH": 1,
        "VAL_PROPERTY_TYPE_NA": 1
      },
      "states": {
        "VAL_SUBSTATE_CT": 1,
        "VAL_SUBSTATE_TX": 1
      },
      "sun_acquired_or_constructed": {
        "VAL_CONSTRUCTED": 1,
        "VAL_ACQUIRED_AND_CONSTRUCTED": 1
      }
    };
    const propertytab = {};

  return (
      <div className="container-fluid">
          
          <div className="sticky-bar">
              <Card title="Construction Details">
                     <FormRow>
                          {isEditMode  ? (
                                 <FormControl label="Acquired or Constructed">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Acquired or Constructed ">
                                <Input className='view-input' readOnly value={prop.acquired} />
                                </FormControl>
                            )}
                          
                          {isEditMode  ? (
                                 <FormControl label="Construction Company Name">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Construction Company Name">
                                    <Input className='view-input' readOnly value={prop.company_name} />
                                </FormControl>
                            )}
                          
                          {isEditMode  ? (
                                 <FormControl label="Year Constructed">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Year Constructed ">
                                    <Input className='view-input' readOnly value={prop.year_constructed} />
                                 </FormControl>
                            )}
                         
                          {isEditMode  ? (
                                 <FormControl label="Disposal year">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Disposal year">
                                    <Input className='view-input' readOnly value={prop.disposal_year} />
                                </FormControl>
                            )}
                      
                          
                          {isEditMode  ? (
                                 <FormControl label="Acquisition Date">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Acquisition Date">
                                    <Input className='view-input' readOnly required value={prop.acquisition_date} />
                                </FormControl>
                            )}
                          
                          {isEditMode  ? (
                                 <FormControl label="Architectural Style">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Architectural Style">
                                    <Input className='view-input'readOnly value={prop.architectural} />
                                 </FormControl>
                            )}
                          
                          {isEditMode  ? (
                                 <FormControl label="Foundation Type">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Foundation Type">
                                    <Input className='view-input' readOnly value={prop.foundation_type} />
                                </FormControl>    
                            )}
                         
                          {isEditMode  ? (
                                 <FormControl label="Material Type">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Material Type">
                                <Input className='view-input' readOnly value={prop.material_type} />
                                </FormControl>    
                            )}
                      
                     
                         
                          {isEditMode  ? (
                                 <FormControl label="Roof Type">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Roof Type">
                                     <Input className='view-input' readOnly value={prop.roof_type} />
                                </FormControl>    
                            )}
                          
                          {isEditMode  ? (
                                 <FormControl label="Renovation/Upgrades">
                                  <GlobalList  listId="custrecord_rioo_renovational" recordType="customrecord_rioo_property_setup" /> 
                                 </FormControl>
                            ) : (
                                <FormControl label="Renovation/Upgrades">
                                    <Input className='view-input' readOnly value={prop.renovationalText} />
                                </FormControl>   
                            )}
                         
                          {isEditMode  ? (
                                 <FormControl label="Description">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Description">
                                <Input className='view-input' readOnly value={prop.description} />
                            </FormControl> 
                            )}
                     </FormRow>
              </Card>
          </div>
      </div>
  );
};

export default ConstructionDetails;

