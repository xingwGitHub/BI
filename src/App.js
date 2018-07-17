import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './style/index.less';
import 'antd/dist/antd.css';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import {getFun} from './utils/api'
import NoticeBox from "./components/noticeBox";
const { Content, Footer } = Layout;


class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {

        this.getInitData();
    }
    componentDidMount() {
    }
    getInitData(){
        let initData = getFun('/index/init');
        initData.then(res => {
            if(res.code === 0){
                localStorage.setItem("userInfo",res.data.userInfo);
                localStorage.setItem("systemNotice",res.data.informs);
            }else if(res.code == 100){
                // window.location.href='https://sso.yongche.com/'
            }
        }).catch(err => {
            console.log(err)
        })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        // console.log(this.props.auth);
        // console.log(this.props.responsive);
        return (
            <LocaleProvider locale={zhCN}>

            <Layout>
                <NoticeBox></NoticeBox>
                <SiderCustom collapsed={this.state.collapsed} />
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    ©2018 易到大数据中心
                    </Footer>
                </Layout>
                
                {/* {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                } */}
            </Layout>
            </LocaleProvider>
        );
    }
}


export default connect()(App);
