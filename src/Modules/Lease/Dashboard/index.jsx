import React, { useEffect, useState } from "react";
// import { useState } from 'react'
import { Button, Drawer, Tree } from "antd";
import Navbar from "./Navbar";
import AddEditMenu from "./AddEditMenu";
import { $ajax_post } from "../../../Library/Library";


function DashBoard() {

    const [showManageMenu, setShowManageMenu] = useState(false);
    const [showAddEditMenu, setShowAddEditMenu] = useState(false);
    const [mainMenuOptions, setMainMenuOptions] = useState([]);
    const [menuType, setMenuType] = useState('');

    const initialData = [
        {
            title: "Capabilities",
            key: "capabilities",
            children: [
                {
                    title: "Project Management",
                    key: "projectManagement",
                    children: [
                        {
                            title: "Tasks",
                            key: "tasks",
                        },
                        {
                            title: "Portfolios",
                            key: "portfolios",
                        },
                        {
                            title: "Board views",
                            key: "boardViews",
                        },
                        {
                            title: "Gantt charts",
                            key: "ganttCharts",
                        },
                    ],
                },
                {
                    title: "Product Development",
                    key: "productDevelopment",
                    children: [
                        {
                            title: "Sprints",
                            key: "sprints",
                        },
                        {
                            title: "Sprint Reports",
                            key: "sprintReports",
                        },
                        {
                            title: "Kanban",
                            key: "kanban",
                        },
                        {
                            title: "Roadmap & Backlog",
                            key: "roadmap&Backlog",
                        },
                    ],
                },
                {
                    title: "Knowledge Management",
                    key: "knowledgeManagement",
                    children: [
                        {
                            title: "Docs",
                            key: "docs",
                        },
                        {
                            title: "Wikis",
                            key: "wikis",
                        },
                        {
                            title: "Ask AI",
                            key: "askAi",
                        },
                        {
                            title: "Connect Search",
                            key: "connectSearch",
                        },
                    ]
                },
                {
                    title: "Resource Management",
                    key: "resourceManagement",
                    children: [
                        {
                            title: "Time Tracking",
                            key: "timeTracking",
                        },
                        {
                            title: "Workload Views",
                            key: "workloadViews",
                        },
                        {
                            title: "Goals",
                            key: "goals",
                        },
                        {
                            title: "Dashboard",
                            key: "dashboard",
                        },
                    ]
                },
            ],
        },
        {
            title: "All Feature",
            key: "allFeature",
            children: [
                {
                    title: "Collaboration",
                    key: "collaboration",
                    children: [
                        {
                            title: "Docs",
                            key: "docs1",
                        },
                        {
                            title: "White Board",
                            key: "whiteBoard",
                        },
                        {
                            title: "Chat",
                            key: "chat",
                        },
                        {
                            title: "Inbox",
                            key: "inbox",
                        },
                    ],
                },
                {
                    title: "Workflows",
                    key: "workflows",
                    children: [
                        {
                            title: "Automation",
                            key: "automation",
                        },
                        {
                            title: "Form",
                            key: "form",
                        },
                        {
                            title: "Custom Field",
                            key: "customField",
                        },
                        {
                            title: "Custom Statuses",
                            key: "customStatuses",
                        },
                    ],
                },
            ],
        },
    ];

    const handleGetMenuList = async () =>{
        try {
            await $ajax_post("post", "rm/menu/list", {}, function (records) {
                console.log(records, '===================>');
                
              });
        } catch (error) {
            console.error("There was an error!", error);
        }
    }
    const handleSaveMenu = async () => {
        try {
            const bodyData = {
                "json": initialData
            }
            await $ajax_post("post", "rm/menu/create", bodyData, function () {
                // setAddSubScreenVisible(false);
            });
        } catch (error) {
            console.error("There was an error!", error);
        }
    }

    // useEffect(() => {
    //     handleGetMenuList();
    // },[])


    const [treeData, setTreeData] = useState(initialData);
    const setMainMenu = () => {
        const data = []
        treeData.map((item) => {
            data.push({
                value: item.title,
                label: item.title
            })
        })
        setMainMenuOptions(data)
    }
    const onDrop = (info) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i += 1) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };

        const data = [...treeData];

        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                item.children.push(dragObj);
            });
        } else if (
            (info.node.children || []).length > 0 && // Has children
            info.node.expanded && // Is expanded
            dropPosition === 1 // Dropping at the bottom gap
        ) {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }

        setTreeData(data);
    };

    return <>
        <div className="appPage">
            <Navbar
                treeData={treeData}
            />
            <Drawer
                title='Manage Menu'
                width={720}
                onClose={() => setShowManageMenu(false)}
                visible={showManageMenu}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <div >
                            <Button
                                type="primary"
                                htmlType="submit"
                                form="createScreenForm"
                                className="btn btn-primary"
                                onClick={() => {
                                    setMenuType('first')
                                    setShowAddEditMenu(true)
                                }}
                            >
                                Add 1st Level Menu
                            </Button>
                        </div>
                        <div >
                            <Button
                                type="primary"
                                htmlType="submit"
                                form="createScreenForm"
                                className="btn btn-primary"
                                onClick={() => {
                                    setMainMenu();
                                    setMenuType('second')
                                    setShowAddEditMenu(true)
                                }}
                            >
                                Add 2nd Level Menu
                            </Button>
                        </div>
                        <div >
                            <Button
                                type="primary"
                                htmlType="submit"
                                form="createScreenForm"
                                className="btn btn-primary"
                                onClick={() => {
                                    setMainMenu();
                                    setMenuType('third')
                                    setShowAddEditMenu(true)
                                }}
                            >
                                Add 3rd Level Menu
                            </Button>
                        </div>
                        <div >
                            <Button
                                className="btn"
                                onClick={() => setShowManageMenu(false)}
                                style={{ marginRight: 8 }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                }
            >
                <Tree
                    multiple
                    defaultExpandAll
                    draggable
                    blockNode
                    treeData={treeData}
                    onDrop={onDrop}
                />
            </Drawer>

            <AddEditMenu
                setShowAddEditMenu={setShowAddEditMenu}
                showAddEditMenu={showAddEditMenu}
                menuType={menuType}
                setMenuType={setMenuType}
                treeData={treeData}
                setTreeData={setTreeData}
                mainMenuOptions={mainMenuOptions}
            />
            <div
                style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}
                onClick={() => setShowManageMenu(true)}>
                <Button>
                    Manage Menu
                </Button>
            </div>
        </div>
    </>
}

export default DashBoard;