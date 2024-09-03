import { Button, Drawer, Input, Select, Form } from "antd";
import React, { useEffect, useState } from "react";
import { FormControl } from "../../../Library/Library";


function AddEditMenu({
    setShowAddEditMenu,
    showAddEditMenu,
    menuType,
    treeData,
    setTreeData,
    mainMenuOptions
}) {
    const initialFormValue = {
        name: "",
        firstLevelMenu: "",
        secondLevelMenu: ""
    }
    const findObjectByTitle = (title) => {
        let result = null;
        const searchTree = (nodes) => {
            for (const node of nodes) {
                if (node.title === title) {
                    result = node;
                    return;
                }
                if (node.children) {
                    searchTree(node.children);
                }
            }
        };

        searchTree(treeData);
        return result;
    };

    const findIndexByTitle = (title) => {
        let indexPath = null;
        const searchTree = (nodes, currentPath = []) => {
            for (let i = 0; i < nodes.length; i += 1) {
                const node = nodes[i];
                const newPath = [...currentPath, i];
                if (node.title === title) {
                    indexPath = newPath;
                    return;
                }
                if (node.children) {
                    searchTree(node.children, newPath);
                }
            }
        };
        searchTree(treeData);
        return indexPath;
    };
    const generateUniqueKey = (key) => `${key}_${Date.now()}`;
    const [subMenuOptions, setSubMenuOptions] = useState([]);

    const [menuForm, setMenuForm] = useState(initialFormValue);

    const setSubMenu = (value) => {
        const obj = findObjectByTitle(value)
        const data = []
        obj.children.map((item) => {
            data.push({
                value: item.title,
                label: item.title
            })
        })
        setSubMenuOptions(data)
    }

    // const handleChange = (key, value) => {
    //     setMenuForm((prevMenuForm) => ({
    //         ...prevMenuForm,
    //         [key]: value,
    //     }));
    // };

    const onSubmit = () => {
        const newNode = {
            title: menuForm?.name,
            key: generateUniqueKey(menuForm?.name),
            children: []
        }
        if (menuType === 'first') {
            setTreeData((prevTreeData) => [...prevTreeData, newNode]);
        } else if (menuType === "second") {
            setTreeData((prevTreeData) => {
                const updatedTreeData = [...prevTreeData];
                if (updatedTreeData[findIndexByTitle(menuForm?.firstLevelMenu)]?.children) {
                    updatedTreeData[findIndexByTitle(menuForm?.firstLevelMenu)].children.push(newNode);
                }
                return updatedTreeData;
            });
        } else if (menuType === "third") {
            const index = findIndexByTitle(menuForm?.secondLevelMenu);
            setTreeData((prevTreeData) => {
                const updatedTreeData = [...prevTreeData];
                if (updatedTreeData[index[0]]?.children && updatedTreeData[index[0]].children[index[1]]?.children) {
                    updatedTreeData[index[0]].children[index[1]].children.push(newNode);
                }
                return updatedTreeData;
            });
        }
        setShowAddEditMenu(false);
    }
    return <>
        <Drawer
            zIndex={1005}
            title={`Add ${menuType} level menu`}
            width={720}
            placement="left"
            onClose={() => {
                setShowAddEditMenu(false)
                setMenuForm(initialFormValue)
            }}
            visible={showAddEditMenu}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button
                        className="btn"
                        onClick={() => {
                            setShowAddEditMenu(false)
                            setMenuForm(initialFormValue)
                        }}
                        style={{ marginRight: 8 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        // disabled={addEditSubScreenLoader}
                        type="primary"
                        htmlType="submit"
                        form="addEditMenuForm"
                        className="btn btn-primary"
                        onClick={() => {
                            onSubmit();
                            setMenuForm(initialFormValue)
                        }}
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <Form
                layout="vertical"
                id="createSubScreenForm"
                onChange={(event) => {
                    const { name, value } = event.target;
                    setMenuForm((prevViewCreateForm) => ({
                        ...prevViewCreateForm,
                        [name]: value,
                    }));
                }}
                initialValues={menuForm}
            >
                <FormControl label="Name">
                    <Input
                        name="name"
                        placeholder="Enter name"
                        className="form-control"
                        value={menuForm?.name}
                    />
                </FormControl>
                {(menuType === 'second' || menuType === 'third') && (
                    <FormControl label="Select First Level Menu">
                        <Select
                            name='firstLevelMenu'
                            placeholder="First level menu"
                            options={mainMenuOptions}
                            className="form-control"
                            onChange={(value) => {
                                setSubMenu(value);
                                setMenuForm((prevForm) => ({
                                    ...prevForm,
                                    firstLevelMenu: value,
                                }));
                            }}
                            value={menuForm.firstLevelMenu || undefined}
                        />
                    </FormControl>
                )}
                {menuType === 'third' && (
                    <FormControl label="Select Second Level Menu">
                        <Select
                            name='secondLevelMenu'
                            placeholder="Second level menu"
                            options={subMenuOptions}
                            className="form-control"
                            onChange={(value) => {
                                setMenuForm((prevForm) => ({
                                    ...prevForm,
                                    secondLevelMenu: value,
                                }));
                            }}
                            value={menuForm.secondLevelMenu || undefined}
                        />
                    </FormControl>
                )}

            </Form>
        </Drawer>
    </>
}
export default AddEditMenu;