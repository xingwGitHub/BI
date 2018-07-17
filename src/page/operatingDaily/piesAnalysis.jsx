
import React from 'react';
import {Card, Table, Radio, Row, Col, Button, Pagination} from 'antd';
import moment from 'moment';
import SearchBox from '../../components/searchBox/searchBox'
import ExportFileCom from '../../components/exportFile/exportFile'

import {getFun} from '../../utils/api'
import {objectToArr, dateDiff, milliFormat} from '../../utils/dataHandle'
import './operating.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class PiesAnalysis extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title: '派单分析',
            total: 10,
            pageSize: 10,
            current: 1,
            load: true,
            dayNum: 10,
            tableData: [],
            selectValue: '',
            carCombine: { //其他车型 当前展示车型取非
                0: [],
                1: [37, 78],
                2: [2,3],
                3: [5],
                4: [78],
                5: [37, 78, 2, 3, 5]
            },
            carTypes: { //车型
                0: '全部',
                1: '易达+',
                2: '舒适+',
                3: '商务+',
                4: '出租车',
                5: '其他'
            },
            city: '',
            start_at: '',
            end_at: '',
            car_type_id: '',
            searchParams: {},
            tableHeader: [
                {
                    title: '统计日期', dataIndex: 'start_time', key: 'start_time', fixed: 'left', width:100
                },
                {
                    title: '创建成功订单', dataIndex: 'total_of_orders', key: 'total_of_orders'
                },
                {
                    title: '派单',
                    children: [
                        {title: '主动取消', dataIndex: 'dispatch_user_active_cancel', key: 'dispatch_user_active_cancel'},
                        {title: '有车接单', dataIndex: 'total_of_dispatch_orders', key: 'total_of_dispatch_orders'},
                        {title: '有车无人接', dataIndex: 'dispatch_no_driver_accept', key: 'dispatch_no_driver_accept'},
                        {title: '无车可派', dataIndex: 'no_car_can_dispatch', key: 'no_car_can_dispatch'}
                    ]
                },
                {
                    title: '决策',
                    children: [
                        {title: '主动取消', dataIndex: 'dispatch_decision_active_cancel', key: 'dispatch_decision_active_cancel'},
                        {title: '主动选择', dataIndex: 'total_of_active_decision_orders', key: 'total_of_active_decision_orders'},
                        {title: '超时取消', dataIndex: 'dispatch_decision_timeout_cancel', key: 'dispatch_decision_timeout_cancel'}
                    ]
                },
                {
                    title: '服务',
                    children: [
                        {title: '主动取消', dataIndex: 'dispatch_service_active_cancel', key: 'dispatch_service_active_cancel'},
                        {title: '当日完成', dataIndex: 'total_of_dispatch_intraday_finished_orders', key: 'total_of_dispatch_intraday_finished_orders'},
                        {title: '等待服务', dataIndex: 'dispatch_service_waiting_service', key: 'dispatch_service_waiting_service'}
                    ]
                },
                {
                    title: '订单概览',
                    children: [
                        {title: '派单成功率(%)', dataIndex: 'rate_of_dispatch_success', key: 'rate_of_dispatch_success'},
                        {title: '决策率(%)', dataIndex: 'rate_of_dispatch_descision', key: 'rate_of_dispatch_descision'},
                        {title: '当日完成率(%)', dataIndex: 'rate_of_dispatch_intraday_finished_order', key: 'rate_of_dispatch_intraday_finished_order'},
                        {title: '订单完成率(%)', dataIndex: 'rate_of_finished_order', key: 'rate_of_finished_order'}
                    ]
                }
            ],
            exportParams: {}
        }
    }
    componentWillMount() {
        this.initDateRange(this.state.dayNum);//初始化查询日期
    }
    componentDidMount(){
        const params = {
            city: '',
            start_at: this.state.start_at,
            end_at: this.state.end_at, //当前时间减n天
            car_type_id: ''
        }
        this.setState({
            load:true
        },() => {
            this.getTableData(params);
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
            city: '',
            start_at: this.formatDate(start),
            end_at: this.formatDate(end), //当前时间减n天
            car_type_id: ''
        });
    }
    // 初始化导出所需数据
    initExportData() {
        const exportParams = {
            start_at: this.state.start_at,
            end_at: this.state.end_at,
            title: this.state.title,
            city: this.state.city,
            car_type_id: this.state.car_type_id,
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
            end_at: params.selectedEndDate
        })
    }
    // 获取车型参数
    carTypeChange(e) {
        let index = e.target.value;
        this.setState({
            car_type_id: this.state.carCombine[index].join(',')
        },() => {
            this.searchBtn()
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
        let arrStr = ['start_time', 'rate_of_dispatch_descision', 'rate_of_dispatch_intraday_finished_order', 'rate_of_finished_order', 'rate_of_dispatch_success'];
        let searchParams = this.getParams();
        let result =getFun('/web_api/operation/dispatch',  searchParams);
        result.then(res => {
            this.setState({
                load: false,
                tableData: objectToArr(res.data, arrStr)

            }, () => {this.initExportData()})
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
            city: this.state.city,
            car_type_id: this.state.car_type_id
        }
        return params;
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
    render() {
        let {title, carTypes, load, tableHeader, total, pageSize} = this.state;
        const radioChildren = Object.keys(carTypes).map((key, index) => {
            return <RadioButton key={key} value={key}>{carTypes[key]}</RadioButton>
        });
        let tableData = milliFormat(this.state.tableData);
        return (
            <div>
                <div className="operating-wrapper">
                    <Card title={title}  bordered={false}>

                        <Row gutter={16}>
                            <Col span={16}>
                                <div>
                                    <SearchBox searchParams={params => this.searchParams(params)}></SearchBox>
                                </div>
                                <div className="cartype-wrapper">
                                    <RadioGroup onChange={this.carTypeChange.bind(this)} defaultValue='0' >
                                        {radioChildren}
                                    </RadioGroup>
                                </div>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" onClick={this.searchBtn.bind(this)}>查询</Button>
                            </Col>
                        </Row>
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
                                    <Pagination size="small" total={total} onChange={this.pageChange.bind(this)} pageSize={pageSize}  showQuickJumper></Pagination>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}
export default PiesAnalysis;