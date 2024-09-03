import {
  Button,
  Col,
  ColorPicker,
  Drawer,
  Flex,
  Input,
  Popover,
  Row,
  Select,
  Switch,
  Tabs,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import {
  PushpinOutlined,
  PushpinFilled,
  EditOutlined,
  EditFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "../../../../Components/FormControl";
import DnDSortableList from "../../../../Components/DnDSortableList";
import {
  saveVisibleFilters,
  selectViewConfig,
} from "../../../../utils/redux/ViewConfigSlice/index.slice";

const { Option } = Select;

export default function ModifyViewSettingDrawer({
  columnDefs,
  modifyViewDrawer,
  setModifyViewDrawer,
  currentView,
  visibleFilters,
  setVisibleFilters,
  setColumnDefs,
  setHeaderColors,
  setHeaderColorStyle,
}) {
  const viewConfig = useSelector(selectViewConfig);
  const {
    json: { availableFields },
  } = viewConfig;
  const [addNewVisibleFilter, setAddNewVisibleFilter] = useState("");
  const [filtersList, setFiltersList] = useState([]);
  const dispatch = useDispatch();

  const addHyperLink = (col, hyperlink) => {
    setColumnDefs((prevColDefs) => {
      return prevColDefs.map((column) => {
        if (column.field === col.field) {
          return {
            ...col,
            cellRenderer: (params) => {
              return (
                <a
                  href={hyperlink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {params.value}
                </a>
              );
            },
          };
        }
        return column;
      });
    });
  };

  const changeColumnWidth = (col, width) => {
    setColumnDefs((prevColDefs) => {
      return prevColDefs.map((column) => {
        if (column.field === col.field) {
          return {
            ...col,
            width,
          };
        }
        return column;
      });
    });
  };

  const changeHeaderColor = (col, color) => {
    setHeaderColors((prevColors) => {
      let colors = {
        ...prevColors,
        [col?.field]: color,
      };
      setHeaderColorStyle(colors);
      return colors;
    });

    const headerElement = document.querySelector(`[col-id="${col.field}"] `);
    if (headerElement) {
      headerElement.style.backgroundColor = color;
    }
  };

  const changeEditableColumn = (col) => {
    col.editable = !col.editable;
    setColumnDefs((prevColDefs) => {
      return prevColDefs.map((column) => {
        if (column.field === col.field) {
          return col;
        }
        return column;
      });
    });
  };
  const freezeCol = (col) => {
    let indexToSave = null;

    setColumnDefs((prevColDefs) => {
      const updatedColDefs = prevColDefs.map((column, index) => {
        if (column.field === col.field) {
          indexToSave = index;
        }
        return column;
      });

      const pinAbove = updatedColDefs[indexToSave]?.pinned !== "left";

      const finalColDefs = updatedColDefs.map((column, index) => {
        if (pinAbove) {
          // Pin all columns above and including the specified column
          if (index <= indexToSave) {
            column.pinned = "left";
            column.lockPinned = true;
          }
        } else if (index >= indexToSave) {
          // Unpin the specified column and all columns below it
          column.pinned = "";
          column.lockPinned = false;
        }
        // Ensure the serialNo column is always pinned to the left
        if (column.field === "serialNo") {
          column.pinned = "left";
          column.lockPinned = true;
        }
        return column;
      });

      return finalColDefs;
    });
  };

  const removeFilter = (field) => {
    if (field === "") {
      setAddNewVisibleFilter(false);
    } else {
      dispatch(
        saveVisibleFilters(
          visibleFilters?.filter((filter) => filter?.field !== field)
        )
      );
    }
  };
  useEffect(() => {
    if (visibleFilters?.length) {
      if (addNewVisibleFilter) {
        setFiltersList([
          ...visibleFilters,
          {
            field: "",
            label: "",
          },
        ]);
      } else {
        setFiltersList(visibleFilters);
      }
    }
  }, [visibleFilters, addNewVisibleFilter]);

  const tabItems = useMemo(() => {
    let items = [];

    if (currentView?.viewType === "list") {
      items = [
        {
          key: "1",
          label: "Columns Settings",
          children: (
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <DnDSortableList
                items={columnDefs}
                key="field"
                itemsRenderer={(listItem) => (
                  <Flex
                    className="draggableList_item_content"
                    justify="space-between"
                  >
                    <Popover
                      trigger="click"
                      content={
                        <div>
                          {/* <FormRow> */}
                          <FormControl label="Column Width">
                            <Input
                              type="number"
                              onChange={(event) =>
                                changeColumnWidth(
                                  listItem,
                                  event?.target?.value
                                )
                              }
                              name="columnWidth"
                              defaultValue={120}
                              min={100}
                            />
                          </FormControl>
                          <FormControl label="Hyperlink">
                            <Input
                              name="hyperlink"
                              onBlur={(event) =>
                                addHyperLink(listItem, event?.target?.value)
                              }
                            />
                          </FormControl>
                          {/* </FormRow> */}
                        </div>
                      }
                    >
                      <div className="draggableList_title">
                        {listItem?.headerName}
                      </div>
                    </Popover>
                    <Flex justify="end" align="center" gap={5}>
                      <ColorPicker
                        size="small"
                        onChange={(_, color) => {
                          changeHeaderColor(listItem, color);
                        }}
                        defaultValue="#000000"
                      />
                      <Switch
                        size="small"
                        defaultChecked
                        onChange={(value) => {
                          setColumnDefs((prevViews) => {
                            const updatedViews = prevViews?.map((view) => {
                              if (view?.field === listItem?.field) {
                                return {
                                  ...view,
                                  hide: !value,
                                };
                              }
                              return view;
                            });
                            return updatedViews;
                          });
                        }}
                      />
                      <span
                        onClick={() => {
                          changeEditableColumn(listItem);
                        }}
                      >
                        {listItem?.editable ? <EditFilled /> : <EditOutlined />}
                      </span>
                      <span
                        onClick={() => {
                          freezeCol(listItem);
                        }}
                      >
                        {" "}
                        {listItem?.pinned ? (
                          <PushpinFilled />
                        ) : (
                          <PushpinOutlined />
                        )}
                      </span>
                    </Flex>
                  </Flex>
                )}
                onDragEnd={({ active, over }) => {
                  setColumnDefs((prevViews) => {
                    const newIndex = prevViews?.findIndex(
                      (view) => view?.field === active?.id
                    );
                    const oldIndex = prevViews?.findIndex(
                      (view) => view?.field === over?.id
                    );
                    let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                    return updatedViews;
                  });
                }}
                indexKey="field"
              />
            </div>
          ),
        },
        {
          key: "2",
          label: "Visible Filters",
          children: (
            <>
              <Flex className="mt-4  mb-4" justify="space-between">
                <Button
                  onClick={() => {
                    setAddNewVisibleFilter(true);
                  }}
                  disabled={visibleFilters?.length === availableFields?.length}
                >
                  Add Filter
                </Button>
                <Flex gap={5}>
                  <Button onClick={() => setVisibleFilters([])}>Reset</Button>
                  <Button>Apply</Button>
                </Flex>
              </Flex>
              <DnDSortableList
                items={filtersList}
                itemsRenderer={(listItem) => (
                  <Flex className="mt-4 mb-4 w-100" justify="space-between">
                    <Row className="w-100" gutter={6}>
                      <Col span={10}>
                        <div className="control-group mb-0 mt-0">
                          <div className="controls">
                            <Select
                              name="field"
                              className="form-control"
                              placeholder="Please select last modified by"
                              defaultValue={{
                                value: listItem?.field,
                                label: listItem?.label,
                              }}
                            >
                              {availableFields?.map((field) => (
                                <Option
                                  disabled={visibleFilters?.some(
                                    (filter) =>
                                      filter?.field === field?.scriptid
                                  )}
                                  value={field?.scriptid}
                                >
                                  {field?.name}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </Col>
                      {/* <Col span={7}>
                        <div className="control-group mb-0 mt-0">
                          <div className="controls">
                            <Select
                              name="filterOption"
                              className="form-control"
                              placeholder="Please select last modified by"
                              defaultValue={listItem?.filterOption}
                            >
                              <Option value="user1">User 1</Option>
                              <Option value="user2">User 2</Option>
                              <Option value="user3">User 3</Option>
                              <Option value="user4">User 4</Option>
                            </Select>
                          </div>
                        </div>
                      </Col>
                      <Col span={7}>
                        <div className="control-group mb-0 mt-0">
                          <div className="controls">
                            <Select
                              name="value"
                              onChange={(value) =>
                                handleSelectChange(value, "lastModifiedBy")
                              }
                              className="form-control"
                              placeholder="Please select last modified by"
                              defaultValue={listItem?.value}
                            >
                              <Option value="user1">User 1</Option>
                              <Option value="user2">User 2</Option>
                              <Option value="user3">User 3</Option>
                              <Option value="user4">User 4</Option>
                            </Select>
                          </div>
                        </div>
                      </Col> */}
                      <Col>
                        <Flex align="center" justify="center" className="h-100">
                          <Button
                            onClick={() => removeFilter(listItem?.field)}
                            danger
                            size="small"
                            shape="circle"
                          >
                            <DeleteOutlined />
                          </Button>
                        </Flex>
                      </Col>
                    </Row>
                  </Flex>
                )}
                onDragEnd={({ active, over }) => {
                  setVisibleFilters((prevViews) => {
                    const newIndex = prevViews?.findIndex(
                      (view) => view?.field === active?.id
                    );
                    const oldIndex = prevViews?.findIndex(
                      (view) => view?.field === over?.id
                    );
                    let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                    return updatedViews;
                  });
                }}
                indexKey="field"
              />
            </>
          ),
        },
      ];
    }

    if (currentView?.viewType === "kanban") {
      items = [
        {
          key: "1",
          label: "Card Settings",
        },
        {
          key: "2",
          label: "Group Settings",
        },
        {
          key: "3",
          label: "Access Permisions",
        },
      ];
    }

    if (
      currentView?.viewType === "matrix" ||
      currentView?.viewType === "calendar"
    ) {
      items = [
        {
          key: "1",
          label: "X axis",
        },
        {
          key: "2",
          label: "Y axis",
        },
        {
          key: "3",
          label: "Card Settings",
        },
        {
          key: "4",
          label: "Access Permisions",
        },
      ];
    }
    return items;
  }, [currentView, visibleFilters, availableFields, filtersList]);

  return (
    <>
      <Drawer
        title="Modify View Settings"
        width={720}
        onClose={() => setModifyViewDrawer(false)}
        open={modifyViewDrawer}
        styles={{
          body: {
            paddingBottom: 50,
          },
        }}
      >
        <div className="commonTabs">
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            style={{ width: "100%" }}
          />
        </div>
      </Drawer>
    </>
  );
}
