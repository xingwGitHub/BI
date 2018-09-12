
import React from 'react';
import {Card, Table, Radio, Row, Col, Button, Pagination} from 'antd';
import moment from 'moment';
import SearchBox from '../../components/searchBox/searchBox'
import ExportFileCom from '../../components/exportFile/exportFile'
import UserRemain from '../../components/chart/userRemain'

import {getFun} from '../../utils/api'
import {objectToArr, dateDiff, milliFormat} from '../../utils/dataHandle'
import './retain.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class userRetain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title: '用户留存分析',
            total: 10,
            pageSize: 10,
            current: 1,
            load: true,
            dayNum: 10,
            tableData: [],
            selectValue: '',
            city: '',
            start_at: '',
            end_at: '',
            userType:'',
            dateType: '0',
            unitType: '',
            userTypes: {
                0: "新用户留存",
                1: "活跃用户留存",
            },
            userTypeNum: {
                0: '',
                1: 1,
            },
            dateTypes: {
                0: "天",
                1: "周",
                2: "月"
            },
            dateTypeNum: {
                0: '',
                1: 1,
                2: 2
            },
            dateTypeButton: {
                0: false,
                1: true,
                2: true
            },
            unitTypes: {
                0: "留存率",
                1: "留存数",
            },
            unitTypeNum: {
                0: '',
                1: 1,
            },
            xData: ['新增用户','1天后','2天后','3天后','4天后','5天后','6天后', '7天后', '14天后', '30天后'],
            searchParams: {},
            tableHeader: [
                {
                    title: '日期', dataIndex: 'start_time', key: 'start_time',  width: '100px'
                },
                {
                    title: '新用户数', dataIndex: 'user_count', key: 'user_count'
                },
                {
                    title: '下单用户数', dataIndex: 'dyhs', key: 'dyhs'
                },
                {
                    title: '激活用户数', dataIndex: 'jhyhs', key: 'jhyhs'
                },
                {
                    title: '订单完成率(%)', dataIndex: 'total_complete_of_orders', key: 'total_complete_of_orders'
                },
                {
                    title: '7日留存', dataIndex: '7days_retain', key: '7days_retain'
                },
                {
                    title: '30日留存', dataIndex: '30days_retain', key: '30days_retain'
                },
                {
                    title: '7日频次', dataIndex: '7days_frequency', key: '7days_frequency'
                },
                {
                    title: '30日频次', dataIndex: '30days_frequency', key: '30days_frequency'
                },
                {
                    title: '单均补贴', dataIndex: 'singel_average_subsidy', key: 'singel_average_subsidy'
                },
                {
                    title: '客均礼包补贴', dataIndex: 'pasengers_average_gift_subsidy', key: 'pasengers_average_gift_subsidy'
                }
            ],
            tableHeader2: [
                {
                    title: '日期', dataIndex: 'start_time1', key: 'start_time1',  width: '100px'
                },
                {
                    title: '老用户数', dataIndex: 'user_count1', key: 'user_count1'
                },
                {
                    title: '下单用户数', dataIndex: 'xdyhs1', key: 'xdyhs1'
                },
                {
                    title: '激活用户数', dataIndex: 'jhyhs1', key: 'jhyhs1'
                },
                {
                    title: '订单完成率(%)', dataIndex: 'total_complete_of_orders1', key: 'total_complete_of_orders1'
                },
                {
                    title: '7日留存', dataIndex: '7days_retain1', key: '7days_retain1'
                },
                {
                    title: '30日留存', dataIndex: '30days_retain1', key: '30days_retain11'
                },
                {
                    title: '7日频次', dataIndex: '7days_frequency1', key: '7days_frequency1'
                },
                {
                    title: '30日频次', dataIndex: '30days_frequency1', key: '30days_frequency1'
                },
                {
                    title: '单均补贴', dataIndex: 'singel_average_subsidy1', key: 'singel_average_subsidy1'
                },
                {
                    title: '客均礼包补贴', dataIndex: 'pasengers_average_gift_subsidy1', key: 'pasengers_average_gift_subsidy1'
                },
                {
                    title: '单均城市补贴', dataIndex: 'order_average_city_subsidy1', key: 'order_average_city_subsidy1'
                }
            ],
            exportParams: {},
            checkedParam: {}
        }
    }
    componentWillMount() {
        this.initDateRange(this.state.dayNum);//初始化查询日期
        let city = this.getCityParams();
        this.setState({
            city: city
        })
    }
    componentDidMount(){
        this.setState({
            load:true
        },() => {
            this.getTableData();
            this.disableButton();
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
    initExportData() {
        const exportParams = {
            start_at: this.state.start_at,
            end_at: this.state.end_at,
            title: this.state.title,
            city: this.state.city,
            tableHeader: this.state.tableHeader,
            exportData: this.state.tableData
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
    // 获取下拉框和日期参数
    searchParams(params){
        this.setState({
            city: params.city,
            start_at: params.selectedStartDate,
            end_at: params.selectedEndDate,
        },() => {
            this.disableButton();
        })
    }
    // 天，周，月--是否可点击
    disableButton(){
        let res = moment(this.state.end_at).unix() - moment(this.state.start_at).unix()
        let dayDiff = res/(60*60*24)
        let val = this.state.dateType;
        if(val == 0){
            this.setState({
                xData: ['新增用户','1天后','2天后','3天后','4天后','5天后','6天后', '7天后', '14天后', '30天后']
            })
        }else if(val == 1){
            this.setState({
                xData: ['新增用户','1周后','2周后','3周后','4周后','5周后','6周后', '7周后', '14周后', '30周后']
            })
        }else if(val == 2){
            this.setState({
                xData: ['新增用户','1月后','2月后','3月后','4月后','5月后','6月后', '7月后', '14月后', '30月后']
            })
        }
        // console.log(dayDiff)
        if(dayDiff<30){
            this.setState({
                dateType: this.state.dateTypeNum[0],
                dateTypeButton: {
                    0: false,
                    1: true,
                    2: true
                },
                xData: ['新增用户','1天后','2天后','3天后','4天后','5天后','6天后', '7天后', '14天后', '30天后']
            })

        }else if(dayDiff>120){
            this.setState({
                dateTypeButton: {
                    0: true,
                    1: false,
                    2: false
                },

            })

        }else if(30<=dayDiff<120){
            this.setState({
                dateTypeButton: {
                    0: false,
                    1: false,
                    2: false
                },
            })

        }
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
    // 获取表格数据
    getTableData() {
        let arrStr = ['start_time', 'rate_of_bymeter_order'];
        let searchParams = this.getParams();
        let searchParam = Object.assign(searchParams,this.state.checkedParam);
        let result =getFun('/web_api/operation/portrait',  searchParam);
        result.then(res => {
            this.setState({
                load: false,
                tableData: objectToArr(res.data, arrStr)

            },() => this.initExportData())
        }).catch(err => {
            console.log(err)
        })
    }
    // 获取接口参数
    getParams() {
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
    // 新用户留存、活跃用户留存
    userTypeChange(e){
        let index = e.target.value;
        this.setState({
            userType: this.state.userTypeNum[index]
        })
        let params = {
            userType: this.state.userTypeNum[index],
            // order_peak_type: this.state.order_peak_type,
            // estimate_distance: this.state.estimate_distance
        }
    }
    // 天、周、月
    dateTypeChange(e){
        let index = e.target.value;
        if(index === 0){
            this.setState({
                xData: ['新增用户','1天后','2天后','3天后','4天后','5天后','6天后', '7天后', '14天后', '30天后']
            })
        }else if(index == 1){
            this.setState({
                xData: ['新增用户','1周后','2周后','3周后','4周后','5周后','6周后', '7周后', '14周后', '30周后']
            })
        }else if(index == 2){
            this.setState({
                xData: ['新增用户','1月后','2月后','3月后','4月后','5月后','6月后', '7月后', '14月后', '30月后']
            })
        }
        this.setState({
            dateType: this.state.dateTypeNum[index]
        })
        let params = {
            dateType: this.state.dateTypeNum[index],
        }
    }
    // 留存率、留存数
    unitTypeChange(e){
        let index = e.target.value;
        this.setState({
            unitType: this.state.unitTypeNum[index]
        })
        let params = {
            unitType: this.state.unitTypeNum[index],
        }
    }
    render() {
        let {title, load, tableHeader, total, pageSize, xData} = this.state;
        let tableData = milliFormat(this.state.tableData);
        const {userTypes, dateTypes, dateTypeButton, unitTypes} = this.state;
        const radioChildren = Object.keys(userTypes).map(item => {
            return <RadioButton key={item} value={item}>{userTypes[item]}</RadioButton>
        })
        const radioChildren2 = Object.keys(dateTypes).map(item => {
            return <RadioButton key={item} value={item} disabled={dateTypeButton[item]}>{dateTypes[item]}</RadioButton>
        })
        const radioChildren3 = Object.keys(unitTypes).map(item => {
            return <RadioButton key={item} value={item}>{unitTypes[item]}</RadioButton>
        })
        return (
            <div>
                <div className="operating-wrapper">
                    <h3 className="cardTitle">{title}</h3>
                    <Card bordered={false}>
                        <div className="search-content">
                            <div className="search-wrapper">
                                <div>
                                    <SearchBox searchParams={params => this.searchParams(params)}></SearchBox>
                                </div>
                            </div>
                            <div className="search-btn-wrapper">
                                <Button type="primary"  icon='search' onClick={this.searchBtn.bind(this)}>查询</Button>
                            </div>
                        </div>
                    </Card>
                    <div className="tableWrap" style={{marginBottom:16}}>
                        <div style={{marginTop: '16px', overflow: 'hidden'}}>
                            <div style={{float: 'left'}}>
                                <RadioGroup onChange={this.userTypeChange.bind(this)} defaultValue='0'>
                                    {radioChildren}
                                </RadioGroup>
                            </div>
                            <div style={{float: 'right'}}>
                                <RadioGroup onChange={this.unitTypeChange.bind(this)} defaultValue='0'>
                                    {radioChildren3}
                                </RadioGroup>
                            </div>
                            <div style={{float: 'right', marginRight: '20px'}}>
                                <RadioGroup onChange={this.dateTypeChange.bind(this)}  defaultValue={this.state.dateType} >
                                    {radioChildren2}
                                </RadioGroup>
                            </div>
                        </div>
                        <UserRemain xData={xData}/>
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
                    <h3 className="cardTitle">新用户</h3>
                    <div className="tableWrap" style={{marginBottom:16}}>
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
                                    <Pagination current={this.state.current} total={total} onChange={this.pageChange.bind(this)} pageSize={pageSize}  showQuickJumper></Pagination>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <h3 className="cardTitle">老用户</h3>
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
                                    <Pagination current={this.state.current} total={total} onChange={this.pageChange.bind(this)} pageSize={pageSize}  showQuickJumper></Pagination>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default userRetain;