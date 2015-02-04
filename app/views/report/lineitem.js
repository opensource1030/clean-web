import Ember from 'ember';

var map = Ember.ArrayPolyfills.map;
var forEach = Ember.ArrayPolyfills.forEach;

function resultToDataTable(columns) {
  return map.call(columns, function(column) {
    var dataName = column['data'];
    var dataFunc = function( row, type, set, meta ) {
      return row.get(dataName);
    };

    column['data'] = dataFunc;
    return column;
  });
}

function moneyFormat(data, type, full) {
  return '$' + parseFloat(data).toFixed(2);
}

export default Ember.View.extend({
  tagName:'table',
  classNames:['table','table-striped','table-bordered','report-table'],
  templateName: 'reports/lineitem',
  didInsertElement: function() {
    var tbl = this.$();
    var content = this.get('content');

    var meta = this.get('controller.totalCharges');
    console.log("meta", meta);

    var dataTable = tbl.DataTable({
      "scrollX": "100%",
      "scrollCollapse": false,
      "autoWidth": false,
      "paging": false,
      "filter": false,
      "info": false,
      "processing": true,
      "data": content.toArray(),
      "columns": resultToDataTable([
        { "title" : "Username", "bSortable": true, "data" : "employee.firstName" },
        { 
          "title" : "Mobile #", "data": "phone", "bSortable": false,
          "render": function ( data, type, full ) {
            return '<a href="#/reports/' + full.id + '">' + data + '</a>';
          }
        },
        { "title" : "Carrier", "data": "carrier.name", "bSortable": false},
        { "title" : "Device", "data": "device.model" },
        { "title" : "Total", "data": "", 
          render: function(data, type, full) {
            var cols = ['asset.billing.voice.charges.total', 'asset.billing.data.charges.total',
              'asset.billing.messaging.charges.total', 'asset.billing.taxes.charges.total', 
              'asset.billing.equipments.charges.total', 'asset.billing.others.charges.total'];
            var total = 0;

            forEach.call(cols, function(col) { total += parseFloat(full.get(col))});
            return '$' + total;
          } 
        },
        { "title" : "Voice", "data": "asset.billing.voice.charges.total", render: moneyFormat },
        { "title" : "Data", "data": "asset.billing.data.charges.total", render: moneyFormat },
        { "title" : "Messaging", "data": "asset.billing.messaging.charges.total", render: moneyFormat },
        { "title" : "Taxes", "data": "asset.billing.taxes.charges.total", render: moneyFormat },
        { "title" : "Equip", "data": "asset.billing.equipments.charges.total", render: moneyFormat },
        { "title" : "Other", "data": "asset.billing.others.charges.total", render: moneyFormat },
      ])
    });
    new jQuery.fn.dataTable.FixedColumns( dataTable, {
      leftColumns: 2
    });

  }
});
