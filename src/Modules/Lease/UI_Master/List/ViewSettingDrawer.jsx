import { Button, Drawer, Flex, Input, Select, Spin, Switch, Tabs } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import DnDSortableList from "../../../../Components/DnDSortableList";
import { $ajax_post } from "../../../../Library/Library";
import {
  hideShowAvailableField,
  saveAvailableFields,
  addAvailableFields,
  saveViewRecords,
  selectViewConfig,
  saveDataSources,
} from "../../../../utils/redux/ViewConfigSlice/index.slice";

const { Option } = Select;

export default function ViewSettingDrawer({
  recordsList,
  setShowViewSettings,
  showViewSettings,
  currentView,
  onSaveAppliedFields,
  fetchRecordsList,
  role = "super-admin",
}) {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedExtraField, setSelectedExtraField] = useState(null);
  const [firstSecondaryRecords, setFirstSecondaryRecords] = useState([]);
  const [secondSecondaryRecords, setSecondSecondaryRecords] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTextForExtraFields, setSearchTextForExtraFields] = useState("");
  const [activeTabKey, setActiveTabKey] = useState("2");
  const [fields, setFields] = useState([]);
  const [extraFields, setExtraFields] = useState([]);
  const { screenid } = useParams();
  const [fetchingScreens, setFetchingScreens] = useState(false);
  const [fetchingExtraScreens, setFetchingExtraScreens] = useState(false);
  const [openAddMoreFieldsDrawer, setOpenAddMoreFieldsDrawer] = useState(false);
  const [extraRecordsOptions, setExtraRecordsOptions] = useState([]);
  const [addingFields, setAddingFields] = useState(false);
  const [addingExtraFields, setAddingExtraFields] = useState(false);
  const [savingConfiguration, setSavingConfiguration] = useState(false);

  const dispatch = useDispatch();
  const viewConfig = useSelector(selectViewConfig);
  const {
    json: { records, availableFields, dataSources },
  } = viewConfig;

  const hideShowFields = (value, field) => {
    dispatch(hideShowAvailableField(field?.internalid));
  };

  const fetchSecondaryRecords = async (id, recordType) => {
    try {
      $ajax_post(
        "post",
        "g/sb/1005",
        {
          id,
        },
        (res) => {
          if (recordType === "first") {
            setFirstSecondaryRecords(res);
          } else if (recordType === "second") {
            setSecondSecondaryRecords(res);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExtraSecondaryRecords = async (id) => {
    setFetchingExtraScreens(true);
    try {
      $ajax_post(
        "post",
        "g/sb/1013",
        {
          id,
        },
        (res) => {
          setExtraFields(res);
          setFetchingExtraScreens(false);
        }
      );
    } catch (error) {
      console.log(error);
      setFetchingExtraScreens(false);
    }
  };

  const fetchScreens = async (id) => {
    setFetchingScreens(true);
    try {
      $ajax_post(
        "post",
        "g/sb/1004",
        {
          id,
        },
        (res) => {
          let joinKey = res?.find(
            (field) => field?.field_source_type === records?.primary?.internalid
          );
          setFields(
            res?.map((field) => {
              // field = {...field, join:}
              if (joinKey && field?.scriptid !== joinKey?.scriptid) {
                field = { ...field, join: joinKey?.scriptid };
              }
              if (
                availableFields?.some(
                  (availableField) =>
                    availableField?.internalid === field?.internalid
                )
              ) {
                return { ...field, selected: true };
              }
              return field;
            })
          );
          setFetchingScreens(false);
        }
      );
    } catch (error) {
      console.log(error);
      setFetchingScreens(false);
    }
  };

  const fetchExtraRecords = async (id) => {
    setFetchingScreens(true);
    try {
      $ajax_post(
        "post",
        "g/sb/1011",
        {
          id,
        },
        (res) => {
          let joinKey = res?.find(
            (field) => field?.field_source_type === records?.primary?.internalid
          );
          let extraRecords = res?.map((field) => {
            // field = {...field, join:}
            if (joinKey && field?.scriptid !== joinKey?.scriptid) {
              field = { ...field, join: joinKey?.scriptid };
            }
            if (
              availableFields?.some(
                (availableField) =>
                  availableField?.internalid === field?.internalid
              )
            ) {
              return { ...field, selected: true };
            }
            return field;
          });
          setExtraRecordsOptions(extraRecords);
          setFetchingScreens(false);
        }
      );
    } catch (error) {
      console.log(error);
      setFetchingScreens(false);
    }
  };

  const saveConfiguration = async () => {
    try {
      setSavingConfiguration(true);
      $ajax_post(
        "post",
        "g/sb/1006",
        {
          ...viewConfig,
          name: currentView?.name,
          filename: currentView?.filename,
          screenid,
        },
        () => {
          setSavingConfiguration(false);
          onSaveAppliedFields();
        }
      );
    } catch (error) {
      setSavingConfiguration(false);
      console.log(error);
    }
  };

  const showExtraFieldsDrawer = (field) => {
    fetchExtraRecords(field?.field_source_type);
    setSelectedExtraField(field);
    setOpenAddMoreFieldsDrawer(true);
  };
  const onClose = () => {
    setOpenAddMoreFieldsDrawer(false);
  };

  const addFieldsToAvailable = (extra) => {
    if (extra) setAddingExtraFields(true);
    else setAddingFields(true);
    dispatch(addAvailableFields(selectedFields));
    setSelectedFields([]);
    setTimeout(() => {
      if (extra) setAddingExtraFields(false);
      else {
        setAddingFields(false);
        setActiveTabKey("2");
      }
    }, 500);
  };

  const filteredFields = useMemo(() => {
    if (searchText) {
      return fields
        ?.filter((field) => {
          return field?.name
            ?.toLowerCase()
            ?.includes(searchText?.toLowerCase());
        })
        .sort((a, b) =>
          a?.name
            ?.trim()
            .toLowerCase()
            ?.localeCompare(b?.name?.trim().toLowerCase())
        );
    }
    return fields.sort((a, b) =>
      a?.name
        ?.trim()
        .toLowerCase()
        ?.localeCompare(b?.name?.trim().toLowerCase())
    );
  }, [searchText, fields]);

  const filteredExtraFields = useMemo(() => {
    if (searchTextForExtraFields) {
      return extraFields
        ?.filter((field) => {
          return field?.name
            ?.toLowerCase()
            ?.includes(searchTextForExtraFields?.toLowerCase());
        })
        .sort((a, b) =>
          a?.name
            ?.trim()
            .toLowerCase()
            ?.localeCompare(b?.name?.trim().toLowerCase())
        );
    }
    return extraFields.sort((a, b) =>
      a?.name
        ?.trim()
        .toLowerCase()
        ?.localeCompare(b?.name?.trim().toLowerCase())
    );
  }, [searchTextForExtraFields, extraFields]);

  useEffect(() => {
    if (availableFields && availableFields?.length > 0) {
      const groupedByRecordType = availableFields.reduce((acc, record) => {
        const { recordtype } = record;
        if (!acc[recordtype]) {
          acc[recordtype] = [];
        }
        acc[recordtype].push(record);
        return acc;
      }, {});

      const result = Object.entries(groupedByRecordType).map(
        ([recordtype, sourceFields]) => ({
          recordtype: parseInt(recordtype, 10),
          count: sourceFields.length,
        })
      );

      dispatch(saveDataSources(result));
    }
  }, [availableFields]);

  useEffect(() => {
    if (records?.primary && firstSecondaryRecords?.length <= 0) {
      fetchRecordsList();
      fetchSecondaryRecords(records?.primary?.internalid, "first");
    }
    if (records?.firstSecondary && secondSecondaryRecords?.length <= 0) {
      fetchSecondaryRecords(records?.secondSecondary?.internalid, "second");
    }

    if (records?.secondSecondary) {
      fetchScreens(records?.secondSecondary?.internalid);
    } else if (records?.firstSecondary) {
      fetchScreens(records?.firstSecondary?.internalid);
    } else if (records?.primary) {
      fetchScreens(records?.primary?.internalid, true);
    }
  }, [records]);
  return (
    <>
      <Drawer
        title={`Records and Fields : ${currentView?.name} (${currentView?.viewType})`}
        width={720}
        onClose={() => setShowViewSettings(false)}
        open={showViewSettings}
        footer={
          activeTabKey === "1" ? (
            <Flex style={{ padding: "10px 0" }} justify="end">
              <Button
                className="btn btn-primary"
                onClick={() => addFieldsToAvailable(false)}
                icon={addingFields ? <Spin size="small" /> : ""}
              >
                Add
              </Button>
            </Flex>
          ) : activeTabKey === "2" ? (
            <Flex style={{ padding: "10px 0" }} justify="end">
              <Button
                icon={savingConfiguration ? <Spin size="small" /> : ""}
                className="btn btn-primary"
                onClick={saveConfiguration}
              >
                Save
              </Button>
            </Flex>
          ) : (
            <></>
          )
        }
        styles={{
          body: {
            paddingBottom: 50,
          },
        }}
      >
        <div className="commonTabs tabFull">
          <Tabs
            onChange={(key) => {
              setActiveTabKey(key);
            }}
            activeKey={activeTabKey}
            items={[
              {
                key: "2",
                label: "Available Fields",
                children: (
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div className="fieldWithBg">
                      <span className="fs-14">
                        Visible Fields (
                        {
                          availableFields?.filter((field) => !field?.hidden)
                            ?.length
                        }
                        )
                      </span>
                      <DnDSortableList
                        items={
                          !availableFields
                            ? []
                            : availableFields?.filter((field) => !field?.hidden)
                        }
                        itemsRenderer={(listItem) => {
                          let recordName = recordsList?.find(
                            (record) =>
                              record?.internalid === listItem?.recordtype
                          )?.name;
                          return (
                            <Flex
                              className="draggableList_item_content"
                              justify="space-between"
                            >
                              <div className="draggableList_title">
                                {listItem?.name} | FT: {listItem?.field_source}{" "}
                                | RT: {recordName}
                              </div>
                              <Flex justify="end" align="center" gap={5}>
                                {listItem?.field_source === "List/Record" && (
                                  <div
                                    onClick={() =>
                                      showExtraFieldsDrawer(listItem)
                                    }
                                  >
                                    <PlusCircleOutlined className="mb-0" />{" "}
                                  </div>
                                )}
                                <Switch
                                  size="small"
                                  value={!listItem?.hidden}
                                  onChange={(value) =>
                                    hideShowFields(value, listItem)
                                  }
                                />
                              </Flex>
                            </Flex>
                          );
                        }}
                        onDragEnd={({ active, over }) => {
                          // setAvailableFields((prevViews) => {

                          //   return updatedViews;
                          // });
                          const newIndex = availableFields?.findIndex(
                            (view) => view?.internalid === active?.id
                          );
                          const oldIndex = availableFields?.findIndex(
                            (view) => view?.internalid === over?.id
                          );
                          let updatedFields = arrayMove(
                            availableFields,
                            newIndex,
                            oldIndex
                          );
                          dispatch(saveAvailableFields(updatedFields));
                        }}
                        indexKey="internalid"
                      />
                    </div>
                    <div className="fieldWithBg">
                      <span className="fs-14">
                        Hidden Fields (
                        {
                          availableFields?.filter((field) => field?.hidden)
                            ?.length
                        }
                        )
                      </span>
                      <DnDSortableList
                        items={
                          !availableFields
                            ? []
                            : availableFields?.filter((field) => field?.hidden)
                        }
                        itemsRenderer={(listItem) => {
                          let recordName = recordsList?.find(
                            (record) =>
                              record?.internalid === listItem?.recordtype
                          )?.name;
                          return (
                            <Flex
                              className="draggableList_item_content"
                              justify="space-between"
                            >
                              <div className="draggableList_title">
                                {listItem?.name} | FT: {listItem?.field_source}{" "}
                                | RT: {recordName}
                              </div>
                              <Flex justify="end" align="center" gap={5}>
                                {listItem?.field_source === "List/Record" && (
                                  <div
                                    onClick={() =>
                                      showExtraFieldsDrawer(listItem)
                                    }
                                  >
                                    <PlusCircleOutlined className="mb-0" />{" "}
                                  </div>
                                )}
                                <Switch
                                  size="small"
                                  value={!listItem?.hidden}
                                  onChange={(value) =>
                                    hideShowFields(value, listItem)
                                  }
                                />
                              </Flex>
                            </Flex>
                          );
                        }}
                        // onDragEnd={({ active, over }) => {
                        //   setViews((prevViews) => {
                        //     const newIndex = prevViews?.findIndex(
                        //       (view) => view?.name === active?.id
                        //     );
                        //     const oldIndex = prevViews?.findIndex(
                        //       (view) => view?.name === over?.id
                        //     );
                        //     let updatedViews = arrayMove(
                        //       prevViews,
                        //       newIndex,
                        //       oldIndex
                        //     );
                        //     return updatedViews;
                        //   });
                        // }}
                        indexKey="id"
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: "1",
                label: "Select Records and Fields",
                children: (
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div>
                      <div className="control-group labelleft mw-100 mt-0">
                        <label className="control-label">Primary Record</label>
                        <div className="controls">
                          <Select
                            name="field"
                            className="form-control"
                            placeholder="Select Record"
                            readOnly={
                              role !== "super-admin" && role !== "power-user"
                            }
                            disabled={
                              role !== "super-admin" && role !== "power-user"
                            }
                            defaultValue={records?.primary?.internalid}
                            onChange={(value) => {
                              let thisRecord = recordsList?.find(
                                (record) => record?.internalid === value
                              );
                              fetchScreens(thisRecord?.internalid);
                              fetchSecondaryRecords(
                                thisRecord?.internalid,
                                "first"
                              );
                              setSelectedRecord(thisRecord);
                              dispatch(
                                saveViewRecords({
                                  primary: thisRecord,
                                })
                              );
                            }}
                            showSearch
                            optionFilterProp="children"
                          >
                            {recordsList
                              ?.sort((a, b) =>
                                a?.name
                                  ?.trim()
                                  .toLowerCase()
                                  ?.localeCompare(b?.name?.trim().toLowerCase())
                              )
                              ?.map?.((record) => (
                                <Option
                                  key={record?.internalid}
                                  value={record?.internalid}
                                >
                                  {record?.name}
                                </Option>
                              ))}
                          </Select>
                        </div>
                      </div>
                      <div className="control-group labelleft mw-100">
                        <label className="control-label">
                          First Secondary Record
                        </label>
                        <div className="controls">
                          <Select
                            name="field"
                            className="form-control"
                            placeholder="Select Record"
                            readOnly={
                              role !== "super-admin" && role !== "power-user"
                            }
                            disabled={
                              role !== "super-admin" && role !== "power-user"
                            }
                            defaultValue={records?.firstSecondary?.internalid}
                            onChange={(value) => {
                              let thisRecord = recordsList?.find(
                                (record) => record?.internalid === value
                              );
                              fetchScreens(thisRecord?.internalid);
                              fetchSecondaryRecords(
                                thisRecord?.internalid,
                                "second"
                              );
                              setSelectedRecord(thisRecord);
                              dispatch(
                                saveViewRecords({
                                  firstSecondary: thisRecord,
                                })
                              );
                            }}
                            showSearch
                            optionFilterProp="children"
                          >
                            {firstSecondaryRecords
                              .sort((a, b) =>
                                a?.name
                                  ?.trim()
                                  .toLowerCase()
                                  ?.localeCompare(b?.name?.trim().toLowerCase())
                              )
                              ?.map?.((record) => (
                                <Option
                                  key={record?.internalid}
                                  value={record?.internalid}
                                >
                                  {record?.name}
                                </Option>
                              ))}
                          </Select>
                        </div>
                      </div>
                      <div className="control-group labelleft mw-100">
                        <label className="control-label">
                          Second Secondary Record
                        </label>
                        <div className="controls">
                          <Select
                            name="field"
                            className="form-control"
                            placeholder="Select Record"
                            readOnly={
                              role !== "super-admin" && role !== "power-user"
                            }
                            disabled={
                              role !== "super-admin" && role !== "power-user"
                            }
                            defaultValue={records?.secondSecondary?.internalid}
                            onChange={(value) => {
                              let thisRecord = recordsList?.find(
                                (record) => record?.internalid === value
                              );
                              fetchScreens(thisRecord?.internalid);
                              setSelectedRecord(thisRecord);
                              dispatch(
                                saveViewRecords({
                                  secondSecondary: thisRecord,
                                })
                              );
                            }}
                            showSearch
                            optionFilterProp="children"
                          >
                            {secondSecondaryRecords
                              .sort((a, b) =>
                                a?.name
                                  ?.trim()
                                  .toLowerCase()
                                  ?.localeCompare(b?.name?.trim().toLowerCase())
                              )
                              ?.map?.((record) => (
                                <Option
                                  key={record?.internalid}
                                  value={record?.internalid}
                                >
                                  {record?.name}
                                </Option>
                              ))}
                          </Select>
                        </div>
                      </div>
                      <div>
                        <hr className="my-4" />
                        <Flex justify="space-between" align="center">
                          <span className="fs-14">Fields</span>
                          <div className="control-group mb-0 mt-0">
                            <div className="controls">
                              <Input
                                name="field"
                                className="form-control"
                                placeholder="Search Fields . . ."
                                onChange={(e) =>
                                  setSearchText(e?.target?.value)
                                }
                              />
                            </div>
                          </div>
                        </Flex>
                        {fetchingScreens ? (
                          <div className="noFields">
                            <Spin />
                          </div>
                        ) : fields && fields?.length > 0 ? (
                          <DnDSortableList
                            items={filteredFields}
                            itemsRenderer={(listItem) => (
                              <Flex
                                className="draggableList_item_content"
                                justify="space-between"
                              >
                                <div className="draggableList_title">
                                  {listItem?.name} | {listItem?.field_source}
                                </div>
                                <Flex justify="end" align="center" gap={5}>
                                  <Switch
                                    size="small"
                                    defaultChecked={listItem?.selected}
                                    onChange={(value) => {
                                      if (value) {
                                        setSelectedFields((prev) => {
                                          return [...prev, listItem];
                                        });
                                      } else {
                                        setSelectedFields((prev) => {
                                          return prev?.filter(
                                            (item) =>
                                              item?.internalid !==
                                              listItem?.internalid
                                          );
                                        });
                                      }
                                    }}
                                  />
                                </Flex>
                              </Flex>
                            )}
                            // onDragEnd={({ active, over }) => {
                            //   setViews((prevViews) => {
                            //     const newIndex = prevViews?.findIndex(
                            //       (view) => view?.name === active?.id
                            //     );
                            //     const oldIndex = prevViews?.findIndex(
                            //       (view) => view?.name === over?.id
                            //     );
                            //     let updatedViews = arrayMove(
                            //       prevViews,
                            //       newIndex,
                            //       oldIndex
                            //     );
                            //     return updatedViews;
                            //   });
                            // }}
                            indexKey="internalid"
                          />
                        ) : (
                          <div className="noFields">No Fields Found</div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "3",
                label: "Data Sources",
                children: (
                  <ul>
                    {dataSources?.map((dataSource) => (
                      <li key={dataSource?.id}>
                        {
                          recordsList?.find(
                            (record) =>
                              record?.internalid === dataSource?.recordtype
                          )?.name
                        }{" "}
                        : {dataSource?.count}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
            style={{ width: "100%" }}
          />
        </div>
      </Drawer>

      <Drawer
        placement="left"
        width={720}
        title={selectedExtraField?.name}
        onClose={onClose}
        open={openAddMoreFieldsDrawer}
        footer={
          <Flex style={{ padding: "10px 0" }} justify="end">
            <Button
              className="btn btn-primary"
              onClick={() => addFieldsToAvailable(true)}
              icon={addingExtraFields ? <Spin size="small" /> : ""}
            >
              Add
            </Button>
          </Flex>
        }
      >
        <div className="control-group labelleft mw-100 mt-0">
          <label className="control-label">Related Records</label>
          <div className="controls">
            <Select
              name="field"
              className="form-control"
              placeholder="Select Record"
              onChange={(value) => {
                let thisRecord = extraRecordsOptions?.find(
                  (record) => record?.internalid === value
                );
                fetchExtraSecondaryRecords(thisRecord?.internalid);
              }}
              showSearch
              optionFilterProp="children"
            >
              {extraRecordsOptions
                .sort((a, b) =>
                  a?.name
                    ?.trim()
                    .toLowerCase()
                    ?.localeCompare(b?.name?.trim().toLowerCase())
                )
                ?.map((record) => (
                  <Option key={record?.internalid} value={record?.internalid}>
                    {record?.name}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        <div>
          <hr className="my-4" />
          <Flex justify="space-between" align="center">
            <span className="fs-14">Fields</span>
            <div className="control-group mb-0 mt-0">
              <div className="controls">
                <Input
                  name="field"
                  className="form-control"
                  placeholder="Search Fields . . ."
                  onChange={(e) =>
                    setSearchTextForExtraFields(e?.target?.value)
                  }
                />
              </div>
            </div>
          </Flex>
          {fetchingExtraScreens ? (
            <div className="noFields">
              <Spin />
            </div>
          ) : extraFields && extraFields?.length > 0 ? (
            <DnDSortableList
              items={filteredExtraFields}
              itemsRenderer={(listItem) => (
                <Flex
                  className="draggableList_item_content"
                  justify="space-between"
                >
                  <div className="draggableList_title">
                    {listItem?.name} | {listItem?.field_source}
                  </div>
                  <Flex justify="end" align="center" gap={5}>
                    <Switch
                      size="small"
                      defaultChecked={listItem?.selected}
                      onChange={(value) => {
                        if (value) {
                          setSelectedFields((prev) => {
                            return [...prev, listItem];
                          });
                        } else {
                          setSelectedFields((prev) => {
                            return prev?.filter(
                              (item) =>
                                item?.internalid !== listItem?.internalid
                            );
                          });
                        }
                      }}
                    />
                  </Flex>
                </Flex>
              )}
              // onDragEnd={({ active, over }) => {
              //   setViews((prevViews) => {
              //     const newIndex = prevViews?.findIndex(
              //       (view) => view?.name === active?.id
              //     );
              //     const oldIndex = prevViews?.findIndex(
              //       (view) => view?.name === over?.id
              //     );
              //     let updatedViews = arrayMove(
              //       prevViews,
              //       newIndex,
              //       oldIndex
              //     );
              //     return updatedViews;
              //   });
              // }}
              indexKey="internalid"
            />
          ) : (
            <div className="noFields">No Fields Found</div>
          )}
        </div>
      </Drawer>
    </>
  );
}
