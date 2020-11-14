import React, { Component } from 'react';
import { Typography, Input } from 'antd';

const { TextArea } = Input;
class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
        }

    }
    render() {
        return (
            <div style={{ width: 500, marginTop: 20 }}>
                <div className="syspre_param_item">
                    <Typography.Text className="syspre_param_item_label">名称：</Typography.Text>
                    <Input placeholder='请输入模板名称'
                        autoComplete='off'
                        className="syspre_param_item_input"
                        value={this.state.name}
                        onChange={(e) => this.changeName(e)}
                    />
                </div>
                <div className="syspre_param_item">
                    <Typography.Text className="syspre_param_item_label">描述：<br></br></Typography.Text>
                    <TextArea placeholder='请输入描述'
                        autoComplete='off'
                        className="syspre_param_item_input"
                        value={this.state.desc}
                        onChange={(e) => this.changeDesc(e)} />
                </div>
            </div>
        )
    }


    componentDidMount() {

        this.props.onRef(this);

    }
    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    changeDesc(e) {
        this.setState({
            desc: e.target.value
        });
    }

}
export default Name;
