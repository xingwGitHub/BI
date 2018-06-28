/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

// 实时数据概况
import Order from '../page/realTimeData/order';
import Survey from '../page/realTimeData/survey';
// 运营日报
import IncomeAndCost from '../page/operatingDaily/orderIncomeCost';
import BargainingAnalysis from '../page/operatingDaily/bargainingAnalysis';
import CapacityAnalysis from '../page/operatingDaily/capacityAnalysis';
import Distribution from '../page/operatingDaily/orderDistribution';
import Portrait from '../page/operatingDaily/orderPortrait';
import PiesAnalysis from '../page/operatingDaily/piesAnalysis';
import ServiceQualityOfDrivers from '../page/operatingDaily/serviceQualityOfDrivers';
import UserStatistics from '../page/operatingDaily/userStatistics';
// 排行榜
import RankList from '../page/rankList/rankList';




export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        // if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>

                <Route exact path="/app/realtime/survey" component={Survey} />
                <Route exact path="/app/realtime/order" component={Order} />

                <Route exact path="/app/operatingdaily/incomeCost" component={IncomeAndCost} />
                <Route exact path="/app/operatingdaily/distribution" component={Distribution} />
                <Route exact path="/app/operatingdaily/portrait" component={Portrait} />
                <Route exact path="/app/operatingdaily/bargainingAnalysis" component={BargainingAnalysis} />
                <Route exact path="/app/operatingdaily/capacityAnalysis" component={CapacityAnalysis} />
                <Route exact path="/app/operatingdaily/userStatistics" component={UserStatistics} />
                <Route exact path="/app/operatingdaily/piesAnalysis" component={PiesAnalysis} />
                <Route exact path="/app/operatingdaily/serviceQualityOfDrivers" component={ServiceQualityOfDrivers} />

                <Route exact path="/app/ranklist/order/order_0" component={RankList} />
                <Route exact path="/app/ranklist/order/order_1" component={RankList} />
                <Route exact path="/app/ranklist/order/order_2" component={RankList} />
                <Route exact path="/app/ranklist/order/order_3" component={RankList} />
                <Route exact path="/app/ranklist/order/order_4" component={RankList} />
                <Route exact path="/app/ranklist/order/order_5" component={RankList} />
                <Route exact path="/app/ranklist/order/order_6" component={RankList} />
                <Route exact path="/app/ranklist/order/order_7" component={RankList} />
                <Route exact path="/app/ranklist/order/order_8" component={RankList} />
                <Route exact path="/app/ranklist/order/order_9" component={RankList} />
                <Route exact path="/app/ranklist/order/order_10" component={RankList} />
                <Route exact path="/app/ranklist/order/order_11" component={RankList} />

                <Route exact path="/app/ranklist/driver/driver_0" component={RankList} />
                <Route exact path="/app/ranklist/driver/driver_1" component={RankList} />
                <Route exact path="/app/ranklist/driver/driver_2" component={RankList} />
                <Route exact path="/app/ranklist/driver/driver_3" component={RankList} />
                <Route exact path="/app/ranklist/driver/driver_4" component={RankList} />

                <Route exact path="/app/ranklist/user/user_0" component={RankList} />
                <Route exact path="/app/ranklist/user/user_1" component={RankList} />
                <Route exact path="/app/ranklist/user/user_2" component={RankList} />
                <Route exact path="/app/ranklist/user/user_3" component={RankList} />
                <Route exact path="/app/ranklist/user/user_4" component={RankList} />
                <Route exact path="/app/ranklist/user/user_5" component={RankList} />
                {/*<Route exact path="/app/auth/basic" component={AuthBasic} />*/}
                {/*<Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />*/}


                {/*<Route render={() => <Redirect to="/404" />} />*/}
            </Switch>
        )
    }
}