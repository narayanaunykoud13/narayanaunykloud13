import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header";
import PropertySetupList from "./List";
import PropertySetupCreate from "./Create";
import PropertySetupView from "./View";
import { Button, Drawer, Dropdown, Flex, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import FieldSettings from "./FieldSettings";
import BlockSettings from "./BlockSettings";
import LeftNavigationSettings from "./LeftNavigationSettings";
import GroupSettings from "./GroupSettings";
import SubTabSettings from "./SubTabSettings";
import ButtonSettings from "./ButtonSettings";
import PageHeaderSettings from "./PageHeaderSettings";
import ToastSettings from "./ToastSettings";
import AlertSettings from "./AlertSettings";
import PopupSettings from "./PopupSettings";
import IndicatorSettings from "./IndicatorSettings";

const PropertySetup = () => {
  let { ScreenMode } = useParams();
  const items = [
    {
      key: "1",
      label: (
        <a onClick={() => showSettingsDrawer()} rel="noopener noreferrer">
          Settings
        </a>
      ),
    },
  ];
  const [settingsDrawer, setSettingsDrawer] = useState(false);
  const showSettingsDrawer = () => {
    setSettingsDrawer(true);
  };
  const closeSettingsDrawer = () => {
    setSettingsDrawer(false);
  };
  const menuItems = [
    {
      key: "1",
      label: "Page Header Settings",
    },
    {
      key: "2",
      label: "Field Settings",
    },
    {
      key: "3",
      label: "Block Settings",
    },
    {
      key: "4",
      label: "Group Settings",
    },
    {
      key: "5",
      label: "Left Navigation",
    },
    {
      key: "6",
      label: "Sub Tab Settings",
    },
    {
      key: "7",
      label: "Buttons",
    },
    {
      key: "8",
      label: "Indicators",
    },
    {
      key: "9",
      label: "Toast Settings",
    },
    {
      key: "10",
      label: "Alert Settings",
    },
    {
      key: "11",
      label: "Popup Settings",
    },
  ];
  const [currentMenu, setCurrentMenu] = useState("2");
  const [labelStyle, setLabelStyle] = useState({});
  const [inputStyle, setInputStyle] = useState({});
  const onMenuClick = (e) => {
    setCurrentMenu(e.key);
  };
  const handleSubmit = () => {
    const jsonData = {
      labelStyle,
      inputStyle,
    };
    const jsonString = JSON.stringify(jsonData, null, 2);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    const cssData = `
        .labelStyle {
          ${Object.entries(labelStyle)
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }
        .inputStyle {
          ${Object.entries(inputStyle)
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }
      `;
    const cssBlob = new Blob([cssData], { type: "text/scss" });
    const downloadFile = (blob, filename) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    downloadFile(jsonBlob, "ConfigurationData.json");
    downloadFile(cssBlob, "Styles.scss");
  };
  const [selectValue, setSelectValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const handleSubmitError = () => {
    const errors = {};
    if (!selectValue) {
      errors.selectValue = "Please select an option";
    }
    if (!inputValue) {
      errors.inputValue = "Please input value";
    }
    if (!textareaValue) {
      errors.textareaValue = "Please enter text";
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
    }
  };
  return (
    <>
      <div>
        <Header title="Property Setup >> List">
          <Flex justify="end">
            <Dropdown
              menu={{
                items,
              }}
            >
              <Button
                className="btn icon-btn"
                shape="circle"
                icon={<MoreOutlined />}
              />
            </Dropdown>
          </Flex>
        </Header>
        {ScreenMode == "create" && <PropertySetupCreate />}
        {ScreenMode === "list" && <PropertySetupList />}
        {ScreenMode === "view" && <PropertySetupView />}
        {ScreenMode === "edit" && <PropertySetupView />}
      </div>
      <Drawer
        width="80%"
        title="Settings"
        onClose={closeSettingsDrawer}
        open={settingsDrawer}
        footer={
          <Flex justify="space-between" gap={15}>
            <Button className="btn">Cancel</Button>
            <Flex justify="space-between" gap={15}>
              <Button className="btn btn-primary" onClick={handleSubmit}>
                Download
              </Button>
              <Button className="btn btn-primary" onClick={handleSubmitError}>
                Submit
              </Button>
            </Flex>
          </Flex>
        }
      >
        <Flex className="settingsBlock">
          <Menu
            onClick={onMenuClick}
            defaultSelectedKeys={[currentMenu]}
            selectedKeys={[currentMenu]}
            mode="inline"
            items={menuItems}
            className="settingsMenu"
          />
          <div className="settingsMenu_cnt">
            {currentMenu == "1" && <PageHeaderSettings />}
            {currentMenu == "2" && (
              <FieldSettings
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                labelStyle={labelStyle}
                setLabelStyle={setLabelStyle}
                inputStyle={inputStyle}
                setInputStyle={setInputStyle}
              />
            )}
            {currentMenu == "3" && <BlockSettings />}
            {currentMenu == "4" && (
              <GroupSettings
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                labelStyle={labelStyle}
                setLabelStyle={setLabelStyle}
                inputStyle={inputStyle}
                setInputStyle={setInputStyle}
              />
            )}
            {currentMenu == "5" && <LeftNavigationSettings />}
            {currentMenu == "6" && <SubTabSettings />}
            {currentMenu == "7" && <ButtonSettings />}
            {currentMenu == "8" && <IndicatorSettings />}
            {currentMenu == "9" && <ToastSettings />}
            {currentMenu == "10" && <AlertSettings />}
            {currentMenu == "11" && (
              <PopupSettings
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                validationErrors={validationErrors}
                setValidationErrors={setValidationErrors}
                labelStyle={labelStyle}
                setLabelStyle={setLabelStyle}
                inputStyle={inputStyle}
                setInputStyle={setInputStyle}
              />
            )}
          </div>
        </Flex>
      </Drawer>
    </>
  );
};

export default PropertySetup;
