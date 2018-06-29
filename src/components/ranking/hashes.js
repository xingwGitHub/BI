const hashes = {
  order_finish_count: {
    name: '完成订单数',
    hash: 'a2427a575dbc6848dac57748b71531a75e69a07c',
  },
  order_finish_amount: {
    name: '完成订单金额',
    hash: 'da346d8df5650288968b48b4d197511701f27453',
  },
  order_average_price: {
    name: '订单平均金额',
    hash: '93973b5f162bce1461d07fb46fc9ce4227a80a59',
    digit: 2,
  },
  order_average_time: {
    name: '订单平均时长',
    hash: 'a870cfc9c9ed64cfb9a9f947c17eae707e391039',
    digit: 1,
  },
  order_average_distance: {
    name: '平均行驶距离',
    hash: '084ec2931eba239613b371ac39e008eca677b0f0',
    digit: 2,
  },
  order_finish_rate: {
    name: '订单完成率',
    hash: '71c1fdd0dbe749ef412fed3eb77bb30736894587',
    digit: 2,
  },
  order_create_count: {
    name: '创建订单',
    hash: '140e662058acd6d2e32904814c5e26c7e422cce8',
  },
  order_dispatch_success_rate: {
    name: '派单成功率',
    hash: '301334f59375558c39e1d304547e5d3e89f25091',
    digit: 2,
  },
  jifei_chae: {
    name: '计费差额',
    hash: '2cf7a86aed8d3320be6a6ecdf7292699b4e412ae',
  },
  service_cost: {
    name: '服务成本',
    hash: '31aeac86ee39627afdc3ef3edd2d9dc148b5650d',
  },
  dispatch_no_car_count: {
    name: '无车可派',
    hash: 'de87a64fc7d59e012a9656993c04f38d9e0019e5',
  },
  active_driver_count: {
    name: '活跃司机',
    hash: '33439cfee24565a2d49e4829c58725ce4f77b22f',
  },
  driver_average_order_count: {
    name: '司机均单量',
    hash: '842e9033b6f281165d6fc32d9cdcf031ea86f374',
  },
  driver_new_register_count: {
    name: '新注册司机',
    hash: '7b232638a38e779f713e357559ce40da0ec2bdd4',
  },
  driver_new_activate_count: {
    name: '新增激活司机',
    hash: 'f8ea5c22195ad4153d5bdb0a5d7eb58586ebc30d',
  },
  driver_bad_comment_rate: {
    name: '差评率',
    hash: 'b1706140caf2a02e2439b7a09e74115f7cf44a7a',
    digit: 2,
  },
  driver_lose_rate: {
    name: '司机流失率',
    hash: '',
    digit: 2,
  },
  active_user_count: {
    name: '活跃用户',
    hash: '9728ea9d96d300cd75f3171442447d6524716e01',
  },
  user_average_order_count: {
    name: '乘客单均量',
    hash: '8910677e6d12223907263d5eeaf40c3fb3ee6522',
    digit: 2,
  },
  user_new_register_count: {
    name: '新注册用户',
    hash: 'a9a086fbc6960756d514ad36061dc35dc0beee1b',
  },
  user_new_activate_count: {
    name: '新激活用户',
    hash: 'a1433727534ba353611b21c0a336cd5abcd36755',
  },
  user_recharge_amount: {
    name: '充值金额',
    hash: 'd846edceca54007f85a75aee34e952185bd7fa31',
  },
  user_lose_rate: {
    name: '用户流失率',
    hash: '',
    digit: 2,
  },
  user_has_order_count: {
    name: '下单用户数',
    hash: 'c689015868c537e8059ce21d1f5a07447cb0718c',
  }
};

export const getHashString = (hashKeys) => {
  let hashArray = [];
  for (let hashKey of hashKeys) {
    if (hashes.hasOwnProperty(hashKey)) {
      let hashInfo = hashes[hashKey];
      hashArray.push(hashInfo['hash']);
    }
  }
  return hashArray.join();
};

export const getHashDigit = (hashKey) => {
  let hashInfo = hashes[hashKey];
  if(hashInfo.hasOwnProperty('digit')) {
    return hashInfo.digit;
  }
  return 0;
};