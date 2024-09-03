import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '../../../Library/Library';
import Header from '../../../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Select, DatePicker, Input, Row, Col, Layout } from 'antd';


import { Card } from 'antd';

const ScreenBuilderCreateMode = () => {
   

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
    const navigate = useNavigate();

    
    const create_property_setup = () => {
        console.log("propertyCreateForm....",JSON.stringify(propertyCreateForm))
        $ajax_post('post', 's/p/1002', propertyCreateForm, function(record_id){
             console.log("reccccid",record_id);
            navigate("/property-setup/view/"+record_id+"/primary-information");
        })
    };

    // const [inputValue, setInputValue] = useState('');
    // const handleInputChange = (event) => {
    //     setInputValue(event.target.value);
    // };
    
    const [propertyCreateForm, setpropertyCreateForm] = useState({
        "firstname":"santhosh",
       // "property":"12"
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        setpropertyCreateForm(prevpropertyCreateForm => ({
          ...prevpropertyCreateForm,
          [name]: value
        }));
    };
    const handleFormChange = (event) => {
        handleInputChange(event);
    };
    const handleSelectChange = (value, name) => {
          //  alert(name)
        setpropertyCreateForm(prevpropertyCreateForm => ({
            ...prevpropertyCreateForm,
            [name]: value
        }));
    };
   
    return (
        <Form onChange={handleFormChange}>
        <div className="container-fluid">
            <div className="sticky-tl rw rungroup">
                <Button type="primary" onClick={create_property_setup}>Save</Button>
                <Button href="#/property-setup/list">Cancel</Button>

                
            </div>
            <div className="sticky-bar">
                <Card title="Primary Information">
                    <div className="row">
                        <div className="col-md-4">
                            
                           {/*  <FormControl label="Sample Text">
                                <Input name="firstname" value={propertyCreateForm.firstname}/>
                            </FormControl>
                            <FormControl label="Sample Text">
                                <Input name="lastname" value={propertyCreateForm.lastname}/>
                            </FormControl> */}
                            
                            <FormControl label="Country">
                                <GlobalList onChange={value => handleSelectChange(value, 'country')} value={propertyCreateForm.country} listId="custrecord_rioo_country" name="country" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                           
                            <FormControl label="State">
                                <GlobalList onChange={value => handleSelectChange(value, 'state')} value={propertyCreateForm.state}  listId="custrecord_rioo_state" name="state" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                            <FormControl label="Subsidairy">
                                 <GlobalList onChange={value => handleSelectChange(value, 'subsidiary')} value={propertyCreateForm.subsidiary} listId="custrecord_rioo_subsidiary" name="subsidiary" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                             <FormControl label="Property">
                                 <Input  name="property" value={propertyCreateForm.property}/>
                            </FormControl>
                            <FormControl label="Property Code">
                             <Input name="property_code" value={propertyCreateForm.property_code}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Property Type">
                                 <GlobalList onChange={value => handleSelectChange(value, 'property_type')} value={propertyCreateForm.property_type} listId="custrecord_rioo_property_tpe" name="property_type" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                            <FormControl label="Property Status">
                                <GlobalList onChange={value => handleSelectChange(value, 'property_status')} value={propertyCreateForm.property_status} listId="custrecord_rioo_property_status" name="property_status" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                        </div>
                    </div>
                </Card>
                <Card title="Property Details">
                    <div className="row">
                        <div className="col-md-4">
                            <FormControl label="Property Area">
                                    <Input name="property_area"  type="number" value={propertyCreateForm.property_area}/>
                                </FormControl>
                            <FormControl label="Area UOM">
                                 <GlobalList  onChange={value => handleSelectChange(value, 'area_uom')} value={propertyCreateForm.area_uom} listId="custrecord_rioo_area_uom" name="area_uom" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                            <FormControl label="Rental Insurance">
                                 <GlobalList  onChange={value => handleSelectChange(value, 'rental_insurance')} value={propertyCreateForm.rental_insurance} listId="custrecord_rioo_rental_insurance" name="rental_insurance" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Latitude">
                                 <Input  name="latitude" type="number" value={propertyCreateForm.latitude}/>
                            </FormControl>
                            <FormControl label="Longitude">
                                 <Input  name="longitude" type="number" value={propertyCreateForm.longitude}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="PIN">
                                 <Input  name="pin" value={propertyCreateForm.pin}/>
                            </FormControl>
                            <FormControl label="Background Check">
                             <GlobalList onChange={value => handleSelectChange(value, 'background_check')} listId="custrecord_rioo_back_ground_check" name="background_check" recordType="customrecord_rioo_property_setup" />
                            </FormControl>
                        </div>
                    </div>
                </Card>
                <Card title="Property Address">
                    <div className="row">
                        <div className="col-md-4">
                             <FormControl label="Street Name">
                                <Input name="street_name" value={propertyCreateForm.street_name}/>
                            </FormControl>
                            <FormControl label="City">
                                <Input  name="city" value={propertyCreateForm.city}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Landmark">
                                <Input  name="landmark" value={propertyCreateForm.landmark}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Pincode">
                                <Input  name="pincode" value={propertyCreateForm.pincode}/>
                            </FormControl>
                        </div>
                    </div>
                </Card>
                <Card title="Property Manager Details">
                    <div className="row">
                        <div className="col-md-4">
                           <FormControl label="Property Manager Name">
                                 <GlobalList onChange={value => handleSelectChange(value, 'property_manager_name')} listId="custrecord_rioo_property_manager_name" name="property_manager_name" recordType="customrecord_rioo_property_setup" /> 
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                             <FormControl label="Property Manager Phn No ">
                                <Input  name="property_manager_phone_no" value={propertyCreateForm.property_manager_phone_no}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                             <FormControl label="Property Manager Email">
                                <Input  name="property_manager_email"  type="email" value={propertyCreateForm.property_manager_email}/>
                            </FormControl>
                        </div>
                    </div>
                </Card>
                <Card title="Construction Details">
                    <div className="row">
                        <div className="col-md-4">
                            <FormControl label="Construction Company Name">
                                <Input name="construction_company_name" value={propertyCreateForm.construction_company_name}/>
                            </FormControl>
                            <FormControl label="Roof Type">
                                 <Input name="roof_type" value={propertyCreateForm.roof_type}/>
                            </FormControl>
                            <FormControl label="Year Constructed">
                                 <Input name="year_constructed" value={propertyCreateForm.year_constructed}/>
                             </FormControl>
                             <FormControl label="Disposal year">
                                 <Input name="disposal_year" value={propertyCreateForm.disposal_year}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                             <FormControl label="Acquired or Constructed">
                                 <Input name="acquired" value={propertyCreateForm.acquired}/>
                             </FormControl>
                             <FormControl label="Architectural Style">
                                 <Input name="architectural_style" value={propertyCreateForm.architectural_style}/>
                             </FormControl>
                             <FormControl label="Foundation Type">
                                 <Input name="foundation_type" value={propertyCreateForm.foundation_type}/>
                             </FormControl>
                             <FormControl label="Material Type">
                                 <Input name="material_type" value={propertyCreateForm.material_type}/>
                             </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Acquisition Date">
                                 <DatePicker name="acquisition_date" value={propertyCreateForm.acquisition_date}/>
                            </FormControl>
                            <FormControl label="Renovation/Upgrades">
                                <GlobalList  onChange={value => handleSelectChange(value, 'renovation_upgrades')} listId="custrecord_rioo_renovational" name="renovation_upgrades" recordType="customrecord_rioo_property_setup" /> 
                            </FormControl>
                            <FormControl label="Description">
                                 <Input name="description" value={propertyCreateForm.description}/>
                            </FormControl>
                        </div>
                    </div>
                </Card>
                
            </div>
        </div>
        </Form>
    );
};

export default ScreenBuilderCreateMode;

