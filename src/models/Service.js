export default class Service {
  constructor(type, id, status, title, planCode, cost, description, currency, carrierId) {
    this.id = id;
    this.type = type;
    this.status = status;
    this.title = title;
    this.planCode = planCode;
    this.cost = cost;
    this.description = description;
    this.carrierId = carrierId;
    this.currency = currency;
    this.serviceItems = [];
  }

  itemJson(items, service) {
    for (let it of items) {
      if (it.id == '' || it.id == null) {
        it.id = 0;
      }

      if (it.category == '' || it.category == null) {
        it.category = 'addon';
      }

      if (it.value == '' || it.value == null) {
        it.value = 0;
      }

      if (it.unit == '' || it.unit == null) {
        it.unit = '';
      }

      if (it.cost == '' || it.cost == null) {
        it.cost = 0;
      }

      if (it.domain == '' || it.domain == null) {
        it.domain = '';
      }

      service.serviceItems.push({
        type: 'serviceitems',
        id: parseInt(it.id),
        category: it.category,
        description: it.description,
        value: parseInt(it.value),
        unit: it.unit,
        cost: parseInt(it.cost),
        domain: it.domain
      });
    }

    return service.serviceItems;
  }

  toJSON() {
    return {
      type: this.type,
      id: parseInt(this.id),
      attributes: {
        status: this.status,
        title: this.title,
        planCode: parseInt(this.planCode),
        cost: parseFloat(this.cost),
        description: this.description,
        carrierId: parseInt(this.carrierId),
        currency: this.currency
      },
      relationships: {
        serviceitems: {
          data: this.serviceItems
        }
      }

    };
  }

}
