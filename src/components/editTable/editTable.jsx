import { Table, message, Form, Select, Button } from 'antd';
import React, {Component} from 'react';
import {post} from '../../utils/api'
const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            defaultName,
            defaultCity,
            nameDisabled,
            ...restProps
        } = this.props;
        let cityData = JSON.parse(localStorage.getItem("cityData"));
        let roleGroup = JSON.parse(localStorage.getItem("alllist"));
        let optionCity = [<Option key="all">全国</Option>];
        Object.keys(cityData).map( (item) => {
            optionCity.push(<Option key={item}>{cityData[item]}</Option>)
        } )
        let optionRoleGroup = roleGroup.map(item => <Option key={item.key}>{item.name}</Option>);
        let optionObj ={
            'namestr': {optionData: optionRoleGroup,defalutVal:defaultName,mode: '', disableFlag:nameDisabled},
            'cityId': {optionData: optionCity,defalutVal:defaultCity, mode: 'multiple'}
        };
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: optionObj[dataIndex].defalutVal,
                                    })(
                                        <Select disabled={optionObj[dataIndex].disableFlag} mode={optionObj[dataIndex].mode} placeholder="请选择" >{optionObj[dataIndex].optionData}</Select>
                                    )}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export  default class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editingKey: '',
            count: 1,
            addRole: [],
            cityData: []
        };

        this.columns = [
            {
                title: '角色组',
                dataIndex: 'namestr',
                editable: true,
                render: (text, record) => (
                    <span>{record.namestr?record.namestr: '--'}</span>
                )
            },
            {
                title: '城市',
                dataIndex: 'cityId',
                editable: true,
                render: (text, record) => (
                    <span>{record.cityId?record.cityId: '--'}</span>
                )
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                  <EditableContext.Consumer>
                                    {form => (
                                        <a
                                            href="javascript:;"
                                            onClick={() => this.save(form, record, record.key)}
                                            style={{ marginRight: 8 }}
                                        >
                                            确定
                                        </a>
                                    )}
                                  </EditableContext.Consumer>
                                 <a onClick={() => this.cancel(record.key)}>取消</a>
                                </span>
                            ) : (
                                <span>
                                    <a onClick={() => this.edit(record)} style={{ marginRight: 8 }}>编辑</a>
                                    <a onClick={() => this.del(record)}>删除</a>
                                </span>
                            )}
                        </div>
                    );
                },
            },
        ];
    }
    componentWillMount(){
        let cityData = JSON.parse(localStorage.getItem("cityData"));
         this.setState({
             data: this.props.data,
             addRole: this.props.addData,
             cityData: cityData,
             addRoleEdit: []
         })

    }
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    del(record){
        let params = {
            user_id: this.state.data[0].id,
            role_id: record.role_id
        }
        let result = post('/system/auth/user/delrole',params);
        result.then(res => {
            if(res.code === 1){
                let obj = this.state.addRole;
                obj.map((item,index) => {
                    if(item.role_id === record.role_id){
                        console.log(index)
                        obj.splice(index,1);
                    }
                })
                this.setState({
                    addRole: obj
                })
            }
        }).catch(err=>{
            message.error(err)
        })

    }
    edit(record) {
        this.setState({ editingKey: record.key });
    }

    save(form, record,key) {
        form.validateFields((error, row) => {
            let cityData = JSON.parse(localStorage.getItem("cityData"));
            let roleGroup = JSON.parse(localStorage.getItem("alllist"));
            let str ={
                cityId: '',name: '',city: []
            }
            if(row.cityId.indexOf('all') > -1){
                str.cityId = '全国';
                str.city = ['all'];
            }else {
                let arr = [];
                row.cityId.map(item => {
                    arr.push(cityData[item]);
                })
                str.cityId = arr.join(',');
                str.city = row.cityId;
            }
            let name = Number(row.namestr);
            if(isNaN(name)){
                roleGroup.map(item => {
                    if(item.name == row.namestr){
                        str.name = item.name;
                        str.namestr = item.name;
                        str.key = item.id;
                        str.role_id = item.id;
                    }
                })
            }else {
                roleGroup.map(item => {
                    if(item.id == row.namestr){
                        str.name = item.name;
                        str.namestr = item.name;
                        str.key = item.id;
                        str.role_id = item.id;
                    }
                })
            }

            if (error) {
                return;
            }
            let params ={
                user_id: this.state.data[0].id,
                role_id: parseInt(str.role_id),
                city: row.cityId
            }
            const newData = this.state.addRole;
            const index = newData.findIndex(function(item){return (item.key === key) && !item.addFlag});
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...str
                });
                 this.setState({ addRole: newData, editingKey: '' });
                let result = post('/system/auth/user/editrole',params);
                result.then(res => {
                    console.log(res)
                })
            } else {
                newData.pop();
                newData.push(str);
                this.setState({ addRole: newData, editingKey: '' });
                let result = post('/system/auth/user/addrole',params);
                result.then(res => {
                    console.log(res)
                })
            }

        });
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    addRoleGroup(){
        const { count, addRole } = this.state;
        const newData = {
            key: count,
            name: '',
            role_id: 999,
            city: [],
            disableFlag: false,
            addFlag: true
        };
        this.setState({
            addRole: [...addRole, newData],
            count: count + 1,
            editingKey: newData.role_id
        });
        this.isEditing(newData)
    }
    render() {
        const {data,addRole, cityData, addRoleEdit} = this.state;
        let tableData =  [];
        if(addRole && addRole.length){
            addRole.map(item => {
                console.log(item)
                let str = item;
                str.key = item.role_id;
                item.key = item.role_id;
                let arr = [];
                item.city.map(item1 => {
                    if(item1 === 'all'){
                        arr.push('全国')
                    }else {
                        arr.push(cityData[item1])
                    }
                })
                str.cityId = arr.join(',')
                str.namestr = item.name;
                if('disableFlag' in item){
                    str.disableFlag = item.disableFlag
                }else {
                    str.disableFlag = true;
                }
                tableData.push(str);
            })
        }else {
            tableData.push({key: 0,role_id: 0,name: '',city: '',disableFlag:false});
        }

        console.log(tableData)
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'city' ? 'city' : 'roleGroup',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                    defaultName: record.namestr?record.namestr: '',
                    defaultCity: record.city?record.city:[],
                    nameDisabled: record.disableFlag
                }),
            };
        });

        return (
            <div className="edit-table-wrapper">
                <Table
                    components={components}
                    bordered
                    dataSource={tableData}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
                />
                <Button className="add-role-btn" type="dashed" icon="plus" onClick={this.addRoleGroup.bind(this)}>新增角色组</Button>
            </div>


        )
    }
}
