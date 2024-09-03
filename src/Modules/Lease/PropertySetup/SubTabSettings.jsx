import React, { useState } from "react";
import { Collapse, Flex, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { FormControl, FormRow } from "../../../Library/Library";

function SubTabSettings() {
  const { Panel } = Collapse;

  const [activeTab, setActiveTab] = useState("Tab 1");

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [hover, setHover] = useState(null);
  const [active, setActive] = useState(null);
  const [subTabStyle, setSubTabStyle] = useState({});
  const [subTabHoverStyle, setSubTabHoverStyle] = useState({});
  const [subTabActiveStyle, setSubTabActiveStyle] = useState({});

  const handleSelectStyleChange = (value, option) => {
    const fieldName = option;
    setSubTabStyle((prevStyle) => ({
      ...prevStyle,
      [fieldName]: value,
    }));
  };

  const handleSubTabStyleChange = (event) => {
    const { name, value } = event.target;
    setSubTabStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const handleSubTabHoverStyleChange = (event) => {
    const { name, value } = event.target;
    setSubTabHoverStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const handleSubTabActiveStyleChange = (event) => {
    const { name, value } = event.target;
    setSubTabActiveStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const subTabAllStyle = {
    ...subTabStyle,
  };

  const subTabHoverAllStyle = {
    ...subTabStyle,
    ...(hover !== null && subTabHoverStyle),
  };

  const subTabActiveAllStyle = {
    ...subTabStyle,
    ...(active !== null && subTabActiveStyle),
  };

  const dummyData = {
    field: {
      general: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        fontSize: "16px",
        fontWeight: "normal",
        textTransform: "none",
        letterSpacing: "normal",
        lineHeight: "1.5",
        wordSpacing: "normal",
        width: "100%",
        maxWidth: "400px",
        minWidth: "200px",
        height: "auto",
        maxHeight: "50px",
        minHeight: "30px",
        boxShadow: "none",
        border: {
          color: "#CCCCCC",
          width: "1px",
          style: "solid",
          topLeftRadius: "4px",
          topRightRadius: "4px",
          bottomLeftRadius: "4px",
          bottomRightRadius: "4px",
        },
        padding: {
          top: "8px",
          right: "12px",
          bottom: "8px",
          left: "12px",
        },
        margin: {
          top: "4px",
          right: "0",
          bottom: "4px",
          left: "0",
        },
      },
      active: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderColor: "#CCCCCC",
      },
      hover: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderColor: "#CCCCCC",
      },
    },
  };

  const borderStyleSelectOptions = [
    {
      label: "Solid",
      value: "solid",
    },
    {
      label: "Dotted",
      value: "dotted",
    },
    {
      label: "Dashed",
      value: "dashed",
    },
  ];

  const getFieldType = (fieldKey) => {
    if (
      fieldKey.toLowerCase().includes("color") ||
      fieldKey.toLowerCase().includes("backgroundColor")
    ) {
      return <Input type="color" placeholder="Select Color" />;
    } else if (fieldKey.toLowerCase().includes("style")) {
      return (
        <Select name="borderStyle" placeholder="Select Border Style Options">
          {borderStyleSelectOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    } else {
      return <Input type="text" placeholder="Enter Value" />;
    }
  };

  const getUnit = (key) => {
    if (key.includes("height") || key.includes("width")) {
      return "[(%) or (px)]";
    } else if (
      key.includes("maxWidth") ||
      key.includes("minWidth") ||
      key.includes("minHeight") ||
      key.includes("maxHeight") ||
      key.includes("topLeftRadius") ||
      key.includes("topRightRadius") ||
      key.includes("bottomLeftRadius") ||
      key.includes("bottomRightRadius") ||
      key.includes("fontWeight") ||
      key.includes("fontSize") ||
      key.includes("lineHeight") ||
      key.includes("letterSpacing") ||
      key.includes("wordSpacing") ||
      key.includes("top") ||
      key.includes("right") ||
      key.includes("bottom") ||
      key.includes("left")
    ) {
      return "(px)";
    }
    return "";
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderFields = (data, key, parentKey = "") => {
    return Object.keys(data).map((innerKey) => {
      const value = data[innerKey];
      const capitalizedKey = capitalizeFirstLetter(innerKey);
      const fieldKey = parentKey ? `${parentKey}${capitalizedKey}` : innerKey;
      if (typeof value === "string") {
        const cssProperties =
          key === "general" ||
          key === "general.border" ||
          key === "general.padding" ||
          key === "general.margin"
            ? subTabStyle
            : "";
        const unit = getUnit(innerKey);
        const styleDropdowns = `${key}.${innerKey}`;
        return (
          <FormControl label={`${innerKey} ${unit}`} key={fieldKey}>
            {React.cloneElement(getFieldType(fieldKey), {
              name: fieldKey,
              defaultValue: value,
              value: cssProperties[fieldKey],
              onChange: (obj) => {
                if (styleDropdowns === "general.border.style") {
                  handleSelectStyleChange(obj, fieldKey);
                } else if (
                  key === "general" ||
                  key === "general.padding" ||
                  key === "general.margin" ||
                  key === "general.border"
                ) {
                  handleSubTabStyleChange(obj);
                } else if (
                  styleDropdowns === "hover.backgroundColor" ||
                  styleDropdowns === "hover.color" ||
                  styleDropdowns === "hover.borderColor"
                ) {
                  handleSubTabHoverStyleChange(obj);
                } else if (
                  styleDropdowns === "active.backgroundColor" ||
                  styleDropdowns === "active.color" ||
                  styleDropdowns === "active.borderColor"
                ) {
                  handleSubTabActiveStyleChange(obj);
                }
              },
            })}
          </FormControl>
        );
      }
      return null;
    });
  };

  const renderFieldsObject = (data, parentKey = "") => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      const fieldKey = parentKey ? `${parentKey}.${key}` : key;
      const headerName = key.charAt(0) + key.slice(1);
      if (typeof value === "object") {
        return (
          <Collapse key={fieldKey} defaultActiveKey="1">
            <Panel
              header={key.charAt(0).toUpperCase() + key.slice(1)}
              key={key}
            >
              <FormRow>{renderFields(value, fieldKey, headerName)}</FormRow>
            </Panel>
          </Collapse>
        );
      }
      return null;
    });
  };

  const [activeKey, setActiveKey] = useState(Object.keys(dummyData.field)[0]);

  const handleChange = (key) => {
    setActiveKey(key);
  };

  let subTabMenu = [
    { id: 1, name: "Tab 1" },
    { id: 2, name: "Tab 2" },
    { id: 3, name: "Tab 3" },
    { id: 4, name: "Tab 4" },
    { id: 5, name: "Tab 5" },
  ];

  return (
    <>
      <Flex className="tabPreview">
        {subTabMenu.map((item, index) => (
          <Link
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              setActive(index);
              handleClick(item.name);
            }}
            to=""
            style={
              index === active
                ? subTabActiveAllStyle
                : index === hover
                ? subTabHoverAllStyle
                : subTabAllStyle
            }
            className={`tabPreview_item ${
              activeTab === item.name ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </Flex>
      <Collapse activeKey={activeKey} onChange={handleChange}>
        {Object.entries(dummyData.field).map(([key, value]) => (
          <Panel header={key.charAt(0).toUpperCase() + key.slice(1)} key={key}>
            <Form>
              <FormRow>{renderFields(value, key)}</FormRow>
              {renderFieldsObject(value, key)}
            </Form>
          </Panel>
        ))}
      </Collapse>
    </>
  );
}

export default SubTabSettings;
