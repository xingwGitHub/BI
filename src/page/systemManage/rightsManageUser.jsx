import React, {Component} from 'react';
import {Card, Table, Row, Col, Input, Button, Pagination, Divider, Select, Modal, Icon, Badge} from 'antd';
import {getFun,post} from '../../utils/api'
import dateFormat from '../../utils/dateFormat'
import EditableTable from '../../components/editTable/editTable'
import './systemNotice.less';
const Option = Select.Option;
const confirm = Modal.confirm;
export default class RightsManageUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 10,
            title: '用户列表',
            roleName: '',
            funcModule: '',
            funcModuleData: [],
            load: true,
            tableData: [],
            tableHeader: [
                {title: '用户名', dataIndex: 'name', key: 'name',
                    render: (text,record ) => (<a href="javascript:;" onClick={this.userNamesClick.bind(this, text,record)}>{text}</a>),
                },
                {title: '角色组', dataIndex: 'roleNames', key: 'roleNames',
                    render: (text, record) => (
                        <span>{record.roleNames?record.roleNames:'--'}</span>
                    )
                },
                // {title: '城市', dataIndex: 'login_city', key: 'login_city',
                //     render: (text, record) => (
                //         <span>{record.login_city?record.login_city:'--'}</span>
                //     )
                // },
                {title: '状态', dataIndex: 'status', key: 'status',
                    render: (text, record) => (
                        <span><Badge status={record.status? "success":"error"} />{record.status?'正常':'停用'}</span>
                    )
                },
                {title: '到期时间', dataIndex: 'expire_time', key: 'expire_time',
                    render: function(text, record){
                        let time = record.expire_time;
                        if(time){
                            if(time === -1){
                                return <span>不限期</span>
                            }else {
                                let date = dateFormat(time, 'YY-MM-DD h:m:s');
                                return <span>{date}</span>
                            }
                        }else {
                            return <span>--</span>
                        }
                    }
                },
                {title: '操作', key: 'action',
                    render: (text, record) => (
                        <span>
                          <a href="javascript:;" onClick={this.delayClick.bind(this,text, record)}>延期</a>
                          <Divider type="vertical" />
                          <a href="javascript:;" className={record.status?"stop":"stopped"} onClick={this.stopClick.bind(this, text, record)}>{record.status?"停用":"已停用"}</a>
                          <Divider type="vertical" />
                          <a href="javascript:;" onClick={this.detailsClick.bind(this, text, record)}>详情</a>
                        </span>
                    )
                }
            ],
            addUserRightsVisible: false,
            tableDataAdd: [],
            loadAdd: false,
            tableHeaderAdd: [
                {title: '用户ID', dataIndex: 'id', key: 'id'},
                {title: '钉钉ID', dataIndex: 'dingtalk_userid', key: 'dingtalk_userid'},
                {title: '姓名', dataIndex: 'name', key: 'name',width: 80},
                {title: '邮箱', dataIndex: 'email', key: 'email'},
                {title: '部门', dataIndex: 'department', key: 'department'},
                {title: '职位', dataIndex: 'position', key: 'position'}
            ],
            delayVisible: false,
            delayItem: '',
            role_id:'',
            userName: '',
            addRoleData: []
        }
    }
    componentWillMount(){
        this.getTableData();
        this.getRoleGroupDataSelect();
    }
    componentDidMount(){}
    //获取用户名
    roleNameChange(event){
        this.setState({
            userName: event.target.value
        })
    }
    //角色组下拉框选择
    funcModuleChange(val){
        this.setState({
            role_id: val
        })
    }
    //点击查询按钮
    searchBtn(){
        let params = {
            name: this.state.userName,
            role_id: this.state.role_id,
            page: this.state.current
        }
        this.getTableData(params)
    }
    //分页
    onChange(current){
        let params = {
            name: this.state.userName,
            role_id: this.state.role_id,
            page: current
        }
        this.getTableData(params)
    }
    //获取角色组下拉框数据
    getRoleGroupDataSelect(){
        let result = getFun('/system/auth/role/alllist');
        result.then(res => {
            res.data.map( item => {
                item.key = item.id;
            })
            localStorage.setItem("alllist",JSON.stringify(res.data))
            res.data.unshift({key: 0,id: 0, name: '请选择'})


            this.setState({
                funcModuleData: res.data,
                funcModule: res.data[0].name
            })
        })
    }
    // 获取用户列表数据
    getTableData(params){
        let result = getFun('/system/auth/user/list',params);
        result.then(res => {
            res.data.data.map(item => {
                item.key = item.id;
            })
            this.setState({
                tableData: res.data.data,
                load: false,
                total: res.data.total,
                current: res.data.current_page
            })
        })
    }
    // 点击用户名添加用户权限
    userNamesClick(text, record){
        let params = {
            id: record.id
        }
        let result = getFun('/system/auth/user/info',params);
        result.then(res => {
            record.department = res.data.extend_info.department;
            record.position = res.data.extend_info.position;
            let data=[];
            data.push(record);
            this.setState({
                addUserRightsVisible: true,
                tableDataAdd: data,
                addRoleData: res.data.role
            })
        })

    }
    // 添加用户权限确认
    hideModalOk(){
        this.setState({
            addUserRightsVisible: false,
            load: true
        })
        this.getTableData();
    }
    // 添加用户权限取消
    hideModalCancel(){
        this.setState({
            addUserRightsVisible: false
        })
    }
    // 点击权限延期按钮
    delayClick(text, record){
        this.setState({
            delayVisible: true,
            delayItem: record
        })
    }
    // 权限延期确认
    delayHandleOk(id){
        let params = {
            id: id
        }
        let result = post('/system/auth/user/overtime',params);
        result.then(res => {
            console.log(res)
        })
    }
    // 权限延期取消
    delayHandleCancel(){
        this.setState({
            delayVisible: false
        })
    }
    stopClick(txt){
        const {tableData} = this.state;
        const _this = this;
        let params = {
            id: txt.id,
        };
        confirm({
            title:'你确定要停用此账户吗？',
            content:'确认停用后该用户将不能再访问系统。',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                let result =post('/system/auth/user/disabled',params);
                result.then(res => {
                    if(res.code === 0){
                            let tableData2 = tableData;
                            tableData2.map(item => {
                                if(item.id == txt.id){
                                    item.status =!item.status;
                                }
                            })
                            _this.setState({
                                tableData:tableData2
                            })
                    }
                }).catch(err => {
                    console.log(err)
                })

            },
            onCancel(){

            }
        })

    }
    detailsClick(){}
    render(){
        const {title, roleName, funcModule, funcModuleData, tableData, load, tableHeader, total, addUserRightsVisible, tableDataAdd, loadAdd, tableHeaderAdd, delayItem, addRoleData} = this.state;
        let optionData = funcModuleData.map(item => <Option key={item.id} >{item.name}</Option>);
        if(delayItem.expire_time){
            if(delayItem.expire_time === -1){
                delayItem.expire_time = '不限期'
            }else {}
        }
        return(
            <div>
                <div className="notice-wrapper">
                    <Card title={title}  bordered={false}>

                        <div className="search-content">
                            <div className="search-wrapper">
                                <div className="input-wrapper">
                                    <label>用户名：</label>
                                    <Input type="text"  onChange={this.roleNameChange.bind(this)}/>
                                </div>
                                <div className="input-wrapper">
                                    <label>角色组：</label>
                                    <Select  defaultValue='0' onChange={this.funcModuleChange.bind(this)}>
                                        {optionData}
                                    </Select>
                                </div>
                            </div>
                            <Col span={10}>
                                <Button type="primary" icon='search' style={{marginRight: '20px'}} onClick={this.searchBtn.bind(this)}>查询</Button>
                                {/*<Button type="primary" icon='plus' onClick={this.addBtn.bind(this)}>添加</Button>*/}
                            </Col>
                        </div>
                        <div>
                            <Table dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false}>

                            </Table>
                        </div>
                        <div className="page-footer">
                            <Row>
                                <Col style={{textAlign: 'right'}}>
                                    <Pagination showQuickJumper pageSize={this.state.pageSize} current={this.state.current}  total={total} onChange={this.onChange.bind(this)} size="small"/>
                                </Col>
                            </Row>
                        </div>

                    </Card>
                </div>
                <Modal
                    className="details-modal"
                    title='添加用户权限'
                    width={800}
                    visible={addUserRightsVisible}
                    onOk={this.hideModalOk.bind(this)}
                    onCancel={this.hideModalCancel.bind(this)}
                    okText="关闭"
                >
                   <div className="add-role-wrapper">
                       <Card title='用户信息' bordered={true}>
                           <Table dataSource={tableDataAdd} bordered loading={loadAdd} columns={tableHeaderAdd} pagination={false}>

                           </Table>
                       </Card>
                       <Card title='添加角色组' bordered={true} style={{marginTop: '20px'}}>
                           <EditableTable data={tableDataAdd} addData={addRoleData}></EditableTable>
                       </Card>
                   </div>
                </Modal>
                <Modal
                    title="权限延期"
                    visible={this.state.delayVisible}
                    onOk={this.delayHandleOk.bind(this, delayItem.id)}
                    onCancel={this.delayHandleCancel.bind(this)}
                >
                    <div className="notice-wrapper">
                        <p><span className="detail-title">账户：</span><span className="detail-title-txt">{delayItem.name}</span></p>
                        <p><span className="detail-title">权限组：</span><span className="detail-title-txt">{delayItem.roleNames?delayItem.roleNames:'--'}</span></p>
                        <p><span className="detail-title">延期至：</span><span className="detail-title-txt">{delayItem.expire_time?delayItem.expire_time:'--'}</span></p>
                    </div>
                    <p className="permissions"><Icon type="info-circle"></Icon>为保证数据安全，请确认延期申请后操作。</p>
                </Modal>
            </div>
        )
    }
}