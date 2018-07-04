
import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import logo from '../style/imgs/logo.png';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        menuArr: [
            {   key: '/app/realtime', title: '实时数据概况', icon: 'clock-circle-o',
                sub: [
                    { key: '/app/realtime/survey', title: '概况'},
                    { key: '/app/realtime/order', title: '订单'}
                ]
            },
            {
                key: '/app/operatingdaily', title: '运营日报', icon: 'schedule',
                sub: [
                    { key: '/app/operatingdaily/incomeCost', title: '订单收入及成本'},
                    { key: '/app/operatingdaily/distribution', title: '订单分布'},
                    { key: '/app/operatingdaily/portrait', title: '订单画像'},
                    { key: '/app/operatingdaily/bargainingAnalysis', title: '议价分析'},
                    { key: '/app/operatingdaily/capacityAnalysis', title: '运力分析'},
                    { key: '/app/operatingdaily/userStatistics', title: '用户统计'},
                    { key: '/app/operatingdaily/piesAnalysis', title: '派单分析'},
                    { key: '/app/operatingdaily/serviceQualityOfDrivers', title: '司机服务质量'}
                ]
            },
            {
                key: '/app/ranking', title: '排行榜', icon: 'flag',
                sub: [
                    { key: '/app/ranking/rank_order', title: '订单',
                        sub: [
                            { key: '/app/ranking/rank_order/complete_count', title: '完成订单数'},
                            { key: '/app/ranking/rank_order/complete_amount', title: '完成订单金额'},
                            { key: '/app/ranking/rank_order/average_amount', title: '订单平均金额'},
                            { key: '/app/ranking/rank_order/average_time', title: '订单平均时长'},
                            { key: '/app/ranking/rank_order/average_distance', title: '平均行驶距离'},
                            { key: '/app/ranking/rank_order/complete_rate', title: 'C to R订单完成率'},
                            { key: '/app/ranking/rank_order/create_total', title: '创建订单'},
                            { key: '/app/ranking/rank_order/dispatch_success_rate', title: '派单成功率'},
                            { key: '/app/ranking/rank_order/billing_difference', title: '计费差额'},
                            { key: '/app/ranking/rank_order/service_cost', title: '服务成本'},
                            { key: '/app/ranking/rank_order/no_car_can_dispatch', title: '无车可派'}
                        ]
                    },
                    { key: '/app/ranking/rank_driver', title: '司机',
                        sub: [
                            { key: '/app/ranking/rank_driver/active_total', title: '活跃司机'},
                            { key: '/app/ranking/rank_driver/average_orders', title: '司机均单量'},
                            { key: '/app/ranking/rank_driver/registered_total', title: '新注册司机'},
                            { key: '/app/ranking/rank_driver/activation_total', title: '新增激活司机'},
                            { key: '/app/ranking/rank_driver/negative_rate', title: '差评率'}
                        ]
                    },
                    { key: '/app/ranking/rank_user', title: '用户',
                        sub: [
                            { key: '/app/ranking/rank_user/active_total', title: '活跃用户'},
                            { key: '/app/ranking/rank_user/average_total', title: '乘客单均量'},
                            { key: '/app/ranking/rank_user/registered_total', title: '新注册用户'},
                            { key: '/app/ranking/rank_user/activation_total', title: '新激活用户'},
                            { key: '/app/ranking/rank_user/recharge_amount', title: '充值金额'},
                            { key: '/app/ranking/rank_user/place_order_user_total', title: '下单用户数'}
                        ]
                    }
                ]
            }
        ]
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
    formSubmenusChild(obj){
        let cHtml=<div></div>;
        let childArray=obj.sub;
        if("undefined"!=typeof(childArray)&&childArray.length>0) {
            cHtml = childArray.map((item, i) => {
                return this.formSubmenusChild(item);
            });
            if(obj.icon){
                return <SubMenu key={obj.key} title={<span><Icon type={obj.icon}></Icon><span className="nav-text">{obj.title}</span></span>}>{cHtml}</SubMenu>
            }else {
                return <SubMenu key={obj.key} title={obj.title}>{cHtml}</SubMenu>
            }

        }else{
            return <Menu.Item key={obj.key}><Link to={obj.key}>{obj.title}</Link></Menu.Item>
        }

    }

    render() {
        const {openKey, menuArr} = this.state;
        let openKeyKey = ['/app/ranking'],openKeyArr = [];
        if (openKey == '/app/ranking/rank_order' || openKey == '/app/ranking/rank_driver' || openKey == '/app/ranking/rank_user'){
            openKeyKey.push(openKey);
            openKeyArr = openKeyKey;
        }else {
            openKeyArr.push(openKey)
        }
        let columnMenu = menuArr;
        let htmlMenu =columnMenu.map((obj, i)=>{
            if ("undefined"!=typeof(obj.sub)&&obj.sub.length>0) {
                return this.formSubmenusChild(obj);
            } else {
                //这里的routeurl是路由地址，是自定义的一个属性
                return <Menu.Item key={obj.key}>{obj.name}</Menu.Item>
            }
        })
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
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys = {this.state.firstHide ? null : openKeyArr}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    inlineCollapsed={this.state.collapsed}
                >
                    {htmlMenu}
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