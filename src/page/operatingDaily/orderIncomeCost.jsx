
import React from 'react';
import {Card, Table, Radio, Row, Col, Button} from 'antd';
import moment from 'moment';
import SearchBox from '../../components/searchBox/searchBox'
import PaginationCom from '../../components/pagaination/pagination'
import ExportFileCom from '../../components/exportFile/exportFile'

import {getFun} from '../../utils/api'
import './operating.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class IncomeAndCost extends React.Component{
  constructor(props) {
    super(props);
    this.state={
        title: '订单收入及成本',
        total: 50,
        current: 1,
        load: true,
        dayNum: 10,
        tableData: [],
        selectValue: '',
        carTypes: { //车型
            0: '全部',
            1: '易达+',
            2: '舒适+',
            3: '商务+',
            4: '出租车',
            5: '其他'
        },
        orderOptions: { //选项
            productType: '产品类型',
            plantform: '下单平台',
            userLevel: '用户级别',
            userType: '用户类型'
        },
        city: '',
        start_at: '',
        end_at: '',
        car_type_id: '0',
        searchParams: {},
        tableHeader: [
            {
                title: '统计日期', dataIndex: '统计日期', key: '统计日期'
            },
            {
                title: '收入',
                children: [
                    {title: '完成订单数', dataIndex: '完成订单数', key: '完成订单数'},
                    {title: '订单金额', dataIndex: '订单金额', key: '订单金额'}
                ]
            },
            {
                title: '成本',
                children: [
                    {title: '服务成本', dataIndex: '服务成本', key: '服务成本'},
                    {title: '数单奖', dataIndex: '数单奖', key: '数单奖'},
                    {title: '动态加价成本', dataIndex: '动态加价成本', key: '动态加价成本'},
                    {title: '保险成本', dataIndex: '保险成本', key: '保险成本'}
                ]
            },
          {
              title: '费用',
              children: [
                  {title: '用户优惠', dataIndex: '用户优惠', key: '用户优惠'},
                  {title: '充返优惠', dataIndex: '充返优惠', key: '充返优惠'},
                  {title: 'YOP分佣', dataIndex: 'YOP分佣', key: 'YOP分佣'}
              ]
          },
          {
              title: '单均金额', dataIndex: '单均金额', key: '单均金额'
          },
          {
              title: '计费差额', dataIndex: '计费差额', key: '计费差额'
          }
        ],
        exportParams: {}
    }
  }
    componentWillMount() {
        this.initDateRange(this.state.dayNum);//初始化查询日期


    }
    //初始化查询起止日期
    initDateRange(rangeDays) {
        //时间类型为moment格式
        const  endTime= moment().subtract(1, 'days');//当前时间
        const startTime = moment().subtract(rangeDays, 'days');//当前时间
        const start = new Date((moment(startTime).subtract())._d);
        const end = new Date((moment(endTime).subtract())._d);
        const params = {
            city: '',
            start_at: this.formatDate(start),
            end_at: this.formatDate(end), //当前时间减n天
            car_type_id: '0'
        }
        this.getTableData(params);
        this.setState({
            city: '',
            start_at: this.formatDate(start),
            end_at: this.formatDate(end), //当前时间减n天
            car_type_id: '0'
        }, () => {this.initExportData()});
    }
    // 初始化导出所需数据
    initExportData() {
        const exportParams = {
            start: this.state.start_at,
            end: this.state.end_at,
            title: this.state.title,
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
      this.setState({
          car_type_id: e.target.value
      })
  }
    // 点击查询
  searchBtn() {
      const searchParams = {
          city: this.state.city,
          start_at: this.state.start_at,
          end_at: this.state.end_at,
          car_type_id: this.state.car_type_id
      }
      this.setState({
          searchParams: searchParams
      })
      this.getTableData(searchParams)
  }
    // 获取当前页数
    pageChange(current) {
        this.setState({
            current: current
        })
        const searchParam = this.state.searchParams;
        searchParam.currnet = current;
        this.getTableData(searchParam)
    }
    // 获取表格数据
  getTableData(searchParams) {
      console.log("查询参数：",searchParams)
      this.setState({
          load: false
      })
      // let result =getFun('/web_api/operation/income',  searchParams);
      // result.then(res => {
      //     console.log(res)
      //     this.setState({
      //         tableData: res.data
      //     })
      // }).catch(err => {
      //     console.log(err)
      // })
  }

  render() {
      const {title, carTypes, selectValue, tableData, load, tableHeader} = this.state;
      const radioChildren = Object.keys(carTypes).map((key, index) => {
          return <RadioButton key={key} value={key}>{carTypes[key]}</RadioButton>
      });
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
                        <RadioGroup onChange={this.carTypeChange.bind(this)} value={selectValue}>
                            {radioChildren}
                        </RadioGroup>
                    </div>
                </Col>
                <Col span={10}>
                    <Button type="primary" onClick={this.searchBtn.bind(this)}>查询</Button>
                </Col>
            </Row>
            <div>
                <Table dataSource={tableData} bordered loading={load} columns={tableHeader}>

                </Table>
            </div>
            <div className="page-footer">
                <Row>
                    <Col span={10}>
                       <ExportFileCom params={this.state.exportParams}></ExportFileCom>
                    </Col>
                    <Col span={14} style={{textAlign: 'right'}}>
                        <PaginationCom total={this.state.total} pageChange={current => this.pageChange(current)}></PaginationCom>
                    </Col>
                </Row>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}
export default IncomeAndCost;