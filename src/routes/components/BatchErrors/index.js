import React, { Component } from 'react';

class BatchErrors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placement: 'left',
            visible: props.visible,
            list: props.list,
        }
    }

    render() {
        return (
            <div>
                <Drawer
                    title="Basic Drawer"
                    placement={this.state.placement}
                    closable={false}
                    onClose={() => this.onClose()}
                    visible={this.state.visible}
                >
                    {this.state.list.map((error) => (<p>地址：{error.Addr} 错误说明：{error.Message}</p>))}
                </Drawer>
            </div>
        );
    }
    onClose() {
        this.setState({
            visible: false
        })
    }

}
export default BatchErrors;