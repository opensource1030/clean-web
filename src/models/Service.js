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
              it.cost = '';
          }

          if (it.domain == '' || it.domain == null) {
              it.domain = '';
          }

          service.serviceItems.push({
              id: it.id,
              category: it.category,
              description: it.description,
              value: it.value,
              unit: it.unit,
              cost: it.cost,
              domain: it.domain
          });
      }

      return service.serviceItems;
  }

  toJSON() {
    return {
      type: this.type,
      id: this.id,
      attributes: {
        status: this.status,
        title: this.title,
        planCode: this.planCode,
        cost: this.cost,
        description: this.description,
        carrierId: this.carrierId,
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
