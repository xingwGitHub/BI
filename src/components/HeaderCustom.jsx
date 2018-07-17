
import React, { Component } from 'react';
import { Menu, Icon, Layout, Popover, Avatar, Tabs, List, Modal, Button } from 'antd';
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';
import SiderCustom from './SiderCustom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        messageFlag: false,
        visibleDetail: false,
        details:{},
        messageData: [
            {title: '通知1', descriptions: '通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知通知内容通知内容通知', content: '概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1概要1'},
            {title: '通知2', descriptions: '概要2概要2概要2概要2概要2概要2', content: '概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2概要2'},
            {title: '通知3', descriptions: '概要概要概要概要', content: '概要概要概要概要'}
        ]
    };
    componentDidMount() {
        const QueryString = queryString();
        // if (QueryString.hasOwnProperty('code')) {
        //     console.log(QueryString);
        //     const _user = JSON.parse(localStorage.getItem('user'));
        //     !_user && gitOauthToken(QueryString.code).then(res => {
        //         console.log(res);
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        //     _user && this.setState({
        //         user: _user
        //     });
        // }
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    // 点击头部消息，显示消息列表
    bellClick(){
        this.setState({
            messageFlag: !this.state.messageFlag
        })
    }

    // 头部消息通知弹出列表，TAB切换
    headerTabCallback(key){
        console.log(key)
    }
    // 点击公告查看详情
    messageDetailClick(item){
        this.setState({
            details: item,
            visibleDetail: true
        })
    }
    handleOk(){
        this.setState({
            visibleDetail: false
        });
    }
    render() {
        const { responsive, path  } = this.props;
        const {messageData, messageFlag, details} = this.state;
        const content = (
            <Tabs defaultActiveKey="1" onChange={this.headerTabCallback}>
                <TabPane tab="系统公告" key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={messageData}
                        renderItem={item => (
                            <List.Item actions={[<a onClick={this.messageDetailClick.bind(this, item)}>查看详情</a>]}>
                                <List.Item.Meta
                                    title={<span>{item.title}</span>}
                                    description={<span>{item.descriptions}</span>}
                                />
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        )
        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{ height: '50px', float: 'right', marginRight: '20px', marginTop:'14px' }}
                    onClick={this.menuClick}
                >

                    <SubMenu title={<p><Avatar icon="user" size="small"></Avatar><span className="username">张三</span></p>}>
                        <MenuItemGroup title="">
                            {/*<Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>*/}
                            <Menu.Item key="user"><Icon type="user" />个人中心</Menu.Item>
                            <Menu.Item key="setting"><Icon type="setting" />设置</Menu.Item>

                        </MenuItemGroup>
                        <MenuItemGroup title="">
                            <Menu.Item key="logout"><span onClick={this.logout}><Icon type="logout"/>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <div className="popover-wrapper">
                    <a className="bell-wrapper"><Icon type="bell" className="bell" onClick={this.bellClick.bind(this)}></Icon></a>
                    <div className={messageFlag? 'message-box active' : 'message-box'}>{content}</div>
                </div>
                    <Modal
                        className="details-modal"
                        title="公告详情"
                        visible={this.state.visibleDetail}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleOk.bind(this)}
                        bodyStyle={{height: 200}}
                        okText="关闭"
                    >
                        <div className="notice-wrapper ">
                            <p><span className="detail-title">标题：</span><span className="detail-title-txt">{details.title}</span></p>
                            <p><span className="detail-title">通告概要：</span><span className="detail-title-txt">{details.descriptions}</span></p>
                            <p><span className="detail-title">通告内容：</span><span className="detail-title-txt">{details.content}</span></p>
                        </div>
                    </Modal>
                <style>{`
                    .popover-wrapper{
                        float: right;
                        position: relative;
                    }
                    .bell-wrapper{
                        color: #666;
                    }
                    .message-box{
                        width: 300px;
                        position: absolute;
                        top: 70px;
                        right: -100px;
                        display: none;
                        background: #fff;
                        box-shadow: 0 2px 8px rgba(0,0,0,.15);
                        border-radius: 5px;
                    }
                    .message-box.active {
                        display: block;
                        z-index: 100000000;
                    }
                    .message-box .ant-tabs-nav-scroll{
                        padding: 0 16px;
                    }
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -20px;
                    }
                    .ant-menu-item .anticon, .ant-menu-submenu-title .anticon {
                        margin-right: 0;
                    }
                    .ant-menu-horizontal {
                        border: none;
                    }
                    .ant-menu-item-group-title {
                        padding: 0;
                    }
                    .ant-menu-item-group {
                        border-bottom: 1px solid #ccc;
                    }
                    .ant-avatar-sm.ant-avatar-icon{
                        float: left;
                        margin: 7px 8px 0 0;
                    }
                    .bell{
                        float: right;
                        font-size: 20px;
                        line-height: 65px;
                        margin-right: 10px;
                    }
                    .username{
                        float: left;
                        margin-top: -4px;
                    }
                    .ant-popover-placement-bottom, .ant-popover-placement-bottomLeft, .ant-popover-placement-bottomRight{
                        width: 300px;
                        right: 20px;
                    }
                    .message-box .ant-tabs-bar{
                        margin: 0;
                    }
                    .ant-list-item{
                        padding: 12px 16px;
                    }
                    .ant-popover-inner-content .ant-tabs-nav-scroll{
                        padding: 0 12px;
                    }
                    .ant-list-item:hover {
                        background: #e6f7ff;
                    }
                    .ant-popover-inner-content{
                        padding: 12px 0 0 0;
                    }
                    .ant-tabs-nav-container,.ant-list-item-meta-title{
                        font-size: 14px;
                    }
                    .ant-list-item-action {
                        align-self: flex-end;
                    }
                    .ant-menu-submenu-popup{
                        top: 70px!important;
                    }
                    .notice-wrapper p{
                        margin-bottom: 0;
                    }
                    .notice-wrapper p:after{
                        content: ".";
                        visibility: hidden;
                        display: block;
                        height: 0;
                        clear: both;
                    }
                    .detail-title{
                        float: left;
                        width: 80px;
                        height: 40px;
                    }
                    .detail-title-txt {
                    }
                    .details-modal .ant-modal-footer .ant-btn{
                        visibility: hidden;
                    }
                    .details-modal .ant-modal-footer .ant-btn-primary{
                        visibility: visible;
                    }
                `}</style>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = {data: {}} } = state.httpData;
    return {responsive};
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
