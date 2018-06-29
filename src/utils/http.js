import axios from 'axios'
import qs from 'qs'
import {message} from 'antd';
import 'promise'

axios.defaults.baseURL = 'https://bi_api.yongche.com/';

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