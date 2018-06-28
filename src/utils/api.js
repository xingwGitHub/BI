

import {message} from 'antd';
import * as Auth from './Auth';
import fetchJsonp from 'fetch-jsonp';

import {get, post} from './http'

const API_DATAMART_BASE_URL = 'https://datamart1.yongche.com/bi_web_api';
const API_BI_BASE_URL = 'https://api_bi.yongche.com';
const API_GRAB_BASE_URL = 'https://grab.yongche.com/api';


const REQUEST_METHOD_GET = 'GET';
const REQUEST_METHOD_POST = 'POST';

function objectToQueryString(queryObject) {
  let queryArray = [];
  for (let queryKey in queryObject) {
    if (queryObject.hasOwnProperty(queryKey)) {
      queryArray.push(`${queryKey}=${queryObject[queryKey]}`);
    }
  }
  return queryArray.join('&');
}

function request(url, method, params) {
  let fetchData = {
    method: method,
    mode: 'cors',
    xhrFields: {withCredentials: true},
    credentials: 'include',
  };

  if (method === REQUEST_METHOD_GET) {
    url = url + '?' + objectToQueryString(params)
  }

  if (method === REQUEST_METHOD_POST) {
    fetchData.body = params;
  }

  return new Promise((resolve, reject) => {
    fetch(url, fetchData).then(response => {
      if (response.ok) {
        response.json().then(data => {
          resolve(data);
        });
      } else {
        message.error('请求失败');
        reject(-2);
      }
    }).catch((err) => {
      message.error('请求错误: ' + err);
      reject(-1);
    });
  });
}


export const getDatamartDim = (params) => {
  return new Promise((resolve, reject) => {
    request(API_DATAMART_BASE_URL + '/dim_Info', REQUEST_METHOD_GET, params).then((data) => {
      if (data.status) {
        resolve(data.results);
      } else {
        if (data.msg === '用户未登陆') {
          Auth.redirectLogin();
        } else {
          message.error(data.msg);
          reject(-3);
        }
      }
    }).catch(errCode => {
      reject(errCode);
    });
  });
};

export const getBiData = (url, params) => {
  return new Promise((resolve, reject) => {
    request(API_BI_BASE_URL + url, REQUEST_METHOD_GET, params).then((data) => {
      switch (data.code) {
        case 200:
          resolve(data.data);
          break;
        case 400:
          message.error('参数错误');
          reject(400);
          break;
        case 401:
          Auth.redirectLogin();
          break;
        case 402:
          message.error('BI访问权限已过期');
          reject(402);
          break;
        case 403:
          message.error('无权访问该页面');
          reject(403);
          break;
        default:
          message.error(data.code);
          reject(data.code);
          break;
      }
    }).catch(errCode => {
      reject(errCode);
    });
  });
};

export const removeCookieByGrab = () => {
  fetchJsonp(API_GRAB_BASE_URL + '/auth/remove_cookie');
};

export const setCookieByJsonp = () => {
  fetchJsonp(API_GRAB_BASE_URL + '/auth/set_cookie');
};

export function getFun(url, params) {
    const result = get(url, params);
    return result;
}