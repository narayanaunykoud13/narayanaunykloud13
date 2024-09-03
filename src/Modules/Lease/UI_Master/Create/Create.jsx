import React, { useEffect, useState } from "react";
import { Button, Drawer, Dropdown, Flex, Input, Popover, Tabs, Switch, Tooltip, Badge, Row, Col, DatePicker, Tag, Collapse, Select } from "antd";
import {
  MoreOutlined,
  EditFilled,
  DeleteOutlined,
  SettingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import Header from "../../../../Components/Header";
import FormControl from "../../../../Components/FormControl";
import DnDSortableList from "../../../../Components/DnDSortableList";
import TabNavigation from "../../../../Components/TabNavigation";
import TabSettings from "./TabSettings";
import BlockSettings from "./BlockSettings";
import { $ajax_post } from "../../../../Library/Library";
import SubTabSettings from "./SubTabSettings";
import MasterBlockSettings from "./MasterBlockSettings";
import MasterBlockFieldSettings from "./MasterBlockFieldSettings";
import BlockFieldSettings from "./BlockFieldSettings";

function Create() {
  const { id } = useParams();
  const pageId = id;
  const [showMasterPageSettings, setShowMasterPageSettings] = useState(false);
  let items = [
    {
      key: "1",
      label: (
        <a onClick={() => setShowMasterPageSettings(true)}>Settings</a>
      ),
    },
  ];
  const [openBlockSettings, setOpenBlockSettings] = useState(false);
  const showBlockSettingsDrawer = () => {
    setOpenBlockSettings(true);
  };
  const [clickedData, setClickedData] = useState([])
  const closeBlockSettingsDrawer = () => {
    setOpenBlockSettings(false);
  };
  const [openBlockFieldSettings, setOpenBlockFieldSettings] = useState(false);
  const showBlockFieldSettingsDrawer = () => {
    setOpenBlockFieldSettings(true);
  };
  const closeBlockFieldSettingsDrawer = () => {
    setOpenBlockFieldSettings(false);
  };
  const [openMasterBlockSettings, setOpenMasterBlockSettings] = useState(false);
  const showMasterBlockSettingsDrawer = () => {
    setOpenMasterBlockSettings(true);
  };
  const closeMasterBlockSettingsDrawer = () => {
    setOpenMasterBlockSettings(false);
  };
  const [openMasterBlockFieldSettings, setOpenMasterBlockFieldSettings] = useState(false);
  const showMasterBlockFieldSettingsDrawer = () => {
    setOpenMasterBlockFieldSettings(true);
  };
  const closeMasterBlockFieldSettingsDrawer = () => {
    setOpenMasterBlockFieldSettings(false);
  };
  const [openSubTabSettings, setOpenSubTabSettings] = useState(false);
  const showSubTabSettingsDrawer = () => {
    setOpenSubTabSettings(true);
  };
  const closeSubTabSettingsDrawer = () => {
    setOpenSubTabSettings(false);
  };
  const [recordsList, setRecordsList] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(null);
  const fetchScreens = async () => {
    try {
      $ajax_post("post", "g/sb/1000", {}, (res) => {
        setCurrentScreen(res?.[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRecords = async () => {
    try {
      $ajax_post("post", "g/sb/1003", {}, (res) => {
        setRecordsList(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchScreens();
  }, []);
  useEffect(() => {
    if (currentScreen) {
      fetchRecords();
    }
  }, [currentScreen]);
  const [addAvailableFields, setAddAvailableFields] = useState([]);
  const [addAvailableFieldsBlock, setAddAvailableFieldsBlock] = useState([]);
  const [groupColumnData, setGroupColumnData] = useState({});
  const [blockColumnData, setBlockColumnData] = useState({});
  // const [blockRowData, setBlockRowData] = useState({});
  const [tabBlockColumnData, setTabBlockColumnData] = useState({});
  const [actionButtons, setActionButtons] = useState([
    {
      id: "1",
      name: "View",
      display: true,
    },
    {
      id: "2",
      name: "Edit",
      display: true,
    },
    {
      id: "3",
      name: "Delete",
      display: true,
    },
  ]);
  let pathName = "/ui-master/create"
  const [actionTabs, setActionTabs] = useState([
    {
      id: "1",
      label: "List View",
      display: true,
      path: pathName,
      tabpath: "list-view",
      children: {
        buttons: [],
        sub_tabs: [],
        blocks: [],
      },
    },
    {
      id: "2",
      label: "Button View",
      display: true,
      path: pathName,
      tabpath: "button-view",
      children: {
        buttons: [],
        sub_tabs: [],
        blocks: [],
      },
    },
    {
      id: "3",
      label: "Horizontal Tab",
      display: true,
      path: pathName,
      tabpath: "horizontal-tab",
      children: {
        buttons: [],
        sub_tabs: [],
        blocks: [],
      },
    },
    {
      id: "4",
      label: "Vertical Tab",
      display: true,
      path: pathName,
      tabpath: "vertical-tab",
      children: {
        buttons: [],
        sub_tabs: [],
        blocks: [],
      },
    },
  ]);
  const [actionIndicators, setActionIndicators] = useState([
    {
      id: "1",
      label: "Messages",
      count: 5,
      display: true,
    },
    {
      id: "2",
      label: "Notifications",
      count: 3,
      display: true,
    },
  ]);
  const [actionBlocks, setActionBlocks] = useState([
    {
      id: "1",
      name: "Master Block 1",
      display: true,
      children: {
        buttons: [],
        groups: [],
      },
    },
  ]);
  const onCloseShowMasterPageSettings = () => {
    setShowMasterPageSettings(false);
  };
  const deleteActionButtons = (button) => {
    setActionButtons((prevButtons) => {
      return prevButtons?.filter(
        (prevButton) => prevButton?.name !== button?.name
      );
    });
  };
  const deleteActionTabs = (tab) => {
    setActionTabs((prevTabs) => {
      return prevTabs?.filter(
        (prevTab) => prevTab?.label !== tab?.label
      );
    });
  };
  const deleteActionIndicators = (indicator) => {
    setActionIndicators((prevIndicators) => {
      return prevIndicators?.filter(
        (prevIndicator) => prevIndicator?.label !== indicator?.label
      );
    });
  };
  const deleteActionBlocks = (block) => {
    setActionBlocks((prevBlocks) => {
      return prevBlocks?.filter(
        (prevBlock) => prevBlock?.name !== block?.name
      );
    });
  };
  const [activeTabKey, setActiveTabKey] = useState("1");
  const threeDotsDrawerMenu = [
    {
      key: "1",
      label: <span>Buttons</span>,
      children:
        (
          <div className="mt-4">
            <span className="draggableList_heading">
              Visible Buttons
            </span>
            <DnDSortableList
              items={[
                ...actionButtons?.filter((btn) => btn?.display),
                // ...actionButtons?.filter((btn) => !btn?.display),
              ]}
              itemsRenderer={(listItem) => (
                <Flex
                  className="draggableList_item_content"
                  justify="space-between"
                >
                  <div className="draggableList_title">{listItem?.name}</div>
                  <Flex justify="end" align="center" gap={5}>
                    <Popover
                      trigger="click"
                      placement="bottomRight"
                      content={
                        <div>
                          <FormControl label="Name">
                            <Input
                              name="name"
                              defaultValue={listItem?.name}
                              onBlur={(e) => {
                                const { name, value } = e.target;
                                // Update actionButtons state
                                setActionButtons((prevButtons) =>
                                  prevButtons?.map((button) =>
                                    listItem?.name === button?.name
                                      ? { ...button, [name]: value }
                                      : button
                                  )
                                );
                              }}
                            />
                          </FormControl>
                        </div>
                      }
                    >
                      <Tooltip title="Edit Button">
                        <EditFilled />
                      </Tooltip>
                    </Popover>
                    <Switch
                      size="small"
                      defaultValue={listItem?.display}
                      onChange={(display) => {
                        setActionButtons((prevViews) => {
                          return prevViews?.map((btn) => {
                            if (btn?.name === listItem?.name) {
                              return { ...btn, display };
                            } else {
                              return btn;
                            }
                          });
                        });
                      }}
                    />
                    <Button
                      onClick={() => deleteActionButtons(listItem)}
                      danger
                      size="small"
                      shape="circle"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Flex>
                </Flex>
              )}
              onDragEnd={({ active, over }) => {
                setActionButtons((prevViews) => {
                  const newIndex = prevViews?.findIndex(
                    (view) => view?.name === active?.id
                  );
                  const oldIndex = prevViews?.findIndex(
                    (view) => view?.name === over?.id
                  );
                  let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                  return updatedViews;
                });
              }}
              indexKey="name"
            />
            <span className="draggableList_heading">
              Hidden Buttons
            </span>
            <DnDSortableList
              items={[
                // ...actionButtons?.filter((btn) => btn?.display),
                ...actionButtons?.filter((btn) => !btn?.display),
              ]}
              itemsRenderer={(listItem) => (
                <Flex
                  className="draggableList_item_content"
                  justify="space-between"
                >
                  <div className="draggableList_title">{listItem?.name}</div>
                  <Flex justify="end" align="center" gap={5}>
                    <Popover
                      trigger="click"
                      placement="bottomRight"
                      content={
                        <div>
                          <FormControl label="Name">
                            <Input
                              name="name"
                              defaultValue={listItem?.name}
                              onBlur={(e) => {
                                const { name, value } = e.target;
                                // Update actionButtons state
                                setActionButtons((prevButtons) =>
                                  prevButtons?.map((button) =>
                                    listItem?.name === button?.name
                                      ? { ...button, [name]: value }
                                      : button
                                  )
                                );
                              }}
                            />
                          </FormControl>
                        </div>
                      }
                    >
                      <Tooltip title="Edit Button">
                        <EditFilled />
                      </Tooltip>
                    </Popover>
                    <Switch
                      size="small"
                      defaultValue={listItem?.display}
                      onChange={(display) => {
                        setActionButtons((prevViews) => {
                          return prevViews?.map((btn) => {
                            if (btn?.name === listItem?.name) {
                              return { ...btn, display };
                            } else {
                              return btn;
                            }
                          });
                        });
                      }}
                    />
                    <Button
                      onClick={() => deleteActionButtons(listItem)}
                      danger
                      size="small"
                      shape="circle"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Flex>
                </Flex>
              )}
              onDragEnd={({ active, over }) => {
                setActionButtons((prevViews) => {
                  const newIndex = prevViews?.findIndex(
                    (view) => view?.name === active?.id
                  );
                  const oldIndex = prevViews?.findIndex(
                    (view) => view?.name === over?.id
                  );
                  let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                  return updatedViews;
                });
              }}
              indexKey="name"
            />
          </div>
        ),
    },
    {
      key: "2",
      label: <span>Vertical Tabs</span>,
      children: (
        <div className="mt-4">
          <span className="draggableList_heading">
            Visible Tabs
          </span>
          <DnDSortableList
            items={[
              ...actionTabs?.filter((tab) => tab?.display),
              // ...actionTabs?.filter((tab) => !tab?.display),
            ]}
            itemsRenderer={(listItem) => (
              <Flex
                className="draggableList_item_content"
                justify="space-between"
              >
                <div className="draggableList_title">{listItem?.label}</div>
                <Flex justify="end" align="center" gap={5}>
                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    content={
                      <div>
                        <FormControl label="Label">
                          <Input
                            name="label"
                            defaultValue={listItem?.label}
                            onBlur={(e) => {
                              const { name, value } = e.target;
                              // Update actionTabs state
                              setActionTabs((prevTabs) =>
                                prevTabs?.map((tab) =>
                                  listItem?.label === tab?.label
                                    ? { ...tab, [name]: value }
                                    : tab
                                )
                              );
                            }}
                          />
                        </FormControl>
                      </div>
                    }
                  >
                    <Tooltip title="Edit Tab">
                      <EditFilled />
                    </Tooltip>
                  </Popover>
                  <Switch
                    size="small"
                    defaultValue={listItem?.display}
                    onChange={(display) => {
                      setActionTabs((prevViews) => {
                        return prevViews?.map((tab) => {
                          if (tab?.label === listItem?.label) {
                            return { ...tab, display };
                          } else {
                            return tab;
                          }
                        });
                      });
                    }}
                  />
                  <Button
                    onClick={() => deleteActionTabs(listItem)}
                    danger
                    size="small"
                    shape="circle"
                  >
                    <DeleteOutlined />
                  </Button>
                </Flex>
              </Flex>
            )}
            onDragEnd={({ active, over }) => {
              setActionTabs((prevViews) => {
                const newIndex = prevViews?.findIndex(
                  (view) => view?.label === active?.id
                );
                const oldIndex = prevViews?.findIndex(
                  (view) => view?.label === over?.id
                );
                let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                return updatedViews;
              });
            }}
            indexKey="label"
          />
          <span className="draggableList_heading">
            Hidden Tabs
          </span>
          <DnDSortableList
            items={[
              // ...actionTabs?.filter((tab) => tab?.display),
              ...actionTabs?.filter((tab) => !tab?.display),
            ]}
            itemsRenderer={(listItem) => (
              <Flex
                className="draggableList_item_content"
                justify="space-between"
              >
                <div className="draggableList_title">{listItem?.label}</div>
                <Flex justify="end" align="center" gap={5}>
                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    content={
                      <div>
                        <FormControl label="Label">
                          <Input
                            name="label"
                            defaultValue={listItem?.label}
                            onBlur={(e) => {
                              const { name, value } = e.target;
                              // Update actionTabs state
                              setActionTabs((prevTabs) =>
                                prevTabs?.map((tab) =>
                                  listItem?.label === tab?.label
                                    ? { ...tab, [name]: value }
                                    : tab
                                )
                              );
                            }}
                          />
                        </FormControl>
                      </div>
                    }
                  >
                    <Tooltip title="Edit Tab">
                      <EditFilled />
                    </Tooltip>
                  </Popover>
                  <Switch
                    size="small"
                    defaultValue={listItem?.display}
                    onChange={(display) => {
                      setActionTabs((prevViews) => {
                        return prevViews?.map((tab) => {
                          if (tab?.label === listItem?.label) {
                            return { ...tab, display };
                          } else {
                            return tab;
                          }
                        });
                      });
                    }}
                  />
                  <Button
                    onClick={() => deleteActionTabs(listItem)}
                    danger
                    size="small"
                    shape="circle"
                  >
                    <DeleteOutlined />
                  </Button>
                </Flex>
              </Flex>
            )}
            onDragEnd={({ active, over }) => {
              setActionTabs((prevViews) => {
                const newIndex = prevViews?.findIndex(
                  (view) => view?.label === active?.id
                );
                const oldIndex = prevViews?.findIndex(
                  (view) => view?.label === over?.id
                );
                let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                return updatedViews;
              });
            }}
            indexKey="label"
          />
        </div>
      ),
    },
    {
      key: "3",
      label: <span>Horizontal Tabs</span>,
      children: <div className="mt-4">Horizontal Tabs</div>,
    },
    {
      key: "4",
      label: <span>Header Indicators</span>,
      children: (
        <div className="mt-4">
          <span className="draggableList_heading">
            Visible Indicators
          </span>
          <DnDSortableList
            items={[
              ...actionIndicators?.filter((indicator) => indicator?.display),
              // ...actionIndicators?.filter((indicator) => !indicator?.display),
            ]}
            itemsRenderer={(listItem) => (
              <Flex
                className="draggableList_item_content"
                justify="space-between"
              >
                <div className="draggableList_title">{listItem?.label}</div>
                <Flex justify="end" align="center" gap={5}>
                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    content={
                      <div>
                        <FormControl label="Label">
                          <Input
                            name="label"
                            defaultValue={listItem?.label}
                            onBlur={(e) => {
                              const { name, value } = e.target;
                              // Update actionIndicators state
                              setActionIndicators((prevIndicators) =>
                                prevIndicators?.map((indicator) =>
                                  listItem?.label === indicator?.label
                                    ? { ...indicator, [name]: value }
                                    : indicator
                                )
                              );
                            }}
                          />
                        </FormControl>
                      </div>
                    }
                  >
                    <Tooltip title="Edit Indicator">
                      <EditFilled />
                    </Tooltip>
                  </Popover>
                  <Switch
                    size="small"
                    defaultValue={listItem?.display}
                    onChange={(display) => {
                      setActionIndicators((prevViews) => {
                        return prevViews?.map((indicator) => {
                          if (indicator?.label === listItem?.label) {
                            return { ...indicator, display };
                          } else {
                            return indicator;
                          }
                        });
                      });
                    }}
                  />
                  <Button
                    onClick={() => deleteActionIndicators(listItem)}
                    danger
                    size="small"
                    shape="circle"
                  >
                    <DeleteOutlined />
                  </Button>
                </Flex>
              </Flex>
            )}
            onDragEnd={({ active, over }) => {
              setActionIndicators((prevViews) => {
                const newIndex = prevViews?.findIndex(
                  (view) => view?.label === active?.id
                );
                const oldIndex = prevViews?.findIndex(
                  (view) => view?.label === over?.id
                );
                let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                return updatedViews;
              });
            }}
            indexKey="label"
          />
          <span className="draggableList_heading">
            Hidden Indicators
          </span>
          <DnDSortableList
            items={[
              // ...actionIndicators?.filter((indicator) => indicator?.display),
              ...actionIndicators?.filter((indicator) => !indicator?.display),
            ]}
            itemsRenderer={(listItem) => (
              <Flex
                className="draggableList_item_content"
                justify="space-between"
              >
                <div className="draggableList_title">{listItem?.label}</div>
                <Flex justify="end" align="center" gap={5}>
                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    content={
                      <div>
                        <FormControl label="Label">
                          <Input
                            name="label"
                            defaultValue={listItem?.label}
                            onBlur={(e) => {
                              const { name, value } = e.target;
                              // Update actionIndicators state
                              setActionIndicators((prevIndicators) =>
                                prevIndicators?.map((indicator) =>
                                  listItem?.label === indicator?.label
                                    ? { ...indicator, [name]: value }
                                    : indicator
                                )
                              );
                            }}
                          />
                        </FormControl>
                      </div>
                    }
                  >
                    <Tooltip title="Edit Indicator">
                      <EditFilled />
                    </Tooltip>
                  </Popover>
                  <Switch
                    size="small"
                    defaultValue={listItem?.display}
                    onChange={(display) => {
                      setActionIndicators((prevViews) => {
                        return prevViews?.map((indicator) => {
                          if (indicator?.label === listItem?.label) {
                            return { ...indicator, display };
                          } else {
                            return indicator;
                          }
                        });
                      });
                    }}
                  />
                  <Button
                    onClick={() => deleteActionIndicators(listItem)}
                    danger
                    size="small"
                    shape="circle"
                  >
                    <DeleteOutlined />
                  </Button>
                </Flex>
              </Flex>
            )}
            onDragEnd={({ active, over }) => {
              setActionIndicators((prevViews) => {
                const newIndex = prevViews?.findIndex(
                  (view) => view?.label === active?.id
                );
                const oldIndex = prevViews?.findIndex(
                  (view) => view?.label === over?.id
                );
                let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                return updatedViews;
              });
            }}
            indexKey="label"
          />
        </div>
      ),
    },
    {
      key: "5",
      label: <span>Header Blocks</span>,
      children:
        (
          <div className="mt-4">
            <span className="draggableList_heading">
              Visible Blocks
            </span>
            <DnDSortableList
              items={[
                ...actionBlocks?.filter((block) => block?.display),
                // ...actionBlocks?.filter((block) => !block?.display),
              ]}
              itemsRenderer={(listItem) => (
                <Flex
                  className="draggableList_item_content"
                  justify="space-between"
                >
                  <div className="draggableList_title">{listItem?.name}</div>
                  <Flex justify="end" align="center" gap={5}>
                    <Popover
                      trigger="click"
                      placement="bottomRight"
                      content={
                        <div>
                          <FormControl label="Name">
                            <Input
                              name="name"
                              defaultValue={listItem?.name}
                              onBlur={(e) => {
                                const { name, value } = e.target;
                                // Update actionBlocks state
                                setActionBlocks((prevBlocks) =>
                                  prevBlocks?.map((block) =>
                                    listItem?.name === block?.name
                                      ? { ...block, [name]: value }
                                      : block
                                  )
                                );
                              }}
                            />
                          </FormControl>
                          <FormControl label="No. of Columns">
                            <Input
                              name="columns"
                              defaultValue=""
                              onBlur={(e) => {
                                const { name, value } = e.target;
                                setBlockColumnData((prevState) => ({
                                  ...prevState,
                                  [name]: value
                                }));
                              }}
                            />
                          </FormControl>
                          {/* <FormControl label="No. of Rows">
                            <Input
                              name="rows"
                              defaultValue=""
                              onBlur={(e) => {
                                const { name, value } = e.target;
                                setBlockRowData((prevState) => ({
                                  ...prevState,
                                  [name]: value
                                }));
                              }}
                            />
                          </FormControl> */}
                        </div>
                      }
                    >
                      <Tooltip title="Edit Block">
                        <EditFilled />
                      </Tooltip>
                    </Popover>
                    <Switch
                      size="small"
                      defaultValue={listItem?.display}
                      onChange={(display) => {
                        setActionBlocks((prevViews) => {
                          return prevViews?.map((block) => {
                            if (block?.name === listItem?.name) {
                              return { ...block, display };
                            } else {
                              return block;
                            }
                          });
                        });
                      }}
                    />
                    <Button
                      onClick={() => deleteActionBlocks(listItem)}
                      danger
                      size="small"
                      shape="circle"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Flex>
                </Flex>
              )}
              onDragEnd={({ active, over }) => {
                setActionBlocks((prevViews) => {
                  const newIndex = prevViews?.findIndex(
                    (view) => view?.name === active?.id
                  );
                  const oldIndex = prevViews?.findIndex(
                    (view) => view?.name === over?.id
                  );
                  let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                  return updatedViews;
                });
              }}
              indexKey="name"
            />
            <span className="draggableList_heading">
              Hidden Blocks
            </span>
            <DnDSortableList
              items={[
                // ...actionBlocks?.filter((block) => block?.display),
                ...actionBlocks?.filter((block) => !block?.display),
              ]}
              itemsRenderer={(listItem) => (
                <Flex
                  className="draggableList_item_content"
                  justify="space-between"
                >
                  <div className="draggableList_title">{listItem?.name}</div>
                  <Flex justify="end" align="center" gap={5}>
                    <Popover
                      trigger="click"
                      placement="bottomRight"
                      content={
                        <div>
                          <FormControl label="Name">
                            <Input
                              name="name"
                              defaultValue={listItem?.name}
                              onBlur={(e) => {
                                const { name, value } = e.target;
                                // Update actionBlocks state
                                setActionBlocks((prevBlocks) =>
                                  prevBlocks?.map((block) =>
                                    listItem?.name === block?.name
                                      ? { ...block, [name]: value }
                                      : block
                                  )
                                );
                              }}
                            />
                          </FormControl>
                        </div>
                      }
                    >
                      <Tooltip title="Edit Block">
                        <EditFilled />
                      </Tooltip>
                    </Popover>
                    <Switch
                      size="small"
                      defaultValue={listItem?.display}
                      onChange={(display) => {
                        setActionBlocks((prevViews) => {
                          return prevViews?.map((block) => {
                            if (block?.name === listItem?.name) {
                              return { ...block, display };
                            } else {
                              return block;
                            }
                          });
                        });
                      }}
                    />
                    <Button
                      onClick={() => deleteActionBlocks(listItem)}
                      danger
                      size="small"
                      shape="circle"
                    >
                      <DeleteOutlined />
                    </Button>
                  </Flex>
                </Flex>
              )}
              onDragEnd={({ active, over }) => {
                setActionBlocks((prevViews) => {
                  const newIndex = prevViews?.findIndex(
                    (view) => view?.name === active?.id
                  );
                  const oldIndex = prevViews?.findIndex(
                    (view) => view?.name === over?.id
                  );
                  let updatedViews = arrayMove(prevViews, newIndex, oldIndex);
                  return updatedViews;
                });
              }}
              indexKey="name"
            />
          </div>
        ),
    },
    {
      key: "6",
      label: <span>Access Permissions</span>,
      children: <div className="mt-4">Access Permissions</div>,
    },
    {
      key: "7",
      label: <span>Audit Trials</span>,
      children: <div className="mt-4">Audit Trials</div>,
    },
  ];
  const [currentMenu, setCurrentMenu] = useState("list-view");
  const [currentBlock, setCurrentBlock] = useState("Master Block 1");
  const onMenuClick = (e) => {
    setCurrentMenu(e);
  };
  const handleClick = (e) => {
    setCurrentBlock(e?.name);
  };
  const [activeTab, setActiveTab] = useState();
  const onChange = (key) => {
    setActiveTab(key);
  };
  const deleteItemButtons = (button, tabKey) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tabKey]: prevTabsItem?.children?.[tabKey]?.filter(
              (prevButton) => prevButton?.name !== button?.name
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const deleteItemTab = (tab, tabKey) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tabKey]: prevTabsItem?.children?.[tabKey]?.filter(
              (prevButton) => prevButton?.label !== tab?.label
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const deleteItemBlock = (block, tabKey) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tabKey]: prevTabsItem?.children?.[tabKey]?.filter(
              (prevButton) => prevButton?.title !== block?.title
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const deleteItemGroup = (group, parentTab, childTab,) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [parentTab]: prevTabsItem?.children?.[parentTab]?.map((blocksItem) =>
              blocksItem?.title === clickedData?.title ? ({
                ...blocksItem,
                children: {
                  ...blocksItem?.children,
                  [childTab]: blocksItem?.children?.[childTab]?.filter(
                    (prevButton) => prevButton?.title !== group?.title
                  )
                }
              }) : blocksItem
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const deleteItemButton = (group, parentTab, childTab,) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [parentTab]: prevTabsItem?.children?.[parentTab]?.map((blocksItem) =>
              blocksItem?.title === clickedData?.title ? ({
                ...blocksItem,
                children: {
                  ...blocksItem?.children,
                  [childTab]: blocksItem?.children?.[childTab]?.filter(
                    (prevButton) => prevButton?.title !== group?.title
                  )
                }
              }) : blocksItem
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const deleteMasterGroup = (group, tabKey) => {
    setActionBlocks((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.name === currentBlock ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tabKey]: prevTabsItem?.children?.[tabKey]?.filter(
              (prevButton) => prevButton?.title !== group?.title
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const deleteMasterButton = (group, tabKey) => {
    setActionBlocks((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.name === currentBlock ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tabKey]: prevTabsItem?.children?.[tabKey]?.filter(
              (prevButton) => prevButton?.title !== group?.title
            )
          }
        }) : prevTabsItem
      )
    )
  };
  const handleAddNewButtonItems = (data, tab) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tab]: [...prevTabsItem?.children?.[tab] ?? [], data]
          }
        }) : prevTabsItem
      )
    )
  }
  const handleAddNewSubTabItems = (data, tab) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tab]: [...prevTabsItem?.children?.[tab] ?? [], data]
          }
        }) : prevTabsItem
      )
    )
  }
  const handleAddNewBlockItems = (data, tab) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tab]: [...prevTabsItem?.children?.[tab] ?? [], data]
          }
        }) : prevTabsItem
      )
    )
  }
  const handleAddNewBlockGroupItems = (data, parentTab, childTab, title) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [parentTab]: prevTabsItem?.children?.[parentTab]?.map((prevTabItems) => prevTabItems?.title === title ? ({
              ...prevTabItems, children: {
                ...prevTabItems?.children,
                [childTab]: [...prevTabItems?.children?.[childTab] ?? [], data]
              }
            }) : prevTabItems)
          }
        }) : prevTabsItem
      )
    )
  }
  const handleAddNewBlockButtonItems = (data, parentTab, childTab, title) => {
    setActionTabs((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.tabpath === currentMenu ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [parentTab]: prevTabsItem?.children?.[parentTab]?.map((prevTabItems) => prevTabItems?.title === title ? ({
              ...prevTabItems, children: {
                ...prevTabItems?.children,
                [childTab]: [...prevTabItems?.children?.[childTab] ?? [], data]
              }
            }) : prevTabItems)
          }
        }) : prevTabsItem
      )
    )
  }
  const handleAddNewButton = (data, tab) => {
    setActionBlocks((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.name === currentBlock ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tab]: [...prevTabsItem?.children?.[tab] ?? [], data]
          }
        }) : prevTabsItem
      )
    )
  }
  const handleAddNewGroup = (data, tab) => {
    setActionBlocks((prevTabs) =>
      prevTabs?.map((prevTabsItem) =>
        prevTabsItem?.name === currentBlock ? ({
          ...prevTabsItem,
          children: {
            ...prevTabsItem?.children,
            [tab]: [...prevTabsItem?.children?.[tab] ?? [], data]
          }
        }) : prevTabsItem
      )
    )
  }
  const activeTabDetails = actionTabs?.find((tabItem) => {
    if (tabItem?.children?.sub_tabs) {
      return tabItem?.children?.sub_tabs?.find((subTab) => subTab?.key === activeTab);
    }
    return false;
  });
  const matchedSubTab = activeTabDetails
    ? activeTabDetails?.children?.sub_tabs?.find((subTab) => subTab?.key === activeTab)
    : null;
  const blockDetails = actionTabs?.find((tabItem) => {
    if (tabItem?.children?.blocks) {
      return tabItem?.children?.blocks?.find((blockData) => blockData?.id === clickedData?.id);
    }
    return false;
  });
  const matchedBlock = blockDetails
    ? blockDetails?.children?.blocks?.find((blockData) => blockData?.id === clickedData?.id)
    : null;

  // const visibleFields = addAvailableFields?.filter((fields) => !fields?.hidden) || [];
  // const columns = blockColumnData?.columns || 1;
  // const rows = blockRowData?.rows || 1;
  // const fieldsPerColumn = rows;
  // const totalFields = visibleFields?.length;
  // const totalColumns = Math.ceil(totalFields / fieldsPerColumn);

  // const getFieldsForColumn = (columnIndex) => {
  //   const start = columnIndex * fieldsPerColumn;
  //   const end = start + fieldsPerColumn;
  //   return visibleFields?.slice(start, end);
  // };

  // function getLabel(fieldName, fieldSource) {
  //   switch (fieldSource) {
  //     case "Free-Form Text":
  //       return fieldName;
  //     case "Decimal Number":
  //       return fieldName;
  //     case "Integer Number":
  //       return fieldName;
  //     case "Phone Number":
  //       return fieldName;
  //     case "Email Address":
  //       return fieldName;
  //     case "Date":
  //       return fieldName;
  //     case "List/Record":
  //       return fieldName;
  //     default:
  //       return "Text Input";
  //   }
  // }

  // function getComponent(fieldSource) {
  //   switch (fieldSource) {
  //     case "Free-Form Text":
  //       return <textarea />;
  //     case "Decimal Number":
  //       return <input type="number" step="0.01" />;
  //     case "Integer Number":
  //       return <input type="number" step="1" />;
  //     case "Phone Number":
  //       return <input type="tel" />;
  //     case "Email Address":
  //       return <input type="email" />;
  //     case "Date":
  //       return <DatePicker />;
  //     case "List/Record":
  //       return (
  //         <select>
  //           <option value="option1">Option 1</option>
  //           <option value="option2">Option 2</option>
  //         </select>
  //       );
  //     default:
  //       return <input type="text" />;
  //   }
  // }

  const [createFormData, setCreateFormData] = useState();
  const handleJsonData = () => {
    try {
      const pageContent = [];
      pageContent?.push(...actionButtons);
      pageContent?.push(...actionTabs);
      pageContent?.push(...actionIndicators);
      pageContent?.push(...actionBlocks);
      $ajax_post("post", "g/sb/create/save", {
        content: pageContent,
        id: pageId
      }, (res) => {
        setCreateFormData(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [getFormData, setGetFormData] = useState();
  const getJsonData = () => {
    try {
      $ajax_post("post", "g/sb/create/get", {
        id: pageId
      }, (res) => {
        setGetFormData(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJsonData();
  }, []);

  const [openTabSettings, setOpenTabSettings] = useState(false);
  const showTabSettingsDrawer = () => {
    setOpenTabSettings(true);
  };
  const closeTabSettingsDrawer = () => {
    setOpenTabSettings(false);
  };
  const { Option } = Select;
  let role = "super-admin"
  const [saveViewPrimaryRecords, setSaveViewPrimaryRecords] = useState([]);
  console.log({ saveViewPrimaryRecords })

  return (
    <>
      <div className="headerBottomBtn">
        <Header
          title="Ui Master >> Create"
        >
          <Flex className="w-100" justify="space-between" align="center">
            <Flex>
              {actionButtons
                ?.filter((btn) => btn?.display)
                ?.map((button) => (
                  <Button
                    className="btn btn-primary"
                    key={button?.id}
                    onClick={button?.onClick}
                  >
                    {button?.name}
                  </Button>
                ))}
            </Flex>
            <Flex align="center" className="ms-auto">
              <Flex className="ms-5" gap={15}>
                {actionIndicators
                  ?.filter((indicator) => indicator?.display)
                  .map((item) => (
                    <Flex className="badgeIndicator" key={item?.id}>
                      <div className="badgeText me-2">{item?.label}</div>
                      <Badge count={item?.count} showZero />
                    </Flex>
                  ))}
              </Flex>
              <Flex align="center" className="ms-5">
                <Tag icon={<CheckCircleOutlined />} color="success">success</Tag>
                <Button
                  className="btn me-0"
                >
                  Back to list
                </Button>
              </Flex>
              <Flex className="ms-5" justify="end">
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <Button
                    className="btn icon-btn me-0"
                    shape="circle"
                    icon={<MoreOutlined />}
                  />
                </Dropdown>
              </Flex>
            </Flex>
          </Flex>
        </Header>
      </div>
      <div className="createCard">
        <div className="mx-15 cardBoxMain cardContent">
          {actionBlocks
            ?.filter((block) => block?.display)
            ?.map((item) => {
              const items1 = [
                {
                  key: '1',
                  label: (
                    <Flex justify="space-between">
                      <Flex align="center">
                        <span>{item?.name} <Tag color="success">success</Tag></span>
                        <span onClick={() => {
                          showMasterBlockFieldSettingsDrawer(true);
                          handleClick(item);
                        }}><SettingOutlined /></span>
                      </Flex>
                      <Flex gap="small" wrap className="action" align="center">
                        <div>
                          {Object.keys(item?.children)?.map((childrenKey) => (
                            item?.children[childrenKey]?.length > 0 &&
                            <>
                              <div>
                                {childrenKey === "buttons" &&
                                  item?.children[childrenKey]
                                    ?.filter((btn) => btn?.display)
                                    ?.map((btnItem, idx) => (
                                      <Button
                                        className="action_button"
                                        key={idx}
                                      >
                                        {btnItem?.title}
                                      </Button>
                                    ))
                                }
                              </div>
                            </>
                          ))}
                        </div>
                      </Flex>
                    </Flex>
                  ),
                  children: (
                    <>
                      <div className="boxBorderBoxAll">
                        <Row gutter={10}>
                          {addAvailableFields
                            ?.filter((fields) => !fields?.hidden)
                            ?.map((field, index) => {
                              return (
                                <Col
                                  key={field?.id}
                                  span={blockColumnData?.columns ? 24 / blockColumnData?.columns : 24}
                                >
                                  {field?.field_source === "Free-Form Text" && (
                                    <FormControl label={field?.name}>
                                      <textarea rows={1} />
                                    </FormControl>
                                  )}
                                  {field?.field_source === "Decimal Number" && (
                                    <FormControl label={field?.name}>
                                      <input type="number" step="0.01" />
                                    </FormControl>
                                  )}
                                  {field?.field_source === "Integer Number" && (
                                    <FormControl label={field?.name}>
                                      <input type="number" step="1" />
                                    </FormControl>
                                  )}
                                  {field?.field_source === "Phone Number" && (
                                    <FormControl label={field?.name}>
                                      <input type="tel" />
                                    </FormControl>
                                  )}
                                  {field?.field_source === "Email Address" && (
                                    <FormControl label={field?.name}>
                                      <input type="email" />
                                    </FormControl>
                                  )}
                                  {field?.field_source === "Date" && (
                                    <FormControl label={field?.name}>
                                      <DatePicker />
                                    </FormControl>
                                  )}
                                  {field?.field_source === "List/Record" && (
                                    <FormControl label={field?.name}>
                                      <select>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                      </select>
                                    </FormControl>
                                  )}
                                  {!["Free-Form Text", "Decimal Number", "Integer Number", "Phone Number", "Email Address", "Date", "List/Record"].includes(field?.field_source) && (
                                    <FormControl label={field?.name}>
                                      <input type="text" />
                                    </FormControl>
                                  )}
                                </Col>
                              );
                            })}
                          {/* {Array.from({ length: totalColumns })?.map((_, columnIndex) => (
                            <Col key={columnIndex} span={24 / columns}>
                              {getFieldsForColumn(columnIndex)?.map((field) => (
                                <FormControl key={field?.id} label={getLabel(field?.name, field?.field_source)}>
                                  {getComponent(field?.field_source)}
                                </FormControl>
                              ))}
                            </Col>
                          ))} */}
                        </Row>
                      </div>
                      <div>
                        {Object.keys(item?.children)?.map((childrenKey) => (
                          item?.children[childrenKey]?.length > 0 &&
                          <>
                            <div className="mt-3">
                              {childrenKey === "groups" &&
                                item?.children[childrenKey]
                                  ?.filter((btn) => btn?.display)
                                  ?.map((btnItem, idx) => (
                                    <div className="groupsMain">
                                      <div className="groupsMain_header">{btnItem?.title}</div>
                                      <div className="groupsMain_body">
                                        <Row key={btnItem?.id}>
                                          <Col md={8}>
                                            {/* <div>{`${btnItem?.title} Content`}</div> */}
                                          </Col>
                                        </Row>
                                      </div>
                                    </div>
                                  ))
                              }
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  ),
                },
              ];
              return (
                <Collapse collapsible="icon" className="mb-2" key={item?.id} items={items1} defaultActiveKey={['1']} />
              );
            }
            )}
        </div>
      </div>
      <Flex align="center" className="cardContent">
        <TabNavigation
          isSetting
          tabId={currentMenu}
          menus={actionTabs?.filter((tab) => tab?.display !== false)}
          onClick={onMenuClick}
          onSettingClick={showTabSettingsDrawer}
        >
          <div className="container-fluid">
            {actionTabs?.map((actionTabItem) => (
              actionTabItem?.tabpath === currentMenu && (
                <div>
                  {Object.keys(actionTabItem?.children)?.map((childrenKey) => (
                    actionTabItem?.children[childrenKey]?.length > 0 &&
                    <>
                      <div className={childrenKey === "buttons" && actionTabItem?.children[childrenKey]?.length > 0 ? "mb-3" : ""}>
                        {childrenKey === "buttons" &&
                          actionTabItem?.children[childrenKey]
                            ?.filter((btn) => btn?.display)
                            ?.map((btnItem, idx) => (
                              <Button
                                className="btn m-0 btn-primary"
                                key={idx}
                              >
                                {btnItem?.name}
                              </Button>
                            ))
                        }
                      </div>
                      <div className={childrenKey === "sub_tabs" && actionTabItem?.children[childrenKey]?.length > 0 ? "mb-3" : ""}>
                        {childrenKey === "sub_tabs" &&
                          <Row justify="space-between">
                            <Col className="subTabs">
                              <Tabs
                                onChange={onChange}
                                items={actionTabItem?.children[childrenKey]?.filter((tab) => tab?.display !== false)}
                              />
                            </Col>
                            <Col>
                              <Flex gap={20} justify="end" align="end">
                                <Button
                                  onClick={() => { showSubTabSettingsDrawer(true); }}>
                                  <SettingOutlined />
                                </Button>
                              </Flex>
                            </Col>
                          </Row>
                        }
                      </div>
                      <div className={childrenKey === "blocks" && actionTabItem?.children[childrenKey]?.length > 0 ? "mb-3" : ""}>
                        {childrenKey === "blocks" &&
                          actionTabItem?.children[childrenKey]
                            ?.filter((block) => block?.display)
                            ?.map((item) => {
                              const items2 = [
                                {
                                  key: '1',
                                  label: (
                                    <Flex justify="space-between">
                                      <Flex align="center">
                                        <span>{item?.title} <Tag color="success">success</Tag></span>
                                        <span onClick={() => {
                                          showBlockFieldSettingsDrawer(true);
                                          setClickedData(item);
                                        }}><SettingOutlined /></span>
                                      </Flex>
                                      <Flex gap="small" wrap className="action" align="center">
                                        {item?.children?.buttons
                                          ?.filter((btn) => btn?.display)
                                          ?.map((btnItem, idx) => (
                                            <Button
                                              className="action_button"
                                              key={idx}
                                            >
                                              {btnItem?.title}
                                            </Button>
                                          ))}
                                      </Flex>
                                    </Flex>
                                  ),
                                  children: (
                                    <>
                                      <div className="boxBorderBoxAll">
                                        <Row gutter={10}>
                                          {addAvailableFieldsBlock
                                            ?.filter((fields) => !fields?.hidden)
                                            ?.map((field, index) => {
                                              return (
                                                <Col
                                                  key={field?.id}
                                                  span={tabBlockColumnData?.columns ? 24 / tabBlockColumnData?.columns : 24}
                                                >
                                                  {field?.field_source === "Free-Form Text" && (
                                                    <FormControl label={field?.name}>
                                                      <textarea rows={1} />
                                                    </FormControl>
                                                  )}
                                                  {field?.field_source === "Decimal Number" && (
                                                    <FormControl label={field?.name}>
                                                      <input type="number" step="0.01" />
                                                    </FormControl>
                                                  )}
                                                  {field?.field_source === "Integer Number" && (
                                                    <FormControl label={field?.name}>
                                                      <input type="number" step="1" />
                                                    </FormControl>
                                                  )}
                                                  {field?.field_source === "Phone Number" && (
                                                    <FormControl label={field?.name}>
                                                      <input type="tel" />
                                                    </FormControl>
                                                  )}
                                                  {field?.field_source === "Email Address" && (
                                                    <FormControl label={field?.name}>
                                                      <input type="email" />
                                                    </FormControl>
                                                  )}
                                                  {field?.field_source === "Date" && (
                                                    <FormControl label={field?.name}>
                                                      <DatePicker />
                                                    </FormControl>
                                                  )}
                                                  {field?.field_source === "List/Record" && (
                                                    <FormControl label={field?.name}>
                                                      <select>
                                                        <option value="option1">Option 1</option>
                                                        <option value="option2">Option 2</option>
                                                      </select>
                                                    </FormControl>
                                                  )}
                                                  {!["Free-Form Text", "Decimal Number", "Integer Number", "Phone Number", "Email Address", "Date", "List/Record"].includes(field?.field_source) && (
                                                    <FormControl label={field?.name}>
                                                      <input type="text" />
                                                    </FormControl>
                                                  )}
                                                </Col>
                                              );
                                            })}
                                        </Row>
                                      </div>
                                      <div>
                                        {item?.children?.groups
                                          ?.filter((group) => group?.display)
                                          ?.map((data) => (
                                            <div key={data?.id} className="groupsMain">
                                              <div className="groupsMain_header">{data?.title}</div>
                                              <div className="groupsMain_body">
                                                <Row>
                                                  <Col md={8}>
                                                    {/* <div>{`${data?.title} Content`}</div> */}
                                                  </Col>
                                                </Row>
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    </>
                                  ),
                                },
                              ];
                              return (
                                <Collapse collapsible="icon" className="mb-2" key={item?.id} items={items2} defaultActiveKey={['1']} />
                              );
                            }
                            )
                        }
                      </div>
                    </>
                  ))}
                </div>
              )
            ))}
          </div>
        </TabNavigation>
      </Flex>
      <Drawer
        title="Master Page Settings : Create Mode"
        width={850}
        onClose={onCloseShowMasterPageSettings}
        open={showMasterPageSettings}
        styles={{
          body: {
            paddingBottom: 50,
          },
        }}
        footer={
          <Flex align="center" justify="space-between">
            {activeTabKey === "1" && (
              <Popover
                trigger="click"
                placement="bottomLeft"
                content={
                  <div>
                    <FormControl label="Enter Button Label">
                      <Input
                        name="buttonLabel"
                        onBlur={(e) => {
                          setActionButtons((prevViews) => {
                            return [
                              ...prevViews,
                              {
                                id: (new Date().getTime()).toString(36),
                                name: e?.target?.value,
                                display: false,
                              },
                            ];
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                }
              >
                <Button
                  type="primary"
                  className="btn btn-primary"
                >
                  Add Button
                </Button>
              </Popover>
            )}
            {activeTabKey === "2" && (
              <Popover
                trigger="click"
                placement="bottomLeft"
                content={
                  <div>
                    <FormControl label="Enter Tab Label">
                      <Input
                        name="tabLabel"
                        onBlur={(e) => {
                          const formattedTabPath = e.target.value.toLowerCase().replace(/\s+/g, '-');
                          setActionTabs((prevViews) => {
                            return [
                              ...prevViews,
                              {
                                id: (new Date().getTime()).toString(36),
                                label: e?.target?.value,
                                display: false,
                                path: pathName,
                                tabpath: formattedTabPath,
                                children: {
                                  buttons: [],
                                  sub_tabs: [],
                                  blocks: [],
                                },
                              },
                            ];
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                }
              >
                <Button
                  type="primary"
                  className="btn btn-primary"
                >
                  Add Vertical Tab
                </Button>
              </Popover>
            )}
            {activeTabKey === "3" && (
              <Button
                type="primary"
                className="btn btn-primary"
              >
                Add Horizontal Tab
              </Button>
            )}
            {activeTabKey === "4" && (
              <Popover
                trigger="click"
                placement="bottomLeft"
                content={
                  <div>
                    <FormControl label="Enter Indicator Label - Count">
                      <Input
                        name="indicatorLabel"
                        // onBlur={(e) => {
                        //   const inputValue = e.target.value;
                        //   const [label, count] = inputValue.split('-');
                        //   if (label && count) {
                        //     setActionIndicators((prevViews) => {
                        //       return [
                        //         ...prevViews,
                        //         {
                        //           label: label.trim(),
                        //           count: parseInt(count.trim(), 10),
                        //           display: false,
                        //         },
                        //       ];
                        //     });
                        //   } else {
                        //     alert('Please enter the input in this format : Label - Count');
                        //   }
                        // }}
                        onBlur={(e) => {
                          setActionIndicators((prevViews) => {
                            return [
                              ...prevViews,
                              {
                                id: (new Date().getTime()).toString(36),
                                label: e?.target?.value,
                                count: 0,
                                display: false,
                              },
                            ];
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                }
              >
                <Button
                  type="primary"
                  className="btn btn-primary"
                >
                  Add Indicator
                </Button>
              </Popover>
            )}
            {activeTabKey === "5" && (
              <Popover
                trigger="click"
                placement="bottomLeft"
                content={
                  <div>
                    <FormControl label="Enter Block Label">
                      <Input
                        name="blockLabel"
                        onBlur={(e) => {
                          setActionBlocks((prevViews) => {
                            return [
                              ...prevViews,
                              {
                                id: (new Date().getTime()).toString(36),
                                name: e?.target?.value,
                                display: false,
                                children: {
                                  buttons: [],
                                  groups: [],
                                },
                              },
                            ];
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                }
              >
                <Button
                  type="primary"
                  className="btn btn-primary"
                >
                  Add Block
                </Button>
              </Popover>
            )}
            <Button
              type="primary"
              className="btn btn-primary"
              onClick={handleJsonData}
            >
              Save
            </Button>
          </Flex>
        }
      >
        <div className="settingsInfo">
          <ul>
            <li>
              <span>Screen Name :</span> <span>Defaulted ( Non Editable )</span>
            </li>
            <li>
              <span>Form Name :</span> <span>Customer ( Editable )</span>
            </li>
            <li>
              <span>Primary Record :</span>
              &nbsp;&nbsp;
              <div className="control-group">
                <div className="controls">
                  <Select
                    name="field"
                    className="form-control select2Min"
                    placeholder="Select Primary Record"
                    readOnly={
                      role !== "super-admin" && role !== "power-user"
                    }
                    disabled={
                      role !== "super-admin" && role !== "power-user"
                    }
                    defaultValue={saveViewPrimaryRecords?.internalid}
                    onChange={(value) => {
                      let thisRecord = recordsList?.find(
                        (record) => record?.internalid === value
                      );
                      fetchScreens(thisRecord?.internalid);
                      setSaveViewPrimaryRecords(thisRecord)
                    }}
                  >
                    {recordsList?.map?.((record) => (
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
            </li>
            <li>
              <span>Created By :</span> <span>#</span>
            </li>
            <li>
              <span>Created On :</span> <span>#</span>
            </li>
            <li>
              <span>Last Modified By :</span> <span>#</span>
            </li>
            <li>
              <span>Last Modified On :</span> <span>#</span>
            </li>
            <li>
              <span>Mode :</span> <span>Create</span>
            </li>
            <li>
              <span>Path :</span> <span>abc/xyz</span>
            </li>
          </ul>
        </div>
        <div className="commonTabs">
          <Tabs
            defaultActiveKey="1"
            items={threeDotsDrawerMenu}
            style={{ width: "100%" }}
            onChange={(key) => setActiveTabKey(key)}
          />
        </div>
      </Drawer>
      <TabSettings
        setTabBlockColumnData={setTabBlockColumnData}
        openTabSettings={openTabSettings}
        closeTabSettingsDrawer={closeTabSettingsDrawer}
        currentMenu={currentMenu}
        currentMenuDetails={actionTabs?.find((tabItem) => tabItem?.tabpath === currentMenu)}
        setActionTabs={setActionTabs}
        handleAddNewButtonItems={handleAddNewButtonItems}
        handleAddNewSubTabItems={handleAddNewSubTabItems}
        handleAddNewBlockItems={handleAddNewBlockItems}
        deleteItemButtons={deleteItemButtons}
        deleteItemTab={deleteItemTab}
        deleteItemBlock={deleteItemBlock}
      />
      <BlockSettings
        currentMenu={currentMenu}
        currentMenuDetails={actionTabs?.find((tabItem) => tabItem?.tabpath === currentMenu)}
        setActionTabs={setActionTabs}
        handleAddNewBlockGroupItems={handleAddNewBlockGroupItems}
        handleAddNewBlockButtonItems={handleAddNewBlockButtonItems}
        clickedBlockDetails={matchedBlock}
        openBlockSettings={openBlockSettings}
        closeBlockSettingsDrawer={closeBlockSettingsDrawer}
        deleteItemGroup={deleteItemGroup}
        deleteItemButton={deleteItemButton}
      />
      <BlockFieldSettings
        addAvailableFields={addAvailableFieldsBlock}
        setAddAvailableFields={setAddAvailableFieldsBlock}
        recordsList={recordsList}
        fetchRecordsList={fetchRecords}
        showBlockSettingsDrawer={showBlockSettingsDrawer}
        openBlockFieldSettings={openBlockFieldSettings}
        closeBlockFieldSettingsDrawer={closeBlockFieldSettingsDrawer}
      />
      <SubTabSettings
        activeTab={activeTab}
        activeTabDetails={matchedSubTab}
        openSubTabSettings={openSubTabSettings}
        closeSubTabSettingsDrawer={closeSubTabSettingsDrawer}
      />
      <MasterBlockSettings
        setGroupColumnData={setGroupColumnData}
        currentBlock={currentBlock}
        currentBlockDetails={actionBlocks?.find((item) => item?.name === currentBlock)}
        setActionBlocks={setActionBlocks}
        handleAddNewButton={handleAddNewButton}
        handleAddNewGroup={handleAddNewGroup}
        openMasterBlockSettings={openMasterBlockSettings}
        closeMasterBlockSettingsDrawer={closeMasterBlockSettingsDrawer}
        deleteMasterGroup={deleteMasterGroup}
        deleteMasterButton={deleteMasterButton}
      />
      <MasterBlockFieldSettings
        showMasterBlockSettingsDrawer={showMasterBlockSettingsDrawer}
        openMasterBlockFieldSettings={openMasterBlockFieldSettings}
        closeMasterBlockFieldSettingsDrawer={closeMasterBlockFieldSettingsDrawer}
        addAvailableFields={addAvailableFields}
        setAddAvailableFields={setAddAvailableFields}
        recordsList={recordsList}
        fetchRecordsList={fetchRecords}
      />
    </>
  );
}

export default Create;
