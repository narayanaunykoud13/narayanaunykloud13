import React, { useState } from 'react';
import {
    LeftOutlined,
    RightOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const TabNavigation = ({ menus, tabId, children, onClick, isSetting = false, onSettingClick }) => { // Using `children` to render passed content

    const [sidecollapse, setSidecollapse] = useState(false);
    const collapseSidebar = () => {
        setSidecollapse(!sidecollapse);
    }
    return (
        <div className="tab-navigation">
            <div className={`navigation-menus ${sidecollapse ? "sidebarCollapse" : ""}`}>
                <div className='collpseIcon' onClick={() => collapseSidebar()}>
                    {
                        sidecollapse ?
                            <RightOutlined />
                            :
                            <LeftOutlined />
                    }
                </div>
                <ul>
                    {
                        menus.map((menu, index) => (
                            <li onClick={() => { onClick(menu.tabpath) }} key={index} className={tabId == menu.tabpath && 'active-tab'}>
                                <Link to={menu.path + '/' + menu.tabpath}><span className='tab-menu-icon'>{menu.icon}</span> {menu.label}</Link>
                                {isSetting &&
                                    <button type='button' className='settingIcon' onClick={onSettingClick}><SettingOutlined /></button>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={`tab-navigation-body ${sidecollapse ? "sidebarCollapse" : ""}`}>
                {children} {/* This will render the passed children components */}
            </div>
        </div>
    );
};

export default TabNavigation;
