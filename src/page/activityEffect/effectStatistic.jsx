import React from 'react'
import {Card, Table, Row, Col, Button, Pagination} from 'antd';
import moment from 'moment';
import SearchBox from '../../components/searchBox/searchBox'
import SelectBox from '../../components/searchBox/selectBox'
import ExportFileCom from '../../components/exportFile/exportFile'

import {getFun} from '../../utils/api'
import {objectToArr, dateDiff, milliFormat} from '../../utils/dataHandle'

import './activityEffect.less'
export  default class effectStatistic extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '活动效果统计',
            showFlag: true,
            total: 10,
            pageSize: 10,
            current: 1,
            //load: true,
            //load2: true,
            dayNum: 10,
            tableData: [],
            tableData2: [],
            selectValue: '',
            city: '',
            start_at: '',
            end_at: '',
            thisSearchParams: {},
            thisSearchParams2: {},
            tableHeader: [
                {
                    title: '活动ID', dataIndex: 'activity_id', key: 'activity_id'
                },
                {
                    title: '活动名称', dataIndex: 'activity_name', key: 'activity_name',
                    render: (text, record, index) => <a href="javascript:;" onClick={this.gotoDetails.bind(this,text)}>{text}</a>,
                },
                {
                    title: '发放量', dataIndex: 'issue_count', key: 'issue_count'
                },
                {
                    title: '使用量', dataIndex: 'use_count', key: 'use_count'
                },
                {
                    title: '新用户数', dataIndex: 'new_user_count', key: 'new_user_count'
                },
                {
                    title: '召回用户', dataIndex: 'recall_user_count', key: 'recall_user_count'
                },
                {
                    title: '总单量', dataIndex: 'total_order_count', key: 'total_order_count'
                },
                {
                    title: '总金额', dataIndex: 'total_amount', key: 'total_amount'
                },
                {
                    title: '总补贴', dataIndex: 'total_subsidy', key: 'total_subsidy'
                },
                {
                    title: '均单价', dataIndex: 'order_average_amount', key: 'order_average_city_subsidy'
                },
                {
                    title: '单均收入', dataIndex: 'order_average_income', key: 'order_average_income'
                },
                {
                    title: '单均补贴', dataIndex: 'order_average_subsidy', key: 'order_average_subsidy'
                },
                {
                    title: '单均利润', dataIndex: 'order_average_profit', key: 'order_average_profit'
                },
                {
                    title: 'CAC', dataIndex: 'CAC', key: 'CAC'
                },
            ],
            exportParams: {},
            exportParams2: {},
            checkedParam: {},
            checkedParam2: {},
            subTitle: '',
            tableHeader2: [
                {
                    title: '日期', dataIndex: 'start_time', key: 'start_time'
                },
                {
                    title: '活动ID', dataIndex: 'activity_id', key: 'activity_id'
                },
                {
                    title: '活动名称', dataIndex: 'activity_name', key: 'activity_name',
                },
                {
                    title: '发放量', dataIndex: 'issue_count', key: 'issue_count'
                },
                {
                    title: '使用量', dataIndex: 'use_count', key: 'use_count'
                },
                {
                    title: '新用户数', dataIndex: 'new_user_count', key: 'new_user_count'
                },
                {
                    title: '召回用户', dataIndex: 'recall_user_count', key: 'recall_user_count'
                },
                {
                    title: '总单量', dataIndex: 'total_order_count', key: 'total_order_count'
                },
                {
                    title: '总金额', dataIndex: 'total_amount', key: 'total_amount'
                },
                {
                    title: '总补贴', dataIndex: 'total_subsidy', key: 'total_subsidy'
                },
                {
                    title: '均单价', dataIndex: 'order_average_amount', key: 'order_average_city_subsidy'
                },
                {
                    title: '单均收入', dataIndex: 'order_average_income', key: 'order_average_income'
                },
                {
                    title: '单均补贴', dataIndex: 'order_average_subsidy', key: 'order_average_subsidy'
                },
                {
                    title: '单均利润', dataIndex: 'order_average_profit', key: 'order_average_profit'
                },
                {
                    title: 'CAC', dataIndex: 'CAC', key: 'CAC'
                },
            ],
        }
        this.gotoDetails = this.gotoDetails.bind(this)
    }
    // 活动效果统计->活动效果详情页
    gotoDetails(text){
        this.setState({
            showFlag: !this.state.showFlag,
            subTitle: ' / ' + text
        })

    }
    // 活动效果统计详情页->活动效果统计
    goBackDetails(){
        this.setState({
            showFlag: !this.state.showFlag
        })
    }
    // 点击查询
    searchBtn() {
        this.setState({
            load: true,
            total: this.getTotalPage()
        },() => {
            this.getTableData()
        })
    }
    // 点击查询-详情页
    searchBtn2() {
        this.setState({
            load2: true,
            total: this.getTotalPage()
        },() => {
            this.getTableData2()
        })
    }
    //初始化查询起止日期-详情页
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
    initExportData() {
        const exportParams = {
            title: '活动效果_'+this.state.title,
            tableHeader: this.state.tableHeader,
            exportData: this.state.tableData
        }
        this.setState({
            exportParams: exportParams
        })
    }
     // 初始化导出所需数据-详情页
     initExportData2() {
        const exportParams = {
            start_at: this.state.start_at,
            end_at: this.state.end_at,
            title: '活动效果详情_'+this.state.title,
            city: this.state.city,
            tableHeader: this.state.tableHeader2,
            exportData: this.state.tableData2
        }
        this.setState({
            exportParams2: exportParams
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
    onShowSizeChange(current, size) {
        this.setState({
            pageSize: size,
            current: current,
            load: true
        }, () => {
            this.getTableData();
        });
    }
    // 获取当前页数-详情页
    pageChange2(page, pageSize) {
        this.setState({
            current: page,
            pageSize: pageSize,
            load2: true
        },() => {
            this.getTableData2()
        })
    }
    onShowSizeChange2(current, size) {
        this.setState({
            pageSize: size,
            current: current,
            load2: true
        }, () => {
            this.getTableData2();
        });
    }
    // 获取表格数据
    getTableData() {
        let arrStr = ['start_time'];
        let searchParams = this.getParams();
        let searchParam = Object.assign(searchParams,this.state.checkedParam);
        //let result =getFun('/web_api/operation/portrait',  searchParam);
        //result.then(res => {
        //    this.setState({
         //       load: false,
        //        tableData: objectToArr(res.data, arrStr)

        //    },() => this.initExportData())
        //}).catch(err => {
         //   console.log(err)
        //})
    }
    // 获取表格数据-详情页
    getTableData2() {
        let arrStr = ['start_time'];
        let searchParams = this.getParams2();
        let searchParam = Object.assign(searchParams,this.state.checkedParam2);
        //let result =getFun('/web_api/operation/portrait',  searchParam);
        //result.then(res => {
        //    this.setState({
         //       load2: false,
        //        tableData2: objectToArr(res.data, arrStr)

        //    },() => this.initExportData2())
        //}).catch(err => {
         //   console.log(err)
        //})
    }
    // 获取下拉框组件参数
    thisSearchParams(params){
        this.setState({
            activity: params.activity,
        })
    }
    // 获取下拉框和日期组件参数-详情页
    thisSearchParams2(params){
        this.setState({
            city: params.city,
            start_at: params.selectedStartDate,
            end_at: params.selectedEndDate,
        })
    }
    // 获取接口参数
    getParams() {
        const params = {
            activity: this.state.activity
        }
        console.log(params)
        return params;
    }
    // 获取接口参数-详情页
    getParams2() {
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
    //分页查询的结束时间
    pageEndDate() {
        let days = (this.state.current - 1) * this.state.pageSize;
        let copy = moment(this.state.end_at).add(0, 'days'); //复制结束日期的副本
        return  copy.subtract(days, 'days');
    }

    //分页查询的开始时间
    pageStartDate() {
        let days = this.state.current * this.state.pageSize;
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
    getTotalPage() {
        let day = dateDiff(this.state.start_at, this.state.end_at);
        return day;
    }
    render(){
        const { showFlag } = this.state;
        let {title, subTitle, load, load2, tableHeader,tableHeader2, total, pageSize} = this.state;
        //let tableData = milliFormat(this.state.tableData);
        //let tableData2 = milliFormat(this.state.tableData2);
        let tableData = [{
            key: 'activity_id',
            activity_id: '111',
            activity_name: '活动A',
            use_count: 2222,
            issue_count: 3333,
            new_user_count: 3333,
            recall_user_count: 3333,
            total_order_count: 3333,
            total_amount: 3333,
            total_subsidy: 3333,
            order_average_amount: 3333,
            order_average_income: 3333,
            order_average_subsidy: 3333,
            order_average_profit: 3333,
            CAC: 3333,
          },{
            key: 'activity_id2',
            activity_id: '222',
            activity_name: '活动B',
            use_count: 2222,
            issue_count: 3333,
            new_user_count: 3333,
            recall_user_count: 3333,
            total_order_count: 3333,
            total_amount: 3333,
            total_subsidy: 3333,
            order_average_amount: 3333,
            order_average_income: 3333,
            order_average_subsidy: 3333,
            order_average_profit: 3333,
            CAC: 3333,
          }]
          let tableData2 = [{
            key: 'activity_id',
            start_time: '20180808',
            activity_id: '111',
            activity_name: '活动AAA',
            use_count: 2222,
            issue_count: 3333,
            new_user_count: 3333,
            recall_user_count: 3333,
            total_order_count: 3333,
            total_amount: 3333,
            total_subsidy: 3333,
            order_average_amount: 3333,
            order_average_income: 3333,
            order_average_subsidy: 3333,
            order_average_profit: 3333,
            CAC: 3333,
          },{
            key: 'activity_id2',
            start_time: '20180809',
            activity_id: '222',
            activity_name: '活动AAA',
            use_count: 2222,
            issue_count: 3333,
            new_user_count: 3333,
            recall_user_count: 3333,
            total_order_count: 3333,
            total_amount: 3333,
            total_subsidy: 3333,
            order_average_amount: 3333,
            order_average_income: 3333,
            order_average_subsidy: 3333,
            order_average_profit: 3333,
            CAC: 3333,
          }]
    
        return (
            <div>
                <div className={showFlag?"effect-wrapper": "effect-wrapper active"}>
                    <div className="operating-wrapper">
                        <h3 className="cardTitle">{title}</h3>
                        <Card bordered={false}>
                            <div className="search-content">
                                <div className="search-wrapper">
                                    <div>
                                        <SelectBox searchParams={params => this.thisSearchParams(params)}></SelectBox>
                                    </div>
                                </div>
                                <div className="search-btn-wrapper">
                                    <Button type="primary"  icon='search' onClick={this.searchBtn.bind(this)}>查询</Button>
                                </div>
                            </div>
                        </Card>
                        <div className="tableWrap" style={{marginBottom:16}}>
                            <div>
                                <Table dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false}>

                                </Table>
                            </div>
                            <div className="page-footer">
                                <Row>
                                    <Col span={10}>
                                        <ExportFileCom params={this.state.exportParams}></ExportFileCom>
                                    </Col>
                                    <Col span={14} style={{textAlign: 'right'}}>
                                        <Pagination current={this.state.current} total={total} onChange={this.pageChange.bind(this)} pageSize={pageSize}  showQuickJumper></Pagination>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={showFlag?"effect-details-wrapper": "effect-details-wrapper active"}>
                    <div className="operating-wrapper">
                        <h3 className="cardTitle">
                            <a onClick={this.goBackDetails.bind(this)}>返回 活动效果统计 </a>
                            <span> {subTitle}</span>
                        </h3>
                        <Card bordered={false}>
                            <div className="search-content">
                                <div className="search-wrapper">
                                    <div>
                                        <SearchBox searchParams={params => this.thisSearchParams2(params)}></SearchBox>
                                    </div>
                                </div>
                                <div className="search-btn-wrapper">
                                    <Button type="primary"  icon='search' onClick={this.searchBtn2.bind(this)}>查询</Button>
                                </div>
                            </div>
                        </Card>
                        <div className="tableWrap" style={{marginBottom:16}}>
                            <div>
                                <Table dataSource={tableData2} bordered loading={load2} columns={tableHeader2} pagination={false}>

                                </Table>
                            </div>
                            <div className="page-footer">
                                <Row>
                                    <Col span={10}>
                                        <ExportFileCom params={this.state.exportParams2}></ExportFileCom>
                                    </Col>
                                    <Col span={14} style={{textAlign: 'right'}}>
                                        <Pagination current={this.state.current} total={total} onChange={this.pageChange2.bind(this)} pageSize={pageSize}  showQuickJumper></Pagination>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}