import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormRow, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';



import { Card } from 'antd';

const PropertyDetails = ({data}) => {
    console.log("PropertyDetails",data)
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
                <Card title="Property Details">
                    <FormRow>
                            {isEditMode  ? (
                                 <FormControl label="Property Area">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Property Area">
                                <Input className='view-input' readOnly value={prop.property_area} />
                                </FormControl>
                            )}
                            
                            {isEditMode  ? (
                                 <FormControl label="Area UOM">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Area UOM">
                                <Input className='view-input' readOnly  value={prop.area_uomText} />
                                 </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="Rental Insurance">
                                  <GlobalList  listId="custrecord_rioo_rental_insurance" recordType="customrecord_rioo_property_setup" /> 
                                 </FormControl>
                            ) : (
                                <FormControl label="Rental Insurance">
                                <Input className='view-input' readOnly  value={prop.rental_insuranceText} />
                                 </FormControl>
                            )}
                   
                            
                            {isEditMode  ? (
                                 <FormControl label="Lattitude">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Lattitude">
                                <Input className='view-input' readOnly value={prop.latitude} />
                                 </FormControl>
                            )}
                            
                            {isEditMode  ? (
                                 <FormControl label="Longitude">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Longitude">
                                <Input className='view-input'  readOnly value={prop.longitude} />
                                 </FormControl>
                            )}
                       
                           
                            {isEditMode  ? (
                                 <FormControl label="PTIN">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="PTIN">
                                <Input className='view-input' readOnly value={prop.pin} />
                            </FormControl>
                            )}
                            
                            {isEditMode  ? (
                                 <FormControl label="Background Check">
                                  <GlobalList  listId="custrecord_rioo_back_ground_check" recordType="customrecord_rioo_property_setup" /> 
                                 </FormControl>
                            ) : (
                                <FormControl label="Background Check">
                                <Input className='view-input' readOnly  value={prop.background_checkText}/>
                                 </FormControl>
                            )}
                    </FormRow>
                </Card>
                { <Card title="Property Address">
                    <FormRow>
                            
                            {isEditMode  ? (
                                 <FormControl label="Street Name">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Street Name">
                                <Input className='view-input' readOnly  value={prop.street_name} />
                            </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="City">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="City">
                                <Input className='view-input' readOnly  value={prop.city} />
                            </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="Landmark">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Landmark">
                                  <Input className='view-input' readOnly  value={prop.landmark} />
                            </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="Pincode">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Pincode">
                                <Input className='view-input' readOnly  value={prop.pincode}/>
                            </FormControl>
                            )}
                    </FormRow>
                </Card> }
              {   <Card title="Property Manager Details">
                    <FormRow>
                          
                            {isEditMode  ? (
                                 <FormControl label="Property Manager Name">
                                   <GlobalList modelName="fields.property_manager_name" listId="custrecord_rioo_property_manager_name" recordType="customrecord_rioo_property_setup" /> 
                                 </FormControl>
                            ) : (
                                <FormControl label="Property Manager Name">
                                <Input  className='view-input' readOnly  value={prop.property_manager_nameText} />
                            </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="Property Manager Phn No">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Property Manager Phn No ">
                                <Input className='view-input' readOnly  value={prop.property_mgr_phn_number} />
                            </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="Property Manager Email">
                                 <Input />
                                 </FormControl>
                            ) : (
                                <FormControl label="Property Manager Email">
                                <Input className='view-input' readOnly  value={prop.property_manager_email} />
                            </FormControl>
                            )}
                    </FormRow>
                </Card> }
            </div>
        </div>
    );
};

export default PropertyDetails;

