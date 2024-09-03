import React from 'react';
import { Card } from 'antd';

const PageHeader = ({ children }) => {
    return (
        <Card className="screen-header-group">
            {children}
        </Card>
    );
};
export default PageHeader;