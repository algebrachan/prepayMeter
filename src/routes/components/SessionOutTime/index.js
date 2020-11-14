import { Modal } from 'antd';
const { warning } = Modal;

function destroyAll() {
    Modal.destroyAll();
}
export const showSessionOT = () => {
    warning({
        title: '请重新登录',
        content: '会话超时或登录失效',
        centered: true,
        okText: '确定',
        onOk: () => {
            destroyAll();
            window.location.replace('/login');
        },
    });
}

