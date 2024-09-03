import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Drawer,
  Flex,
  Input,
  Row,
  Select,
  Tabs,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  addFilter,
  selectViewConfig,
} from "../../../../utils/redux/ViewConfigSlice/index.slice";
import { $ajax_post } from "../../../../Library/Library";

const getFieldTypeFilterOptions = (type) => {
  const filterOptions = {
    Text: [
      { value: "contains", label: "Contains" },
      { value: "notContains", label: "Not Contains" },
      { value: "equals", label: "Equals" },
      { value: "notEqual", label: "Not Equals" },
      { value: "startsWith", label: "Begins with" },
      { value: "endsWith", label: "Ends with" },
    ],
    Checkbox: [
      { value: "equals", label: "Equals" },
      { value: "notEqual", label: "Not Equals" },
    ],
    Dropdown: [
      { value: "anyOf", label: "Any of" },
      { value: "noneOf", label: "None of" },
    ],
    Date: [
      { value: "equals", label: "Equals" },
      { value: "notEqual", label: "Not Equals" },
      { value: "greaterThan", label: "After" },
      { value: "greaterThanOrEqual", label: "On or After" },
      { value: "lessThan", label: "Before" },
      { value: "lessThanOrEqual", label: "On or Before" },
      { value: "between", label: "Between" },
    ],
    Numeric: [
      { value: "equals", label: "Equals" },
      { value: "notEqual", label: "Not Equals" },
      { value: "greaterThan", label: "Greater than" },
      { value: "greaterThanOrEqual", label: "Greater than or equal to" },
      { value: "lessThan", label: "Less than" },
      { value: "lessThanOrEqual", label: "Less than or equal to" },
      { value: "endsWith", label: "Ends with" },
    ],
    "Long Text": [
      { value: "contains", label: "Contains" },
      { value: "notContains", label: "Not Contains" },
      { value: "equals", label: "Equals" },
      { value: "notEqual", label: "Not Equals" },
    ],
    // Continue this pattern for other field types based on the PDF.
  };

  if (type === "List/Record") {
    return filterOptions.Dropdown; // Assuming List/Record uses Dropdown filters
  } else if (
    type === "Currency" ||
    type === "Decimal Number" ||
    type === "Time of Day"
  ) {
    return filterOptions.Numeric;
  } else if (type === "Date") {
    return filterOptions.Date;
  } else if (type === "Box") {
    return filterOptions.Checkbox; // Assuming Box refers to a Checkbox
  } else if (
    type === "Email Address" ||
    type === "Phone Number" ||
    type === "Free-Form Text" ||
    type === "Long Text" ||
    type === "Password" || // Assuming "Password" instead of "Password Percent"
    type === "Percent" || // Splitting "Password Percent" into "Password" and "Percent"
    type === "Text Area" ||
    type === "Rich Text"
  ) {
    return filterOptions.Text; // Assuming these use Text filters
  } else if (type === "Multi Select") {
    return filterOptions.Dropdown; // Assuming Multi Select uses Dropdown filters
  }

  // Default case if no match is found
  return [];
};

