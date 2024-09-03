import React, { useState } from 'react';
import { Button, Drawer, Dropdown, Flex, Input, Popover, Switch, Tabs, Tooltip } from 'antd';
import { SettingOutlined, EditFilled, DeleteOutlined } from "@ant-design/icons";
import { arrayMove } from "@dnd-kit/sortable";
import DnDSortableList from '../../../../Components/DnDSortableList';
import FormControl from '../../../../Components/FormControl';

function TabSettings({
    setTabBlockColumnData,
    currentMenu,
    currentMenuDetails,
    setActionTabs,
    handleAddNewButtonItems,
    handleAddNewSubTabItems,
    handleAddNewBlockItems,
    deleteItemButtons,
    deleteItemTab,
    deleteItemBlock,
    closeTabSettingsDrawer,
    openTabSettings,
}) {
    const [tabSettingActiveTabKey, setTabSettingActiveTabKey] = useState("buttons");
    const tabSettingDrawerMenu = [
        {
            key: "buttons",
            label: <span>Button</span>,
            children: currentMenuDetails?.children?.buttons?.length > 0 ?
                (
                    <div className="mt-4">
                        <span className="draggableList_heading">
                            Visible Buttons
                        </span>
                        <DnDSortableList
                            items={[
                                ...currentMenuDetails.children[tabSettingActiveTabKey].filter((btn) => btn?.display),
                                // ...currentMenuDetails.children[tabSettingActiveTabKey].filter((btn) => !btn?.display),
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
                                                                setActionTabs((prevTabs) =>
                                                                    prevTabs.map((prevTabsItem) =>
                                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((btn) => btn.name === listItem?.name ? ({ ...btn, [name]: value }) : btn)
                                                                            }
                                                                        }) : prevTabsItem
                                                                    )
                                                                )
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
                                                setActionTabs((prevTabs) =>
                                                    prevTabs.map((prevTabsItem) =>
                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((btn) =>
                                                                    btn?.name === listItem?.name ? { ...btn, display } : btn
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteItemButtons(listItem, tabSettingActiveTabKey)}
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
                                const handleUpdateData = (prevTabsItem) => {
                                    const newIndex = prevTabsItem?.findIndex(
                                        (view) => view?.name === active?.id
                                    );
                                    const oldIndex = prevTabsItem?.findIndex(
                                        (view) => view?.name === over?.id
                                    );
                                    let updatedViews = arrayMove(prevTabsItem, newIndex, oldIndex);
                                    return updatedViews;
                                }
                                setActionTabs((prevTabs) =>
                                    prevTabs.map((prevTabsItem) =>
                                        prevTabsItem?.tabpath === currentMenu ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [tabSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[tabSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="name"
                        />
                        <span className="draggableList_heading">
                            Hidden Buttons
                        </span>
                        <DnDSortableList
                            items={[
                                // ...currentMenuDetails.children[tabSettingActiveTabKey].filter((btn) => btn?.display),
                                ...currentMenuDetails.children[tabSettingActiveTabKey].filter((btn) => !btn?.display),
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
                                                                setActionTabs((prevTabs) =>
                                                                    prevTabs.map((prevTabsItem) =>
                                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((btn) => btn.name === listItem?.name ? ({ ...btn, [name]: value }) : btn)
                                                                            }
                                                                        }) : prevTabsItem
                                                                    )
                                                                )
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
                                                setActionTabs((prevTabs) =>
                                                    prevTabs.map((prevTabsItem) =>
                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((btn) =>
                                                                    btn?.name === listItem?.name ? { ...btn, display } : btn
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteItemButtons(listItem, tabSettingActiveTabKey)}
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
                                const handleUpdateData = (prevTabsItem) => {
                                    const newIndex = prevTabsItem?.findIndex(
                                        (view) => view?.name === active?.id
                                    );
                                    const oldIndex = prevTabsItem?.findIndex(
                                        (view) => view?.name === over?.id
                                    );
                                    let updatedViews = arrayMove(prevTabsItem, newIndex, oldIndex);
                                    return updatedViews;
                                }
                                setActionTabs((prevTabs) =>
                                    prevTabs.map((prevTabsItem) =>
                                        prevTabsItem?.tabpath === currentMenu ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [tabSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[tabSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="name"
                        />
                    </div>
                )
                : null,
        },
        {
            key: "sub_tabs",
            label: <span>Sub Tab</span>,
            children: currentMenuDetails?.children?.sub_tabs?.length > 0 ?
                (
                    <div className="mt-4">
                        <span className="draggableList_heading">
                            Visible Sub Tab
                        </span>
                        <DnDSortableList
                            items={[
                                ...currentMenuDetails.children[tabSettingActiveTabKey].filter((tab) => tab?.display),
                                // ...currentMenuDetails.children[tabSettingActiveTabKey].filter((tab) => tab?.display),
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
                                                                setActionTabs((prevTabs) =>
                                                                    prevTabs.map((prevTabsItem) =>
                                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((tab) => tab.label === listItem?.label ? ({ ...tab, [name]: value }) : tab)
                                                                            }
                                                                        }) : prevTabsItem
                                                                    )
                                                                )
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            }
                                        >
                                            <Tooltip title="Edit Sub Tab">
                                                <EditFilled />
                                            </Tooltip>
                                        </Popover>
                                        <Switch
                                            size="small"
                                            defaultValue={listItem?.display}
                                            onChange={(display) => {
                                                setActionTabs((prevTabs) =>
                                                    prevTabs.map((prevTabsItem) =>
                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((tab) =>
                                                                    tab?.label === listItem?.label ? { ...tab, display } : tab
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteItemTab(listItem, tabSettingActiveTabKey)}
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
                                const handleUpdateData = (prevTabsItem) => {
                                    const newIndex = prevTabsItem?.findIndex(
                                        (view) => view?.label === active?.id
                                    );
                                    const oldIndex = prevTabsItem?.findIndex(
                                        (view) => view?.label === over?.id
                                    );
                                    let updatedViews = arrayMove(prevTabsItem, newIndex, oldIndex);
                                    return updatedViews;
                                }
                                setActionTabs((prevTabs) =>
                                    prevTabs.map((prevTabsItem) =>
                                        prevTabsItem?.tabpath === currentMenu ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [tabSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[tabSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="label"
                        />
                        <span className="draggableList_heading">
                            Hidden Sub Tab
                        </span>
                        <DnDSortableList
                            items={[
                                // ...currentMenuDetails.children[tabSettingActiveTabKey].filter((tab) => tab?.display),
                                ...currentMenuDetails.children[tabSettingActiveTabKey].filter((tab) => !tab?.display),
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
                                                                setActionTabs((prevTabs) =>
                                                                    prevTabs.map((prevTabsItem) =>
                                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((tab) => tab.label === listItem?.label ? ({ ...tab, [name]: value }) : tab)
                                                                            }
                                                                        }) : prevTabsItem
                                                                    )
                                                                )
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            }
                                        >
                                            <Tooltip title="Edit Sub Tab">
                                                <EditFilled />
                                            </Tooltip>
                                        </Popover>
                                        <Switch
                                            size="small"
                                            defaultValue={listItem?.display}
                                            onChange={(display) => {
                                                setActionTabs((prevTabs) =>
                                                    prevTabs.map((prevTabsItem) =>
                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((tab) =>
                                                                    tab?.label === listItem?.label ? { ...tab, display } : tab
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteItemTab(listItem, tabSettingActiveTabKey)}
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
                                const handleUpdateData = (prevTabsItem) => {
                                    const newIndex = prevTabsItem?.findIndex(
                                        (view) => view?.label === active?.id
                                    );
                                    const oldIndex = prevTabsItem?.findIndex(
                                        (view) => view?.label === over?.id
                                    );
                                    let updatedViews = arrayMove(prevTabsItem, newIndex, oldIndex);
                                    return updatedViews;
                                }
                                setActionTabs((prevTabs) =>
                                    prevTabs.map((prevTabsItem) =>
                                        prevTabsItem?.tabpath === currentMenu ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [tabSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[tabSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="label"
                        />
                    </div>
                )
                : null,
        },
        {
            key: "blocks",
            label: <span>Blocks</span>,
            children: currentMenuDetails?.children?.blocks?.length > 0 ?
                (
                    <div className="mt-4">
                        <span className="draggableList_heading">
                            Visible Blocks
                        </span>
                        <DnDSortableList
                            items={[
                                ...currentMenuDetails.children[tabSettingActiveTabKey].filter((block) => block?.display),
                                // ...currentMenuDetails.children[tabSettingActiveTabKey].filter((block) => !block?.display),
                            ]}
                            itemsRenderer={(listItem) => (
                                <Flex
                                    className="draggableList_item_content"
                                    justify="space-between"
                                >
                                    <div className="draggableList_title">{listItem?.title}</div>
                                    <Flex justify="end" align="center" gap={5}>
                                        <Popover
                                            trigger="click"
                                            placement="bottomRight"
                                            content={
                                                <div>
                                                    <FormControl label="Title">
                                                        <Input
                                                            name="title"
                                                            defaultValue={listItem?.title}
                                                            onBlur={(e) => {
                                                                const { name, value } = e.target;
                                                                setActionTabs((prevTabs) =>
                                                                    prevTabs.map((prevTabsItem) =>
                                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((block) => block.title === listItem?.title ? ({ ...block, [name]: value }) : block)
                                                                            }
                                                                        }) : prevTabsItem
                                                                    )
                                                                )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormControl label="No. of Columns">
                                                        <Input
                                                            name="columns"
                                                            defaultValue=""
                                                            onBlur={(e) => {
                                                                const { name, value } = e.target;
                                                                setTabBlockColumnData((prevState) => ({
                                                                    ...prevState,
                                                                    [name]: value
                                                                }));
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            }
                                        >
                                            <Tooltip title="Edit Blocks">
                                                <EditFilled />
                                            </Tooltip>
                                        </Popover>
                                        <Switch
                                            size="small"
                                            defaultValue={listItem?.display}
                                            onChange={(display) => {
                                                setActionTabs((prevTabs) =>
                                                    prevTabs.map((prevTabsItem) =>
                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((block) =>
                                                                    block?.title === listItem?.title ? { ...block, display } : block
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteItemBlock(listItem, tabSettingActiveTabKey)}
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
                                const handleUpdateData = (prevTabsItem) => {
                                    const newIndex = prevTabsItem?.findIndex(
                                        (view) => view?.title === active?.id
                                    );
                                    const oldIndex = prevTabsItem?.findIndex(
                                        (view) => view?.title === over?.id
                                    );
                                    let updatedViews = arrayMove(prevTabsItem, newIndex, oldIndex);
                                    return updatedViews;
                                }
                                setActionTabs((prevTabs) =>
                                    prevTabs.map((prevTabsItem) =>
                                        prevTabsItem?.tabpath === currentMenu ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [tabSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[tabSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="title"
                        />
                        <span className="draggableList_heading">
                            Hidden Blocks
                        </span>
                        <DnDSortableList
                            items={[
                                // ...currentMenuDetails.children[tabSettingActiveTabKey].filter((block) => block?.display),
                                ...currentMenuDetails.children[tabSettingActiveTabKey].filter((block) => !block?.display),
                            ]}
                            itemsRenderer={(listItem) => (
                                <Flex
                                    className="draggableList_item_content"
                                    justify="space-between"
                                >
                                    <div className="draggableList_title">{listItem?.title}</div>
                                    <Flex justify="end" align="center" gap={5}>
                                        <Popover
                                            trigger="click"
                                            placement="bottomRight"
                                            content={
                                                <div>
                                                    <FormControl label="Title">
                                                        <Input
                                                            name="title"
                                                            defaultValue={listItem?.title}
                                                            onBlur={(e) => {
                                                                const { name, value } = e.target;
                                                                setActionTabs((prevTabs) =>
                                                                    prevTabs.map((prevTabsItem) =>
                                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((block) => block.title === listItem?.title ? ({ ...block, [name]: value }) : block)
                                                                            }
                                                                        }) : prevTabsItem
                                                                    )
                                                                )
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            }
                                        >
                                            <Tooltip title="Edit Blocks">
                                                <EditFilled />
                                            </Tooltip>
                                        </Popover>
                                        <Switch
                                            size="small"
                                            defaultValue={listItem?.display}
                                            onChange={(display) => {
                                                setActionTabs((prevTabs) =>
                                                    prevTabs.map((prevTabsItem) =>
                                                        prevTabsItem?.tabpath === currentMenu ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [tabSettingActiveTabKey]: prevTabsItem?.children?.[tabSettingActiveTabKey].map((block) =>
                                                                    block?.title === listItem?.title ? { ...block, display } : block
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteItemBlock(listItem, tabSettingActiveTabKey)}
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
                                const handleUpdateData = (prevTabsItem) => {
                                    const newIndex = prevTabsItem?.findIndex(
                                        (view) => view?.title === active?.id
                                    );
                                    const oldIndex = prevTabsItem?.findIndex(
                                        (view) => view?.title === over?.id
                                    );
                                    let updatedViews = arrayMove(prevTabsItem, newIndex, oldIndex);
                                    return updatedViews;
                                }
                                setActionTabs((prevTabs) =>
                                    prevTabs.map((prevTabsItem) =>
                                        prevTabsItem?.tabpath === currentMenu ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [tabSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[tabSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="title"
                        />
                    </div>
                )
                : null,
        },
    ];
    return (
        <>
            {
                currentMenu && (
                    <Drawer
                        title={`${currentMenuDetails.label} Tab Settings`}
                        width={720}
                        onClose={closeTabSettingsDrawer}
                        open={openTabSettings}
                        styles={{
                            body: {
                                paddingBottom: 50,
                            },
                        }}
                        footer={
                            <Flex align="center" justify="space-between">
                                {tabSettingActiveTabKey === "buttons" && (
                                    <Popover
                                        trigger="click"
                                        placement="bottomLeft"
                                        content={
                                            <div>
                                                <FormControl label="Enter Button Label">
                                                    <Input
                                                        name="buttonLabel"
                                                        onBlur={(e) => {
                                                            handleAddNewButtonItems(
                                                                {
                                                                    id: (new Date().getTime()).toString(36),
                                                                    name: e?.target?.value,
                                                                    display: false,
                                                                }
                                                                , tabSettingActiveTabKey
                                                            );
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
                                {tabSettingActiveTabKey === "sub_tabs" && (
                                    <Popover
                                        trigger="click"
                                        placement="bottomLeft"
                                        content={
                                            <div>
                                                <FormControl label="Enter Sub Tab Label">
                                                    <Input
                                                        name="subTabLabel"
                                                        onBlur={(e) => {
                                                            handleAddNewSubTabItems(
                                                                {
                                                                    key: (new Date().getTime()).toString(36),
                                                                    label: e?.target?.value,
                                                                    display: false,
                                                                    children: <></>
                                                                    // <div className='mt-2'>{e?.target?.value}</div>
                                                                }
                                                                , tabSettingActiveTabKey
                                                            );
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
                                            Add Sub Tab
                                        </Button>
                                    </Popover>
                                )}
                                {tabSettingActiveTabKey === "blocks" && (
                                    <Popover
                                        trigger="click"
                                        placement="bottomLeft"
                                        content={
                                            <div>
                                                <FormControl label="Enter Block Label">
                                                    <Input
                                                        name="blockLabel"
                                                        onBlur={(e) => {
                                                            handleAddNewBlockItems(
                                                                {
                                                                    id: (new Date().getTime()).toString(36),
                                                                    title: e?.target?.value,
                                                                    display: false,
                                                                    children: {
                                                                        buttons: [],
                                                                        groups: [],
                                                                    },
                                                                }
                                                                , tabSettingActiveTabKey
                                                            );
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
                                >
                                    Save
                                </Button>
                            </Flex>
                        }
                    >
                        <div className="settingsInfo">
                            <ul>
                                <li>
                                    <span>Form Name :</span> <span>Customer</span>
                                </li>
                                <li>
                                    <span>Form ID :</span> <span>#758754</span>
                                </li>
                                <li>
                                    <span>Mode :</span> <span>Create</span>
                                </li>
                            </ul>
                        </div>
                        <div className="commonTabs">
                            <Tabs
                                defaultActiveKey="buttons"
                                items={tabSettingDrawerMenu}
                                style={{ width: "100%" }}
                                onChange={(key) => setTabSettingActiveTabKey(key)}
                            />
                        </div>
                    </Drawer>
                )
            }
        </>
    );
}

export default TabSettings;