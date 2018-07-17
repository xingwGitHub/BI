
import React from 'react';
import { Button, notification, Icon, Modal } from 'antd';


class NoticeBox extends React.Component {
    state = {
        visibleDetail: false,
        details: {},
        notificationData: [
            {id: 1,message: '通知标题通知标题', description: '通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知', content: '通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知'},
            {id: 2,message: '通知标题通知标题1', description: '通知内容3通知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知', content: '通知内容22通知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知'},
            {id: 3,message: '通知标题通知标题2', description: '通知内容通3知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知', content: '通知内容通33知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知'}
        ]
    };
    componentDidMount() {
        this.openNotification();
    }
    close() {
        console.log('关闭');
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
                message: item.message,
                description: item.description,
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
                        <p><span className="detail-title">标题：</span><span className="detail-title-txt">{details.message}</span></p>
                        <p><span className="detail-title">通告概要：</span><span className="detail-title-txt">{details.description}</span></p>
                        <p><span className="detail-title">通告内容：</span><span className="detail-title-txt">{details.content}</span></p>
                    </div>
                </Modal>
                <style>{`

                `}</style>
            </div>

        )
    }
}

export default NoticeBox;
