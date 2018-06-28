/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Popover, Avatar } from 'antd';
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';
import SiderCustom from './SiderCustom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
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
    render() {
        const { responsive, path } = this.props;
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
                    style={{ lineHeight: '64px', float: 'right', marginRight: '20px' }}
                    onClick={this.menuClick}
                >
                    {/*<Menu.Item key="full" onClick={this.screenFull} >*/}
                        {/*<Icon type="arrows-alt" onClick={this.screenFull} />*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1">*/}
                        {/*<Badge count={25} overflowCount={10} style={{marginLeft: 10}}>*/}
                            {/*<Icon type="notification" />*/}
                        {/*</Badge>*/}
                    {/*</Menu.Item>*/}
                    <SubMenu title={<span><Avatar icon="user" /></span>}>
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
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
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
