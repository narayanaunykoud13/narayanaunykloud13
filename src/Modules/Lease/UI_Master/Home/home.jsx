import React, { useState, useEffect, useMemo, cloneElement } from "react";
import {
  Typography,
  Switch,
  Button,
  Drawer,
  Form,
  Input,
  Table,
  Row,
  Col,
  Tabs,
} from "antd";
import { PlusCircleOutlined, SettingOutlined, FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  FormRow,
  Container,
  $ajax_post,
  FormControl,
} from "../../../../Library/Library";
import AddEditSubScreen from "./AddEditSubScreen";


const { Title } = Typography;

const Home = () => {
  const subScreenFormInitialValue = {
    screenName: "",
    subScreenType: "",
    screenMode: "",
    permalink: ""
  }
  // --------------states start------------------
  const [addEditSubScreenLoader, setAddEditSubScreenLoader] = useState(false);
  const [screens, setScreens] = useState([]);
  const [isCreateDrawerVisible, setCreateDrawerVisible] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [showScreenVisible, setShowScreenVisible] = useState(false);
  const [addSubScreenVisible, setAddSubScreenVisible] = useState(false);
  const [isConfigureDrawerVisible, setConfigureDrawerVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(null);
  const [dataSources, setDataSources] = useState([]);
  const [isDataSourceDrawerVisible, setDataSourceDrawerVisible] = useState(false);
  const [subScreenForm, setSubScreenForm] = useState(subScreenFormInitialValue);
  const [createScreenForm, setCreateScreenForm] = useState({});
  const [searchList, setSearchList] = useState("");
  // --------------states end------------------

  // --------------api calls start------------------
  const getScreenList = async () => {
    try {
      await $ajax_post("post", "g/sb/1000", {}, function (records) {
        const newList = records.map((item, index) => {
          item.key = `${index}`;
          return item;
        });
        setScreens(newList);
      });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const handleCreateScreen = async () => {
    const values = createScreenForm;

    try {
      const newScreen = {
        key: screens.length,
        screenName: values.screenName,
        screenDataSource: values.screenDataSource,
        permalink: values.permalink,
        createdOn: values.createdOn,
        createdBy: values.createdBy,
        lastModifiedOn: values.lastModifiedOn,
        lastModifiedBy: values.lastModifiedBy,
      };

      await $ajax_post("post", "g/sb/1001", newScreen, function () {
        getScreenList();
      });
      setCreateScreenForm({});
    } catch (error) {
      console.error("There was an error!", error);
    }
    // setScreens([...screens, newScreen]);
    setCreateDrawerVisible(false);
  };

  const handleCreateSubScreen = async (id) => {
    try {
      setAddEditSubScreenLoader(true);
      const { screenName, subScreenType, screenMode } = subScreenForm;
      const bodyData = {
        screenName,
        subScreenType,
        screenMode,
        parentScreen: id
      }
      if (subScreenForm.subScreenType === 'screen') {
        bodyData.permalink = subScreenForm.permalink;
      }
      await $ajax_post("post", "g/sb/subscreen/create", bodyData, function () {
        getScreenList();
        setAddSubScreenVisible(false);
      });
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setAddEditSubScreenLoader(false);
    }
  }

  // --------------api calls end------------------


  // --------------use effects and memo start------------------
  useEffect(() => {
    getScreenList();
  }, []);

  const filteredFields = useMemo(() => {
    if (searchList) {
      const filteredData = screens.filter((screen) => {
        const isScreenNameMatch = screen.screenName
          .toLowerCase()
          .includes(searchList.toLowerCase());
          
        const isSubScreenMatch = screen?.subscreens?.some((subScreen) => {
          return subScreen?.i?.screenName?.toLowerCase().includes(searchList.toLowerCase());
        }
        );
        return isScreenNameMatch || isSubScreenMatch;
      });
  
      return filteredData;
    } else {
      return screens;
    }
  }, [searchList, screens]);
  // --------------use effects and memo end------------------


  // --------------handlers start------------------
  const handleConfigureScreen = (screen) => {
    const defaultDataSource = {
      key: 0,
      dataSourceName: screen.screenDataSource,
      dataSourceRecordType: screen.screenName,
      linkField: "",
    };
    setDataSources([defaultDataSource]);
    setConfigureDrawerVisible(true);
  };

  const handleAddDataSource = (values) => {
    const newDataSource = {
      key: dataSources.length,
      dataSourceName: values.dataSourceName,
      dataSourceRecordType: values.dataSourceRecordType,
      linkField: values.linkField,
    };
    setDataSources([...dataSources, newDataSource]);
    setDataSourceDrawerVisible(false);
  };
  // --------------handlers end------------------

  const subScreenCollopsColumns = [
    {
      title: "S.No.",
      dataIndex: "s.no",
      key: "s.no",
      render: (text, record, index) => {
        return < div >
          {index + 1}
        </div >
      },
    },
    {
      title: "Screen name",
      dataIndex: "screenName",
      key: "screenName",
      render: (text, item) => {
        return < div >
          <Link onClick={() => {
            setSubScreenForm(item);
            setAddSubScreenVisible(true)
          }}>{item.screenName}</Link>
        </div >
      },
    },
    {
      title: "Screen Type",
      dataIndex: "subScreenType",
      key: "subScreenTypemode",
    },
    {
      title: "Mode",
      dataIndex: "screenMode",
      key: "screenMode",
    },
    {
      title: "created On",
      dataIndex: "createddate",
      key: "createddate",
    },
    {
      title: "Last Modified on",
      dataIndex: "lastmodifieddate",
      key: "lastmodifieddate",
    },
  ];

  const subScreenColumns = [
    {
      title: "S.No.",
      dataIndex: "s.no",
      key: "s.no",
      render: (text, record, index) => {
        return < div >
          {index + 1}
        </div >
      },
    },
    {
      title: "Screen name",
      key: "screenName",
      render: (text, item) => {
        return < div >
          <Link onClick={() => {
            const data = {
              screenName: item?.i?.screenName,
              subScreenType: item?.i?.subScreenType,
              screenMode: item?.i?.screenMode,
              permalink: item?.i?.permalink,
            }
            setSubScreenForm(data);
            setAddSubScreenVisible(true)
          }}>{item?.i?.screenName}</Link>
        </div >
      },
    },
    {
      title: "Screen Type",
      key: "subScreenType",
      render: (text, item) => {
        return < div >
          <Link onClick={() => {
            setSubScreenForm(item);
            setAddSubScreenVisible(true)
          }}>{item?.i?.subScreenType}</Link>
        </div >
      },
    },
    {
      title: "Mode",
      dataIndex: "screenMode",
      key: "screenMode",
      
      render: (text, item) => {
        return < div >
          <Link onClick={() => {
            setSubScreenForm(item);
            setAddSubScreenVisible(true)
          }}>{item?.i?.subScreenType}</Link>
        </div >
      },
    },
    {
      title: "created On",
      dataIndex: "createddate",
      key: "createddate",
    },
    {
      title: "Last Modified on",
      dataIndex: "lastmodifieddate",
      key: "lastmodifieddate",
    },
  ];

  const expandedRowRender = (_, dataIndex) => {
    const data = [];
    screens[dataIndex].subscreens.map((item, index) => {
      data.push({
        key: index.toString(),
        screenName: item?.i?.screenName,
        subScreenType: item?.i?.subScreenType,
        screenMode: item?.i?.screenMode,
        createddate: item?.createddate,
        lastmodifieddate: item?.lastmodifieddate,
        permalink: item?.i?.permalink,
      });
    })
    setCurrentScreen(screens[dataIndex]);
    return <Table columns={subScreenCollopsColumns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "s.no",
      key: "s.no",
      render: (text, record, index) => {
        return < div >
          {index + 1}
        </div >
      },
    },
    {
      title: "Screen Name",
      dataIndex: "screenName",
      key: "screenName",
      render: (text, record) => {
        return < div >
          <Link onClick={() => {
            setCurrentScreen(record);
            setShowScreenVisible(true)
          }}>{record.screenName}</Link>
        </div >
      },
    },
    {
      title: "Data Source",
      dataIndex: "screenDataSource",
      key: "screenDataSource",
    },
    {
      title: "Permalink",
      dataIndex: "permalink",
      key: "permalink",
    },
    {
      title: "List",
      key: "list",
      render: (text, record) => (
        <div>
          <Link to={`/ui-master/list/${record.id}`}>List</Link>
        </div>
      ),
    },
    {
      title: "View",
      key: "view",
      render: (text, record) => (
        <div>
          <Link to={`/ui-master/view/${record.id}`}>View</Link>
        </div>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => (
        <div>
          <Link to={`/ui-master/edit/${record.id}`}>Edit</Link>
        </div>
      ),
    },
    {
      title: "Create",
      key: "Create",

      render: (text, record) => (
        <div>
          <Link to={`/ui-master/create/${record.id}`}>Create</Link>
        </div>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdonText",
      key: "createdonText",
    },
    {
      title: "Created By",
      dataIndex: "createdby",
      key: "createdby",
    },
    {
      title: "Last Modified on",
      dataIndex: "lastmodifiedonText",
      key: "lastmodifiedonText",
    },
    {
      title: "Last Modified By",
      dataIndex: "lastmodifiedby",
      key: "lastmodifiedby",
    },
  ];

  const dataSourceColumns = [
    {
      title: "Data Source Name",
      dataIndex: "dataSourceName",
      key: "dataSourceName",
    },
    {
      title: "Data Source Record Type",
      dataIndex: "dataSourceRecordType",
      key: "dataSourceRecordType",
    },
    {
      title: "Link Field",
      dataIndex: "linkField",
      key: "linkField",
    },
    {
      title: "Configure",
      key: "configure",
      render: (text, record) => (
        <Button
          icon={<SettingOutlined />}
          className="btn"
          onClick={() => setDataSourceDrawerVisible(true)}
        />
      ),
    },
  ];
  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <Input
              name="field"
              className="form-control"
              placeholder="Search Fields . . ."
              onChange={(e) =>
                setSearchList(e?.target?.value)
              }
            />
          </Col>
          <Button
            size='middle'
            className="ms-3"
            type="button"
            style={{ border: '1px solid black' }}
            onClick={() => setFilterDrawer(true)}
          >
            { }
            <FilterOutlined />
          </Button>
        </Row>
        <Table
          dataSource={filteredFields} columns={columns}
          expandable={{
            expandedRowRender,
          }}
        />
        {/* create screen drawer start */}
        <Drawer
          title="Create Screen"
          width={720}
          onClose={() => setCreateDrawerVisible(false)}
          visible={isCreateDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                className="btn"
                onClick={() => setCreateDrawerVisible(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                form="createScreenForm"
                className="btn btn-primary"
                onClick={handleCreateScreen}
              >
                Save
              </Button>
            </div>
          }
        >
          <Form
            layout="vertical"
            id="createSubScreenForm"
            onChange={(event) => {
              const { name, value } = event.target;
              setCreateScreenForm((prevViewCreateForm) => ({
                ...prevViewCreateForm,
                [name]: value,
              }));
            }}
          >
            <FormControl label="Screen Name">
              <Input
                name="screenName"
                placeholder="Enter screen name"
                className="form-control"
              />
            </FormControl>
            <FormControl label="Screen Data Source">
              <Input
                name="screenDataSource"
                placeholder="Enter screen data source"
                className="form-control"
              />
            </FormControl>
            <FormControl label="Permalink">
              <Input
                name="permalink"
                placeholder="Enter permalink"
                className="form-control"
              />
            </FormControl>
            <FormControl label="Created On">
              <Input
                name="createdOn"
                placeholder="Enter created on"
                className="form-control"
              />
            </FormControl>
            <FormControl label="Created By">
              <Input
                name="createdBy"
                placeholder="Enter created by"
                className="form-control"
              />
            </FormControl>
            <FormControl label="Last Modified On">
              <Input
                name="lastModifiedOn"
                placeholder="Enter last modified on"
                className="form-control"
              />
            </FormControl>
            <FormControl label="Last modified By">
              <Input
                name="lastModifiedBy"
                placeholder="Enter last modified by"
                className="form-control"
              />
            </FormControl>

          </Form>
        </Drawer>
        {/* create screen drawer end */}

        {/* show screen details drawer start */}
        <Drawer
          title={currentScreen?.screenName}
          width={720}
          onClose={() => setShowScreenVisible(false)}
          visible={showScreenVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <div >
                <Button
                  type="primary"
                  htmlType="submit"
                  form="createScreenForm"
                  className="btn btn-primary"
                  onClick={() => {
                    setSubScreenForm(subScreenFormInitialValue)
                    setAddSubScreenVisible(true)
                  }}
                >
                  Add Sub Screen
                </Button>
              </div>
              <div >
                <Button
                  className="btn"
                  onClick={() => setShowScreenVisible(false)}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          }
        >
          {currentScreen && <>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <table>
                {Object.keys(currentScreen).map(key =>
                  (key !== 'subscreens' && key !== 'key') && (
                    <tr key={key}>
                      <td style={{ fontWeight: 'bold' }}>{key}</td>
                      <td>{currentScreen[key]}</td>
                    </tr>
                  )
                )}
              </table>
            </div>
            <hr style={{ borderColor: 'rgba(240,240,240,0.2)', borderWidth: '0.1px' }} />
            <div className="commonTabs tabFull">
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: "1",
                    label: "Sub Screens",
                    children: (
                      <Table className="modalTable" dataSource={currentScreen.subscreens} columns={subScreenColumns} pagination={false} />
                    ),
                  },
                ]}
                style={{ width: "100%" }}
              />
            </div>
          </>}

        </Drawer>
        {/* show screen details drawer end */}

        {/* sub screen drawer start */}
        <AddEditSubScreen
          currentScreen={currentScreen}
          setAddSubScreenVisible={setAddSubScreenVisible}
          addSubScreenVisible={addSubScreenVisible}
          handleCreateSubScreen={handleCreateSubScreen}
          setSubScreenForm={setSubScreenForm}
          subScreenForm={subScreenForm}
          addEditSubScreenLoader={addEditSubScreenLoader}
        />
        {/* sub screen drawer end */}

        {/* filter drawer start */}
        <Drawer
          title="Filter"
          width={720}
          onClose={() => {
            setFilterDrawer(false);
          }}
          open={filterDrawer}
          styles={{
            body: {
              paddingBottom: 50,
            },
          }}
        >
          <div className="commonTabs">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Tab 1",
                },
                {
                  key: "2",
                  label: "Tab 2",
                },
              ]}
              style={{ width: "100%" }}
            />
          </div>
        </Drawer>
        {/* filter drawer end */}


        {/* configure screen drawer start */}
        <Drawer
          title="Configure Screen"
          placement="left"
          width={720}
          onClose={() => setConfigureDrawerVisible(false)}
          visible={isConfigureDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                className="btn"
                onClick={() => setConfigureDrawerVisible(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
            </div>
          }
        >
          <Table dataSource={dataSources} columns={dataSourceColumns} />
          <Button
            type="primary"
            className="btn"
            onClick={() => setDataSourceDrawerVisible(true)}
          >
            Add Data Source
          </Button>
        </Drawer>
        {/* configure screen drawer end */}
        {/* add data source drawer start */}
        <Drawer
          title="Add Data Source"
          width={720}
          onClose={() => setDataSourceDrawerVisible(false)}
          visible={isDataSourceDrawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button
                className="btn"
                onClick={() => setDataSourceDrawerVisible(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                form="addDataSourceForm"
                className="btn btn-primary"
              >
                Save
              </Button>
            </div>
          }
        >
          <Form
            layout="vertical"
            id="addDataSourceForm"
            onFinish={handleAddDataSource}
          >
            <FormRow>
              <FormControl label="Data Source Name">
                <Form.Item
                  name="dataSourceName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the data source name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </FormControl>
              <FormControl label="Data Source Record Type">
                <Form.Item
                  name="dataSourceRecordType"
                  rules={[
                    {
                      required: true,
                      message: "Please input the data source record type!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </FormControl>
              <FormControl label="Link Field">
                <Form.Item
                  name="linkField"
                  rules={[
                    { required: true, message: "Please input the link field!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </FormControl>
            </FormRow>
          </Form>

          <Form layout="horizontal">
            <Title level={4}>Fields</Title>

            {[
              "Last Modified On",
              "Due Date",
              "Screens",
              "Release Plans",
              "Functional Status",
              "Dev Status",
              "QA Status",
              "Task Status",
              "Assigned To",
              "BA Status",
              "Functional Responsibility",
              "BA Responsibility",
              "Dev Responsibility",
              "Task Type",
              "QA Responsibility",
            ].map((label, index) => (
              <Form.Item key={index}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <span>{label}</span>
                  </Col>
                  <Col>
                    <Switch size="small" />
                  </Col>
                </Row>
              </Form.Item>
            ))}
          </Form>
        </Drawer>
        {/* add data source drawer end */}
      </Container >
      <div
        style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}
        onClick={() => setCreateDrawerVisible(true)}>
        <PlusCircleOutlined style={{ fontSize: '40px' }} />
      </div>

    </>
  );
};

export default Home;
