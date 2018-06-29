import React from 'react';
import { Button, Icon} from 'antd';
import moment from 'moment';
import ExportFile from '../../utils/exportFile';
import {getFun} from "../../utils/api";
import {objectToArr} from "../../utils/dataHandle";

class ExportFileCom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            exporting: false,
            params: {},
            tableData: []
        }
    }
    componentWillReceiveProps(){
         this.setState({
             params: this.props.params
         })
    }
     exportClick() {

         let exportParams = {
             start_at: this.state.params.start_at,
             end_at: this.state.params.end_at,
             city: this.state.params.city,
             car_type_id: this.state.params.car_type_id
         }
         let result =getFun('/web_api/operation/income',  exportParams);
         result.then(res => {
             this.setState({
                 exporting: true,
                 tableData: objectToArr(res.data)
             },() => {
                 this.exportData(this.state.tableData)
             })


         }).catch(err => {
             console.log(err)
         })

     }
     exportData(exportData){
         const {params } = this.state;
         let _exportData = exportData;
         _exportData.map(function(item){
             delete item.key;
         })
         let start = params.start_at;
         let end = params.end_at;
         let now = this.formatDate(new Date());
         let title = "运营日报_" + params.title + '_' + start + '_' + end + '_' + now;
         let headerName = this.getCombineHeader(params.tableHeader);
         ExportFile.exportJson2CSV(exportData, title, headerName);
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
    //拼接表头字段
    getCombineHeader(arr) {
        let _tableHeader = arr;
        let result = {};
        let i = 0;

        for (var kk in _tableHeader) {
            var content = _tableHeader[kk];
            if (content.hasOwnProperty('children')) {
                for (var k in content.children) {
                    result[i] = content.title + ' - ' + content.children[k]['title'];
                    ++i;
                }
            } else {
                result[i] = content.title;
                ++i;
            }
        }
        return result;
    }
    render(){
        const {exporting} = this.state;
        return(
            <div className="export-wrapper">
                <Button type="primary"  size='small'  onClick={() => this.exportClick()}>
                    <Icon type={exporting ? 'loading': 'export'} />导出
                </Button>
            </div>
        )
    }
}
export default ExportFileCom;