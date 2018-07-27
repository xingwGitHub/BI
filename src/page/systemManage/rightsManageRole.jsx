import React, {Component} from 'react';
import {Card, Table, Row, Col, Input, Button, Pagination, Modal, Select, Divider, Tree} from 'antd';
import './systemNotice.less';
const confirm = Modal.confirm;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class RightsManageRole extends Component{
    constructor(props){
        super(props);
        this.state = {
            total: 10,
            title: '角色组',
            roleName: '',
            funcModule: '0',
            funcModuleData: [
                {value: '00', key: '0'},
                {value: '11', key: '1'},
                {value: '22', key: '2'}
            ],
            load: false,
            tableData: [
                {id: 0, aa: 2, bb: 0, time: '2016-09-21 08:00:00',key: '0'},
                {id: 1, aa: 3, bb: 33, time: '2016-09-21 08:00:00',key: '1'},
                {id: 2, aa: 4, bb: 44, time: '2016-09-21 08:00:00',key: '2'},
                {id: 3, aa: 5, bb: 55, time: '2016-09-21 08:00:00',key: '3'},
            ],
            tableHeader: [
                {title: '功能数', dataIndex: 'aa', key: 'aa',
                    sorter: (a, b) => a.aa - b.aa,
                },
                {title: '关联用户数', dataIndex: 'bb', key: 'bb',
                    sorter: (a, b) => a.bb - b.bb,
                },
                {title: '添加时间', dataIndex: 'time', key: 'time',
                    sorter: (a, b) => a.time - b.time,
                },
                {title: '操作', key: 'action',
                    render: (text, record) => (
                        <span>
                          <a href="javascript:;" onClick={this.editClick.bind(this,text, record)}>编辑</a>
                          <Divider type="vertical" />
                          <a href="javascript:;" onClick={this.deleteClick.bind(this, text, record)}>删除</a>
                          <Divider type="vertical" />
                          <a href="javascript:;" onClick={this.detailsClick.bind(this, text, record)}>详情</a>
                        </span>
                    )
                }
            ],
            addVisible: false,
            detailsVisible: false,
            addTitle: '添加角色组',
            treeData: [{
                title: '0-0',
                key: '0-0',
                children: [{
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                        { title: '0-0-0-0', key: '0-0-0-0' },
                        { title: '0-0-0-1', key: '0-0-0-1' },
                        { title: '0-0-0-2', key: '0-0-0-2' },
                    ],
                }, {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                        { title: '0-0-1-0', key: '0-0-1-0' },
                        { title: '0-0-1-1', key: '0-0-1-1' },
                        { title: '0-0-1-2', key: '0-0-1-2' },
                    ],
                }, {
                    title: '0-0-2',
                    key: '0-0-2',
                }],
            }, {
                title: '0-1',
                key: '0-1',
                children: [
                    { title: '0-1-0-0', key: '0-1-0-0' },
                    { title: '0-1-0-1', key: '0-1-0-1' },
                    { title: '0-1-0-2', key: '0-1-0-2' },
                ],
            }, {
                title: '0-2',
                key: '0-2',
            }],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            searchValue: '',
            dataList: []
        }
    }
    componentWillMount(){
        this.generateList(this.state.treeData)
    }
    componentDidMount(){}
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
    // 列表-添加
    addBtn(){
        this.setState({
            addVisible: true
        })
    }
    // 列表-编辑
    editClick(text, record){
        console.log(text, record)
    }
    // 列表-删除
    deleteClick(text, record){
        let num = text.bb;
        if(num){
            Modal.error({
                title: '你不能删除此角色组！',
                content: '该角色组仍存在有效用户关联。',
                okText:"确认"
            });
        }else {
            confirm({
                title: '你确定要删除此角色组吗？',
                content: '确认删除后该权限组将不能恢复。',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                },
                onCancel() {
                }
            })
        }
    }
    // 列表-详情
    detailsClick(text, record){

    }
    // 列表-添加-弹出框确认按钮
    hideModalOk(){
        this.setState({
            addVisible: false
        })
    }
    // 列表-添加-弹出框取消按钮
    hideModalCancel(){
        this.setState({
            addVisible: false
        })
    }
    searchTreeChange(e){
        let treeData = this.state.treeData;
        let dataList = this.state.dataList;
        let value = e.target.value;
        let expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return this.getParentKey(item.key, treeData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys: expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }
    generateList(data){
        let dataList = this.state.dataList;
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const key = node.key;
            dataList.push({ key, title: key });
            if (node.children) {
                this.generateList(node.children, node.key);
            }
        }
        this.setState({
            dataList: dataList
        })
    };
    getParentKey(key, tree){
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.children)) {
                    parentKey = this.getParentKey(key, node.children);
                }
            }
        }

        return parentKey;
    };
    onCheck(checkedKeys){
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }
    onSelect(selectedKeys, info){
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }
    onExpand(expandedKeys){
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    render(){
        const {title, roleName, funcModule, funcModuleData, tableData, load, tableHeader, total, addVisible,addTitle,  expandedKeys, autoExpandParent, checkedKeys, selectedKeys, treeData, searchValue} = this.state;
        let optionData = funcModuleData.map(item => <Option key={item.key} >{item.value}</Option>)
        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
          {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
        </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} />;
        });

        return(
            <div>
                <div className="notice-wrapper">
                    <Card title={title}  bordered={false}>

                        <div className="search-content">
                            <div className="search-wrapper">
                                <div className="input-wrapper">
                                    <label>角色组名称：</label>
                                    <Input type="text" placeholder="" defaultValue={roleName} onChange={this.roleNameChange}/>
                                </div>
                                <div className="input-wrapper">
                                    <label>功能模块：</label>
                                    <Select defalutValue='00' value={funcModule} onChange={this.funcModuleChange}>
                                        {optionData}
                                    </Select>
                                </div>
                            </div>
                            <div className="search-btn-wrapper">
                                <Button type="primary" icon='search' style={{marginRight: '20px'}} onClick={this.searchBtn.bind(this)}>查询</Button>
                                <Button type="primary" icon='plus' onClick={this.addBtn.bind(this)}>添加</Button>
                            </div>
                        </div>
                        <div>
                            <Table  dataSource={tableData} bordered loading={load} columns={tableHeader} pagination={false}>

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
                    title={addTitle}
                    visible={addVisible}
                    onOk={this.hideModalOk.bind(this)}
                    onCancel={this.hideModalCancel.bind(this)}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <Search style={{ marginBottom: 8 }} placeholder="请输入" onChange={this.searchTreeChange.bind(this)} />
                        <Tree
                            checkable
                            defaultExpandAll={true}
                            onCheck={this.onCheck.bind(this)}
                            checkedKeys={checkedKeys}
                            onSelect={this.onSelect.bind(this)}
                            selectedKeys={selectedKeys}
                            onExpand={this.onExpand.bind(this)}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                        >
                            {loop(treeData)}
                        </Tree>
                    </div>
                </Modal>
            </div>
        )
    }
}