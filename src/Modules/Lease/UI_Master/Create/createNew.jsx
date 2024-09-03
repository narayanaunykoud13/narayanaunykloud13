import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Collapse } from 'antd';

const buildElement = (item, idx) => {
    switch (item.type) {
        case 'button':
            return <Button key={idx} {...item} />;
        case 'button_container':
            return <Button key={idx} {...item} />;
        case 'field':
            return <Field key={idx} {...item} />;
        case 'group_container':
            return <Group key={idx} {...item} />;
        case 'block_container':
            return <Block key={idx} {...item} />;
        case 'tab':
            return <Tab key={idx} {...item} />;
        case 'tabs_container':
            return <TabsContainer key={idx} {...item} />;
        default:
            return null;
    }
};

const Button = ({ title }) => <button>{title}</button>;

const Field = ({ field_type, title }) => {
    if (field_type === 'text') {
        return (
            <div>
                <label>{title}</label>
                <input type="text" />
            </div>
        );
    } else if (field_type === 'list_record') {
        return (
            <div>
                <label>{title}</label>
                <select>
                    {/* Options should be mapped based on field_source_id */}
                </select>
            </div>
        );
    }
    return null;
};

const Group = ({ title, content }) => (
    <div>
        <h3>{title}</h3>
        <div>{content.map((item, idx) => buildElement(item, idx))}</div>
    </div>
);

const Block = ({ content, title }) => {
    // <div className="block-container">{content.map((item, idx) => buildElement(item, idx))}</div>
    const blockItem = [
        {
            key: '1',
            label: title,
        }
    ]
    return (
        <Collapse collapsible="icon" items={blockItem} defaultActiveKey={['1']}>
            {content.map((item, idx) => buildElement(item, idx))}
        </Collapse>
    );
};

const Tab = ({ title, content }) => (
    <div className="tab">
        <h4>{title}</h4>
        <div>{content.map((item, idx) => buildElement(item, idx))}</div>
    </div>
);

const TabsContainer = ({ tab_typ, content }) => (
    <div className={`tabs-container ${tab_typ}`}>
        {content.map((tab, idx) => (
            <Tab key={idx} {...tab} />
        ))}
    </div>
);

const DynamicScreenBuilder = () => {
    const [jsonData, setJsonData] = useState(null);

    let dummyJson = [
        {
            "title": "Buttons",
            "type": "button_container",
            "content": [
                {
                    "type": "button",
                    "title": "Save"
                },
                {
                    "type": "button",
                    "title": "Cancel"
                }
            ]
        },
        {
            "title": "Customer Information",
            "type": "block_container",
            "content": [
                {
                    "type": "group_container",
                    "title": "Primary Information",
                    "content": [
                        {
                            "type": "field",
                            "field_type": "text",
                            "title": "First Name",
                            "fieldid": "custrecord_jdfhghfdgjhdf"
                        },
                        {
                            "type": "field",
                            "field_type": "list_record",
                            "title": "Gender",
                            "fieldid": "custrecord_jdfhghfdgjhdf",
                            "field_source_id": "custlist_gfbjgjhdfg"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Primary Information",
            "type": "block_container",
            "content": [
                {
                    "type": "field",
                    "field_type": "text",
                    "title": "Customer Name",
                    "fieldid": "custrecord_jdfhghfdgjhdf"
                },
                {
                    "type": "field",
                    "field_type": "list_record",
                    "title": "Customer Type",
                    "fieldid": "custrecord_jdfhghfdgjhdf",
                    "field_source_id": "custlist_gfbjgjhdfg"
                }
            ]
        },
        {
            "title": "Tabs",
            "type": "tabs_container",
            "tab_typ": "vertical/horizontal",
            "content": [
                {
                    "type": "tab",
                    "title": "Communication",
                    "content": []
                }
            ]
        }
    ]

    useEffect(() => {
        // axios.get('/path-to-json')
        //     .then(response => console.error('Success loading JSON:', response))
        //     .catch(error => console.error('Error loading JSON:', error));
        setJsonData(dummyJson)
    }, []);

    if (!jsonData) return <div>Loading...</div>;

    return (
        <div>
            {jsonData.map((item, idx) => buildElement(item, idx))}
        </div>
    );
};

export default DynamicScreenBuilder;
