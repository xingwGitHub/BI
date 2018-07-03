
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
import Ranking from '../page/ranking/ranking';




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

                <Route exact path="/app/ranking/rank_order/complete_count" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/complete_amount" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/average_amount" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/average_time" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/average_distance" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/complete_rate" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/create_total" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/dispatch_success_rate" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/billing_difference" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/service_cost" component={Ranking} />
                <Route exact path="/app/ranking/rank_order/no_car_can_dispatch" component={Ranking} />
                {/*<Route exact path="/app/ranking/rank_order/order_10" component={Ranking} />*/}
                {/*<Route exact path="/app/ranking/rank_order/order_11" component={Ranking} />*/}

                <Route exact path="/app/ranking/rank_driver/active_total" component={Ranking}/>
                <Route exact path="/app/ranking/rank_driver/average_orders" component={Ranking}/>
                <Route exact path="/app/ranking/rank_driver/registered_total" component={Ranking}/>
                <Route exact path="/app/ranking/rank_driver/activation_total" component={Ranking}/>
                <Route exact path="/app/ranking/rank_driver/negative_rate" component={Ranking}/>
                {/*<Route exact path="/app/ranking/rank_driver/lose_rate" component={Ranking}/>*/}

                <Route exact path="/app/ranking/rank_user/active_total" component={Ranking} />
                <Route exact path="/app/ranking/rank_user/average_total" component={Ranking} />
                <Route exact path="/app/ranking/rank_user/registered_total" component={Ranking} />
                <Route exact path="/app/ranking/rank_user/activation_total" component={Ranking} />
                <Route exact path="/app/ranking/rank_user/recharge_amount" component={Ranking} />
                {/*<Route exact path="/app/ranking/rank_user/lose_rate" component={Ranking} />*/}
                <Route exact path="/app/ranking/rank_user/place_order_user_total" component={Ranking} />
                {/*<Route exact path="/app/auth/basic" component={AuthBasic} />*/}
                {/*<Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />*/}


                {/*<Route render={() => <Redirect to="/404" />} />*/}
            </Switch>
        )
    }
}