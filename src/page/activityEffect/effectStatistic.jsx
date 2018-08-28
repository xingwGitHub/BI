import React from 'react'
import {Button} from 'antd'
import './activityEffect.less'
export  default class effectStatistic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showFlag: true
        }
    }
    // 活动效果统计->活动效果详情页
    gotoDetails(){
        this.setState({
            showFlag: !this.state.showFlag
        })

    }
    // 活动效果统计详情页->活动效果统计
    goBackDetails(){
        this.setState({
            showFlag: !this.state.showFlag
        })
    }
    render(){
        const { showFlag } = this.state;
        return (
            <div>
                <div className={showFlag?"effect-wrapper": "effect-wrapper active"}>
                    <p>活动效果统计</p>
                    <Button onClick={this.gotoDetails.bind(this)}>click</Button>
                </div>
                <div className={showFlag?"effect-details-wrapper": "effect-details-wrapper active"}>
                    <p>活动效果统计详情</p>
                    <Button onClick={this.goBackDetails.bind(this)}>click</Button>
                </div>
            </div>
        )
    }
}