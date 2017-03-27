import Vue from 'vue';

var {
  Store,
} = require('yayson')();
var store = new Store();

export default {
  /*-------------------------------update device-----------------*/
  lineChart: [],
  chart: [],

  getCharts(context) {
    context.$http.get(process.env.URL_API+'/users/' + localStorage.userId +'?include=companies,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:3]', {
    }).then((response) => {
      var event = store.sync(response.data);

      // this.lineChart = [];
      // for (let allocation of event.allocations ) {
      //   this.lineChart.push([allocation.usage_charge, allocation.other_charge, allocation.service_plan_charge]);
      // }

      var result = _.chain(event.allocations).groupBy('bill_month').map((o, key) => {
        return {
          'usage_charge': Math.round(_.sumBy(o, 'usage_charge') * 100) / 100,
          'service_plan_charge': Math.round(_.sumBy(o, 'service_plan_charge') * 100) / 100,
          'other_charge': Math.round(_.sumBy(o, 'other_charge') * 100) / 100,
          'bill_month': key
        };
      }).orderBy('bill_month').value();

      // console.log(this.lineChart);
      // context.data = this.lineChart;

      context.data = [
        _.map(result, 'usage_charge'),
        _.map(result, 'service_plan_charge'),
        _.map(result, 'other_charge'),
      ];
    }, (response) => {
    });
  }
};
