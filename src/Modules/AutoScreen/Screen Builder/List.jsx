import React, { useState } from 'react';
import { Button, Modal, Checkbox, Input, Form, Select, Space } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';

const ScreenBuilderList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [screens, setScreens] = useState([
    { screen: 'Screen 1', modes: ['List', 'View'], permalink: 'screen1', type: 'Application', key: 1 },
    { screen: 'Screen 2', modes: ['Create', 'View'], permalink: 'screen2', type: 'Inquiry', key: 2 },
    { screen: 'Screen 3', modes: ['List', 'Create'], permalink: 'screen3', type: 'Agreements', key: 3 },
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const { modes, permalink, type } = values;
      const newScreen = {
        screen: `Screen ${screens.length + 1}`,
        modes,
        permalink,
        type,
        key: screens.length + 1
      };
      setScreens([...screens, newScreen]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const renderLink = (params, mode) => {
    const { permalink, modes } = params.data;
    return modes.includes(mode) ? <Link to={`/screen-builder/${mode.toLowerCase()}/${permalink}`}>{mode}</Link> : null;
  };

  const columnDefs = [
    { headerName: 'Screen', field: 'screen' },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Permalink', field: 'permalink' },
    { headerName: 'List', field: 'list', cellRenderer: params => renderLink(params, 'List') },
    { headerName: 'View', field: 'view', cellRenderer: params => renderLink(params, 'View') },
    { headerName: 'Create', field: 'create', cellRenderer: params => renderLink(params, 'Create') },
    { headerName: 'Edit', field: 'edit', cellRenderer: params => renderLink(params, 'Edit') }
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>Create a screen</Button>
      <div className="ag-theme-alpine" style={{ height: 400, marginTop: 20 }}>
        <AgGridReact
          rowData={screens}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, sortable: true, filter: true }}
        />
      </div>
      <Modal
        title="Create a Screen"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="modes" label="Available Modes" rules={[{ required: true, message: 'Please select at least one mode' }]}>
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="List">List</Checkbox>
                <Checkbox value="View">View</Checkbox>
                <Checkbox value="Create">Create</Checkbox>
                <Checkbox value="Edit">Edit</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="permalink" label="Permalink" rules={[{ required: true, message: 'Please input the permalink' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select a type' }]}>
            <Select>
              <Select.Option value="Application">Application</Select.Option>
              <Select.Option value="Inquiry">Inquiry</Select.Option>
              <Select.Option value="Agreements">Agreements</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScreenBuilderList;
