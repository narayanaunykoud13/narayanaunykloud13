import React, { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Flex, Tabs, Input, Popover, Select, Spin, Switch, Tooltip } from 'antd';
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { arrayMove } from "@dnd-kit/sortable";
import DnDSortableList from '../../../../Components/DnDSortableList';
import FormControl from "../../../../Components/FormControl";
import { $ajax_post } from "../../../../Library/Library";

function MasterBlockSettings({
    setGroupColumnData,
    currentBlock,
    currentBlockDetails,
    setActionBlocks,
    handleAddNewButton,
    handleAddNewGroup,
    openMasterBlockSettings,
    closeMasterBlockSettingsDrawer,
    deleteMasterGroup,
    deleteMasterButton,
}) {
    const [blockSettingActiveTabKey, setBlockSettingActiveTabKey] = useState("groups");

    const blockSettingDrawerMenu = [
        {
            key: "groups",
            label: <span>Sub Groups</span>,
            children: (
                <div className="mt-4">
                    <>
                        <span className="draggableList_heading">
                            Visible Groups
                        </span>
                        <DnDSortableList
                            items={[
                                ...currentBlockDetails?.children[blockSettingActiveTabKey]?.filter((group) => group?.display),
                                // ...currentBlockDetails.children[blockSettingActiveTabKey].filter((group) => !group?.display),
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
                                                                setActionBlocks((prevTabs) =>
                                                                    prevTabs?.map((prevTabsItem) =>
                                                                        prevTabsItem?.name === currentBlock ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((btn) => btn?.title === listItem?.title ? ({ ...btn, [name]: value }) : btn)
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
                                                                setGroupColumnData((prevState) => ({
                                                                    ...prevState,
                                                                    [name]: value
                                                                }));
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            }
                                        >
                                            <Tooltip title="Edit Group">
                                                <EditFilled />
                                            </Tooltip>
                                        </Popover>
                                        <Switch
                                            size="small"
                                            defaultValue={listItem?.display}
                                            onChange={(display) => {
                                                setActionBlocks((prevTabs) =>
                                                    prevTabs?.map((prevTabsItem) =>
                                                        prevTabsItem?.name === currentBlock ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((btn) =>
                                                                    btn?.title === listItem?.title ? { ...btn, display } : btn
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteMasterGroup(listItem, blockSettingActiveTabKey)}
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
                                setActionBlocks((prevTabs) =>
                                    prevTabs?.map((prevTabsItem) =>
                                        prevTabsItem?.name === currentBlock ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [blockSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[blockSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="title"
                        />
                        <span className="draggableList_heading">
                            Hidden Groups
                        </span>
                        <DnDSortableList
                            items={[
                                // ...currentBlockDetails.children[blockSettingActiveTabKey].filter((group) => group?.display),
                                ...currentBlockDetails?.children[blockSettingActiveTabKey]?.filter((group) => !group?.display),
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
                                                                setActionBlocks((prevTabs) =>
                                                                    prevTabs?.map((prevTabsItem) =>
                                                                        prevTabsItem?.name === currentBlock ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((btn) => btn?.title === listItem?.title ? ({ ...btn, [name]: value }) : btn)
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
                                            <Tooltip title="Edit Group">
                                                <EditFilled />
                                            </Tooltip>
                                        </Popover>
                                        <Switch
                                            size="small"
                                            defaultValue={listItem?.display}
                                            onChange={(display) => {
                                                setActionBlocks((prevTabs) =>
                                                    prevTabs?.map((prevTabsItem) =>
                                                        prevTabsItem?.name === currentBlock ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((btn) =>
                                                                    btn?.title === listItem?.title ? { ...btn, display } : btn
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteMasterGroup(listItem, blockSettingActiveTabKey)}
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
                                setActionBlocks((prevTabs) =>
                                    prevTabs?.map((prevTabsItem) =>
                                        prevTabsItem?.name === currentBlock ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [blockSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[blockSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="title"
                        />
                    </>
                </div>
            ),
        },
        {
            key: "buttons",
            label: <span>Action Buttons</span>,
            children: (
                <div className="mt-4">
                    <>
                        <span className="draggableList_heading">
                            Visible Buttons
                        </span>
                        <DnDSortableList
                            items={[
                                ...currentBlockDetails?.children[blockSettingActiveTabKey]?.filter((button) => button?.display),
                                // ...currentBlockDetails.children[blockSettingActiveTabKey].filter((button) => !button?.display),
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
                                                                setActionBlocks((prevTabs) =>
                                                                    prevTabs?.map((prevTabsItem) =>
                                                                        prevTabsItem?.name === currentBlock ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((button) => button?.title === listItem?.title ? ({ ...button, [name]: value }) : button)
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
                                                setActionBlocks((prevTabs) =>
                                                    prevTabs?.map((prevTabsItem) =>
                                                        prevTabsItem?.name === currentBlock ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((button) =>
                                                                    button?.title === listItem?.title ? { ...button, display } : button
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteMasterButton(listItem, blockSettingActiveTabKey)}
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
                                setActionBlocks((prevTabs) =>
                                    prevTabs?.map((prevTabsItem) =>
                                        prevTabsItem?.name === currentBlock ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [blockSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[blockSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="title"
                        />
                        <span className="draggableList_heading">
                            Hidden Buttons
                        </span>
                        <DnDSortableList
                            items={[
                                // ...currentBlockDetails.children[blockSettingActiveTabKey].filter((button) => button?.display),
                                ...currentBlockDetails?.children[blockSettingActiveTabKey]?.filter((button) => !button?.display),
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
                                                                setActionBlocks((prevTabs) =>
                                                                    prevTabs?.map((prevTabsItem) =>
                                                                        prevTabsItem?.name === currentBlock ? ({
                                                                            ...prevTabsItem,
                                                                            children: {
                                                                                ...prevTabsItem?.children,
                                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((button) => button?.title === listItem?.title ? ({ ...button, [name]: value }) : button)
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
                                                setActionBlocks((prevTabs) =>
                                                    prevTabs?.map((prevTabsItem) =>
                                                        prevTabsItem?.name === currentBlock ? ({
                                                            ...prevTabsItem,
                                                            children: {
                                                                ...prevTabsItem?.children,
                                                                [blockSettingActiveTabKey]: prevTabsItem?.children?.[blockSettingActiveTabKey]?.map((button) =>
                                                                    button?.title === listItem?.title ? { ...button, display } : button
                                                                )
                                                            }
                                                        }) : prevTabsItem
                                                    )
                                                )
                                            }}
                                        />
                                        <Button
                                            onClick={() => deleteMasterButton(listItem, blockSettingActiveTabKey)}
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
                                setActionBlocks((prevTabs) =>
                                    prevTabs?.map((prevTabsItem) =>
                                        prevTabsItem?.name === currentBlock ? ({
                                            ...prevTabsItem,
                                            children: {
                                                ...prevTabsItem?.children,
                                                [blockSettingActiveTabKey]: handleUpdateData(prevTabsItem?.children?.[blockSettingActiveTabKey])
                                            }
                                        }) : prevTabsItem
                                    )
                                )
                            }}
                            indexKey="title"
                        />
                    </>
                </div>
            ),
        },
    ];
    return (
        <>
            {
                currentBlock && (
                    <Drawer
                        // title={`${currentBlockDetails?.name} Main Settings`}
                        title="Block Main Settings : Block Name"
                        width={720}
                        placement='left'
                        onClose={closeMasterBlockSettingsDrawer}
                        open={openMasterBlockSettings}
                        styles={{
                            body: {
                                paddingBottom: 50,
                            },
                        }}
                        footer={
                            <Flex align="center" justify="space-between">
                                {blockSettingActiveTabKey === "groups" && (
                                    <Popover
                                        trigger="click"
                                        placement="bottomLeft"
                                        content={
                                            <div>
                                                <FormControl label="Enter Group Label">
                                                    <Input
                                                        name="blockLabel"
                                                        onBlur={(e) => {
                                                            handleAddNewGroup(
                                                                {
                                                                    id: (new Date().getTime()).toString(36),
                                                                    title: e?.target?.value,
                                                                    display: false,
                                                                }
                                                                , blockSettingActiveTabKey
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
                                            Add Group
                                        </Button>
                                    </Popover>
                                )}
                                {blockSettingActiveTabKey === "buttons" && (
                                    <Popover
                                        trigger="click"
                                        placement="bottomLeft"
                                        content={
                                            <div>
                                                <FormControl label="Enter Button Label">
                                                    <Input
                                                        name="blockLabel"
                                                        onBlur={(e) => {
                                                            handleAddNewButton(
                                                                {
                                                                    id: (new Date().getTime()).toString(36),
                                                                    title: e?.target?.value,
                                                                    display: false,
                                                                }
                                                                , blockSettingActiveTabKey
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
                            </Flex>
                        }
                    >
                        <div className="settingsInfo">
                            <ul>
                                <li>
                                    <span>Block Name :</span> <span>xyz</span>
                                </li>
                                <li>
                                    <span>Block ID :</span> <span>#</span>
                                </li>
                            </ul>
                        </div>
                        <div className="commonTabs">
                            <Tabs
                                defaultActiveKey="groups"
                                items={blockSettingDrawerMenu}
                                style={{ width: "100%" }}
                                onChange={(key) => setBlockSettingActiveTabKey(key)}
                            />
                        </div>
                    </Drawer>
                )
            }
        </>
    );
}

export default MasterBlockSettings;