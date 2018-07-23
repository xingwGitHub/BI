import React, {Component} from 'react';
import {Card, Table, Row, Col, Input, Button, Pagination, Divider, Select, Modal} from 'antd';
import './systemNotice.less';
const Option = Select.Option;
export default class RightsManageUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            total: 10,
            title: '用户列表',
            roleName: '',
            funcModule: '0',
            funcModuleData: [
                {value: '00', key: '0'},
                {value: '11', key: '1'},
                {value: '22', key: '2'}
            ],
            load: false,
            tableData: [
                {id: 0, name: 'aa', userName: '0-0', userId: '00',ddID: 'dd0',roleGroup: "hdjkbdkjbdkk", email: '0000', depart: '大数据',position: '哈哈哈',city: 'aa', status: '正常',time: '2016-09-21 08:00:00'},
                {id: 1, name: 'bb', userId: '11',ddID: 'dd1',roleGroup: "hdjkbdkjbdkk", city: 'aa', status: '正常',time: '2016-09-21 08:00:00'},
                {id: 2, name: 'cc', userId: '22',ddID: 'dd2',roleGroup: "hdjkbdkjbdkk", city: 'aa', status: '正常',time: '2016-09-21 08:00:00'},
                {id: 3, name: 'dd', userId: '33',ddID: 'dd3',roleGroup: "hdjkbdkjbdkk", city: 'aa', status: '正常',time: '2016-09-21 08:00:00'},
                {id: 4, name: 'ee', userId: '44',ddID: 'dd4',roleGroup: "hdjkbdkjbdkk", city: 'aa', status: '正常',time: '2016-09-21 08:00:00'}
            ],
            tableHeader: [
                {title: '用户名', dataIndex: 'name', key: 'name',
                    render: (text,record ) => (<a href="javascript:;" onClick={this.userNamesClick.bind(this, text,record)}>{text}</a>),
                },
                {title: '角色组', dataIndex: 'roleGroup', key: 'roleGroup'},
                {title: '城市', dataIndex: 'city', key: 'city'},
                {title: '状态', dataIndex: 'status', key: 'status'},
                {title: '到期时间', dataIndex: 'time', key: 'time'},
                {title: '操作', key: 'action',
                    render: (text, record) => (
                        <span>
                          <a href="javascript:;" onClick={this.delayClick.bind(this,text, record)}>延期</a>
                          <Divider type="vertical" />
                          <a href="javascript:;" onClick={this.stopClick.bind(this, text, record)}>停用</a>
                          <Divider type="vertical" />
                          <a href="javascript:;" onClick={this.detailsClick.bind(this, text, record)}>详情</a>
                        </span>
                    )
                }
            ],
            addUserRightsVisible: false
        }
    }
    componentWillMount(){}
    componentDidMount(){}
    //获取用户名
    roleNameChange(val){
        console.log(val)
    }
    //功能模块下拉框选择
    funcModuleChange(val){
        console.log(val)
    }
    //点击查询按钮
    searchBtn(){

    }
    //分页
    onChange(){

    }
    userNamesClick(text, record){
        console.log(text,record)

    }
    hideModalOk(){}
    hideModalCancel(){}
    delayClick(){}
    stopClick(){}
    detailsClick(){}
    render(){
        const {title, roleName, funcModule, funcModuleData, tableData, load, tableHeader, total, addUserRightsVisible} = this.state;
        let optionData = funcModuleData.map(item => <Option key={item.key} >{item.value}</Option>)
        return(
            <div>
                <div className="notice-wrapper">
                    <Card title={title}  bordered={false}>

                        <Row gutter={16}>
                            <Col span={14}>
                                <div className="input-wrapper">
                                    <label>用户名：</label>
                                    <Input type="text" placeholder="" defaultValue={roleName} onChange={this.roleNameChange.bind(this)}/>
                                </div>
                                <div className="input-wrapper">
                                    <label>角色组：</label>
                                    <Select defalutValue='00' value={funcModule} onChange={this.funcModuleChange.bind(this)}>
                                        {optionData}
                                    </Select>
                                </div>
                            </Col>
                            <Col span={10}>
                                <Button type="primary" icon='search' style={{marginRight: '20px'}} onClick={this.searchBtn.bind(this)}>查询</Button>
                                {/*<Button type="primary" icon='plus' onClick={this.addBtn.bind(this)}>添加</Button>*/}
                            </Col>
                        </Row>
                        <div>
                            <Table onChange={this.handleChange} dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false}>

                            </Table>
                        </div>
                        <div className="page-footer">
                            <Row>
                                <Col style={{textAlign: 'right'}}>
                                    <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={this.onChange.bind(this)} size="small"/>
                                </Col>
                            </Row>
                        </div>

                    </Card>
                </div>
                <Modal
                    title='添加用户权限'
                    visible={addUserRightsVisible}
                    onOk={this.hideModalOk.bind(this)}
                    onCancel={this.hideModalCancel.bind(this)}
                    okText="确认"
                    cancelText="取消"
                >

                </Modal>
            </div>
        )
    }
}