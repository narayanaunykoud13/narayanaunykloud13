import React, { useMemo, useState } from "react";
import { Button, Dropdown, Flex, Input } from 'antd';
import { AreaChartOutlined, BellOutlined, DownOutlined, HddOutlined, AppstoreOutlined, RightOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import { Link } from "react-router-dom";


function Navbar({
  treeData,
}) {

  const [searchTerm, setSearchTerm] = useState('');
  const filterMenu = useMemo(() => {
    const data = treeData;
    if (!searchTerm) return data;

    const search = searchTerm.toLowerCase();

    const filterItems = (items) => {
      return items
        .map((item) => {
          if (item.title.toLowerCase().includes(search)) {
            return item;
          }

          if (item.children) {
            const filteredChildren = filterItems(item.children);

            if (filteredChildren.length > 0) {
              return { ...item, children: filteredChildren };
            }
          }

          return null;
        })
        .filter((item) => item);
    };

    return filterItems(data);
  }, [searchTerm, treeData]);

  const items = [
    {
      key: '1',
      label: (
        <Link>
          Logout
        </Link>
      ),
    },
  ];
  const [activeMenu, setActiveMenu] = useState('1');
  const dropItems = [
    {
      key: '1',
      label: "Administration",
    },
    {
      key: '2',
      label: "User",
    },
    {
      key: '3',
      label: "Admin",
    },
    {
      key: '4',
      label: "Sub Admin",
    },
    {
      key: '5',
      label: "Super Admin",
    },
  ];
  return <>
    <Flex className="appPage_header" align="center" justify="space-between">
      <Flex className="appPage_header_lft" align="center">
        <div style={{ color: 'whitesmoke' }} className="appPage_header_logo">
          logo
          {/* <img src="logo.svg" alt="" /> */}
        </div>
        <Button className="btn"><AreaChartOutlined /></Button>
        <Dropdown
          // open
          overlayClassName="headerMainDropdown"
          menu={{ items }}
          dropdownRender={() => (
            <>
              <div className="menuView">
                <Search placeholder="input search text" onChange={(e) => setSearchTerm(e.target.value)} />
                <Flex className="mt-3">
                  <div className="menu-tabs">
                    {filterMenu?.length > 0 && filterMenu.map((item, index) => <div className={`menu-tabs-tab ${activeMenu === `${index + 1}` ? 'menu-tabs-tab-active' : ''}`} onMouseEnter={() => setActiveMenu(`${index + 1}`)}>
                      <div className="menu-tabs-tab-btn">
                        <span className="menu-tabs-tab-icon">
                          <AppstoreOutlined />
                        </span>
                        <span className="menu-tabs-tab-text">{item?.title}</span>
                        <RightOutlined />
                      </div>
                    </div>)}
                  </div>
                  <div className="menuView_right">
                    {filterMenu?.length > 0 && filterMenu.map((mainMenu, mainIndex) => <>
                      {activeMenu === `${mainIndex + 1}` && <div className="menuList">
                        {mainMenu?.children?.length > 0 && mainMenu?.children.map((subMenu) => <>
                          <div className="menuList_item">
                            <h2>{subMenu?.title}</h2>
                            <ul className="menuList_link">
                              {subMenu?.children?.length > 0 && subMenu?.children.map((childMenu) => <>
                                <li><Link ><span className="menu_list_link">{childMenu?.title}</span></Link></li>
                              </>)}
                            </ul>
                          </div>
                        </>)}
                      </div>
                      }
                    </>)}
                  </div>
                </Flex>
              </div>
              <Flex className="menuView_footer" gap={10}>
                <div className="fieldItem">
                  <Input readOnly className="form-control" value='Administration' />
                </div>
                <div className="fieldItem">
                <Dropdown
                  menu={{
                    items: dropItems,
                    selectable: true,
                  }}
                  overlayClassName="permissionDropdown"
                  dropdownRender={(menu) => (
                    <>
                      {React.cloneElement(menu, {
                      })}
                      {/* <Flex justify="end">
                        <a href="#" className="btn btn-primary">Save</a>
                      </Flex> */}
                    </>
                  )}
                >
                  <Button> Administration <DownOutlined /> </Button>
                </Dropdown>
                </div>
              </Flex>
            </>
          )}
        >
          <Link
            className="nav-link"
            onClick={(e) => e.preventDefault()}
          >
            <Button className="btn"><HddOutlined /></Button>
          </Link>
        </Dropdown>
      </Flex>
      <div className="appPage_header_cntr">
        <Search placeholder="input search text" />
      </div>
      <Flex className="appPage_header_rht" align="center">
        <Button className="btn"><BellOutlined /></Button>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Button className="dropdown">
            <div className="detail">
              <h2>James </h2>
              <h2><span>Role :</span> Admin</h2>
            </div>
            <DownOutlined />
          </Button>
        </Dropdown>
      </Flex>
    </Flex>
  </>
}

export default Navbar;