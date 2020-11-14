import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import { getAgentBooks } from '../../../utils/api';
import intl from 'react-intl-universal';
import './style.css';

class BookKeep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.requestData = this.requestData.bind(this);
    }
    render() {
        return (
            <div className="syspre_bookkeep_root">
                {this.state.data.map((item) => {
                    return (
                        <Card title="记账本" className="syspre_bookkeep_card" key={item.key}>
                            <div className="syspre_bookkeep_item">
                                <div className="syspre_bookkeep_item_label">{item.Usnam}:</div>
                                <div className="syspre_bookkeep_item_content">
                                    <Button type="primary" icon='file-search' onClick={() => this.ToFeeDetail(item.key, item.Usnam)}>{intl.get('COMMON_BTN.LOOK')}</Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}

            </div>
        );
    }

    componentDidMount() {
        this.requestData();
    }
    ToFeeDetail(key, name) {
        let encodeName = window.btoa(window.encodeURIComponent(name));//编码
        this.props.history.push(`/syspre/home/bookkeep/${key}&${encodeName}`);
    }

    requestData() {
        getAgentBooks(
            (res) => {
                if (res.data.Status === 0) {
                    this.setState({
                        data: res.data.Data,
                    });
                } else {
                    message.error(res.data.Message);
                }
            },
            () => {
                message.error(`${intl.get('COMMON_MESSAGE.NET_ERROR')}`);
            }
        );
    }

}
export default BookKeep;