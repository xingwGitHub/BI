import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import {getFun} from './utils/api'
import NoticeBox from "./components/noticeBox";
const { Content, Footer } = Layout;


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            userInfo: '',
            informs: ''
        };
    }

    componentWillMount() {
        this.getInitData();
    }
    getInitData(){
        let initData = getFun('/index/init');
        initData.then(res => {
            if(res.code === 0){
                this.setState({
                    userInfo: res.data.userInfo,
                    informs: res.data.informs
                })

            }else if(res.code === 100){
                window.location.href='/index.php/index/login'
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
        const {userInfo,informs} = this.state;

        return (
            <LocaleProvider locale={zhCN}>

            <Layout>
                {informs?<NoticeBox informs={informs}></NoticeBox>:''}
                <SiderCustom collapsed={this.state.collapsed} />
                <Layout style={{flexDirection: 'column'}}>
                    {
                        userInfo?<HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} userInfo={userInfo} informs={informs}/>:''
                    }
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
