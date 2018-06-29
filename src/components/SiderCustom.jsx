
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import logo from '../style/imgs/logo.png';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const { pathname } = props.location;
        this.setState({
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        const {openKey} = this.state;
        let openKeyKey = ['/app/ranklist'],openKeyArr = [];
        if (openKey == '/app/ranklist/order' || openKey == '/app/ranklist/driver' || openKey == '/app/ranklist/user'){
            openKeyKey.push(openKey);
            openKeyArr = openKeyKey;
        }else {
            openKeyArr.push(openKey)
        }
        return (
            <Sider
                trigger={null}
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                        <span className="logo-title">商业智能系统</span>
                    </Link>
                </div>
                <Menu theme="dark"
                      mode="inline"
                      selectedKeys={[this.state.selectedKey]}
                      // openKeys={this.state.firstHide ? null : [this.state.openKey]}
                        openKeys = {this.state.firstHide ? null : openKeyArr}
                      onClick={this.menuClick}
                      onOpenChange={this.openMenu}
                      inlineCollapsed={this.state.collapsed}
                >
                    <SubMenu key="/app/realtime"
                             title={<span>
                                         <Icon type="clock-circle-o"/>
                                         <span className="nav-text">实时数据概况</span></span>}
                    >
                        <Menu.Item key="/app/realtime/survey"><Link to={`/app/realtime/survey`}>概况</Link></Menu.Item>
                        <Menu.Item key="/app/realtime/order"><Link to={`/app/realtime/order`}>订单</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/operatingdaily" title={<span><Icon type="schedule"/><span className="nav-text">运营日报</span></span>}>
                        <Menu.Item key="/app/operatingdaily/incomeCost"><Link to={`/app/operatingdaily/incomeCost`}>订单收入及成本</Link></Menu.Item>
                        <Menu.Item key="/app/operatingdaily/distribution"><Link to={`/app/operatingdaily/distribution`}>订单分布</Link></Menu.Item>

                        <Menu.Item key="/app/operatingdaily/portrait"><Link to={`/app/operatingdaily/portrait`}>订单画像</Link></Menu.Item>
                        <Menu.Item key="/app/operatingdaily/bargainingAnalysis"><Link to={`/app/operatingdaily/bargainingAnalysis`}>议价分析</Link></Menu.Item>

                        <Menu.Item key="/app/operatingdaily/capacityAnalysis"><Link to={`/app/operatingdaily/capacityAnalysis`}>运力分析</Link></Menu.Item>
                        <Menu.Item key="/app/operatingdaily/userStatistics"><Link to={`/app/operatingdaily/userStatistics`}>用户统计</Link></Menu.Item>
                        <Menu.Item key="/app/operatingdaily/piesAnalysis"><Link to={`/app/operatingdaily/piesAnalysis`}>派单分析</Link></Menu.Item>
                        <Menu.Item key="/app/operatingdaily/serviceQualityOfDrivers"><Link to={`/app/operatingdaily/serviceQualityOfDrivers`}>司机服务质量</Link></Menu.Item>
                    </SubMenu>

                    <SubMenu key="/app/ranking" title={<span><Icon type="flag"/><span  className="nav-text">排行榜</span></span>}>
                        <SubMenu key="/app/ranking/order" title="订单">
                            <Menu.Item key="order_0"><Link to={`/app/ranking/order/order_0`} replace>完成订单数</Link></Menu.Item>
                            <Menu.Item key="order_1"><Link to={`/app/ranking/order/order_1`}>完成订单金额</Link></Menu.Item>
                            <Menu.Item key="order_2"><Link to={`/app/ranking/order/order_2`}>订单平均金额</Link></Menu.Item>
                            <Menu.Item key="order_3"><Link to={`/app/ranking/order/order_3`}>订单平均时长</Link></Menu.Item>
                            <Menu.Item key="order_4"><Link to={`/app/ranking/order/order_4`}>平均行驶距离</Link></Menu.Item>
                            <Menu.Item key="order_5"><Link to={`/app/ranking/order/order_5`}>C to R订单完成率</Link></Menu.Item>
                            <Menu.Item key="order_6"><Link to={`/app/ranking/order/order_6`}>创建订单</Link></Menu.Item>
                            <Menu.Item key="order_7"><Link to={`/app/ranking/order/order_7`}>派单成功率</Link></Menu.Item>
                            <Menu.Item key="order_8"><Link to={`/app/ranking/order/order_8`}>计费差额</Link></Menu.Item>
                            <Menu.Item key="order_9"><Link to={`/app/ranking/order/order_9`}>服务成本</Link></Menu.Item>
                            <Menu.Item key="order_10"><Link to={`/app/ranking/order/order_10`}>无车可派</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="/app/ranking/driver" title="司机">
                            <Menu.Item key="driver_0"><Link to={`/app/ranking/driver/driver_0`} replace>活跃司机</Link></Menu.Item>
                            <Menu.Item key="driver_1"><Link to={`/app/ranking/driver/driver_1`}>司机均单量</Link></Menu.Item>
                            <Menu.Item key="driver_2"><Link to={`/app/ranking/driver/driver_2`}>新注册司机</Link></Menu.Item>
                            <Menu.Item key="driver_3"><Link to={`/app/ranking/driver/driver_3`}>新增激活司机</Link></Menu.Item>
                            <Menu.Item key="driver_4"><Link to={`/app/ranking/driver/driver_4`}>差评率</Link></Menu.Item>
                            {/*<Menu.Item key="driver_5"><Link to={`/rank/driver/driver_5`} >司机流失率</Link></Menu.Item>*/}
                        </SubMenu>
                        <SubMenu key="/app/ranking/user" title="用户">
                            <Menu.Item key="user_0"><Link to={`/app/ranking/user/user_0`} replace>活跃用户</Link></Menu.Item>
                            <Menu.Item key="user_1"><Link to={`/app/ranking/user/user_1`}>乘客单均量</Link></Menu.Item>
                            <Menu.Item key="user_2"><Link to={`/app/ranking/user/user_2`}>新注册用户</Link></Menu.Item>
                            <Menu.Item key="user_3"><Link to={`/app/ranking/user/user_3`}>新激活用户</Link></Menu.Item>
                            <Menu.Item key="user_4"><Link to={`/app/ranking/user/user_4`}>充值金额</Link></Menu.Item>
                            {/*<Menu.Item key="user_5"><Link to={`/rank/user/user_5`} >用户流失率</Link></Menu.Item>*/}
                            <Menu.Item key="user_6"><Link to={`/app/ranking/user/user_6`}>下单用户数</Link></Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    .ant-layout .logo {
                        height: 64px;
                        line-height: 64px;
                        background: #002140;
                        margin: 0;
                        padding-left: 14px;
                    }
                    .logo-title {
                        color: #fff;
                        font-size: 20px;
                        font-weight: 600;
                    }
                    .logo img {
                        display: inline-block;
                        width: 45px;
                        height: 45px;
                    }
                    .logo i img {
                        width: 100%;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);