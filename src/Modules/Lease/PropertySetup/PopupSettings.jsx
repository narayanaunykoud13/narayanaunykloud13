import React, { useState } from "react";
import { FormControl, FormRow, GlobalList } from "../../../Library/Library";
import { Collapse, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function PopupSettings({
  selectValue,
  setSelectValue,
  inputValue,
  setInputValue,
  textareaValue,
  setTextareaValue,
  validationErrors,
  setValidationErrors,
  labelStyle,
  setLabelStyle,
  inputStyle,
  setInputStyle,
}) {
  const [errorStyle, setErrorStyle] = useState({ color: "#FF4D4F" });
  const handleErrorStyleChange = (event) => {
    const { name, value } = event.target;
    setErrorStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const handleStyleChange = (event) => {
    const { name, value } = event.target;
    setInputStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const handleSelectStyleChange = (value, option) => {
    const fieldName = option;
    setInputStyle((prevStyle) => ({
      ...prevStyle,
      [fieldName]: value,
    }));
  };
  const handleLabelStyleChange = (event) => {
    const { name, value } = event.target;
    setLabelStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const handleSelectLabelStyleChange = (value, option) => {
    const fieldName = option;
    setLabelStyle((prevStyle) => ({
      ...prevStyle,
      [fieldName]: value,
    }));
  };
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hoverStyles, setHoverStyles] = useState({});
  const handleHoverStylesChange = (event) => {
    const { name, value } = event.target;
    setHoverStyles((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const [focusStyles, setFocusStyles] = useState({});
  const handleFocusStylesChange = (event) => {
    const { name, value } = event.target;
    setFocusStyles((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const [disabledValue, setDisabledValue] = useState("Disabled");
  const [disabledStyles, setDisabledStyles] = useState({ color: "#2e96e0" });
  const handleDisabledStylesChange = (event) => {
    const { name, value } = event.target;
    setDisabledStyles((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const [readonlyValue, setReadonlyValue] = useState("Readonly");
  const [readonlyStyles, setReadonlyStyles] = useState({ color: "#e02e75" });
  const handleReadonlyStylesChange = (event) => {
    const { name, value } = event.target;
    setReadonlyStyles((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };
  const inputAllStyle = {
    ...inputStyle,
    ...(hover && hoverStyles),
    ...(focus && focusStyles),
    ...(disabled && disabledStyles),
  };
  const { Panel } = Collapse;

  const dummyData = {
    field: {
      general: {
        backgroundColor: "#FFFFFF",
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
      label: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        fontStyle: "normal",
        color: "#333333",
        backgroundColor: "transparent",
        textTransform: "none",
        letterSpacing: "normal",
        lineHeight: "1.5",
        textAlign: "left",
        display: "block",
        margin: {
          top: "0",
          right: "0",
          bottom: "4px",
          left: "0",
        },
        padding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
      },
      input: {
        fontSize: "16px",
        fontWeight: "normal",
        color: "#000000",
        backgroundColor: "#FFFFFF",
        letterSpacing: "normal",
        lineHeight: "1.5",
        textAlign: "left",
        textIndent: "0",
        textTransform: "none",
        wordSpacing: "normal",
      },
      focus: {
        borderColor: "#4A90E2",
        boxShadow: "0 0 5px rgba(74, 144, 226, 0.5)",
        backgroundColor: "#F7F9FC",
      },
      hover: {
        borderColor: "#999999",
        backgroundColor: "#FOFOFO",
        cursor: "pointer",
      },
      disabled: {
        backgroundColor: "#F5F5F5",
        color: "#999999",
        cursor: "not-allowed",
        borderColor: "#b52155",
        borderWidth: "1px",
      },
      readonly: {
        backgroundColor: "#F9F9F9",
        color: "#666666",
        cursor: "default",
        borderColor: "#1a1cb2",
        borderWidth: "1px",
      },
      error: {
        color: "#FF4D4F",
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "none",
        letterSpacing: "normal",
        lineHeight: "1.5",
        textAlign: "left",
        wordSpacing: "normal",
        margin: {
          top: "4px",
          right: "0",
          bottom: "0",
          left: "0",
        },
        padding: {
          top: "2px",
          right: "4px",
          bottom: "2px",
          left: "4px",
        },
      },
    },
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
  const fontFamilySelectOptions = [
    {
      label: "Monospace",
      value: "monospace",
    },
    {
      label: "Cursive",
      value: "cursive",
    },
    {
      label: "Serif",
      value: "serif",
    },
    {
      label: "Sans-Serif",
      value: "sans-serif",
    },
    {
      label: "Fantasy",
      value: "fantasy",
    },
    {
      label: "Courier",
      value: "courier",
    },
  ];
  const fontStyleSelectOptions = [
    {
      label: "Normal",
      value: "normal",
    },
    {
      label: "Italic",
      value: "italic",
    },
  ];
  const getFieldType = (fieldKey) => {
    if (
      fieldKey.toLowerCase().includes("color") ||
      fieldKey.toLowerCase().includes("backgroundColor")
    ) {
      return <Input type="color" placeholder="Select Color" />;
    } else if (fieldKey.toLowerCase().includes("fontstyle")) {
      return (
        <Select name="fontstyle" placeholder="Select Font Style Options">
          {fontStyleSelectOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (fieldKey.toLowerCase().includes("fontfamily")) {
      return (
        <Select name="fontfamily" placeholder="Select Font Family Options">
          {fontFamilySelectOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
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
  const renderFields = (data, key, parentKey = "") => {
    return Object.keys(data).map((innerKey) => {
      const value = data[innerKey];
      const capitalizedKey = capitalizeFirstLetter(innerKey);
      const fieldKey = parentKey ? `${parentKey}${capitalizedKey}` : innerKey;
      if (typeof value === "string") {
        const cssProperties =
          key === "label" || key === "label.padding" || key === "label.margin"
            ? labelStyle
            : inputStyle;
        const unit = getUnit(innerKey);
        const styleDropdowns = `${key}.${innerKey}`;
        return (
          <FormControl label={`${innerKey} ${unit}`} key={fieldKey}>
            {React.cloneElement(getFieldType(fieldKey), {
              name: fieldKey,
              defaultValue: value,
              value: cssProperties[fieldKey],
              onChange: (obj) => {
                if (
                  styleDropdowns === "label.fontStyle" ||
                  styleDropdowns === "label.fontFamily"
                ) {
                  handleSelectLabelStyleChange(obj, fieldKey);
                } else if (styleDropdowns === "general.border.style") {
                  handleSelectStyleChange(obj, fieldKey);
                } else if (
                  key === "label" ||
                  key === "label.padding" ||
                  key === "label.margin"
                ) {
                  handleLabelStyleChange(obj);
                } else if (
                  key === "error" ||
                  key === "error.padding" ||
                  key === "error.margin"
                ) {
                  handleErrorStyleChange(obj);
                } else if (key === "focus") {
                  handleFocusStylesChange(obj);
                } else if (key === "hover") {
                  handleHoverStylesChange(obj);
                } else if (key === "disabled") {
                  handleDisabledStylesChange(obj);
                } else if (key === "readonly") {
                  handleReadonlyStylesChange(obj);
                } else {
                  handleStyleChange(obj);
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
  const handleCombinedChange = (value) => {
    if (handleSelectStyleChange) {
      handleSelectStyleChange(value);
    }
  };
  return (
    <>
      <b style={{ fontSize: "16px" }}>Sample Fields</b>
      <FormRow>
        <FormControl label="Select Field" labelStyle={labelStyle}>
          <>
            <GlobalList
              className="form-control"
              // onChange={(value) => handleSelectChange(value, "area_uom")}
              // value={propertyCreateForm.area_uom}
              listId="custrecord_rioo_area_uom"
              name="select"
              recordType="customrecord_rioo_property_setup"
              style={inputStyle}
              // onChange={handleCombinedChange}
              onChange={(value) => {
                setSelectValue(value);
                setValidationErrors((prev) => ({
                  ...prev,
                  selectValue: "",
                }));
                handleCombinedChange(value);
              }}
            />
            {validationErrors.selectValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.selectValue}
              </div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Input Field">
          <>
            <Input
              className="form-control"
              name="input"
              style={inputStyle}
              placeholder="Enter Input Value"
              onChange={(e) => {
                setInputValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  inputValue: "",
                }));
              }}
            />
            {validationErrors.inputValue && (
              <div style={{ ...errorStyle }}>{validationErrors.inputValue}</div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Text Area Field">
          <>
            <TextArea
              className="form-control"
              name="textarea"
              style={inputStyle}
              placeholder="Enter Text Value"
              onChange={(e) => {
                setTextareaValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  textareaValue: "",
                }));
              }}
            />
            {validationErrors.textareaValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.textareaValue}
              </div>
            )}
          </>
        </FormControl>
      </FormRow>
      <b style={{ fontSize: "16px" }}>Sample Fields for Focus and Hover</b>
      <FormRow>
        <FormControl label="Select Field" labelStyle={labelStyle}>
          <>
            <GlobalList
              className="form-control"
              // onChange={(value) => handleSelectChange(value, "area_uom")}
              // value={propertyCreateForm.area_uom}
              listId="custrecord_rioo_area_uom"
              name="select"
              recordType="customrecord_rioo_property_setup"
              style={inputAllStyle}
              // onChange={handleCombinedChange}
              onChange={(value) => {
                setSelectValue(value);
                setValidationErrors((prev) => ({
                  ...prev,
                  selectValue: "",
                }));
                handleCombinedChange(value);
              }}
            />
            {validationErrors.selectValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.selectValue}
              </div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Input Field">
          <>
            <Input
              className="form-control"
              name="input"
              style={inputAllStyle}
              placeholder="Enter Input Value"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onChange={(e) => {
                setInputValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  inputValue: "",
                }));
              }}
            />
            {validationErrors.inputValue && (
              <div style={{ ...errorStyle }}>{validationErrors.inputValue}</div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Text Area Field">
          <>
            <TextArea
              className="form-control"
              name="textarea"
              style={inputAllStyle}
              placeholder="Enter Text Value"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onChange={(e) => {
                setTextareaValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  textareaValue: "",
                }));
              }}
            />
            {validationErrors.textareaValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.textareaValue}
              </div>
            )}
          </>
        </FormControl>
      </FormRow>
      <b style={{ fontSize: "16px" }}>Sample Fields for Disabled</b>
      <FormRow>
        <FormControl label="Select Field" labelStyle={labelStyle}>
          <>
            <GlobalList
              className="form-control"
              // onChange={(value) => handleSelectChange(value, "area_uom")}
              // value={propertyCreateForm.area_uom}
              listId="custrecord_rioo_area_uom"
              name="select"
              recordType="customrecord_rioo_property_setup"
              style={disabledStyles}
              // onChange={handleCombinedChange}
              readonly={true}
              onChange={(value) => {
                setSelectValue(value);
                setValidationErrors((prev) => ({
                  ...prev,
                  selectValue: "",
                }));
                handleCombinedChange(value);
              }}
            />
            {validationErrors.selectValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.selectValue}
              </div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Input Field">
          <>
            <Input
              className="form-control"
              name="input"
              style={disabledStyles}
              placeholder="Enter Input Value"
              value={disabledValue}
              disabled={true}
              onChange={(e) => {
                setInputValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  inputValue: "",
                }));
              }}
            />
            {validationErrors.inputValue && (
              <div style={{ ...errorStyle }}>{validationErrors.inputValue}</div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Text Area Field">
          <>
            <TextArea
              className="form-control"
              name="textarea"
              style={disabledStyles}
              placeholder="Enter Text Value"
              disabled={true}
              value={disabledValue}
              onChange={(e) => {
                setTextareaValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  textareaValue: "",
                }));
              }}
            />
            {validationErrors.textareaValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.textareaValue}
              </div>
            )}
          </>
        </FormControl>
      </FormRow>
      <b style={{ fontSize: "16px" }}>Sample Fields for Readonly</b>
      <FormRow>
        <FormControl label="Select Field" labelStyle={labelStyle}>
          <>
            <GlobalList
              className="form-control readonly"
              // onChange={(value) => handleSelectChange(value, "area_uom")}
              // value={propertyCreateForm.area_uom}
              listId="custrecord_rioo_area_uom"
              name="select"
              recordType="customrecord_rioo_property_setup"
              style={readonlyStyles}
              // onChange={handleCombinedChange}
              readonly={true}
              onChange={(value) => {
                setSelectValue(value);
                setValidationErrors((prev) => ({
                  ...prev,
                  selectValue: "",
                }));
                handleCombinedChange(value);
              }}
            />
            {validationErrors.selectValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.selectValue}
              </div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Input Field">
          <>
            <Input
              className="form-control readonly"
              name="input"
              style={readonlyStyles}
              value={readonlyValue}
              placeholder="Enter Input Value"
              disabled={true}
              onChange={(e) => {
                setInputValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  inputValue: "",
                }));
              }}
            />
            {validationErrors.inputValue && (
              <div style={{ ...errorStyle }}>{validationErrors.inputValue}</div>
            )}
          </>
        </FormControl>
        <FormControl labelStyle={labelStyle} label="Text Area Field">
          <>
            <TextArea
              className="form-control readonly"
              name="textarea"
              style={readonlyStyles}
              value={readonlyValue}
              placeholder="Enter Text Value"
              disabled={true}
              onChange={(e) => {
                setTextareaValue(e.target.value);
                setValidationErrors((prev) => ({
                  ...prev,
                  textareaValue: "",
                }));
              }}
            />
            {validationErrors.textareaValue && (
              <div style={{ ...errorStyle }}>
                {validationErrors.textareaValue}
              </div>
            )}
          </>
        </FormControl>
      </FormRow>
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

export default PopupSettings;
