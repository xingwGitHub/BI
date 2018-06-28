import React from 'react';
import {Row, Col, Select, DatePicker} from 'antd';
import moment from 'moment';
import dateFormatter from '../../utils/dateFormat';

import './searchBox.less';

const Option = Select.Option;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

class SearchBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            city: '',
            selectedStartDate: '',
            selectedEndDate: '',
            dayNum: 10,
            cityOptionData: {
                "am": "澳门",
                "anshun": "安顺",
                "as": "鞍山"
            }
        };
    }
    componentWillMount() {
        this.initDateRange(this.state.dayNum);//初始化查询日期
    }
    //初始化查询起止日期
    initDateRange(rangeDays) {
        //时间类型为moment格式
        this.setState({
            selectedEndDate: moment().subtract(1, 'days'), //当前时间
            selectedStartDate: moment().subtract(rangeDays, 'days'), //当前时间减n天
        });

    }
    formatDate (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    };
    handleChange(value){
        this.setState({
            city: value
        })
        const start = new Date((moment(this.state.selectedStartDate).subtract())._d);
        const end = new Date((moment(this.state.selectedEndDate).subtract())._d);
        const param = {
            city: value,
            selectedStartDate: this.formatDate(start),
            selectedEndDate: this.formatDate(end)
        }
        this.props.searchParams(param)
    }
    handlePickerChange(dates, dateStrings) {
        this.setState({
            selectedStartDate: dates[0],
            selectedEndDate: dates[1]
        })
        const param = {
            city: this.state.city,
            selectedStartDate: dateStrings[0],
            selectedEndDate: dateStrings[1]
        }
        this.props.searchParams(param)
    }
    disabledDate(current) {
        return current && current > moment().subtract(1, 'days')
    }
    render() {
        const { cityOptionData, selectedStartDate,  selectedEndDate} = this.state;
        const cityOption = [<Option key="all">全国</Option>];
        Object.keys(cityOptionData).map( (item) => {
            cityOption.push(<Option key={item}>{cityOptionData[item]}</Option>)
        } )
        return (
            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <label>城市：</label>
                        <Select defaultValue='全国' style={{width: 120}} onChange={this.handleChange.bind(this)}>
                            {cityOption}
                        </Select>
                    </Col>
                    <Col span={16}>
                        <label>时间范围：</label>
                        <RangePicker
                            value={[selectedStartDate, selectedEndDate]}
                            format={dateFormat}
                            onChange={this.handlePickerChange.bind(this)}
                            disabledDate={this.disabledDate.bind(this)}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default SearchBox;