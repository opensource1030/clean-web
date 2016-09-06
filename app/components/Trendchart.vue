
<template>
  <div class="large-6 columns">
    <div class="grid-box" data-mh="box2">
      <header class="box-heading">
        <h2>Trend by Category- Custom</h2>
      </header>
      <div class="box-content">
        <div id="trend-category">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*import auth from './../api/auth'*/

export default {
    name: "Trendchart",
  ready(){
    $('#trend-category').highcharts({
      chart: {
        height: 300,
        width: 500
      },
      title: false,
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        gridLineWidth: 1
      },
      credits: {enabled: false},
      yAxis: {
        labels: {
          format: '${value}',
        },
        title: false,
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }],
        gridLineWidth: 1
      },
      tooltip: {
        valuePrefix: '$'
      },
      colors: [
        '#F7C37E', '#FF7E81', '#A87BEA', '#A8DEFF', '#ABF1A3', '#66D6A0'],
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        width: 150,
        verticalAlign: 'middle',
        useHTML: true,
        labelFormatter: function () {
          return '<div style="text-align: left; width:80px;display: inline-block">' + this.name + '</div> <div class="clearfix" style="margin-bottom: 10px;"></div>';
        }
      },
      series: [{
        name: 'Voice',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'Data',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      }, {
        name: 'Messaging',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      }, {
        name: 'Taxes',
        data: [3.9, 4.0, 5.2, 7.4, 9.9, 12.2, 15.0, 18.6, 14.2, 10.3, 6.6, 4.8]
      }, {
        name: 'Equipment',
        data: [4.9, 5.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }, {
        name: 'Other',
        data: [6.9, 6.2, 7.7, 3.5, 17.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
      ]

    })
  }
}
</script>
