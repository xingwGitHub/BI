import React from 'react'
import {Button, Card, Table, Row, Col, Pagination} from 'antd'
import moment from 'moment';
import './activityEffect.less'
import ExportFileCom from "../../components/exportFile/exportFile";
import SearchBox from "../../components/searchBox/searchBox";
import SelectBox from "../../components/searchBox/selectBox";
import {getFun} from "../../utils/api";
import {dateDiff, objectToArr} from "../../utils/dataHandle";
export  default class couponStatistic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            flag: false,
            showFlag: true,
            title: '优惠券统计',
            selectBoxTitle: '优惠券筛选',
            detailsTitle: '',
            load: true,
            load1: true,
            tableData: [
                {
                    key: 111, id: 111, name: '优惠券aaa', ffl: 100, syl: 100, jhyhs: 100, jhyhdds: 100, jhyhsr: 100, jhyhcb: 100, jhyhsjyh: 100, lyhs: 100, lyhdds: 100, lyhsr: 100, lyhcb: 100, lyhsjyh: 100
                }
            ],
            tableHeader: [
                {title: '优惠券ID', dataIndex: 'id', key: 'id'},
                {title: '优惠券名称', dataIndex: 'name', key: 'name',
                    render: (text,record ) => (<a href="javascript:;" onClick={this.gotoDetails.bind(this, text,record)}>{text}</a>),
                },
                {title: '发放量', dataIndex: 'ffl', key: 'ffl'},
                {title: '使用量', dataIndex: 'syl', key: 'syl'},
                {
                    title: '新激活用户',
                    children: [
                        {title: '激活用户数', dataIndex: 'jhyhs', key: 'jhyhs'},
                        {title: '激活用户订单数', dataIndex: 'jhyhdds', key: 'jhyhdds'},
                        {title: '激活用户收入', dataIndex: 'jhyhsr', key: 'jhyhsr'},
                        {title: '激活用户成本', dataIndex: 'jhyhcb', key: 'jhyhcb'},
                        {title: '激活用户实际优惠', dataIndex: 'jhyhsjyh', key: 'jhyhsjyh'}
                    ]
                },
                {
                    title: '老用户',
                    children: [
                        {title: '老用户数', dataIndex: 'lyhs', key: 'lyhs'},
                        {title: '老用户订单数', dataIndex: 'lyhdds', key: 'lyhdds'},
                        {title: '老用户收入', dataIndex: 'lyhsr', key: 'lyhsr'},
                        {title: '老用户成本', dataIndex: 'lyhcb', key: 'lyhcb'},
                        {title: '老用户实际优惠', dataIndex: 'lyhsjyh', key: 'lyhsjyh'}
                    ]
                }
            ],
            tableHeader1: [
                {title: '日期', dataIndex: 'start_time', key: 'start_time'},
                {title: '优惠券ID', dataIndex: 'id1', key: 'id1'},
                {title: '优惠券名称', dataIndex: 'name1', key: 'name1'},
                {title: '发放量', dataIndex: 'ffl1', key: 'ffl1'},
                {title: '使用量', dataIndex: 'syl1', key: 'syl1'},
                {
                    title: '新激活用户',
                    children: [
                        {title: '激活用户数', dataIndex: 'jhyhs1', key: 'jhyhs1'},
                        {title: '激活用户订单数', dataIndex: 'jhyhdds1', key: 'jhyhdds1'},
                        {title: '激活用户收入', dataIndex: 'jhyhsr1', key: 'jhyhsr1'},
                        {title: '激活用户成本', dataIndex: 'jhyhcb1', key: 'jhyhcb1'},
                        {title: '激活用户实际优惠', dataIndex: 'jhyhsjyh1', key: 'jhyhsjyh1'}
                    ]
                },
                {
                    title: '老用户',
                    children: [
                        {title: '老用户数', dataIndex: 'lyhs1', key: 'lyhs1'},
                        {title: '老用户订单数', dataIndex: 'lyhdds1', key: 'lyhdds1'},
                        {title: '老用户收入', dataIndex: 'lyhsr1', key: 'lyhsr1'},
                        {title: '老用户成本', dataIndex: 'lyhcb1', key: 'lyhcb1'},
                        {title: '老用户实际优惠', dataIndex: 'lyhsjyh1', key: 'lyhsjyh1'}
                    ]
                }
            ],
            exportParams: {},
            exportParams1: {},
            current: 1,
            current1: 1,
            total: 1,
            total1: 1,
            pageSize: 10,
            pageSize1: 10,
            thisSearchParams2: {},
            activity: {},
            tableData1: [
                {
                    key: 111,start_time: '20180101', id1: 111, name1: '优惠券aaa', ffl1: 100, syl1: 100, jhyhs1: 100, jhyhdds1: 100, jhyhsr1: 100, jhyhcb1: 100, jhyhsjyh1: 100, lyhs1: 100, lyhdds1: 100, lyhsr1: 100, lyhcb1: 100, lyhsjyh1: 100
                }
            ],
            dayNum: 10,
            city: '',
            start_at: '',
            end_at: '',
            typeOptionData: ['优惠券ID','优惠券名称']
        }
    }
    componentWillMount(){
        this.getTableData();
    }
    // 初始化导出所需数据
    initExportData() {
        const exportParams = {
            title: '活动效果_' + this.state.title,
            tableHeader: this.state.tableHeader,
            exportData: this.state.tableData
        }
        this.setState({
            exportParams: exportParams
        })
    }
    // 获取当前页数
    pageChange(page, pageSize) {
        this.setState({
            current: page,
            pageSize: pageSize,
            load: true
        },() => {
            this.getTableData()
        })
    }
    // 获取接口参数
    getParams() {
        const params = {
            activity: this.state.activity,
        }
        console.log(params)
        return params;
    }
    getTableData(){
        let params = this.getParams();
        this.setState({
            load: false
        })
        this.initExportData()
    }
    searchBtn(){
        this.setState({
            load: true
        })
    }
    // 获取下拉框组件参数
    thisSearchParams(params){
        this.setState({
            activity: params.activity,
        })
    }
    // 优惠券统计->优惠券统计详情页
    gotoDetails(text){
        this.setState({
            detailsTitle:  ' / ' + text,
            showFlag: !this.state.showFlag
        })
        this.initDateRange(this.state.dayNum);//初始化查询日期
        let city = this.getCityParams();
        this.setState({
            city: city,
            load:true
        },() => {
            this.getTableData1();
        })
    }
    //初始化查询起止日期
    initDateRange(rangeDays) {
        //时间类型为moment格式
        const  endTime= moment().subtract(1, 'days');//当前时间
        const startTime = moment().subtract(rangeDays, 'days');//当前时间
        const start = new Date((moment(startTime).subtract())._d);
        const end = new Date((moment(endTime).subtract())._d);
        this.setState({
            city: this.state.city,
            start_at: this.formatDate(start),
            end_at: this.formatDate(end), //当前时间减n天
        });
    }
    // 初始化导出所需数据
    initExportData1() {
        const exportParams = {
            start_at: this.state.start_at,
            end_at: this.state.end_at,
            title: '活动效果_' + this.state.title,
            city: this.state.city,
            tableHeader: this.state.tableHeader,
            exportData: this.state.tableData1
        }
        this.setState({
            exportParams: exportParams
        })
    }
    // 时间格式转化
    formatDate (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };
    getTableData1(){
        let arrStr = ['start_time']
        let searchParams = this.getParams1();
        // let result =getFun('/web_api/operation/bargain',  searchParams);
        // result.then(res => {
        //     this.setState({
        //         load1: false,
        //         tableData1: objectToArr(res.data, arrStr)
        //
        //     }, () => {this.initExportData1()})
        // }).catch(err => {
        //     console.log(err)
        // })
            this.setState({
                load1: false,
            })
    }
    // 获取接口参数
    getParams1() {
        let start, end;
        start = this.pageStartDate();
        end = this.pageEndDate().format("YYYY-MM-DD");
        const params = {
            start_at: start,
            end_at: end,
            city: this.state.flag?this.state.city:this.getCityParams(),
        }
        return params;
    }
    //分页查询的结束时间
    pageEndDate() {
        let days = (this.state.current1 - 1) * this.state.pageSize1;
        let copy = moment(this.state.end_at).add(0, 'days'); //复制结束日期的副本
        return  copy.subtract(days, 'days');
    }

    //分页查询的开始时间
    pageStartDate() {
        let days = this.state.current1 * this.state.pageSize1;
        let copy, dt;
        copy = moment(this.state.end_at); //复制结束日期的副本
        copy = copy.add(1, 'days'); //查日期为当前结束日期+1天
        dt = copy.subtract(days, 'days');
        let bb = dt.format("YYYY-MM-DD");
        if(this.state.start_at && bb < this.state.start_at) {
            return this.state.start_at;
        }else {
            return bb;
        }
    }
    getCityParams(){
        let path = document.location.toString();
        let pathUrl = path.split('#');
        let url = pathUrl[1].split('/');
        let str = url[url.length - 1];
        let city = "";
        let auth = JSON.parse(localStorage.getItem("auth"));
        if(auth){
            let cityObj = auth;
            Object.keys(cityObj).map(item => {
                if(item.indexOf(str) > 0 ){
                    let cityArr = cityObj[item].city;
                    if(cityArr[0] == 'all'){
                        city = '';
                    }else {
                        city = cityArr.join(",")
                    }
                    // city = cityArr[cityArr.length - 1]
                }
            })
        }
        return city;
    }
    getTotalPage() {
        let day = dateDiff(this.state.start_at, this.state.end_at);
        return day;
    }
    // 获取当前页数
    pageChange1(page, pageSize) {
        this.setState({
            current1: page,
            pageSize1: pageSize,
            load1: true
        },() => {
            this.getTableData1()
        })
    }
    // 优惠券统计详情页->优惠券统计
    goBackDetails(){
        this.setState({
            showFlag: !this.state.showFlag,
            load: false
        })
    }
    render(){
        const { showFlag, title, tableData, tableHeader, load, total, pageSize, detailsTitle, tableData1, load1, total1, pageSize1, selectBoxTitle, tableHeader1, typeOptionData } = this.state;
        return (
            <div className="operating-wrapper">
                <div className={showFlag?"effect-wrapper": "effect-wrapper active"}>
                    <h3 className="cardTitle">{title}</h3>
                    <Card bordered={false}>
                        <div className="search-content">
                            <div className="search-wrapper">
                                <div>
                                    <SelectBox searchParams={params => this.thisSearchParams(params)} title={selectBoxTitle} typeOptionData={typeOptionData}></SelectBox>
                                </div>
                            </div>
                            <div className="search-btn-wrapper">
                                <Button type="primary" icon='search' onClick={this.searchBtn.bind(this)}>查询</Button>
                            </div>
                        </div>
                    </Card>
                    {/*<Button onClick={this.gotoDetails.bind(this)}>click</Button>*/}
                    <div className="tableWrap">
                        <div>
                            <Table dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false} scroll={{x: '130%'}}>

                            </Table>
                        </div>
                        <div className="page-footer">
                            <Row>
                                <Col span={10}>
                                    <ExportFileCom params={this.state.exportParams}></ExportFileCom>
                                </Col>
                                <Col span={14} style={{textAlign: 'right'}}>
                                    <Pagination  current={this.state.current} total={total} onChange={this.pageChange.bind(this)} pageSize={pageSize}  showQuickJumper></Pagination>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className={showFlag?"effect-details-wrapper": "effect-details-wrapper active"}>
                    <h3 className="cardTitle"><a onClick={this.goBackDetails.bind(this)}>返回 活动优惠券统计</a>{detailsTitle}</h3>
                    <Card bordered={false}>
                        <div className="search-content">
                            <div className="search-wrapper">

                                <div>
                                    <SearchBox searchParams={params => this.thisSearchParams2(params)}></SearchBox>
                                </div>
                            </div>
                            <div className="search-btn-wrapper">
                                <Button type="primary" icon='search' onClick={this.searchBtn.bind(this)}>查询</Button>
                            </div>
                        </div>
                    </Card>
                    <div className="tableWrap">
                        <div>
                            <Table dataSource={tableData1} bordered loading={load1} columns={tableHeader1} pagination={false} scroll={{x: '130%'}}>

                            </Table>
                        </div>
                        <div className="page-footer">
                            <Row>
                                <Col span={10}>
                                    <ExportFileCom params={this.state.exportParams1}></ExportFileCom>
                                </Col>
                                <Col span={14} style={{textAlign: 'right'}}>
                                    <Pagination  current={this.state.current1} total={total1} onChange={this.pageChange1.bind(this)} pageSize={pageSize1}  showQuickJumper></Pagination>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}