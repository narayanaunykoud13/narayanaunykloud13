import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormRow, Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import { Link,useNavigate } from 'react-router-dom';
import { Form,Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';

const PropertySetupViewPrimary = ({data}) => {
    console.log("khkjhk",data)
    const subsidiary_list = [];
    const source_from_subsidiary = function(){

    }
    const prop = data;
    const fields = {};
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
      
      let { ScreenMode } = useParams();
      const isEditMode = ScreenMode === 'edit';

      const [propertyeditForm, setpropertyeditForm] = useState({
        "firstname":"santhosh",
       // "property":"12"
    });
    
    useEffect(() => {
        if (data) {
            setpropertyeditForm(data);
        }
    }, [data]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setpropertyeditForm(prevpropertyeditForm => ({
          ...prevpropertyeditForm,
          [name]: value
        }));
    };
    const handleFormChange = (event) => {
        handleInputChange(event);
    };
    const handleSelectChange = (value, name) => {
          //  alert(name)
        setpropertyeditForm(prevpropertyeditForm => ({
            ...prevpropertyeditForm,
            [name]: value
            
        }));
        console.log("vallll",value)
    }; 
    const navigate = useNavigate();
    const create_property_setup = () => {
        console.log("propertyCreateForm....",JSON.stringify(propertyeditForm))
        $ajax_post('post', 's/p/1002', propertyeditForm, function(record_id){
             console.log("reccccid",record_id);
            navigate("/property-setup/view/"+record_id+"/primary-information");
        })
    };

    return (
        <Form onChange={handleFormChange}>
        <div className="container-fluid">
        <div className="sticky-tl rw rungroup">
                <Button type="primary" onClick={create_property_setup}>Save</Button>
            </div>
            <div className="sticky-bar">
                <Card title="Primary Information">
                    <FormRow>
                            {isEditMode  ? (
                                 <FormControl label="Country">
                                     <GlobalList  onChange={value => handleSelectChange(value, 'country')} value={propertyeditForm.country} name="country" listId="custrecord_rioo_country"  recordType="customrecord_rioo_property_setup" />
                                 </FormControl>
                            ) : (
                                <FormControl label="Country">
                                <Input className='view-input' readOnly  value={prop.countryText} />
                                </FormControl>
                            )}
                            
                            {isEditMode  ? (
                                 <FormControl label="State">
                                    <GlobalList   onChange={value => handleSelectChange(value, 'state')} value={propertyeditForm.state} name="state" listId="custrecord_rioo_state"  recordType="customrecord_rioo_property_setup" />
                                 </FormControl>
                            ) : (
                                <FormControl label="State">
                                <Input className='view-input' readOnly value={prop.stateText} />
                                </FormControl>
                            )}
                           
                            {isEditMode  ? (
                                 <FormControl label="Subsidairy">
                                     <GlobalList onChange={value => handleSelectChange(value, 'subsidiary')} value={propertyeditForm.subsidiary} name="subsidiary" listId="custrecord_rioo_subsidiary"  recordType="customrecord_rioo_property_setup" />
                                 </FormControl>
                            ) : (
                                <FormControl label="Subsidairy">
                                <Input className='view-input' readOnly value={prop.subsidiaryText} />
                                 </FormControl>
                            )}
                       
                            {isEditMode  ? (
                                 <FormControl label="Property">
                                 <Input name="property" value={propertyeditForm.property}/>
                                 </FormControl>
                            ) : (
                                <FormControl label="Property">
                                <Input className='view-input' readOnly value={prop.property} />
                                 </FormControl>
                            )}
                            
                            {isEditMode  ? (
                                 <FormControl label="Property Code">
                                 <Input name="property_code" value={propertyeditForm.property_code}/>
                                 </FormControl>
                            ) : (
                                <FormControl label="Property Code">
                                <Input required className='view-input' readOnly value={prop.property_code} />
                                </FormControl>
                            )}
                       
                            
                            {isEditMode  ? (
                                <FormControl label="Property Type">
                                  <GlobalList onChange={value => handleSelectChange(value, 'property_type')} value={propertyeditForm.property_type} listId="custrecord_rioo_property_tpe" name="property_type" recordType="customrecord_rioo_property_setup" />
                                </FormControl>
                            ) : (
                                <FormControl label="Property Type">
                                <Input className='view-input' readOnly value={prop.property_typeText} />
                                </FormControl>
                            )}
                            
                            {isEditMode  ? (
                                <FormControl label="Property Status">
                                     <GlobalList onChange={value => handleSelectChange(value, 'property_status')} value={propertyeditForm.property_status} listId="custrecord_rioo_property_status" name="property_status" recordType="customrecord_rioo_property_setup" />
                                </FormControl>
                            ) : (
                                <FormControl label="Property Status">
                                <Input className='view-input' readOnly value={prop.property_statusText} />
                            </FormControl>
                            )}
                            
                    </FormRow>
                </Card>
            </div>
        </div>
        </Form>
    );
};

export default PropertySetupViewPrimary;

