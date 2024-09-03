import React, { useEffect, useState } from "react";

import {
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Dropdown,
  Flex,
  Tabs,
  Col,
  Badge,
  Switch,
  Popover,
  Tooltip,
} from "antd";

import {
  SettingOutlined,
  GroupOutlined,
  MoreOutlined,
  FilterOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  EditFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import {
  addGroupByFieldAction,
  saveViewConfig,
  saveVisibleFilters,
  selectViewConfig,
} from "../../../../utils/redux/ViewConfigSlice/index.slice";
import {
  $ajax_post,
  CrGridTable,
  FormControl,
} from "../../../../Library/Library";
import Header from "../../../../Components/Header";
import DnDSortableList from "../../../../Components/DnDSortableList";

import ViewSettingDrawer from "./ViewSettingDrawer";
import ModifyViewSettingDrawer from "./ModifyViewSettingsDrawer";
import Filters from "./Filters";
import "jspdf-autotable";
import { hexToRgb } from "../../../../utils/helpers";

const { Option } = Select;

const List = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  const { screenid } = useParams();
  const [open, setOpen] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [modifyViewDrawer, setModifyViewDrawer] = useState(false);
  const [views, setViews] = useState([]);
  const [currentView, setCurrentView] = useState(null);
  const [viewCreateForm, setViewCreateForm] = useState({});
  const [tabItems, setTabItems] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      headerClass: `nameHeaderStyle`,
    },
    {
      headerName: "Status",
      field: "status",
      headerClass: `statusHeaderStyle`,
    },
  ]);
  const [rowData, setRowData] = useState([]);
  const [showViewSettings, setShowViewSettings] = useState(false);
  const [managePageSettings, setManagePageSettings] = useState(false);
  const [columnGroupingDrawer, setColumnGroupingDrawer] = useState(false);
  const role = "super-admin";

  const [actionButtons, setActionButtons] = useState([
    {
      id: "1",
      name: "Edit",
      display: true,
    },
    {
      id: "2",
      name: "Delete",
      display: true,
    },
    {
      id: "3",
      name: "View",
      display: true,
    },
    {
      id: "4",
      name: "Print",
      display: true,
    },
  ]);
  const [threeDotsDrawerActiveKey, setThreeDotsDrawerActiveKey] = useState("1");
  const [gridApi, setGridApi] = useState(null);
  const [headerColors, setHeaderColors] = useState({});
  const [currentScreen, setCurrentScreen] = useState(null);
  const [recordsList, setRecordsList] = useState([]);
  const [fetchingViews, setFetchingViews] = useState(false);
  const viewConfig = useSelector(selectViewConfig);
  const [fetchingViewConfig, setFetchingViewConfig] = useState(false);
  const [groupByFields, setGroupByFeilds] = useState(
    viewConfig?.json?.groupByFields ?? []
  );
  const {
    json: { availableFields, visibleFilters },
  } = viewConfig;
  const dispatch = useDispatch();

  const [excelStyles, setExcelStyles] = useState([
    {
      id: "commonHeaderStyle",
      interior: {
        color: null, // default color
        pattern: "Solid",
        padding: "50px",
      },
    },
  ]);

  // Function to dynamically update header color
  const setHeaderColorStyle = (hColors) => {
    let headerColorStyles = Object.keys(hColors).map((field) => ({
      id: `headerStyle_${field}`,
      interior: {
        color: hColors[field].replace("#", ""), // Remove the '#' for Excel RGB format
        pattern: "Solid",
      },
    }));
    headerColorStyles = headerColorStyles?.map((headerColorStyle) => {
      let existing = excelStyles?.find(
        (style) => style?.id === headerColorStyle?.id
      );
      if (existing) {
        return {
          ...existing,
          interior: {
            ...existing?.interior,
            ...headerColorStyle?.interior,
          },
        };
      } else return headerColorStyle;
    });
    setExcelStyles(headerColorStyles);
  };

  const getRowsToExport = () => {
    const columns = gridApi.getAllDisplayedColumns();

    const getCellToExport = (column, node) =>
      gridApi.getValue(column, node) ?? "";

    const rowsToExport = [];
    gridApi.forEachNodeAfterFilterAndSort((node) => {
      const rowToExport = columns.map((column) =>
        getCellToExport(column, node)
      );
      rowsToExport.push(rowToExport);
    });

    return rowsToExport;
  };

  const getHeaderToExport = () => {
    const columns = gridApi.getAllDisplayedColumns();
    return columns.map((column) => ({
      headerName: column.getColDef().headerName,
      field: column.getColId(),
    }));
  };

  const exportToPDF = async () => {
    const headerRow = getHeaderToExport();
    const rows = getRowsToExport();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([800, 600]);

    const tableTop = 550;
    const tableLeft = 50;
    const cellPadding = 5;
    const cellHeight = 25;
    const cellWidth = 150;

    const headerKeys = headerRow.map((header) => ({
      name: header.headerName,
      field: header.field,
    }));
    // Draw table headers with colors
    headerRow.forEach((header, index) => {
      const headerKey = headerKeys?.find(
        (head) => head?.name === header?.headerName
      )?.field;
      const hexColor = headerColors[headerKey];

      const [r, g, b] = hexToRgb(hexColor || "#000000");

      page.drawRectangle({
        x: tableLeft + index * cellWidth,
        y: tableTop,
        width: cellWidth,
        height: cellHeight,
        color: hexColor ? rgb(r / 255, g / 255, b / 255) : rgb(1, 1, 1),
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      page.drawText(header.headerName, {
        x: tableLeft + index * cellWidth + cellPadding,
        y: tableTop + cellPadding,
        size: 12,
        color: rgb(0, 0, 0),
      });
    });

    // Draw table rows
    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        page.drawRectangle({
          x: tableLeft + colIndex * cellWidth,
          y: tableTop - (rowIndex + 1) * cellHeight,
          width: cellWidth,
          height: cellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });

        page.drawText(cell, {
          x: tableLeft + colIndex * cellWidth + cellPadding,
          y: tableTop - (rowIndex + 1) * cellHeight + cellPadding,
          size: 12,
          color: rgb(0, 0, 0),
        });
      });
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Trigger download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported.pdf";
    link.click();
  };

  const exportExcel = () => {
    // const gridApi = ref.current.api;
    gridApi.exportDataAsExcel();
  };

  const fetchScreens = async () => {
    try {
      $ajax_post("post", "g/sb/1000", {}, (res) => {
        setCurrentScreen(res?.[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScreenFields = async () => {
    try {
      $ajax_post("post", "g/sb/1002", {}, (res) => {
        console.log("res", res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecordsData = async (fixedFilters) => {
    try {
      $ajax_post(
        "post",
        "g/sb/1008",
        {
          json: {
            ...viewConfig?.json,
            fixedFilters: fixedFilters ?? viewConfig?.json?.fixedFilters,
          },
          screenid,
          // screenname: "Application",
          viewname: currentView?.name,
          filename: currentView?.filename,
        },
        (res) => {
          setRowData(res);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentViewConfig = async () => {
    setFetchingViewConfig(true);
    try {
      $ajax_post(
        "post",
        "g/sb/1007",
        {
          screenid,
          screenname: "Application",
          viewname: currentView?.name,
          filename: currentView?.filename,
        },
        (res) => {
          setFetchingViewConfig(false);
          dispatch(
            saveViewConfig({
              name: currentView?.name,
              json: {
                ...res,
              },
            })
          );
        }
      );
    } catch (error) {
      setFetchingViewConfig(false);
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

  const fetchAllViews = async () => {
    setFetchingViews(true);
    try {
      $ajax_post(
        "post",
        "g/sb/1010",
        {
          screenid,
        },
        (res) => {
          setViews(res?.map((view) => ({ ...view, viewType: "list" })));
          setCurrentView({ ...res?.[0], viewType: "list" });
          setFetchingViews(false);
        }
      );
    } catch (error) {
      setFetchingViews(false);
      console.log(error);
    }
  };

  const createView = async () => {
    try {
      setOpen(false);
      $ajax_post(
        "post",
        "g/sb/1009",
        {
          ...viewCreateForm,
          screenid,
        },
        (res) => {
          if (res) {
            setViewCreateForm({});
            fetchAllViews();
          }
        }
      );
    } catch (error) {
      setViewCreateForm({});
      setOpen(false);
      console.log(error);
    }
  };

  const onFiltersApplied = (filterQuery) => {
    fetchRecordsData(JSON.parse(filterQuery));
  };

  useEffect(() => {
    fetchScreens();
  }, []);
  useEffect(() => {
    if (currentScreen) {
      fetchScreenFields();
      fetchRecords();
    }
  }, [currentScreen]);
  useEffect(() => {
    if (currentView) {
      getCurrentViewConfig();
    }
  }, [currentView]);
  useEffect(() => {
    if (columnDefs?.length > 0) {
      dispatch(
        saveVisibleFilters(
          columnDefs?.map((col) => ({
            field: col?.field,
            label: col?.headerName,
            type: "text",
            value: "",
          }))
        )
      );
      if (currentView) fetchRecordsData();
    }
  }, [columnDefs]);
  useEffect(() => {
    if (screenid) {
      fetchAllViews();
    }
  }, [screenid]);
  useEffect(() => {
    if (gridApi && groupByFields?.length > 0) {
      gridApi.setRowGroupColumns(groupByFields);
      dispatch(addGroupByFieldAction(groupByFields));
    }
  }, [groupByFields, gridApi]);

  const onGridReady = (params) => {
    Object.keys(headerColors).forEach((field) => {
      const headerElement = document.querySelector(`[col-id="${field}"] `);
      if (headerElement) {
        headerElement.style.backgroundColor = headerColors[field];
      }
    });
    setGridApi(params?.api);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFilterDrawerShow = () => {
    setFilterDrawer(true);
  };
  const onColumnsDrawerShow = () => {
    setModifyViewDrawer(true);
  };

  useEffect(() => {
    setColumnDefs(
      availableFields
        ?.filter((field) => !field?.hidden)
        ?.map((field) => {
          let id = field?.scriptid;
          if (field?.field_source === "List/Record") {
            id += "Text";
          }
          return {
            field: id,
            headerName: field?.name,
            headerClass: `headerStyle_${id}`,
          };
        })
    );

    setExcelStyles(
      availableFields
        ?.filter((field) => !field?.hidden)
        ?.map((field) => {
          let id = field?.scriptid;
          if (field?.field_source === "List/Record") {
            id += "Text";
          }
          return {
            id: `headerStyle_${id}`,
            alignment: {
              horizontal: "Center",
              vertical: "Center",
            },
            font: { bold: true },
          };
        })
    );
  }, [availableFields]);

  const onManageSequenceShow = () => {
    setManagePageSettings(true);
  };

  const onCloseManagePageSettings = () => {
    setManagePageSettings(false);
  };

  const hideShowViews = (display, view) => {
    setViews((prevViews) => {
      return prevViews.map((prevView) => {
        if (prevView.name === view?.name) {
          return {
            ...prevView,
            hide: !display,
          };
        }
        return prevView;
      });
    });
  };
  useEffect(() => {
    if (views && views?.length > 0) {
      setTabItems(
        views
          ?.filter((view) => !view?.hide)
          ?.map((view) => ({ key: view?.name, label: view?.name }))
      );
      if (!currentView) {
        setCurrentView(views?.[0]);
      }
    }
  }, [views]);

  const getMenuItems = () => {
    let items = [
      {
        key: "1",
        label: (
          <a onClick={() => setShowViewSettings(true)}>Records and Fields</a>
        ),
      },
      {
        key: "5",
        label: (
          <a rel="noopener noreferrer" href="/">
            load more
          </a>
        ),
      },
      {
        key: "6",
        label: <a onClick={exportExcel}>export to excel</a>,
      },
      {
        key: "7",
        label: <a onClick={exportToPDF}>export to pdf</a>,
      },
      {
        key: "8",
        label: <a onClick={onColumnsDrawerShow}>Modify View Settings</a>,
      },
    ];

    if (role === "super-admin") {
      items = [
        ...items,

        {
          key: "2",
          label: <a onClick={onManageSequenceShow}>Manage Page Settings</a>,
        },
      ];
    }

    if (role === "power-user") {
      items = [
        ...items,
        {
          key: "2",
          label: <a onClick={onManageSequenceShow}>Manage Page Settings</a>,
        },
      ];
    }
    return items;
  };

  const deleteActionButtons = (button) => {
    setActionButtons((prevButtons) => {
      return prevButtons.filter(
        (prevButton) => prevButton?.name !== button?.name
      );
    });
  };
  const handleSelectChange = (value, name) => {
    //  alert(name)
    setViewCreateForm((prevViewCreateForm) => ({
      ...prevViewCreateForm,
      [name]: value,
    }));
  };

  const onViewChange = (key) => {
    let newView = views?.find((view) => view?.name === key);
    setCurrentView(newView);
  };
  const threeDotsDrawerMenu = [
    {
      key: "1",
      label: <span>Tab Sequence</span>,
      children: (
        <div className="mt-4">
          <DnDSortableList
            items={views}
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
                        {/* <FormRow> */}
                        <FormControl label="Edit View Name">
                          <Input
                            onBlur={(e) => {
                              setViews((prevViews) => {
                                const updatedViews = prevViews?.map((view) => {
                                  if (view?.name === listItem?.name) {
                                    return {
                                      ...view,
                                      name: e?.target?.value,
                                    };
                                  }
                                  return view;
                                });
                                return updatedViews;
                              });
                            }}
                            name=""
                            defaultValue={listItem?.name}
                          />
                        </FormControl>
                      </div>
                    }
                  >
                    <Tooltip title="Edit View Name">
                      <EditFilled />
                    </Tooltip>
                  </Popover>

                  <Switch
                    size="small"
                    defaultChecked
                    onChange={(value) => hideShowViews(value, listItem)}
                  />
                </Flex>
              </Flex>
            )}
            onDragEnd={({ active, over }) => {
              setViews((prevViews) => {
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
      label: <span>Button Sequence</span>,
      children: (
        <div className="mt-4">
          <DnDSortableList
            items={[
              ...actionButtons.filter((btn) => btn?.display),
              ...actionButtons.filter((btn) => !btn?.display),
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
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
                                  listItem?.name === button?.name
                                    ? { ...button, [name]: value }
                                    : button
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormControl label="Source">
                          <Input
                            name="source"
                            defaultValue={listItem?.source}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
                                  listItem?.name === button?.name
                                    ? { ...button, [name]: value }
                                    : button
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormControl label="Api">
                          <Input
                            name="api"
                            defaultValue={listItem?.api}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
                                  listItem?.name === button?.name
                                    ? { ...button, [name]: value }
                                    : button
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormControl label="Created On">
                          <Input
                            name="createdOn"
                            defaultValue={listItem?.createdOn}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
                                  listItem?.name === button?.name
                                    ? { ...button, [name]: value }
                                    : button
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormControl label="Created By">
                          <Input
                            name="createdBy"
                            defaultValue={listItem?.createdBy}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
                                  listItem?.name === button?.name
                                    ? { ...button, [name]: value }
                                    : button
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormControl label="Last Modified On">
                          <Input
                            name="lastModifiedOn"
                            defaultValue={listItem?.lastModifiedOn}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
                                  listItem?.name === button?.name
                                    ? { ...button, [name]: value }
                                    : button
                                )
                              );
                            }}
                          />
                        </FormControl>
                        <FormControl label="Last Modified By">
                          <Input
                            name="lastModifiedBy"
                            defaultValue={listItem?.lastModifiedBy}
                            onChange={(e) => {
                              const { name, value } = e.target;

                              // Update actionButtons state
                              setActionButtons((prevButtons) =>
                                prevButtons.map((button) =>
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
                        return prevViews.map((btn) => {
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
      key: "3",
      label: <span>Other Settings</span>,
    },
  ];
  const settingsMenu = [
    {
      key: "1",
      label: <span onClick={showDrawer}>Add View</span>,
    },
    {
      key: "2",
      label: <span>Page Settings</span>,
    },
  ];
  return (
    <section
      className={`mainSection uiMasterPage ${isToggled ? "headerExpand" : "headerCollapse"}`}
    >
      <Header
        title="Ui Master >> List"
        extaContent={
          <>
            <Flex align="center" justify="space-between">
              <Flex align="center">
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
              <Flex gap={8}>
                <Badge count={11} showZero color="#faad14" />
                <Badge count={25} />
              </Flex>
            </Flex>
            <button
              type="primary"
              onClick={handleChange}
              className="headerHoverBtn"
            >
              {isToggled ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </button>

            {views && views?.length > 0 && (
              <>
                <div
                  className={`customCollapse ${
                    isToggled ? "customCollapse_show" : "customCollapse_hide"
                  }`}
                >
                  <Flex>
                    <Row gutter={16}>
                      {visibleFilters?.map((filter) => (
                        <Col key={filter?.field} md={6}>
                          <FormControl label={filter?.label}>
                            <Select name="value" defaultValue={filter?.value} />
                          </FormControl>
                        </Col>
                      ))}
                    </Row>
                  </Flex>
                </div>
              </>
            )}
          </>
        }
      />
      {/* <HoverTabs /> */}
      {fetchingViews ? (
        <div>Fetching Views . . .</div>
      ) : (
        views &&
        views?.length > 0 && (
          <>
            <Flex justify="space-between" justify-content="between">
              <div className="commonTabs">
                <Tabs
                  activeKey={currentView?.name}
                  onChange={onViewChange}
                  defaultActiveKey="1"
                  items={tabItems}
                />

                <>
                  <Tooltip title="Filters">
                    <Button
                      shape="circle"
                      className="filterBtn"
                      onClick={() => onFilterDrawerShow()}
                    >
                      <FilterOutlined />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Column Grouping">
                    <Button
                      shape="circle"
                      className="filterBtn"
                      onClick={() => setColumnGroupingDrawer(true)}
                    >
                      <GroupOutlined />
                    </Button>
                  </Tooltip>
                  <Dropdown
                    menu={{
                      items: getMenuItems(),
                    }}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button
                      shape="circle"
                      className="filterBtn filterBtn-btnRight"
                    >
                      <MoreOutlined />
                    </Button>
                  </Dropdown>
                </>
              </div>
            </Flex>
            {fetchingViewConfig ? (
              <div>Fetching View Configurations . . .</div>
            ) : (
              <div className="mt-3">
                {currentView?.viewType === "list" &&
                (!columnDefs || columnDefs?.length <= 0) ? (
                  <div>No Fields Selected</div>
                ) : (
                  <CrGridTable
                    columnDefs={columnDefs}
                    rowData={rowData}
                    onGridReady={onGridReady}
                    style={{
                      height: isToggled
                        ? "calc(100vh - 260px)"
                        : "calc(100vh - 200px)",
                      width: "100%",
                    }}
                    exportExcel={exportExcel}
                    excelStyles={excelStyles}
                  />
                )}
                {currentView?.viewType !== "list" && (
                  <h1>{currentView?.viewType}</h1>
                )}
              </div>
            )}
            <Filters
              filterDrawer={filterDrawer}
              setFilterDrawer={setFilterDrawer}
              setRowData={setRowData}
              onFiltersApplied={onFiltersApplied}
              defaultQuery={JSON.stringify(viewConfig?.json?.fixedFilters)}
            />
          </>
        )
      )}
      <Drawer
        title="Add New"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 50,
          },
        }}
        footer={
          <div
            style={{
              textAlign: "right",
              padding: "11px 0",
            }}
          >
            <Button
              onClick={onClose}
              className="btn"
              style={{ marginRight: 10 }}
            >
              Cancel
            </Button>
            <Button onClick={createView} className="btn btn-primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          onChange={(event) => {
            const { name, value } = event.target;
            setViewCreateForm((prevViewCreateForm) => ({
              ...prevViewCreateForm,
              [name]: value,
            }));
          }}
        >
          <Row>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Name</label>
                <div className="controls">
                  <Input
                    name="name"
                    className="form-control"
                    placeholder="Please enter name"
                  />
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">File Name</label>
                <div className="controls">
                  <Input
                    name="filename"
                    className="form-control"
                    placeholder="Please enter file name"
                  />
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Purpose</label>
                <div className="controls">
                  <TextArea
                    name="purpose"
                    className="form-control"
                    rows={4}
                    placeholder="Please enter purpose"
                  />
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">View Type</label>
                <div className="controls">
                  <Select
                    name="viewType"
                    className="form-control"
                    placeholder="Please choose the view type"
                    onChange={(value) => handleSelectChange(value, "viewType")}
                  >
                    <Option value="list">List</Option>
                    <Option value="kanban">Kanban</Option>
                    <Option value="matrix">Matrix</Option>
                    <Option value="calendar">Calendar</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Data Source</label>
                <div className="controls">
                  <Select
                    name="dataSource"
                    onChange={(value) =>
                      handleSelectChange(value, "dataSource")
                    }
                    className="form-control"
                    placeholder="Please select data source"
                  >
                    <Option value="source1">Source 1</Option>
                    <Option value="source2">Source 2</Option>
                    <Option value="source3">Source 3</Option>
                    <Option value="source4">Source 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Roles Access</label>
                <div className="controls">
                  <Select
                    name="rolesAccess"
                    onChange={(value) =>
                      handleSelectChange(value, "rolesAccess")
                    }
                    className="form-control"
                    placeholder="Please select roles access"
                  >
                    <Option value="role1">Role 1</Option>
                    <Option value="role2">Role 2</Option>
                    <Option value="role3">Role 3</Option>
                    <Option value="role4">Role 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">User Access</label>
                <div className="controls">
                  <Select
                    name="userAccess"
                    onChange={(value) =>
                      handleSelectChange(value, "userAccess")
                    }
                    className="form-control"
                    placeholder="Please select user access"
                  >
                    <Option value="access1">Access 1</Option>
                    <Option value="access2">Access 2</Option>
                    <Option value="access3">Access 3</Option>
                    <Option value="access4">Access 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Status</label>
                <div className="controls">
                  <Select
                    name="status"
                    onChange={(value) => handleSelectChange(value, "status")}
                    className="form-control"
                    placeholder="Please select status"
                    defaultActiveFirstOption="notpublished"
                  >
                    <Option value="published">Published</Option>
                    <Option value="notpublished">Not Published</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Created By</label>
                <div className="controls">
                  <Select
                    name="createdBy"
                    onChange={(value) => handleSelectChange(value, "createdBy")}
                    className="form-control"
                    placeholder="Please select created by"
                  >
                    <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option>
                    <Option value="user4">User 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Created On</label>
                <div className="controls">
                  <Select
                    name="createdOn"
                    onChange={(value) => handleSelectChange(value, "createdOn")}
                    className="form-control"
                    placeholder="Please select created on"
                  >
                    <Option value="date1">Date 1</Option>
                    <Option value="date2">Date 2</Option>
                    <Option value="date3">Date 3</Option>
                    <Option value="date4">Date 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Last Modified By</label>
                <div className="controls">
                  <Select
                    name="lastModifiedBy"
                    onChange={(value) =>
                      handleSelectChange(value, "lastModifiedBy")
                    }
                    className="form-control"
                    placeholder="Please select last modified by"
                  >
                    <Option value="user1">User 1</Option>
                    <Option value="user2">User 2</Option>
                    <Option value="user3">User 3</Option>
                    <Option value="user4">User 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="control-group labelleft">
                <label className="control-label">Last Modified On</label>
                <div className="controls">
                  <Select
                    name="lastModifiedOn"
                    onChange={(value) =>
                      handleSelectChange(value, "lastModifiedOn")
                    }
                    className="form-control"
                    placeholder="Please select last modified on"
                  >
                    <Option value="control1">Control 1</Option>
                    <Option value="control2">Control 2</Option>
                    <Option value="control3">Control 3</Option>
                    <Option value="control4">Control 4</Option>
                  </Select>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        title="Column Grouping"
        width={720}
        onClose={() => {
          setColumnGroupingDrawer(false);
        }}
        open={columnGroupingDrawer}
        styles={{
          body: {
            paddingBottom: 50,
          },
        }}
      >
        <div>
          <Form
            onChange={(event) => {
              const { name, value } = event.target;
              setViewCreateForm((prevViewCreateForm) => ({
                ...prevViewCreateForm,
                [name]: value,
              }));
            }}
          >
            <Row>
              <Col span={24}>
                <div className="control-group labelleft">
                  <label className="control-label">Group By</label>
                  <div className="controls">
                    <Select
                      name="name"
                      className="form-control"
                      options={columnDefs?.map((column) => ({
                        label: column.headerName,
                        value: column.field,
                      }))}
                      defaultValue={groupByFields?.[0]}
                      onChange={(value) => {
                        setGroupByFeilds([value]);
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div className="control-group labelleft">
                  <label className="control-label">Sub Group By (1)</label>
                  <div className="controls">
                    <Select
                      name="filename"
                      className="form-control"
                      options={columnDefs?.map((column) => ({
                        label: column.headerName,
                        value: column.field,
                      }))}
                      defaultValue={groupByFields?.[1]}
                      onChange={(value) => {
                        setGroupByFeilds((prevGroupByFields) => {
                          if (prevGroupByFields?.length > 1)
                            return prevGroupByFields?.map(
                              (prevGroupByField, index) => {
                                if (index === 1) {
                                  return value;
                                }
                                return prevGroupByField;
                              }
                            );
                          return [...prevGroupByFields, value];
                        });
                      }}
                      disabled={groupByFields?.length < 1}
                    />
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div className="control-group labelleft">
                  <label className="control-label">Sub Group By (2)</label>
                  <div className="controls">
                    <Select
                      name="filename"
                      className="form-control"
                      options={columnDefs?.map((column) => ({
                        label: column.headerName,
                        value: column.field,
                      }))}
                      defaultValue={groupByFields?.[2]}
                      onChange={(value) => {
                        setGroupByFeilds((prevGroupByFields) => {
                          if (prevGroupByFields?.length > 2)
                            return prevGroupByFields?.map(
                              (prevGroupByField, index) => {
                                if (index === 2) {
                                  return value;
                                }
                                return prevGroupByField;
                              }
                            );
                          return [...prevGroupByFields, value];
                        });
                      }}
                      disabled={groupByFields?.length < 2}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Drawer>
      <ModifyViewSettingDrawer
        currentView={currentView}
        visibleFilters={visibleFilters}
        handleSelectChange={handleSelectChange}
        columnDefs={columnDefs}
        modifyViewDrawer={modifyViewDrawer}
        setModifyViewDrawer={setModifyViewDrawer}
        setColumnDefs={setColumnDefs}
        setHeaderColors={setHeaderColors}
        setHeaderColorStyle={setHeaderColorStyle}
      />
      <ViewSettingDrawer
        recordsList={recordsList}
        setShowViewSettings={setShowViewSettings}
        showViewSettings={showViewSettings}
        currentView={currentView}
        availableFields={availableFields}
        fetchRecordsList={fetchRecords}
      />
      <Drawer
        title="Manage Page Settings"
        width={720}
        onClose={onCloseManagePageSettings}
        open={managePageSettings}
        styles={{
          body: {
            paddingBottom: 50,
          },
        }}
        footer={
          <>
            <Flex align="center" justify="end">
              <Popover
                placement="topRight"
                trigger="click"
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
                                name: e?.target?.value,
                              },
                            ];
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                }
              >
                <Button type="primary">Add Button</Button>
              </Popover>
            </Flex>
          </>
        }
      >
        <div className="commonTabs">
          <Tabs
            defaultActiveKey="1"
            items={threeDotsDrawerMenu}
            style={{ width: "100%" }}
            onChange={(key) => setThreeDotsDrawerActiveKey(key)}
            activeKey={threeDotsDrawerActiveKey}
          />
        </div>
      </Drawer>
      <Dropdown
        className="bottomDropDown"
        menu={{
          items: settingsMenu,
        }}
        placement="bottomRight"
        arrow
      >
        <Button>
          Settings
          <SettingOutlined />
        </Button>
      </Dropdown>
    </section>
  );
};

export default List;

const { TabPane } = Tabs;
