import React, { useState } from 'react';
import { Button, Drawer, Flex, Tabs, Input, Popover, Switch, Tooltip } from 'antd';
import { EditFilled, DeleteOutlined } from "@ant-design/icons";
import { arrayMove } from "@dnd-kit/sortable";
import DnDSortableList from '../../../../Components/DnDSortableList';
import FormControl from "../../../../Components/FormControl";

function BlockSettings({
    openBlockSettings,
    closeBlockSettingsDrawer,
    clickedBlockDetails,
    deleteItemGroup,
    deleteItemButton,
    currentMenu,
    currentMenuDetails,
    setActionTabs,
    handleAddNewBlockGroupItems,
    handleAddNewBlockButtonItems,
}) {
    const [blockSettingActiveTabKey, setBlockSettingActiveTabKey] = useState("4");

    const blockSettingDrawerMenu = [
        {
            key: "4",
            label: <span>Sub Groups </span>,
            children: currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.groups?.length > 0 ?
                (
                    <div className="mt-4">
                        <>
                            <span className="draggableList_heading">
                                Visible Groups
                            </span>
                            <DnDSortableList
                                items={[
                                    ...currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.groups?.filter((group) => group?.display),
                                    // ...currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.groups?.filter((group) => !group?.display),
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
                                                                    // Update actionTabs state
                                                                    setActionTabs((prevTabs) =>
                                                                        prevTabs.map((prevTabsItem) =>
                                                                            prevTabsItem?.tabpath === currentMenu ? ({
                                                                                ...prevTabsItem,
                                                                                children: {
                                                                                    ...prevTabsItem?.children,
                                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                                            ...blocksItem,
                                                                                            children: {
                                                                                                ...blocksItem?.children,
                                                                                                groups: blocksItem?.children?.groups.map((groupName) => groupName.title === listItem?.title ? ({ ...groupName, [name]: value }) : groupName)
                                                                                            }
                                                                                        }) : blocksItem
                                                                                    )
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
                                                                    console.log("columns in Visible Blocks", name, value);
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
                                                    setActionTabs((prevTabs) =>
                                                        prevTabs.map((prevTabsItem) =>
                                                            prevTabsItem?.tabpath === currentMenu ? ({
                                                                ...prevTabsItem,
                                                                children: {
                                                                    ...prevTabsItem?.children,
                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                            ...blocksItem,
                                                                            children: {
                                                                                ...blocksItem?.children,
                                                                                groups: blocksItem?.children?.groups.map((groupName) => groupName.title === listItem?.title ? ({ ...groupName, display }) : groupName)
                                                                            }
                                                                        }) : blocksItem
                                                                    )
                                                                }
                                                            }) : prevTabsItem
                                                        )
                                                    )
                                                }}
                                            />
                                            <Button
                                                onClick={() => deleteItemGroup(listItem, "blocks", "groups")}
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
                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                            ...blocksItem,
                                                            children: {
                                                                ...blocksItem?.children,
                                                                groups: handleUpdateData(blocksItem?.children?.groups)
                                                            }
                                                        }) : blocksItem
                                                    )
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
                                    // ...currentMenuDetails?.children?.blocks?.find?.((item) => item.title === clickedBlockDetails?.title)?.children?.groups?.filter((group) => group?.display),
                                    ...currentMenuDetails?.children?.blocks?.find?.((item) => item.title === clickedBlockDetails?.title)?.children?.groups?.filter((group) => !group?.display),
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
                                                                    // Update actionTabs state
                                                                    setActionTabs((prevTabs) =>
                                                                        prevTabs.map((prevTabsItem) =>
                                                                            prevTabsItem?.tabpath === currentMenu ? ({
                                                                                ...prevTabsItem,
                                                                                children: {
                                                                                    ...prevTabsItem?.children,
                                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                                            ...blocksItem,
                                                                                            children: {
                                                                                                ...blocksItem?.children,
                                                                                                groups: blocksItem?.children?.groups.map((groupName) => groupName.title === listItem?.title ? ({ ...groupName, [name]: value }) : groupName)
                                                                                            }
                                                                                        }) : blocksItem
                                                                                    )
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
                                                    setActionTabs((prevTabs) =>
                                                        prevTabs.map((prevTabsItem) =>
                                                            prevTabsItem?.tabpath === currentMenu ? ({
                                                                ...prevTabsItem,
                                                                children: {
                                                                    ...prevTabsItem?.children,
                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                            ...blocksItem,
                                                                            children: {
                                                                                ...blocksItem?.children,
                                                                                groups: blocksItem?.children?.groups.map((groupName) => groupName.title === listItem?.title ? ({ ...groupName, display }) : groupName)
                                                                            }
                                                                        }) : blocksItem
                                                                    )
                                                                }
                                                            }) : prevTabsItem
                                                        )
                                                    )
                                                }}
                                            />
                                            <Button
                                                onClick={() => deleteItemGroup(listItem, "blocks", "groups")}
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
                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                            ...blocksItem,
                                                            children: {
                                                                ...blocksItem?.children,
                                                                groups: handleUpdateData(blocksItem?.children?.groups)
                                                            }
                                                        }) : blocksItem
                                                    )
                                                }
                                            }) : prevTabsItem
                                        )
                                    )
                                }}
                                indexKey="title"
                            />
                        </>
                    </div>
                ) : null,
        },
        {
            key: "5",
            label: <span>Action Buttons</span>,
            children: currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.buttons?.length > 0 ?
                (
                    <div className="mt-4">
                        <>
                            <span className="draggableList_heading">
                                Visible Buttons
                            </span>
                            <DnDSortableList
                                items={[
                                    ...currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.buttons?.filter((button) => button?.display),
                                    // ...currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.buttons?.filter((button) => !button?.display),
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
                                                                    // Update actionTabs state
                                                                    setActionTabs((prevTabs) =>
                                                                        prevTabs.map((prevTabsItem) =>
                                                                            prevTabsItem?.tabpath === currentMenu ? ({
                                                                                ...prevTabsItem,
                                                                                children: {
                                                                                    ...prevTabsItem?.children,
                                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                                            ...blocksItem,
                                                                                            children: {
                                                                                                ...blocksItem?.children,
                                                                                                buttons: blocksItem?.children?.buttons.map((buttonName) => buttonName.title === listItem?.title ? ({ ...buttonName, [name]: value }) : buttonName)
                                                                                            }
                                                                                        }) : blocksItem
                                                                                    )
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
                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                            ...blocksItem,
                                                                            children: {
                                                                                ...blocksItem?.children,
                                                                                buttons: blocksItem?.children?.buttons.map((buttonName) => buttonName.title === listItem?.title ? ({ ...buttonName, display }) : buttonName)
                                                                            }
                                                                        }) : blocksItem
                                                                    )
                                                                }
                                                            }) : prevTabsItem
                                                        )
                                                    )
                                                }}
                                            />
                                            <Button
                                                onClick={() => deleteItemButton(listItem, "blocks", "buttons")}
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
                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                            ...blocksItem,
                                                            children: {
                                                                ...blocksItem?.children,
                                                                buttons: handleUpdateData(blocksItem?.children?.buttons)
                                                            }
                                                        }) : blocksItem
                                                    )
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
                                    // ...currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.buttons?.filter((button) => button?.display),
                                    ...currentMenuDetails?.children?.blocks?.find?.((item) => item?.title === clickedBlockDetails?.title)?.children?.buttons?.filter((button) => !button?.display),
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
                                                                    // Update actionTabs state
                                                                    setActionTabs((prevTabs) =>
                                                                        prevTabs.map((prevTabsItem) =>
                                                                            prevTabsItem?.tabpath === currentMenu ? ({
                                                                                ...prevTabsItem,
                                                                                children: {
                                                                                    ...prevTabsItem?.children,
                                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                                            ...blocksItem,
                                                                                            children: {
                                                                                                ...blocksItem?.children,
                                                                                                buttons: blocksItem?.children?.buttons.map((buttonName) => buttonName.title === listItem?.title ? ({ ...buttonName, [name]: value }) : buttonName)
                                                                                            }
                                                                                        }) : blocksItem
                                                                                    )
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
                                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                                            ...blocksItem,
                                                                            children: {
                                                                                ...blocksItem?.children,
                                                                                buttons: blocksItem?.children?.buttons.map((buttonName) => buttonName.title === listItem?.title ? ({ ...buttonName, display }) : buttonName)
                                                                            }
                                                                        }) : blocksItem
                                                                    )
                                                                }
                                                            }) : prevTabsItem
                                                        )
                                                    )
                                                }}
                                            />
                                            <Button
                                                onClick={() => deleteItemButton(listItem, "blocks", "buttons")}
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
                                                    blocks: prevTabsItem?.children?.blocks.map((blocksItem) =>
                                                        blocksItem.title === clickedBlockDetails?.title ? ({
                                                            ...blocksItem,
                                                            children: {
                                                                ...blocksItem?.children,
                                                                buttons: handleUpdateData(blocksItem?.children?.buttons)
                                                            }
                                                        }) : blocksItem
                                                    )
                                                }
                                            }) : prevTabsItem
                                        )
                                    )
                                }}
                                indexKey="title"
                            />
                        </>
                    </div>
                ) : null,
        },
    ];
    return (
        <>
            <Drawer
                // title={`${clickedBlockDetails?.title} Block Settings`}
                title="Block Main Settings : Block Name"
                width={720}
                placement='left'
                onClose={closeBlockSettingsDrawer}
                open={openBlockSettings}
                styles={{
                    body: {
                        paddingBottom: 50,
                    },
                }}
                footer={
                    <Flex align="center" justify="space-between">
                        {blockSettingActiveTabKey === "4" && (
                            <Popover
                                trigger="click"
                                placement="bottomLeft"
                                content={
                                    <div>
                                        <FormControl label="Enter Group Label">
                                            <Input
                                                name="blockLabel"
                                                onBlur={(e) => {
                                                    handleAddNewBlockGroupItems({
                                                        id: (new Date().getTime()).toString(36),
                                                        title: e?.target?.value,
                                                        display: false,
                                                    },
                                                        "blocks",
                                                        "groups",
                                                        clickedBlockDetails?.title
                                                    )
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
                        {blockSettingActiveTabKey === "5" && (
                            <Popover
                                trigger="click"
                                placement="bottomLeft"
                                content={
                                    <div>
                                        <FormControl label="Enter Button Label">
                                            <Input
                                                name="blockLabel"
                                                onBlur={(e) => {
                                                    handleAddNewBlockButtonItems({
                                                        id: (new Date().getTime()).toString(36),
                                                        title: e?.target?.value,
                                                        display: false,
                                                    },
                                                        "blocks",
                                                        "buttons",
                                                        clickedBlockDetails?.title
                                                    )
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
                    </Flex >
                }
            >
                <div className="settingsInfo">
                    <ul>
                        <li>
                            <span>Block Name :</span> <span>Customer</span>
                        </li>
                        <li>
                            <span>Block ID :</span> <span>#</span>
                        </li>
                    </ul>
                </div>
                <div className="commonTabs">
                    <Tabs
                        defaultActiveKey="4"
                        items={blockSettingDrawerMenu}
                        style={{ width: "100%" }}
                        onChange={(key) => setBlockSettingActiveTabKey(key)}
                    />
                </div>
            </Drawer >
        </>
    );
}

export default BlockSettings;