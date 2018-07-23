
import React from 'react';
import { Button, notification, Icon, Modal } from 'antd';


class NoticeBox extends React.Component {
    state = {
        visibleDetail: false,
        details: {},
        notificationData: []
    };
    componentWillMount(){
        let informs = this.props.informs;
        if(informs && informs.length) {
            if(informs.length > 5){
                this.setState({
                    notificationData: informs.slice(0,5)
                })
            }else {
                this.setState({
                    notificationData: informs
                })
            }
        }
    }
    componentDidMount() {
        this.openNotification();
    }
    close() {
    };
    notificationClick(item){
        // notification.close(item.id);
        this.setState({
            details: item,
            visibleDetail: true
        })
    }
    openNotification() {
        let {notificationData} = this.state;
        let _this = this;
        notificationData.map(item => {
            const key = item.id;
            const btn = (
                <div>
                    {/*<Button type="primary" size="small" onClick={() => notification.close(key)}>*/}
                    {/*关闭*/}
                    {/*</Button>*/}
                    <Button type="primary" className='checkMore' size="small" onClick={this.notificationClick.bind(this, item) }>
                        点击查看
                    </Button>
                </div>
            );
            notification.open({
                message: item.title,
                description: item.describe,
                icon: <Icon type="info-circle-o" style={{ color: '#108ee9' }} />,
                btn,
                key,
                // style: {
                //     width: 260,
                // },
                duration: null,
                onClose: _this.close,
            });
        })

    }
    handleOk(){
        this.setState({
            visibleDetail: false
        });
    }
    render() {
        const {details} = this.state;
        return (
            <div>
                <span> </span>
                <Modal
                    className="details-modal"
                    title="公告详情"
                    visible={this.state.visibleDetail}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleOk.bind(this)}
                    bodyStyle={{height: 200}}
                    okText="关闭"
                >
                    <div className="notice-wrapper">
                        <p><span className="detail-title">标题：</span><span className="detail-title-txt">{details.title}</span></p>
                        <p><span className="detail-title">通告概要：</span><span className="detail-title-txt">{details.describe}</span></p>
                        <p><span className="detail-title">通告内容：</span><span className="detail-title-txt">{details.detail}</span></p>
                        <p><span className="detail-title">创建人：</span><span className="detail-title-txt">{details.create_name}</span></p>
                    </div>
                </Modal>
                <style>{`
                    .checkMore:active, .checkMore.active,
                    .checkMore:focus, .checkMore.focus{
                        color: #49a9ee;
                        background: none!important;
                        border: none!important;
                    }
                `}</style>
            </div>

        )
    }
}

export default NoticeBox;
