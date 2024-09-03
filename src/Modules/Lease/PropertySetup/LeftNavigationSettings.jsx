import React, { useState } from "react";
import {
  FormOutlined,
  PropertySafetyOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Collapse, Form, Input, Select } from "antd";
import { FormControl, FormRow } from "../../../Library/Library";

function LeftNavigationSettings() {
  const { Panel } = Collapse;
  let NavMenus = [
    {
      path: "1",
      tabpath: "primary-information",
      label: "Primary Information",
      icon: <PropertySafetyOutlined />,
    },
    {
      path: "",
      tabpath: "form-elements",
      label: "Form Elements",
      icon: <FormOutlined />,
    },
    {
      path: "",
      tabpath: "property-details",
      label: "Property Details",
      icon: <BarsOutlined />,
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [navigationStyle, setNavigationStyle] = useState({});
  const [navigationHoverStyle, setNavigationHoverStyle] = useState({});
  const [navigationActiveStyle, setNavigationActiveStyle] = useState({});
  const handleNavigationStyleChange = (event) => {
    const { name, value } = event.target;
    setNavigationStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const handleNavigationHoverStyleChange = (event) => {
    const { name, value } = event.target;
    setNavigationHoverStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const handleNavigationActiveStyleChange = (event) => {
    const { name, value } = event.target;
    setNavigationActiveStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const menuAllStyle = {
    ...navigationStyle,
  };

  const menuHoverStyle = {
    ...navigationStyle,
    ...(hoverIndex !== null && navigationHoverStyle),
  };

  const menuActiveStyle = {
    ...navigationStyle,
    ...(activeIndex !== null && navigationActiveStyle),
  };

  const handleSelectStyleChange = (value, option) => {
    const fieldName = option;
    setNavigationStyle((prevStyle) => ({
      ...prevStyle,
      [fieldName]: value,
    }));
  };

  const dummyData = {
    field: {
      general: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        boxShadow: "none",
        fontSize: "15px",
        fontWeight: "normal",
        textTransform: "none",
        letterSpacing: "normal",
        lineHeight: "1.5",
        textAlign: "left",
        wordSpacing: "normal",
        border: {
          color: "#e48484",
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
      },
      active: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
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
        const unit = getUnit(innerKey);
        const styleDropdowns = `${key}.${innerKey}`;
        const cssProperties =
          styleDropdowns === "general.backgroundColor" ||
          styleDropdowns === "general.color"
            ? navigationHoverStyle
            : menuAllStyle;
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
                  styleDropdowns === "general.backgroundColor" ||
                  styleDropdowns === "general.color"
                ) {
                  handleNavigationHoverStyleChange(obj);
                } else if (
                  styleDropdowns === "active.backgroundColor" ||
                  styleDropdowns === "active.color"
                ) {
                  handleNavigationActiveStyleChange(obj);
                } else {
                  handleNavigationStyleChange(obj);
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

  return (
    <>
      <div className="tab-navigation" style={{ height: "auto" }}>
        <div className="navigation-menus">
          <ul>
            {NavMenus.map((menu, index) => (
              <li key={index}>
                <Link
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => setActiveIndex(index)}
                  to=""
                  style={
                    index === activeIndex
                      ? menuActiveStyle
                      : index === hoverIndex
                      ? menuHoverStyle
                      : menuAllStyle
                  }
                >
                  <span className="tab-menu-icon">{menu.icon}</span>{" "}
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
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

export default LeftNavigationSettings;
