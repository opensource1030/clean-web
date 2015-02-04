import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],

  itemController: ['report'],

  queryParams: [
    'currentPage', 'perPage', 'sort', 'include', 'type'
  ],
  currentPage: 1,
  perPage: 25,

  totalCharges: function() {
    return this.store.metadataFor("report").charge;
  }.property('totalCharges'),

  columns: function() {
    var usernameColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'Username',
      getCellContent: function(row) {
        return row.get('employee.firstName') + ' ' + row.get('employee.lastName');
      }
    });
    var mobileNumberColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'Mobile #',
      contentPath: 'phone'
    });
    var carrierColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'Carrier',
      contentPath: 'carrier.name'
    });
    var deviceColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'Device',
      contentPath: 'devices.firstObject.model'
    });
    var totalColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'Total',
      contentPath: 'total'
    });
    var voiceColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'Voice',
      contentPath: 'asset.billing.voice.charges.total'
    });
    var dataColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'data',
      contentPath: 'asset.billing.data.charges.total'
    });
    var messagingColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'messaging',
      contentPath: 'asset.billing.messaging.charges.total'
    });
    var taxesColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'taxes',
      contentPath: 'asset.billing.taxes.charges.total'
    });
    var equipmentsColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'equipments',
      contentPath: 'asset.billing.equipments.charges.total'
    });
    var othersColumn = Ember.Table.ColumnDefinition.create({
      headerCellName: 'others',
      contentPath: 'asset.billing.others.charges.total'
    });

    return [
      usernameColumn,
      mobileNumberColumn,
      carrierColumn,
      deviceColumn,
      totalColumn,
      voiceColumn,

      dataColumn,
      messagingColumn,
      taxesColumn,
      equipmentsColumn,
      othersColumn
    ];
  }.property('columns')

});
