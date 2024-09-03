import React, { useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Flex, Tabs, Input, Select, Spin, Switch } from 'antd';
import { arrayMove } from "@dnd-kit/sortable";
import DnDSortableList from '../../../../Components/DnDSortableList';
import { $ajax_post } from "../../../../Library/Library";

function BlockFieldSettings({
    addAvailableFields,
    setAddAvailableFields,
    recordsList,
    fetchRecordsList,
    role = "super-admin",
    showBlockSettingsDrawer,
    openBlockFieldSettings,
    closeBlockFieldSettingsDrawer,
}) {
    const { Option } = Select;
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [firstLinkedRecords, setFirstLinkedRecords] = useState([]);
    const [secondLinkedRecords, setSecondLinkedRecords] = useState([]);
    const [hideShowAvailableField, setHideShowAvailableField] = useState([]);
    const [saveViewPrimaryRecords, setSaveViewPrimaryRecords] = useState([]);
    const [saveViewFirstLinkedRecords, setSaveViewFirstLinkedRecords] = useState([]);
    const [saveViewSecondLinkedRecords, setSaveViewSecondLinkedRecords] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [fetchingScreens, setFetchingScreens] = useState(false);

    const filteredFields = useMemo(() => {
        if (selectedRecord) {
            if (searchText) {
                return fields?.filter((field) => {
                    return Object.keys(field)?.some((key) => {
                        if (typeof field[key] === "string") {
                            return field[key]
                                ?.toLowerCase()
                                ?.includes(searchText?.toLowerCase());
                        }
                        return false;
                    });
                });
            }
        }
        return fields;
    }, [searchText, fields]);

    const fetchLinkedRecords = async (id, recordType) => {
        try {
            $ajax_post(
                "post",
                "g/sb/1005",
                {
                    id,
                },
                (res) => {
                    if (recordType === "first") {
                        setFirstLinkedRecords(res);
                    } else if (recordType === "second") {
                        setSecondLinkedRecords(res);
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const fetchScreens = async (id) => {
        setFetchingScreens(true);
        try {
            $ajax_post(
                "post",
                "g/sb/1004",
                {
                    id,
                },
                (res) => {
                    setFields(
                        res?.map((field) => {
                            if (
                                addAvailableFields?.some(
                                    (availableField) =>
                                        availableField?.internalid === field?.internalid
                                )
                            ) {
                                return { ...field, selected: true };
                            }
                            return field;
                        })
                    );
                    setFetchingScreens(false);
                }
            );
        } catch (error) {
            console.log(error);
            setFetchingScreens(false);
        }
    };

    const saveConfiguration = async () => {
        try {
            alert("called");
        } catch (error) {
            console.log(error);
        }
    };

    const hideShowFields = (value, listItem) => {
        const updatedFields = addAvailableFields.map((field) => {
            if (field.internalid === listItem.internalid) {
                return { ...field, hidden: !value };
            }
            return field;
        });
        setHideShowAvailableField(updatedFields);
        setAddAvailableFields(updatedFields);
    };

    useEffect(() => {
        if (saveViewPrimaryRecords && firstLinkedRecords?.length <= 0) {
            fetchRecordsList();
            fetchLinkedRecords(saveViewPrimaryRecords?.internalid, "first");
        }
        if (saveViewPrimaryRecords && secondLinkedRecords?.length <= 0) {
            fetchRecordsList();
            fetchLinkedRecords(saveViewPrimaryRecords?.internalid, "second");
        }
    }, [saveViewPrimaryRecords]);

    const [blockSettingActiveTabKey, setBlockSettingActiveTabKey] = useState("1");
    const blockSettingDrawerMenu = [
        {
            key: "1",
            label: <span>Available Fields</span>,
            children: (
                <div className="mt-4">
                    <span className="draggableList_heading">
                        Visible Fields (
                        {
                            addAvailableFields?.filter((field) => !field?.hidden)
                                ?.length
                        }
                        )
                    </span>
                    <DnDSortableList
                        items={
                            !addAvailableFields
                                ? []
                                : addAvailableFields?.filter((field) => !field?.hidden)
                        }
                        itemsRenderer={(listItem) => (
                            <Flex
                                className="draggableList_item_content"
                                justify="space-between"
                            >
                                <div className="draggableList_title">
                                    {listItem?.name}
                                </div>
                                <Flex justify="end" align="center" gap={5}>
                                    <Switch
                                        size="small"
                                        value={!listItem?.hidden}
                                        onChange={(value) =>
                                            hideShowFields(value, listItem)
                                        }
                                    />
                                </Flex>

                            </Flex>
                        )}
                        onDragEnd={({ active, over }) => {
                            setAddAvailableFields((prev) => {
                                const newIndex = prev?.findIndex(
                                    (view) => view?.internalid === active?.id
                                );
                                const oldIndex = prev?.findIndex(
                                    (view) => view?.internalid === over?.id
                                );
                                let updatedFields = arrayMove(
                                    prev,
                                    newIndex,
                                    oldIndex
                                );
                                return updatedFields;
                            })
                        }}
                        indexKey="internalid"
                    />
                    <span className="draggableList_heading">
                        Hidden Fields (
                        {
                            addAvailableFields?.filter((field) => field?.hidden)
                                ?.length
                        }
                        )
                    </span>
                    <DnDSortableList
                        items={
                            !addAvailableFields
                                ? []
                                : addAvailableFields?.filter((field) => field?.hidden)
                        }
                        itemsRenderer={(listItem) => (
                            <Flex
                                className="draggableList_item_content"
                                justify="space-between"
                            >
                                <div className="draggableList_title">
                                    {listItem?.name}
                                </div>
                                <Flex justify="end" align="center" gap={5}>
                                    <Switch
                                        size="small"
                                        value={!listItem?.hidden}
                                        onChange={(value) =>
                                            hideShowFields(value, listItem)
                                        }
                                    />
                                </Flex>
                            </Flex>
                        )}
                        onDragEnd={({ active, over }) => {
                            setAddAvailableFields((prev) => {
                                const newIndex = prev?.findIndex(
                                    (view) => view?.internalid === active?.id
                                );
                                const oldIndex = prev?.findIndex(
                                    (view) => view?.internalid === over?.id
                                );
                                let updatedFields = arrayMove(
                                    prev,
                                    newIndex,
                                    oldIndex
                                );
                                return updatedFields;
                            })
                        }}
                        indexKey="internalid"
                    />
                </div>
            ),
        },
        {
            key: "2",
            label: <span>Select Records & Fields</span>,
            children: (
                <div className="mt-4">
                    <div className="control-group labelleft mw-100 mt-0">
                        <label className="control-label">Primary Record</label>
                        <div className="controls">
                            <Select
                                name="field"
                                className="form-control"
                                placeholder="Select Primary Record"
                                readOnly={
                                    role !== "super-admin" && role !== "power-user"
                                }
                                disabled={
                                    role !== "super-admin" && role !== "power-user"
                                }
                                defaultValue={saveViewPrimaryRecords?.internalid}
                                onChange={(value) => {
                                    let thisRecord = recordsList?.find(
                                        (record) => record?.internalid === value
                                    );
                                    fetchScreens(thisRecord?.internalid);
                                    fetchLinkedRecords(
                                        thisRecord?.internalid,
                                        "first"
                                    );
                                    setSelectedRecord(thisRecord);
                                    setSaveViewPrimaryRecords(thisRecord)
                                }}
                            >
                                {recordsList?.map?.((record) => (
                                    <Option
                                        key={record?.internalid}
                                        value={record?.internalid}
                                    >
                                        {record?.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="control-group labelleft mw-100">
                        <label className="control-label">
                            1st Level Linked Records
                        </label>
                        <div className="controls">
                            <Select
                                name="field"
                                className="form-control"
                                placeholder="Select 1st Level Linked Records"
                                readOnly={
                                    role !== "super-admin" && role !== "power-user"
                                }
                                disabled={
                                    role !== "super-admin" && role !== "power-user"
                                }
                                defaultValue={saveViewFirstLinkedRecords?.internalid}
                                onChange={(value) => {
                                    let thisRecord = recordsList?.find(
                                        (record) => record?.internalid === value
                                    );
                                    fetchScreens(thisRecord?.internalid);
                                    fetchLinkedRecords(
                                        thisRecord?.internalid,
                                        "second"
                                    );
                                    setSelectedRecord(thisRecord);
                                    setSaveViewFirstLinkedRecords(thisRecord)
                                }}
                            >
                                {firstLinkedRecords?.map?.((record) => (
                                    <Option
                                        key={record?.internalid}
                                        value={record?.internalid}
                                    >
                                        {record?.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="control-group labelleft mw-100">
                        <label className="control-label">
                            2nd Level Linked Records
                        </label>
                        <div className="controls">
                            <Select
                                name="field"
                                className="form-control"
                                placeholder="Select 2nd Level Linked Records"
                                readOnly={
                                    role !== "super-admin" && role !== "power-user"
                                }
                                disabled={
                                    role !== "super-admin" && role !== "power-user"
                                }
                                defaultValue={saveViewSecondLinkedRecords?.internalid}
                                onChange={(value) => {
                                    let thisRecord = recordsList?.find(
                                        (record) => record?.internalid === value
                                    );
                                    fetchScreens(thisRecord?.internalid);
                                    setSelectedRecord(thisRecord);
                                    setSaveViewSecondLinkedRecords(thisRecord)
                                }}
                            >
                                {secondLinkedRecords?.map?.((record) => (
                                    <Option
                                        key={record?.internalid}
                                        value={record?.internalid}
                                    >
                                        {record?.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div>
                        <hr className="my-4" />
                        <Flex justify="space-between" align="center">
                            <span className="fs-14">Fields</span>
                            <div className="control-group mb-0 mt-0">
                                <div className="controls">
                                    <Input
                                        name="field"
                                        className="form-control"
                                        placeholder="Search Fields Here"
                                        onChange={(e) =>
                                            setSearchText(e?.target?.value)
                                        }
                                    />
                                </div>
                            </div>
                        </Flex>
                        {fetchingScreens ? (
                            <div className="noFields">
                                <Spin />
                            </div>
                        ) : fields && fields?.length > 0 ? (
                            <DnDSortableList
                                items={filteredFields}
                                itemsRenderer={(listItem) => (
                                    <Flex
                                        className="draggableList_item_content"
                                        justify="space-between"
                                    >
                                        <div className="draggableList_title">
                                            {listItem?.name} | {listItem?.field_source}
                                        </div>
                                        <Flex justify="end" align="center" gap={5}>
                                            <Switch
                                                size="small"
                                                defaultChecked={listItem?.selected}
                                                onChange={(value) => {
                                                    if (value) {
                                                        setSelectedFields((prev) => {
                                                            return [...prev, listItem];
                                                        });
                                                    } else {
                                                        setSelectedFields((prev) => {
                                                            return prev?.filter(
                                                                (item) =>
                                                                    item?.internalid !==
                                                                    listItem?.internalid
                                                            );
                                                        });
                                                    }
                                                }}
                                            />
                                        </Flex>
                                    </Flex>
                                )}
                                indexKey="internalid"
                            />
                        ) : (
                            <div className="noFields">No Fields Found</div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "3",
            label: <span>Data Sources</span>,
            children: (
                <div className="mt-4">
                    <ul>
                        {addAvailableFields?.map((field) => {
                            const matchingRecord = recordsList?.find(
                                (record) => record?.internalid === field?.recordtype
                            );
                            return (
                                <li key={field?.id}>
                                    {matchingRecord?.name}: {field?.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <>
            <Drawer
                title="Block Field Settings : Block Name"
                width={720}
                onClose={closeBlockFieldSettingsDrawer}
                open={openBlockFieldSettings}
                styles={{
                    body: {
                        paddingBottom: 50,
                    },
                }}
                footer={
                    <Flex align="center" justify="space-between">
                        {blockSettingActiveTabKey === "1" && (
                            <Button
                                type="primary"
                                className="btn btn-primary"
                                onClick={saveConfiguration}
                            >
                                Save
                            </Button>
                        )}
                        {blockSettingActiveTabKey === "2" && (
                            <Button
                                className="btn btn-primary"
                                onClick={() => {
                                    const updatedFields = selectedFields.map(field => ({
                                        ...field,
                                        hidden: true
                                    }));
                                    setAddAvailableFields([...addAvailableFields, ...updatedFields]);
                                    setSelectedFields([]);
                                }}
                            >
                                Add Fields
                            </Button>
                        )}
                        <Button
                            type="primary"
                            className="btn btn-primary"
                            onClick={() => {
                                showBlockSettingsDrawer(true);
                            }}
                        >
                            Main Settings
                        </Button>
                    </Flex>
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
                        defaultActiveKey="1"
                        items={blockSettingDrawerMenu}
                        style={{ width: "100%" }}
                        onChange={(key) => setBlockSettingActiveTabKey(key)}
                    />
                </div>
            </Drawer>
        </>
    );
}

export default BlockFieldSettings;