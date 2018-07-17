import React, {Component} from 'react';
import {Card, Table, Row, Col, Input, Form, Button, Pagination, Badge, Modal} from 'antd';
import moment from 'moment';


import {getFun} from '../../utils/api'

import './systemNotice.less';
import * as dateUtil from "../../components/ranking/DateFormat";

const FormItem = Form.Item;
const confirm = Modal.confirm;
//添加和编辑
const AddEditForm = Form.create()(

    class extends React.Component {
        render() {
            const { noticeCreator, visible, onCancel, onSubmit, form, popTitle, btnFlag } = this.props;
            let {popValues} = this.props;
            // console.log(popValues)
            if(btnFlag == 0){
                popValues = {};
            }else{
                popValues = popValues;
            }
            const { TextArea } = Input;
            const { getFieldDecorator } = form;
            const formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 },
            }
            const validFunction = (rule, value, callback) => {
                if(value){
                    if (value.length > 20) {
                        callback('标题长度不超过20个字'); // 校验未通过
                    }
                }

                callback(); // 校验通过
            }
            const validFunction2 = (rule, value, callback) => {
                if(value){
                    if (value.length > 40) {
                        callback('概要长度不超过40个字'); // 校验未通过
                    }
                }

                callback(); // 校验通过
            }
            return (
                <Modal
                    visible={visible}
                    title={popTitle}
                    okText="提交"
                    onCancel={onCancel}
                    onOk={onSubmit}
                >
                    <Form layout="horizontal">
                        <FormItem label="公告标题" {...formItemLayout}>
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    //max:20,
                                    message: '请填写公告标题'
                                },{
                                    validator: validFunction
                                }],
                                initialValue: popValues.title?popValues.title:''
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem label="公告概要" {...formItemLayout}>
                            {getFieldDecorator('desc', {
                                rules: [{
                                    required: true,
                                    // max:40,
                                    message: '请填写公告概要'
                                },{
                                    validator: validFunction2
                                }],
                                initialValue: popValues.describe
                            })(
                                <TextArea rows={2}/>
                            )}
                        </FormItem>
                        <FormItem label="公告内容" {...formItemLayout}>
                            {getFieldDecorator('detail', {
                                rules: [{
                                    required: true,
                                    message: '请填写公告内容'
                                }],
                                initialValue: popValues.detail
                            })(
                                <TextArea rows={4}/>
                            )}
                        </FormItem>
                        <FormItem label="创建人" {...formItemLayout}>
                            {popValues.create_name?popValues.create_name:noticeCreator}
                        </FormItem>
                    </Form>

                </Modal>
            );
        }
    }
);
export default class SystemNotice extends Component {
    constructor(props) {
        super(props);
        this.state={
            title: '系统公告',
            total: 100,
            pageSize: 10,
            current: 1,
            load: true,
            sortedInfo: null,
            tableData: [],
            userId: 3,
            inputTitle:'',
            inputCreator:'',
            visible: false,
            visibleDetail: false,
            btnFlag: '',
            popTitle: '',
            popValues: '',
            confirmLoading: false,
            noticeCreator: '哆啦B梦',
            noticeCreatorId: 11,
            titleDetail: '',
            describeDetail: '',
            detailDetail: ''
        };
        this.inputTitleChange = this.inputTitleChange.bind(this);
        this.inputCreatorChange = this.inputCreatorChange.bind(this);
    }
    componentWillMount() {

    }
    componentDidMount(){
        this.getTableData();
    }
    // 排序
    handleSortChange = (pagination, sorter) => {
        console.log('排序', pagination, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    }
    // setAgeSort = () => {
    //     this.setState({
    //         sortedInfo: {
    //             order: 'descend',
    //             columnKey: 'addDate',
    //         },
    //     });
    // }
    // 点击查询
    //点击查询
    // 查询
    searchBtn() {
        let params = {
            title: this.state.inputTitle,
            create_name: this.state.inputCreator
        };
        console.log(params);
        this.setState({
            load: true,
            total: this.state.total
        },() => {
            this.getTableData(params)
        })
    }
    //查询参数
    inputTitleChange(event) {
        console.log(event.target.value)
        this.setState({
            inputTitle:event.target.value,
        })
    }
    inputCreatorChange(event) {
        console.log(event.target.value)
        this.setState({
            inputCreator:event.target.value,
        })
    }
    // 获取当前页数
    onChange(page) {
        this.setState({
            current: page,
            load: true
        },() => {
            this.getTableData()
        })
    }
    // onShowSizeChange(current, size) {
    //     this.setState({
    //         pageSize: size,
    //         current: current,
    //         load: true
    //     }, () => {
    //         this.getTableData();
    //     });
    // }
    // 获取表格数据
    getTableData(params) {
        // let result =getFun('system/informs/list',params);
        // result.then(res => {
        //     console.log(res)
        //     this.setState({
        //         load: false,
        //         tableData: res.data.data
        //
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        this.setState({
            load: false,
            tableData: [{
                id: '1',
                title: '摘要标题',
                describe: '通告内容通告内容通告内容通告内容...',
                detail: '111',
                create_id: 3,
                create_name: 'vida',
                status: 1,
                created_at: '2016-09-21  08:50:08'
            }, {
                id: '2',
                title: '摘要标题2',
                describe: '通告内容通告内容通告内容通告内容...',
                detail: '2222',
                create_id: 2,
                create_name: '哆啦B梦',
                status: 0,
                created_at: '2016-09-22  08:50:08'
            }]
        })
    }
    // 获取接口参数
    getParams() {
        // let start, end;
        // start = this.pageStartDate().format("YYYY-MM-DD");
        // end = this.pageEndDate().format("YYYY-MM-DD");
        // const params = {
        //     start_at: start,
        //     end_at: end,
        //     city: this.state.city,
        //     car_type_id: this.state.car_type_id
        // }
        // return params;
    }
    //停用
    switchFun(txt,idx) {
        const {tableData} = this.state;
        const _this = this;
        // console.log(idx,txt)
        let params = {
            id: txt.id,
            // create_id: txt.create_id
        };

        confirm({
            title:'你确定要停用此公告吗？',
            content:'确认停用后该公告将不再显示。',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                // console.log(_this)
                // console.log(tableData)
                // console.log(idx,txt);
                let tableData2 = tableData;
                tableData2.map(item=>{
                    if(item.id ==txt.id){
                        item.status =!item.status;
                    }
                })
                _this.setState({
                    tableData:tableData2
                })
                // let result =getFun('system/informs/stop',params);
                // result.then(res => {
                //     if(res.data[0]){
                //         let tableData2 = tableData;
                //             tableData2.map(item=>{
                //                 if(item.id ==txt.id){
                //                     item.status =!item.status;
                //                 }
                //             })
                //             _this.setState({
                //                 tableData:tableData2
                //             })
                //     }
                // }).catch(err => {
                //     console.log(err)
                // })

            },
            onCancel(){

            }
        })
    }
    //添加公告
    addNotice(params) {
        let url = '';
        if (this.state.btnFlag == 1){
            url = 'system／informs/edit';
        }else{
            url = 'system／informs/add';
        }
        let result =getFun(url,params);
        result.then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    //点击添加
    addBtn = () => {
        this.setState({ visible: true, popTitle: '添加公告', btnFlag:0});
    }
    //取消提交和提交
    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values)
            let parameter = {
                title: values.title,
                desc: values.desc,
                detail: values.detail,
                // create_id: this.state.noticeCreatorId,
                // create_name: this.state.noticeCreator
            };
            //添加/编辑
            this.addNotice(parameter);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
    //编辑公告
    noticeEdit(text,index) {
        console.log(text)
        this.setState({ visible: true, popTitle: '编辑公告', popValues: text, btnFlag:1});
    }
    //公告详情
    noticeDetail(text,index) {
        // console.log(text)
        this.setState({ visibleDetail: true, titleDetail: text.title, describeDetail: text.describe, detailDetail: text.detail });

    }
    handleOk = () => {
        this.setState({ visibleDetail: false });
    }
    render() {
        let {title, load, total, pageSize,visible, confirmLoading} = this.state;
        let tableHeader = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            }, {
                title: '概要',
                dataIndex: 'describe',
                key: 'describe'
            }, {
                title: '创建人',
                dataIndex: 'create_name',
                key: 'create_name',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record, index) => <span><Badge status={record.status? "success":"error"} />{record.status?"显示":"停用"}</span>
            }, {
                title: '添加时间',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: (a, b) => a.created_at - b.created_at,
                // sortOrder: this.sortedInfo.columnKey === 'addDate' && this.sortedInfo.order,
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => (
                    <span>
                        <a href="javascript:;" className={record.status?"stop":"stopped"} onClick={() => this.switchFun(text,index)}>{text.status?"停用":"已停用"}</a>
                        <span className="ant-divider" />
                        <a onClick={() => this.noticeDetail(text,index)} href="javascript:;" >详情</a>
                        <span className={record.status && record.create_id == this.state.userId ? "ant-divider" : ""}/>
                        <a onClick={() => this.noticeEdit(text,index)} href="javascript:;">{record.status && record.create_id == this.state.userId ? "编辑" : ""}</a>
                </span>
                ),
            }]
        let tableData = this.state.tableData;
        return (
            <div>
                <div className="notice-wrapper">
                    <Card title={title}  bordered={false}>

                        <Row gutter={16}>
                            <Col span={16}>
                                <div className="input-wrapper">
                                    <label>查询内容：</label>
                                    <Input type="text" placeholder="" defaultValue={this.state.inputTitle} onChange={this.inputTitleChange}/>
                                </div>
                                <div className="input-wrapper">
                                    <label>创建人：</label>
                                    <Input type="text" placeholder="" defaultValue={this.state.inputCreator} onChange={this.inputCreatorChange}/>
                                </div>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" icon='search' style={{marginRight: '20px'}} onClick={this.searchBtn.bind(this)}>查询</Button>
                                <Button type="primary" icon='plus' onClick={this.addBtn.bind(this)}>添加</Button>
                            </Col>
                        </Row>
                        <div>
                            <Table onChange={this.handleSortChange} dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false}>

                            </Table>
                        </div>
                        <div className="page-footer">
                            <Row>
                                <Col style={{textAlign: 'right'}}>
                                    <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={this.onChange.bind(this)} size="small"/>
                                    {/*<Pagination total={total} pageSize={pageSize} onChange={this.pageChange.bind(this)} showSizeChanger={true} onShowSizeChange={this.onShowSizeChange.bind(this)} showQuickJumper size="small" ></Pagination>*/}
                                </Col>
                            </Row>
                        </div>
                        <AddEditForm
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSubmit={this.handleSubmit}
                            noticeCreator={this.state.noticeCreator}
                            popTitle={this.state.popTitle}
                            popValues={this.state.popValues}
                            btnFlag={this.state.btnFlag}
                        />
                        <Modal
                            className="details-modal"
                            title="公告详情"
                            visible={this.state.visibleDetail}
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleOk.bind(this)}
                            bodyStyle={{height: 200}}
                            okText="关闭"
                        >
                            <div className="notice-wrapper">
                                <p><span className="detail-title">标题：</span><span className="detail-title-txt">{this.state.titleDetail}</span></p >
                                <p><span className="detail-title">通告概要：</span><span className="detail-title-txt">{this.state.describeDetail}</span></p >
                                <p><span className="detail-title">通告内容：</span><span className="detail-title-txt">{this.state.detailDetail}</span></p >
                            </div>
                        </Modal>
                    </Card>
                </div>
            </div>
        )
    }
}