export default function Filters({
  filterDrawer,
  setFilterDrawer,
  setRowData,
  onFiltersApplied,
  defaultQuery,
}) {
  const [filterStructure, setFilterStructure] = useState([]);
  const [filterQuery, setFilterQuery] = useState(defaultQuery ?? null);
  const viewConfig = useSelector(selectViewConfig);
  const {
    json: { filters = { fixed: [], custom: [] }, availableFields },
  } = viewConfig;
  const dispatch = useDispatch();
  const [addNewFixedFilter, setAddNewFixedFilter] = useState(false);
  const [useExpression, setUseExpression] = useState(false);
  const [useQuery, setUseQuery] = useState(false);

  const onChangeFilterField = (newField, existingField) => {
    if (!existingField) {
      dispatch(
        addFilter({
          fixed: [...filters.fixed, { field: newField }],
        })
      );
      setAddNewFixedFilter(false);
    } else {
      let index = filters.fixed.findIndex(
        (filter) => filter.field === existingField
      );
      let newFixedFilters = [...filters.fixed];
      newFixedFilters[index] = { field: newField };
      dispatch(
        addFilter({
          fixed: [...newFixedFilters],
        })
      );
    }
  };
  const onChangeFilterCondition = (condition, existingField, index) => {
    if (existingField) {
      let filter = filters.fixed?.[index];
      let fixedFilters = [...filters.fixed];
      fixedFilters[index] = { ...filter, condition };
      dispatch(
        addFilter({
          fixed: fixedFilters,
        })
      );
      setAddNewFixedFilter(false);
    }
  };
  const onChangeFilterValue = (value, existingField, index) => {
    if (existingField) {
      let filter = filters.fixed?.[index];
      let fixedFilter = [...filters.fixed];
      fixedFilter[index] = { ...filter, value };
      dispatch(
        addFilter({
          fixed: fixedFilter,
        })
      );
      setAddNewFixedFilter(false);
    }
  };
  const onRemoveFilter = (field, type) => {
    if (type === "fixed") {
      dispatch(
        addFilter({
          fixed: filters.fixed.filter((filter) => filter.field !== field),
        })
      );
    } else if (type === "custom") {
      dispatch(
        addFilter({
          custom: filters.custom.filter((filter) => filter.field !== field),
        })
      );
    }
  };
  const onResetFilters = (type) => {
    if (type === "fixed") {
      dispatch(
        addFilter({
          fixed: [],
        })
      );
    } else if (type === "custom") {
      dispatch(
        addFilter({
          custom: [],
        })
      );
    }
  };
  const getFieldTypeFilterInput = (type, filter, index) => {
    if (type === "List/Record") {
      return (
        <Select
          options={[
            {
              value: "test1",
              label: "Test 1",
            },
            {
              value: "test2",
              label: "Test 2",
            },
          ]}
          className="form-control"
          onChange={(value) => onChangeFilterValue(value, filter?.field, index)}
          disabled={useQuery}
        />
      ); // Assuming List/Record uses Dropdown filters
    } else if (
      type === "Currency" ||
      type === "Decimal Number" ||
      type === "Time of Day"
    ) {
      return (
        <Input
          type="number"
          className="form-control"
          onChange={(event) =>
            onChangeFilterValue(event.target.value, filter?.field, index)
          }
          disabled={useQuery}
        />
      );
    } else if (type === "Date") {
      return (
        <DatePicker
          className="form-control"
          onChange={(value) => onChangeFilterValue(value, filter?.field, index)}
          disabled={useQuery}
        />
      );
    } else if (type === "Box") {
      return; // Assuming Box refers to a Checkbox
    } else if (
      type === "Email Address" ||
      type === "Phone Number" ||
      type === "Free-Form Text" ||
      type === "Long Text" ||
      type === "Password" || // Assuming "Password" instead of "Password Percent"
      type === "Percent" || // Splitting "Password Percent" into "Password" and "Percent"
      type === "Text Area" ||
      type === "Rich Text"
    ) {
      return (
        <Input
          className="form-control"
          onChange={(event) =>
            onChangeFilterValue(event.target.value, filter?.field, index)
          }
          disabled={useQuery}
        />
      ); // Assuming these use Text filters
    } else if (type === "Multi Select") {
      return (
        <Select
          options={[
            {
              value: "test1",
              label: "Test 1",
            },
            {
              value: "test2",
              label: "Test 2",
            },
          ]}
          mode="multiple"
          className="form-control"
          onChange={(value) => onChangeFilterValue(value, filter?.field, index)}
          disabled={useQuery}
        />
      ); // Assuming Multi Select uses Dropdown filters
    }

    // Default case if no match is found
    return (
      <Input
        className="form-control"
        onChange={(value) => onChangeFilterValue(value, filter?.field, index)}
        disabled={useQuery}
      />
    );
  };
  const onApplyQuery = () => {
    onFiltersApplied(filterQuery);
  };
  return (
    <>
      <Drawer
        title="Filter"
        width={1100}
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
                label: "Applied Filters",
                children: (
                  <>
                    <Collapse
                      ghost
                      className="mt-4"
                      defaultActiveKey={["1"]}
                      items={[
                        {
                          key: "1",
                          label: `Fixed Filter (${filters?.fixed?.length})`,
                          children: (
                            <>
                              <Flex justify="space-between">
                                <Flex align="center" gap={5}>
                                  <Button
                                    onClick={() => {
                                      setAddNewFixedFilter(true);
                                    }}
                                    disabled={
                                      useQuery ||
                                      filters?.fixed?.length ===
                                        availableFields?.length
                                    }
                                  >
                                    Add Filter
                                  </Button>
                                </Flex>
                                <Flex gap={5}>
                                  <Button
                                    onClick={() =>
                                      !useQuery || onResetFilters("fixed")
                                    }
                                  >
                                    Reset
                                  </Button>
                                  <Button>Apply</Button>
                                </Flex>
                              </Flex>
                              <Flex gap={5}>
                                <div className="mb-4 mt-3">
                                  <Checkbox
                                    onChange={(e) => {
                                      setUseExpression(e.target.checked);
                                    }}
                                  >
                                    <b>Use Expression</b>
                                  </Checkbox>
                                </div>
                                <div className="mb-4 mt-3">
                                  <Checkbox
                                    onChange={(e) => {
                                      setUseQuery(e.target.checked);
                                    }}
                                  >
                                    <b>Use Query</b>
                                  </Checkbox>
                                </div>
                              </Flex>
                              {filters?.fixed?.map((filter, index) =>
                                useExpression ? (
                                  <Row
                                    className="mb-2"
                                    key={filter?.field}
                                    gutter={6}
                                  >
                                    <Col className="filterForm_smallCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            className="form-control"
                                            defaultValue="one"
                                            options={[
                                              {
                                                value: "one",
                                                label: "(",
                                              },
                                              {
                                                value: "two",
                                                label: "((",
                                              },
                                              {
                                                value: "three",
                                                label: "(((",
                                              },
                                            ]}
                                            disabled={useQuery}
                                          />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_autoCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            name="lastModifiedBy"
                                            className="form-control"
                                            placeholder="Please select a field"
                                            value={filter?.field}
                                            onChange={(value) =>
                                              onChangeFilterField(
                                                value,
                                                filter?.field
                                              )
                                            }
                                            disabled={useQuery}
                                          >
                                            {availableFields?.map(
                                              (availableField) => (
                                                <Select.Option
                                                  value={
                                                    availableField?.scriptid
                                                  }
                                                >
                                                  {availableField?.name}
                                                </Select.Option>
                                              )
                                            )}
                                          </Select>
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_autoCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            name="lastModifiedBy"
                                            className="form-control"
                                            onChange={(value) =>
                                              onChangeFilterCondition(
                                                value,
                                                filter?.field,
                                                index
                                              )
                                            }
                                            disabled={useQuery}
                                          >
                                            {getFieldTypeFilterOptions(
                                              availableFields?.find(
                                                (availableField) =>
                                                  availableField?.scriptid ===
                                                  filter?.field
                                              )?.field_source
                                            )?.map((option) => (
                                              <Select.Option
                                                value={option?.value}
                                              >
                                                {option?.label}
                                              </Select.Option>
                                            ))}
                                          </Select>
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_autoCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          {getFieldTypeFilterInput(
                                            availableFields?.find(
                                              (availableField) =>
                                                availableField?.scriptid ===
                                                filter?.field
                                            )?.field_source,
                                            filter,
                                            index
                                          )}
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_smallCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            className="form-control"
                                            defaultValue="one"
                                            options={[
                                              {
                                                value: "one",
                                                label: ")",
                                              },
                                              {
                                                value: "two",
                                                label: "))",
                                              },
                                              {
                                                value: "three",
                                                label: ")))",
                                              },
                                            ]}
                                            disabled={useQuery}
                                          />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_smallCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            className="form-control"
                                            placeholder="And/Or"
                                            options={[
                                              {
                                                value: "and",
                                                label: "AND",
                                              },
                                              {
                                                value: "or",
                                                label: "OR",
                                              },
                                            ]}
                                            disabled={useQuery}
                                          />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col>
                                      <Flex
                                        align="center"
                                        justify="center"
                                        className="h-100"
                                      >
                                        <Button
                                          danger
                                          size="small"
                                          shape="circle"
                                          onClick={() =>
                                            onRemoveFilter(
                                              filter?.field,
                                              "fixed"
                                            )
                                          }
                                        >
                                          <DeleteOutlined />
                                        </Button>
                                      </Flex>
                                    </Col>
                                  </Row>
                                ) : (
                                  <Row
                                    className="mb-2"
                                    key={filter?.field}
                                    gutter={6}
                                  >
                                    <Col className="filterForm_autoCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            name="lastModifiedBy"
                                            className="form-control"
                                            defaultValue={filter?.field}
                                            onChange={(value) =>
                                              onChangeFilterField(
                                                value,
                                                filter?.field
                                              )
                                            }
                                            disabled={useQuery}
                                          >
                                            {availableFields?.map(
                                              (availableField) => (
                                                <Select.Option
                                                  value={
                                                    availableField?.scriptid
                                                  }
                                                >
                                                  {availableField?.name}
                                                </Select.Option>
                                              )
                                            )}
                                          </Select>
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_autoCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          <Select
                                            name="lastModifiedBy"
                                            className="form-control"
                                            onChange={(value) =>
                                              onChangeFilterCondition(
                                                value,
                                                filter?.field,
                                                index
                                              )
                                            }
                                            disabled={useQuery}
                                          >
                                            {getFieldTypeFilterOptions(
                                              availableFields?.find(
                                                (availableField) =>
                                                  availableField?.scriptid ===
                                                  filter?.field
                                              )?.field_source
                                            )?.map((option) => (
                                              <Select.Option
                                                value={option?.value}
                                              >
                                                {option?.label}
                                              </Select.Option>
                                            ))}
                                          </Select>
                                        </div>
                                      </div>
                                    </Col>
                                    <Col className="filterForm_autoCol">
                                      <div className="control-group mb-0 mt-0">
                                        <div className="controls">
                                          {getFieldTypeFilterInput(
                                            availableFields?.find(
                                              (availableField) =>
                                                availableField?.scriptid ===
                                                filter?.field
                                            )?.field_source,
                                            filter,
                                            index
                                          )}
                                        </div>
                                      </div>
                                    </Col>
                                    <Col>
                                      <Flex
                                        align="center"
                                        justify="center"
                                        className="h-100"
                                      >
                                        <Button
                                          danger
                                          size="small"
                                          shape="circle"
                                          onClick={() =>
                                            onRemoveFilter(
                                              filter?.field,
                                              "fixed"
                                            )
                                          }
                                        >
                                          <DeleteOutlined />
                                        </Button>
                                      </Flex>
                                    </Col>
                                  </Row>
                                )
                              )}
                              {!filters ||
                                ((filters?.fixed?.length <= 0 ||
                                  addNewFixedFilter) &&
                                  (useExpression ? (
                                    <Row
                                      className="mb-2"
                                      // key={filter?.field}
                                      gutter={6}
                                    >
                                      <Col className="filterForm_smallCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              className="form-control"
                                              defaultValue="one"
                                              options={[
                                                {
                                                  value: "one",
                                                  label: "(",
                                                },
                                                {
                                                  value: "two",
                                                  label: "((",
                                                },
                                                {
                                                  value: "three",
                                                  label: "(((",
                                                },
                                              ]}
                                              disabled={useQuery}
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className="filterForm_autoCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              name="field"
                                              className="form-control"
                                              onChange={(value) =>
                                                onChangeFilterField(value)
                                              }
                                              disabled={useQuery}
                                            >
                                              {availableFields?.map((field) => (
                                                <Select.Option
                                                  value={field?.scriptid}
                                                >
                                                  {field?.name}
                                                </Select.Option>
                                              ))}
                                            </Select>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className="filterForm_autoCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              name="lastModifiedBy"
                                              className="form-control"
                                              //   readOnly={
                                              //     role !== "super-admin" &&
                                              //     role !== "power-user"
                                              //   }
                                              //   disabled={
                                              //     role !== "super-admin" &&
                                              //     role !== "power-user"
                                              //   }
                                              disabled={useQuery}
                                            >
                                              <Select.Option value="user1">
                                                User 1
                                              </Select.Option>
                                              <Select.Option value="user2">
                                                User 2
                                              </Select.Option>
                                              <Select.Option value="user3">
                                                User 3
                                              </Select.Option>
                                              <Select.Option value="user4">
                                                User 4
                                              </Select.Option>
                                            </Select>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className="filterForm_autoCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              name="lastModifiedBy"
                                              className="form-control"
                                              disabled={useQuery}
                                            >
                                              <Select.Option value="user1">
                                                User 1
                                              </Select.Option>
                                              <Select.Option value="user2">
                                                User 2
                                              </Select.Option>
                                              <Select.Option value="user3">
                                                User 3
                                              </Select.Option>
                                              <Select.Option value="user4">
                                                User 4
                                              </Select.Option>
                                            </Select>
                                          </div>
                                        </div>
                                      </Col>

                                      <Col className="filterForm_smallCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              className="form-control"
                                              defaultValue="one"
                                              options={[
                                                {
                                                  value: "one",
                                                  label: ")",
                                                },
                                                {
                                                  value: "two",
                                                  label: "))",
                                                },
                                                {
                                                  value: "three",
                                                  label: ")))",
                                                },
                                              ]}
                                              disabled={useQuery}
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className="filterForm_smallCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              className="form-control"
                                              placeholder="And/Or"
                                              options={[
                                                {
                                                  value: "and",
                                                  label: "AND",
                                                },
                                                {
                                                  value: "or",
                                                  label: "OR",
                                                },
                                              ]}
                                              disabled={useQuery}
                                            />
                                          </div>
                                        </div>
                                      </Col>
                                      <Col>
                                        <Flex
                                          align="center"
                                          justify="center"
                                          className="h-100"
                                        >
                                          <Button
                                            danger
                                            size="small"
                                            shape="circle"
                                          >
                                            <DeleteOutlined />
                                          </Button>
                                        </Flex>
                                      </Col>
                                    </Row>
                                  ) : (
                                    <Row
                                      className="mb-2"
                                      // key={filter?.field}
                                      gutter={6}
                                    >
                                      <Col className="filterForm_autoCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              name="field"
                                              className="form-control"
                                              onChange={(value) =>
                                                onChangeFilterField(value)
                                              }
                                              disabled={useQuery}
                                            >
                                              {availableFields?.map((field) => (
                                                <Select.Option
                                                  value={field?.scriptid}
                                                >
                                                  {field?.name}
                                                </Select.Option>
                                              ))}
                                            </Select>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className="filterForm_autoCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              name="lastModifiedBy"
                                              className="form-control"
                                              //   readOnly={
                                              //     role !== "super-admin" &&
                                              //     role !== "power-user"
                                              //   }
                                              //   disabled={
                                              //     role !== "super-admin" &&
                                              //     role !== "power-user"
                                              //   }
                                              disabled={useQuery}
                                            >
                                              <Select.Option value="user1">
                                                User 1
                                              </Select.Option>
                                              <Select.Option value="user2">
                                                User 2
                                              </Select.Option>
                                              <Select.Option value="user3">
                                                User 3
                                              </Select.Option>
                                              <Select.Option value="user4">
                                                User 4
                                              </Select.Option>
                                            </Select>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col className="filterForm_autoCol">
                                        <div className="control-group mb-0 mt-0">
                                          <div className="controls">
                                            <Select
                                              name="lastModifiedBy"
                                              className="form-control"
                                              disabled={useQuery}
                                            >
                                              <Select.Option value="user1">
                                                User 1
                                              </Select.Option>
                                              <Select.Option value="user2">
                                                User 2
                                              </Select.Option>
                                              <Select.Option value="user3">
                                                User 3
                                              </Select.Option>
                                              <Select.Option value="user4">
                                                User 4
                                              </Select.Option>
                                            </Select>
                                          </div>
                                        </div>
                                      </Col>
                                      <Col>
                                        <Flex
                                          align="center"
                                          justify="center"
                                          className="h-100"
                                        >
                                          <Button
                                            danger
                                            size="small"
                                            shape="circle"
                                          >
                                            <DeleteOutlined />
                                          </Button>
                                        </Flex>
                                      </Col>
                                    </Row>
                                  )))}
                            </>
                          ),
                        },
                        {
                          key: "2",
                          label: `Custom Filter (${filters?.custom ? filters?.custom?.length : "0"})`,
                          children: (
                            <>
                              <Flex
                                className="mt-4  mb-4"
                                justify="space-between"
                              >
                                <Button>Add Filter</Button>
                                <Flex gap={5}>
                                  <Button>Reset</Button>
                                  <Button>Apply</Button>
                                </Flex>
                              </Flex>
                              {filters?.custom?.map((filter) => (
                                <Row
                                  className="mb-2"
                                  key={filter?.field}
                                  gutter={6}
                                >
                                  <Col span={12}>
                                    <div className="control-group mb-0 mt-0">
                                      <div className="controls">
                                        <Select
                                          name="lastModifiedBy"
                                          className="form-control"
                                          //   readOnly={
                                          //     role !== "super-admin" &&
                                          //     role !== "power-user"
                                          //   }
                                          //   disabled={
                                          //     role !== "super-admin" &&
                                          //     role !== "power-user"
                                          //   }
                                        >
                                          <Select.Option value="user1">
                                            User 1
                                          </Select.Option>
                                          <Select.Option value="user2">
                                            User 2
                                          </Select.Option>
                                          <Select.Option value="user3">
                                            User 3
                                          </Select.Option>
                                          <Select.Option value="user4">
                                            User 4
                                          </Select.Option>
                                        </Select>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col>
                                    <Flex
                                      align="center"
                                      justify="center"
                                      className="h-100"
                                    >
                                      <Button
                                        danger
                                        size="small"
                                        shape="circle"
                                      >
                                        <DeleteOutlined />
                                      </Button>
                                    </Flex>
                                  </Col>
                                </Row>
                              ))}
                            </>
                          ),
                        },
                      ]}
                    />
                  </>
                ),
              },
              {
                key: "2",
                label: "Query/Criteria",
                children: (
                  <>
                    <Flex className="mt-5">
                      <Input.TextArea
                        rows={30}
                        name="field"
                        className="form-control w-100"
                        type=""
                        onChange={(e) => setFilterQuery(e?.target?.value)}
                        defaultValue={filterQuery}
                      />
                    </Flex>
                    <Flex gap={5} justify="end" className="mt-5">
                      <Button
                        onClick={() => !useQuery || onResetFilters("fixed")}
                      >
                        Reset
                      </Button>
                      <Button onClick={() => onApplyQuery()}>Apply</Button>
                    </Flex>
                  </>
                ),
              },
            ]}
            style={{ width: "100%" }}
          />
        </div>
      </Drawer>
    </>
  );
}
