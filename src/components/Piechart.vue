
<template>
  <div class="large-6 columns">
    <div class="grid-box" data-mh="box2">
      <header class="box-heading">
        <h2>Spend by Category- Custom</h2>
      </header>
      <div class="box-content">
        <div id="spend-category">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*import auth from './../api/auth'*/

export default {
    name: "Piechart",
  ready(){
    $('#spend-category').highcharts({
      chart: {
        type: 'pie',
        height: 300,
        width: 450
      },
      credits: {enabled: false},
      colors: [
        '#F7C37E', '#FF7E81', '#A87BEA', '#A8DEFF', '#ABF1A3', '#66D6A0'],
      title: {text: null},
      plotOptions: {
        pie: {
          allowPointSelect: true,
          innerSize: '80%',
          cursor: 'pointer',
          showInLegend: true,
          dataLabels: {
            enabled: false,
            formatter: function () {
              return this.percentage.toFixed(2) + '%';
            }
          }
        }
      },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        width: 150,
        verticalAlign: 'middle',
        useHTML: true,
        labelFormatter: function () {
          return '<div style="text-align: left; width:80px;display: inline-block">' + this.name + '</div><div style="width:40px; display: inline-block;text-align:right;">$' + this.y + '</div> <div class="clearfix" style="margin-bottom: 10px;"></div>';
        }
      },
      series: [{
        type: 'pie',
        dataLabels: {},
        data: [
          ['Voice', 100.10],
          ['Data', 203.21],
          ['Messaging', 54.93],
          ['Taxes', 20.76],
          ['Eqiupment', 104.88],
          ['Other', 10.45]
        ]
      }]
    });
  }
}
</script>
