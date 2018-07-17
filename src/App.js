import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './style/index.less';
import 'antd/dist/antd.css';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { receiveData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import {getFun} from './utils/api'
import NoticeBox from "./components/noticeBox";
const { Content, Footer } = Layout;


class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            // console.log(document.body.clientWidth);
        }
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
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        // console.log(this.props.auth);
        // console.log(this.props.responsive);
        const { auth, responsive } = this.props;
        return (
            <LocaleProvider locale={zhCN}>

            <Layout>
                <NoticeBox></NoticeBox>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes auth={auth} />
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

const mapStateToProps = state => {
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
