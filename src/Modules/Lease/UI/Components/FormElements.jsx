import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { FormRow, Container, isset, $ajax_post, FormControl, CrGridTable, GlobalList} from '@/Library/Library';
import Header from '@/Components/Header';
import { Link } from 'react-router-dom';
import { Button, Select, DatePicker, Input, Row, Col, Layout,InputNumber,
    Cascader,
    Checkbox,
    ColorPicker,
    Form,
    Radio,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    TimePicker,
    Rate,
    
 } from 'antd';


import { Card } from 'antd';

const CheckboxGroup = Checkbox.Group;

const { RangePicker } = DatePicker;
const { TextArea } = Input;


const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];



const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

const FormElements = () => {
    const create_property_setup = function(){

    }
    const subsidiary_list = [];
    const source_from_subsidiary = function(){

    }
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
      const componentDisabled = true;
      const setComponentDisabled = true;

      const tProps = {
        treeData,
        // value,
        // onChange,
        treeCheckable: true,
        showCheckedStrategy: true,
        placeholder: 'Please select',
        style: {
          width: '100%',
        },
      };



    return (
        <div className="container-fluid">
            
            <div className="sticky-bar">
                <Card title="Property Details">
                    <FormRow>
                            <FormControl label="Formal Input Field">
                                <Input />
                            </FormControl>
                            <FormControl label="Formal Email Field">
                                <Input type="email" variant="standard"
                                                    placeholder={"enter your email"}
                                                    required />
                            </FormControl>
                            
                            
                            <FormControl label="Dropdown Field">
                                <GlobalList modelName="fields.sunpartofproperty" />
                            </FormControl>

                            <FormControl label="Form Textarea field">
                                <TextArea
                                    label="Text Area"
                                    placeholder="Enter text"
                                    name="text_area"
                                    size="large"
                                    variant="standard"
                                    type="text"
                                    maxLength={301}
                                    rows="3"
                                    required
                                />
                            </FormControl>

                            <FormControl label="Slider Field" border="F">
                                <Slider defaultValue={30}/>
                            </FormControl>
                            <FormControl label="Number field regular">
                                        <Input
                                                label="Number Feild"
                                                placeholder={"Enter Number"}
                                                name="number"
                                                variant="standard"
                                                type="number"
                                                required
                                            />
                            </FormControl>
                            <FormControl label="Number Field">
                                <InputNumber />
                            </FormControl>
                            <FormControl label="Dropdown Multiselect">
                                <TreeSelect {...tProps} />
                            </FormControl>
                            <FormControl label="Form Date Picker">
                                <DatePicker />
                            </FormControl>
                            <FormControl label="Form Timepicker">
                                <TimePicker />
                            </FormControl>

                            
                        <FormControl label="Select Any" type="radio">
                            <Radio.Group value="1">
                                <Radio value={1}>A</Radio>
                                <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                            </Radio.Group>
                        </FormControl>
                        <FormControl label="Select Any" type="radio">
                            <Radio.Group defaultValue="a">
                                <Radio.Button value="a">Hangzhou</Radio.Button>
                                <Radio.Button value="b">Shanghai</Radio.Button>
                                <Radio.Button value="c">Beijing</Radio.Button>
                                <Radio.Button value="d">Chengdu</Radio.Button>
                            </Radio.Group>
                        </FormControl>
                            <FormControl label="Switch Button" border="F">
                                <Switch/>
                            </FormControl>
                            <FormControl label="Rate Field">
                                <Rate allowHalf defaultValue={2.5} />
                            </FormControl>
                            <FormControl label="Checkbox field" border="F">
                                <CheckboxGroup options={plainOptions}  />
                            </FormControl>
                        <Checkbox
                            checked={componentDisabled}
                            onChange={(e) => setComponentDisabled(e.target.checked)}
                        >
                            Form disabled
                        </Checkbox>
                    </FormRow>
                </Card>



                <Card title="Property Details">
                    <div className="row">
                        <div className="col-md-4">
                            <FormControl label="Formal Input Field">
                                <Input readOnly value="Clalifornia property" />
                            </FormControl>
                            <FormControl label="Formal Email Field">
                                <Input type="email" readOnly variant="standard"
                                                    value="sampleemail@curiousrubik.com"
                                                    required />
                            </FormControl>
                            
                            
                            <FormControl label="Dropdown Field">
                                <GlobalList readOnly listId="custrecord_rioo_property_manager_name" name="property_manager_name" recordType="customrecord_rioo_property_setup" value="1524" readonly />
                            </FormControl>

                            <FormControl label="Form Textarea field">
                                <TextArea
                                    label="Text Area"
                                    placeholder="Enter text"
                                    name="text_area"
                                    size="large"
                                    variant="standard"
                                    type="text"
                                    maxLength={301}
                                    rows="3"
                                    required
                                    readOnly 
                                    value="An icon is a graphical representation of meaning. Icons can be used to express actions, state, and even to categorize data. Ant Design's icons"
                                />
                            </FormControl>

                            <FormControl label="Slider Field" border="F">
                                <Slider  disabled defaultValue={30}/>
                            </FormControl>
                        </div>
                        <div className="col-md-4">
                            <FormControl label="Number field regular">
                                        <Input
                                                label="Number Feild"
                                                placeholder={"Enter Number"}
                                                name="number"
                                                variant="standard"
                                                type="number"
                                                required
                                                readOnly
                                                value="854585"
                                            />
                            </FormControl>
                            <FormControl label="Number Field">
                                <InputNumber readOnly value="542124"/>
                            </FormControl>
                            <FormControl label="Dropdown Multiselect">
                                <TreeSelect disabled {...tProps} />
                            </FormControl>
                            <FormControl label="Form Date Picker">
                                <DatePicker disabled/>
                            </FormControl>
                            <FormControl label="Form Timepicker">
                                <TimePicker disabled/>
                            </FormControl>

                            
                        </div>
                        <div className="col-md-4">
                        <FormControl label="Select Any" type="radio">
                            <Radio.Group readOnly defaultValue={1} disabled>
                                <Radio value={1}>A</Radio>
                                <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                            </Radio.Group>
                        </FormControl>
                        <FormControl label="Select Any" type="radio">
                            <Radio.Group defaultValue="a" disabled>
                                <Radio.Button value="a">Hangzhou</Radio.Button>
                                <Radio.Button value="b">Shanghai</Radio.Button>
                                <Radio.Button value="c">Beijing</Radio.Button>
                            </Radio.Group>
                        </FormControl>
                            <FormControl label="Switch Button" border="F">
                                <Switch disabled value="true"/>
                            </FormControl>
                            <FormControl label="Rate Field">
                                <Rate readOnly allowHalf defaultValue={2.5} disabled />
                            </FormControl>
                            <FormControl label="Checkbox field" border="F">
                                <CheckboxGroup options={plainOptions}  disabled defaultValue="Apple"/>
                            </FormControl>
                        </div>
                        <Checkbox disabled
                            checked={componentDisabled}
                            onChange={(e) => setComponentDisabled(e.target.checked)}
                        >
                            Form disabled
                        </Checkbox>
                    </div>
                </Card>
              
            </div>
        </div>
    );
};

export default FormElements;

