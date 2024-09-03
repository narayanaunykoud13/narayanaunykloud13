import React, { Children, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Col, Flex, Input, Row, Select } from "antd";
import FormControl from "./FormControl";
const Header = ({ title, children, extaContent }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return (
    <div className="header-strip">
      <Flex align="center" justify="space-between">
        <div className="header-strip-title">
          <Link className="home-icon" to="/home">
            <HomeOutlined />
          </Link>
          {title}
        </div>
        <div className="header-strip-content">{children}</div>
      </Flex>
      {/* <hr style={{
        margin: "0",
      }} /> */}
      <div className="header-strip-bottombar position-relative">
        {extaContent}
        {/* <Flex>
          <Row gutter={16}>
            <Col md={6}>
              <FormControl label="Country">
                <Select name="country" />
              </FormControl>
            </Col>
            <Col md={6}>
              <FormControl label="Country">
                <Input name="country" />
              </FormControl>
            </Col>
            <Col md={6}>
              <FormControl label="Country">
                <Input name="country" />
              </FormControl>
            </Col>
            <Col md={6}>
              <FormControl label="Country">
                <Input name="country" />
              </FormControl>
            </Col>
          </Row>
        </Flex> */}
      </div>
    </div>
  );
};
export default Header;
