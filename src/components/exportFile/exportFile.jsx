import React from 'react';
import { Button, Icon} from 'antd';
import moment from 'moment';
import ExportFile from '../../utils/exportFile';
import dateFormat from '../../utils/dateFormat'

class ExportFileCom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            exporting: false,
            params: {}
        }
    }
    componentWillReceiveProps(){
         this.setState({
             params: this.props.params
         })
    }
     exportData() {
         const {params } = this.state
         this.exportAsync().then((exportData) => {

             // let _exportData = this.filterData(exportData);
             let _exportData = [];

             let start = params.start.format(dateFormat);
             let end = params.end.format(dateFormat);
             let now = moment().format(dateFormat);
             let title = "运营日报_" + params.title + '_' + start + '_' + end + '_' + now;
             let headerName = this.getCombineHeader(params.tableHeader);
             ExportFile.exportJson2CSV(_exportData, title, headerName);
         })
     }
     exportAsync() {
         return new Promise((resolve, reject) => {
             this.setState({
                 exporting: true
             }, () => {
                 // this.getApiData('export', resolve);
             });
         })
     }
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
                <Button type="primary"  size='small'  onClick={() => this.exportData()}>
                    <Icon type={exporting ? 'loading': 'export'} />导出
                </Button>
            </div>
        )
    }
}
export default ExportFileCom;