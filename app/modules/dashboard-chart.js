'use strict';
var $ = require('jquery');
require('../../vendor/highcharts/highcharts.js');
require('../../vendor/highcharts/highcharts-more.js');
var Highcharts = require('../../vendor/highcharts/highcharts.js');


$(function () {
    /*$('#dash-spend').highcharts({
     title: {
     text: 'Spend by Carrier'
     },
     chart: {
     backgroundColor: "#F5F5F5"
     },
     xAxis: {
     categories: ['Nov. 2015', 'Dec. 2015', 'Jan. 2016', 'Feb. 2016']
     },
     credits: {
     enabled: false
     },
     labels: {
     items: [{
     html: 'Average Spends',
     style: {
     left: '50px',
     top: '18px',
     color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
     }
     }]
     },
     series: [
     {
     type: 'column',
     name: 'ATT',
     data: [87, 24.87, 65.86, 87.24]
     },
     {
     type: 'column',
     name: 'Verizon',
     data: [37, 21.87, 43.86, 32.24]
     },
     {
     type: 'column',
     name: 'Sprint',
     data: [97, 44.87, 44.86, 74.24]
     },
     {
     type: 'spline',
     name: 'Average',
     data: [55, 45, 35, 33.24],
     marker: {
     lineWidth: 2,
     lineColor: Highcharts.getOptions().colors[3],
     fillColor: 'white'
     }
     }]
     });
     });
     */

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
            title : false,
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
    });

});