export const menus = [
    { key: '/app/realtime', title: '实时数据概况', icon: 'clock-circle-o',
        sub: [
          {key: '/app/realtime/survey', title: '概况', icon: ''},
          {key: '/app/realtime/order', title: '订单', icon: ''}
        ]
    },
    {
        key: '/app/operatingdaily', title: '运营日报', icon: 'schedule',
        sub: [
            { key: '/app/operatingdaily/incomeCost', title: '订单收入及成本', icon: '', },
            { key: '/app/operatingdaily/distribution', title: '订单分布', icon: '', },
            { key: '/app/operatingdaily/portrait', title: '订单画像', icon: '', },
            { key: '/app/operatingdaily/bargainingAnalysis', title: '议价分析', icon: '', },
            { key: '/app/operatingdaily/capacityAnalysis', title: '运力分析', icon: '', },
            { key: '/app/operatingdaily/userStatistics', title: '用户统计', icon: '', },
            { key: '/app/operatingdaily/piesAnalysis', title: '派单分析', icon: '', },
            { key: '/app/operatingdaily/serviceQualityOfDrivers', title: '司机服务质量', icon: '', }
        ],
    },
    {
        key: '/app/ranklist', title: '排行榜', icon: 'flag',
        sub: [
            {key: '/app/ranklis/order', title: '订单', icon: '',
                children: [
                    {key: '/app/ranklist/order/11', title: '完成订单数', icon: '',},
                    {key: '/app/ranklist/order/12', title: '完成订单金额', icon: '',},
                    {key: '/app/ranklist/order/13', title: '订单平均金额', icon: '',},
                    {key: '/app/ranklist/order/14', title: '订单平均时长', icon: '',},
                    {key: '/app/ranklist/order/15', title: '平均行驶距离', icon: '',},
                    {key: '/app/ranklist/order/16', title: 'C to R订单完成率', icon: '',},
                    {key: '/app/ranklist/order/17', title: '创建订单', icon: '',},
                    {key: '/app/ranklist/order/18', title: '派单成功率', icon: '',},
                    {key: '/app/ranklist/order/19', title: '计费差额', icon: '',},
                    {key: '/app/ranklist/order/110', title: '服务成本', icon: '',},
                    {key: '/app/ranklist/order/111', title: '无车可派', icon: '',}
                ]
            },
            {key: '/app/ranklist／driver', title: '司机', icon: ''},
            {key: '/app/ranklist／user', title: '用户', icon: ''}
        ]
    }
];