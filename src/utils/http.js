import axios from 'axios'
import qs from 'qs'
import {message} from 'antd';
import 'promise'
import * as Auth from "./Auth";

axios.defaults.baseURL = 'https://bi_api.yongche.com/';

const BI_API_BASE_URL = 'https://bi_api.yongche.com/web_api';

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            message.error(err);
        })
    })
}
export function getRankFun(params) {
    let path = window.location.hash.split('/').slice(3).join('/').trim();
    return new Promise((resolve, reject) => {
        axios.get(BI_API_BASE_URL + '/' +path, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            message.error(err);
        })
    })
}

export function getCityFun() {
    let path = window.location.hash.split('/').slice(3).join('/').trim();
    return new Promise((resolve, reject) => {
        axios.get(BI_API_BASE_URL + '/dim_info/city' +path, {
            //params: params
        }).then(res => {
            // resolve(res.data)
            res.data['allcity'] = '全国';
            resolve(res.data);
        }).catch(err => {
            message.error(err);
        })
    })
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
        ).then(res => {
            resolve(res.data)
        }).catch(err => {
            message.error(err);
        })
    })
}