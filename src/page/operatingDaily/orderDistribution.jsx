


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

class Distribution extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            title: '订单分布',
            total: 10,
            pageSize: 10,
            current: 1,
            load: true,
            dayNum: 10,
            tableData: [],
            selectValue: '',

            orderOptions: { //选项
                product_type_id: '产品类型',
                order_source: '下单平台',
                user_level_id: '用户级别',
                user_active_type: '用户类型'
            },
            city: '',
            start_at: '',
            end_at: '',
            group_by: 'product_type_id',
            searchParams: {},
            xScroll: '100%',
            tableHeader: [],
            tableHeader0: [
                {
                    title: '统计日期', dataIndex: 'start_time', key: 'start_time'
                },
                {
                    title: 'ASAP用车',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_asap', key: 'total_of_finished_orders_asap'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_asap', key: 'order_origin_amount_asap'}
                    ]
                },
                {
                    title: '预约用车',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_reservation', key: 'total_of_finished_orders_reservation'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_reservation', key: 'order_origin_amount_reservation'}
                    ]
                },
                {
                    title: '定价-接机',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_airport_pick_up', key: 'total_of_finished_orders_airport_pick_up'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_airport_pick_up', key: 'order_origin_amount_airport_pick_up'}
                    ]
                },
                {
                    title: '定价-送机',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_airport_drop_off', key: 'total_of_finished_orders_airport_drop_off'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_airport_drop_off', key: 'order_origin_amount_airport_drop_off'}
                    ]
                },
                {
                    title: '定价-半日租',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_half_day_rent', key: 'total_of_finished_orders_half_day_rent'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_half_day_rent', key: 'order_origin_amount_half_day_rent'}
                    ]
                },
                {
                    title: '定价-日租',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_daily_rent', key: 'total_of_finished_orders_daily_rent'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_daily_rent', key: 'order_origin_amount_daily_rent'}
                    ]
                },
                {
                    title: '定价-热门路线',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_hot_line', key: 'total_of_finished_orders_hot_line'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_hot_line', key: 'order_origin_amount_hot_line'}
                    ]
                }
            ],
            tableHeader1: [
                {
                    title: '统计日期', dataIndex: 'start_time', key: 'start_time', fixed: 'left', width: 100,
                },
                {
                    title: 'ios',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_yidao_ios', key: 'total_of_finished_orders_yidao_ios'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_yidao_ios', key: 'order_origin_amount_yidao_ios'}
                    ]
                },
                {
                    title: 'Android',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_yidao_android', key: 'total_of_finished_orders_yidao_android'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_yidao_android', key: 'order_origin_amount_yidao_android'}
                    ]
                },
                {
                    title: '网站',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_web', key: 'total_of_finished_orders_web'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_web', key: 'order_origin_amount_web'}
                    ]
                },
                {
                    title: '手机网站',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_mobile_web', key: 'total_of_finished_orders_mobile_web'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_mobile_web', key: 'order_origin_amount_mobile_web'}
                    ]
                },
                {
                    title: 'CRM',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_crm', key: 'total_of_finished_orders_crm'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_crm', key: 'order_origin_amount_crm'}
                    ]
                },
                {
                    title: '开放平台',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_open_platform', key: 'total_of_finished_orders_open_platform'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_open_platform', key: 'order_origin_amount_open_platform'}
                    ]
                },
                {
                    title: '网站第三方嵌套',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_web_open_platform', key: 'total_of_finished_orders_web_open_platform'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_web_open_platform', key: 'order_origin_amount_web_open_platform'}
                    ]
                },
                {
                    title: 'H5第三方嵌套',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_mobile_open_platform', key: 'total_of_finished_orders_mobile_open_platform'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_mobile_open_platform', key: 'order_origin_amount_mobile_open_platform'}
                    ]
                },
                {
                    title: 'iPhone App',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_iphone', key: 'total_of_finished_orders_iphone'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_iphone', key: 'order_origin_amount_iphone'}
                    ]
                },
                {
                    title: '其他',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_other', key: 'total_of_finished_orders_other'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_other', key: 'order_origin_amount_other'}
                    ]
                }
            ],
            tableHeader2: [
                {
                    title: '统计日期', dataIndex: 'start_time', key: 'start_time'
                },
                {
                    title: '钻石用户',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_diamond_card', key: 'total_of_finished_orders_diamond_card'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_diamond_card', key: 'order_origin_amount_diamond_card'}
                    ]
                },
                {
                    title: '白金用户',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_white_gold_card', key: 'total_of_finished_orders_white_gold_card'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_white_gold_card', key: 'order_origin_amount_white_gold_card'}
                    ]
                },
                {
                    title: '金卡用户',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_golden_card', key: 'total_of_finished_orders_golden_card'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_golden_card', key: 'order_origin_amount_golden_card'}
                    ]
                },
                {
                    title: '银卡用户',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_silver_card', key: 'total_of_finished_orders_silver_card'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_silver_card', key: 'order_origin_amount_silver_card'}
                    ]
                }
            ],
            tableHeader3: [
                {
                    title: '统计日期', dataIndex: 'start_time', key: 'start_time'
                },
                {
                    title: '当日新激活用户',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_new', key: 'total_of_finished_orders_new'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_new', key: 'order_origin_amount_new'}
                    ]
                },
                {
                    title: '当日老用户',
                    children: [
                        {title: '订单数', dataIndex: 'total_of_finished_orders_old', key: 'total_of_finished_orders_old'},
                        {title: '订单金额', dataIndex: 'order_origin_amount_old', key: 'order_origin_amount_old'}
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
            group_by: this.state.group_by
        }
        this.setState({
            load:true,
            tableHeader: this.state.tableHeader0
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
        if(index === 'product_type_id'){
            this.setState({
                tableHeader: this.state.tableHeader0,
                xScroll: '100%'
            })
        }else if(index === 'order_source'){
            this.setState({
                tableHeader: this.state.tableHeader1,
                xScroll: '160%'
            })
        }else if(index === 'user_level_id'){
            this.setState({
                tableHeader: this.state.tableHeader2,
                xScroll: '100%'
            })
        }else if(index === 'user_active_type'){
            this.setState({
                tableHeader: this.state.tableHeader3,
                xScroll: '100%'
            })
        }
        this.setState({
            group_by: index
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
        let arrStr = ['start_time']
        let searchParams = this.getParams();
        let result =getFun('/web_api/operation/order_dist',  searchParams);
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
            city: this.state.city,
            group_by: this.state.group_by
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
        let {title, orderOptions, load, tableHeader, total, pageSize, xScroll, exportParams} = this.state;
        const radioChildren = Object.keys(orderOptions).map((key, index) => {
            return <RadioButton key={key} value={key}>{orderOptions[key]}</RadioButton>
        });
        let tableData = milliFormat(this.state.tableData);
        return (
            <div>
                <div className="operating-wrapper">
                    <Card title={title}  bordered={false}>

                        <Row gutter={16}>
                            <Col span={14}>
                                <div>
                                    <SearchBox searchParams={params => this.searchParams(params)}></SearchBox>
                                </div>
                                <div className="cartype-wrapper">
                                    <RadioGroup onChange={this.carTypeChange.bind(this)} defaultValue='product_type_id' >
                                        {radioChildren}
                                    </RadioGroup>
                                </div>
                            </Col>
                            <Col span={10}>
                                <Button type="primary" onClick={this.searchBtn.bind(this)}>查询</Button>
                            </Col>
                        </Row>
                        <div>
                            <Table dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false} scroll={{x: xScroll}}>

                            </Table>
                        </div>
                        <div className="page-footer">
                            <Row>
                                <Col span={10}>
                                    <ExportFileCom params={exportParams}></ExportFileCom>
                                </Col>
                                <Col span={14} style={{textAlign: 'right'}}>
                                    <Pagination size="small" total={total} onChange={this.pageChange.bind(this)} pageSize={pageSize} showSizeChanger={true} onShowSizeChange={this.onShowSizeChange.bind(this)} showQuickJumper></Pagination>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}
export default Distribution;