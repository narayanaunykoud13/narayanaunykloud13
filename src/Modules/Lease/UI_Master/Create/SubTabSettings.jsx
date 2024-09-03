import React, { useState } from 'react';
import { Drawer, Tabs } from 'antd';

function SubTabSettings({
    activeTab,
    activeTabDetails,
    openSubTabSettings,
    closeSubTabSettingsDrawer
}) {
    const [subTabSettingActiveTabKey, setSubTabSettingActiveTabKey] = useState("1");
    const subTabSettingDrawerMenu = [
        {
            key: "1",
            label: <span>Buttons</span>,
            children: (
                <div className="mt-4">
                    Buttons
                </div>
            ),
        },
        {
            key: "2",
            label: <span>Sub Tab</span>,
            children: (
                <div className="mt-4">
                    Sub Tab
                </div>
            ),
        },
        {
            key: "3",
            label: <span>Blocks</span>,
            children: (
                <div className="mt-4">
                    Blocks
                </div>
            ),
        },
    ];
    return (
        <>
            {
                activeTab && (
                    <Drawer
                        title={`${activeTabDetails.label} Sub Tab Settings`}
                        width={720}
                        onClose={closeSubTabSettingsDrawer}
                        open={openSubTabSettings}
                        styles={{
                            body: {
                                paddingBottom: 50,
                            },
                        }}
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
                                defaultActiveKey="1"
                                items={subTabSettingDrawerMenu}
                                style={{ width: "100%" }}
                                onChange={(key) => setSubTabSettingActiveTabKey(key)}
                            />
                        </div>
                    </Drawer>
                )
            }
        </>
    )
}

export default SubTabSettings