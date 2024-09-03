import React, { useState } from "react";
import { Badge, Collapse, Flex, Form, Input } from "antd";
import FormControl from "../../../Components/FormControl";
import { FormRow } from "../../../Library/Library";

function IndicatorSettings() {
  const { Panel } = Collapse;

  const [countStyle, setCountStyle] = useState({});
  const [countLabelStyle, setCountLabelStyle] = useState({});

  const handleCountLabelStyleChange = (event) => {
    const { name, value } = event.target;
    setCountLabelStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const handleCountStyleChange = (event) => {
    const { name, value } = event.target;
    setCountStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const badgeData = [
    { label: "Messages", count: 5 },
    { label: "Notifications", count: 3 },
  ];

  const dummyData = {
    field: {
      indicator_name: {
        fontSize: "15px",
        fontWeight: "normal",
        color: "#000000",
        textTransform: "none",
        letterSpacing: "normal",
        lineHeight: "1.5",
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
      count: {
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        fontSize: "15px",
        fontWeight: "normal",
        color: "#000000",
        backgroundColor: "red",
        borderRadius: "50%",
      },
    },
  };

  const getFieldType = (fieldKey) => {
    if (
      fieldKey.toLowerCase().includes("color") ||
      fieldKey.toLowerCase().includes("backgroundColor")
    ) {
      return <Input type="color" placeholder="Select Color" />;
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
          key === "indicator_name" || key === "indicator_name.padding" || key === "indicator_name.margin"
            ? countLabelStyle
            : countStyle;
        const unit = getUnit(innerKey);
        // const styleDropdowns = `${key}.${innerKey}`;
        return (
          <FormControl label={`${innerKey} ${unit}`} key={fieldKey}>
            {React.cloneElement(getFieldType(fieldKey), {
              name: fieldKey,
              defaultValue: value,
              value: cssProperties[fieldKey],
              onChange: (obj) => {
                if (
                  key === "indicator_name" ||
                  key === "indicator_name.padding" ||
                  key === "indicator_name.margin"
                ) {
                  handleCountLabelStyleChange(obj);
                } else {
                  handleCountStyleChange(obj);
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

  const formattedFieldKey = (fieldKey) => {
    return fieldKey
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <Flex gap={20} justify="end" align="end">
        {badgeData.map((item, index) => (
          <div key={index}>
            <div style={countLabelStyle}>{item.label}</div>
            <Badge style={countStyle} count={item.count} />
          </div>
        ))}
      </Flex>
      <Collapse activeKey={activeKey} onChange={handleChange}>
        {Object.entries(dummyData.field).map(([key, value]) => (
          <Panel header={formattedFieldKey(key)} key={key}>
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

export default IndicatorSettings;
