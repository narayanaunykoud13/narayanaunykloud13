import React from "react";
import {
    Button,
    Drawer,
    Form,
    Input,
    Select,
    Spin,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FormControl } from "../../../../Library/Library";

const AddEditSubScreen = ({
    currentScreen,
    setAddSubScreenVisible,
    addSubScreenVisible,
    handleCreateSubScreen,
    setSubScreenForm,
    subScreenForm,
    addEditSubScreenLoader
}) => {
    const subScreenOptions = [
        { value: "screen", label: "Screen" },
        { value: "popup", label: "Popup" },
    ];

    const modesOptions = [
        { value: "list", label: "List" },
        { value: "create", label: "Create" },
        { value: "view", label: "View" },
        { value: "edit", label: "Edit" },
    ];
    return <>
        <Drawer
            zIndex={1005}
            title={currentScreen?.screenName}
            width={720}
            placement="left"
            onClose={() => setAddSubScreenVisible(false)}
            visible={addSubScreenVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button
                        className="btn"
                        onClick={() => setAddSubScreenVisible(false)}
                        style={{ marginRight: 8 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={addEditSubScreenLoader}
                        type="primary"
                        htmlType="submit"
                        form="createSubScreenForm"
                        className="btn btn-primary"
                        onClick={() => {
                            handleCreateSubScreen(currentScreen?.id);
                        }}
                    >
                        {addEditSubScreenLoader && <Spin indicator={<LoadingOutlined spin />} size="small" />}
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
                    setSubScreenForm((prevViewCreateForm) => ({
                        ...prevViewCreateForm,
                        [name]: value,
                    }));
                }}
                initialValues={subScreenForm}
            >
                <FormControl label="Sub Screen Name">
                    <Input
                        name="screenName"
                        placeholder="Enter created on"
                        className="form-control"
                        value={subScreenForm?.screenName}
                    />
                </FormControl>
                <FormControl label="Sub Screen">
                    <Select
                        name='subScreenType'
                        placeholder="Select a sub screen"
                        options={subScreenOptions}
                        className="form-control"
                        onChange={(value) => {
                            setSubScreenForm((prevForm) => ({
                                ...prevForm,
                                subScreenType: value,
                            }));
                        }}
                        value={subScreenForm.subScreenType || undefined}
                    />
                </FormControl>
                {(subScreenForm.subScreenType === "screen") && (
                    <FormControl label="Permalink">
                        <Input
                            name="permalink"
                            placeholder="Enter permalink on"
                            className="form-control"
                            value={subScreenForm?.permalink}
                        />
                    </FormControl>
                )}
                <FormControl label="Modes">
                    <Select
                        name='screenMode'
                        placeholder="Select modes"
                        options={modesOptions}
                        className="form-control"
                        onChange={(value) => {
                            setSubScreenForm((prevForm) => ({
                                ...prevForm,
                                screenMode: value,
                            }));
                        }}
                        value={subScreenForm.screenMode || undefined}
                    />
                </FormControl>
            </Form>
        </Drawer>
    </>
}

export default AddEditSubScreen;
