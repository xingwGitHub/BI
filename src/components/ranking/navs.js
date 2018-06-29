import * as hash from './hashes';

const ranking = {
  name: '排行榜',
  children: {
    order: {
      name: '订单',
      children: {
        order_0: {
          name: '完成订单数',
          hash: ['order_finish_count'],
        },
        order_1: {
          name: '完成订单金额(元)',
          hash: ['order_finish_amount'],
        },
        order_2: {
          name: '订单平均金额(元)',
          hash: ['order_average_price'],
        },
        order_3: {
          name: '订单平均时长(分钟)',
          hash: ['order_average_time'],
        },
        order_4: {
          name: '平均行驶距离(km)',
          hash: ['order_average_distance'],
        },
        order_5: {
          name: '订单完成率(%)',
          hash: ['order_finish_rate'],
        },
        order_6: {
          name: '创建订单',
          hash: ['order_create_count'],
        },
        order_7: {
          name: '派单成功率(%)',
          hash: ['order_dispatch_success_rate'],
        },
        order_8: {
          name: '计费差额(元)',
          hash: ['jifei_chae'],
        },
        order_9: {
          name: '服务成本(元)',
          hash: ['service_cost']
        },
        order_10: {
          name: '无车可派',
          hash: ['dispatch_no_car_count']
        },
      }
    },
    driver: {
      name: '司机',
      children: {
        driver_0: {
          name: '活跃司机',
          hash: ['active_driver_count']
        },
        driver_1: {
          name: '司机均单量',
          hash: ['driver_average_order_count']
        },
        driver_2: {
          name: '新注册司机',
          hash: ['driver_new_register_count'],
          showCarType: false,
        },
        driver_3: {
          name: '新增激活司机',
          hash: ['driver_new_activate_count'],
          showCarType: false,
        },
        driver_4: {
          name: '差评率',
          hash: ['driver_bad_comment_rate']
        },
        driver_5: {
          name: '司机流失率',
          hash: ['driver_lose_rate']
        },
      }
    },
    user: {
      name: '用户',
      children: {
        user_0: {
          name: '活跃用户',
          hash: ['active_user_count'],
          showCarType: false,
        },
        user_1: {
          name: '乘客单均量',
          hash: ['user_average_order_count'],
          showCarType: false,
        },
        user_2: {
          name: '新注册用户',
          hash: ['user_new_register_count'],
          showCarType: false,
        },
        user_3: {
          name: '新激活用户',
          hash: ['user_new_activate_count'],
          showCarType: false,
        },
        user_4: {
          name: '充值金额',
          hash: ['user_recharge_amount'],
          showCarType: false,
        },
        user_5: {
          name: '用户流失率',
          hash: ['user_lose_rate'],
          showCarType: false,
        },
        user_6: {
          name: '下单用户数',
          hash: ['user_has_order_count'],
          showCarType: false,
        },
      }
    }
  }
};

const navs = {
  app: ranking,
};

function getPageInfo(urlPath) {
  const pathArray = urlPath.split('/').slice(1);
  const pathDepth = pathArray.length;
  console.log(pathArray,pathDepth) //["app", "ranking", "order", "order_0"], 4
  let pathPart = navs[pathArray[0]]; // navs.app --> ranking
  for (let i = 1; i < pathDepth-1; i++) {
    console.log(pathArray[i+1])
    pathPart = pathPart.children[pathArray[i+1]];
  }

  return pathPart;
}

export const getPageName = (urlPath) => {
  return getPageInfo(urlPath).name
};

export const getPageHashKey = (urlPath) => {
  return getPageInfo(urlPath).hash
};

export const getPageHashString = (urlPath) => {
  const hashKeys = getPageInfo(urlPath).hash;
  return hash.getHashString(hashKeys)
};

export const checkPageShowCarTypeSelection = (urlPath) => {
  const pageInfo = getPageInfo(urlPath);
  return !(pageInfo.hasOwnProperty('showCarType') && pageInfo.showCarType === false);
};