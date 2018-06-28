import React from 'react';
import { Pagination} from 'antd';

class PaginationCom extends React.Component{
    constructor(props){
        super(props);
        this.state={
            total: 0,
            pageSize: 10
        }
    }
    componentWillMount(){
        this.setState({
            total: this.props.total
        })
    }
    handlePage(val) {
        console.log(val)
        this.props.pageChange(val)
    }
    render(){
        return(
            <div className="pagination-wrapper">
                <Pagination pageSize={this.state.pageSize} size="small" total={this.state.total} showSizeChanger showQuickJumper
                 onChange={this.handlePage.bind(this)}
                />
            </div>
        )
    }
}
export default PaginationCom;