import * as api from '../../utils/api'

export const getAllCities = () => {
  return new Promise((resolve, reject) => {
    api.getDatamartDim({
      name: 'city',
    }).then(cities => {
      console.log(cities)
      cities['allcity'] = '全国';
      resolve(cities);
    });
  });
};