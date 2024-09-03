
import {Drawer, Flex, Button} from 'antd';

const ModalOpen = ({ header, children, open, footer, onclose }) => {
    const handleModalCancel = function(){

    };
    return (
        <Drawer rootClassName="ant-drawer-lg selectTaskDrawer" title="Select Task"  open={open}
            footer={<Flex justify="space-between" gap={15}>
                <Button size="small" type="outline-dark" onClick={() => handleModalCancel()}>Cancel</Button>
                {footer}
            </Flex>}
        >adfdadafa
           {children}
        </Drawer>
    );
};

export default ModalOpen;

