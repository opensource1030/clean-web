export default class Service {

  constructor(type, id, status, title, planCode, cost, description, carrierId) {
    this.id = id;
    this.type = type;
    this.status = status;
    this.title = title;
    this.planCode = planCode;
    this.cost = cost;
    this.description = description;
    this.carrierId = carrierId;
    this.serviceItems = [];

  }

  itemJson(items, service) {

    items.forEach(function(item, index) {




        if (item.category == 'voice') {
          service.serviceItems.push({
            category: 'voice',
            description: '',
            value: item.value,
            unit: 'minutes',
            cost: 0,
            domain: item.domain
          })
        } else if (item.category == 'data') {
          service.serviceItems.push({

            category: 'data',
            description: '',
            value: item.value,
            unit: 'Gb',
            cost: 0,
            domain: item.domain
          })
        } else  if (item.category == 'messaging'){
          service.serviceItems.push({

            category: 'messaging',
            description: '',
            value: item.value,
            unit: 'messages',
            cost: 0,
            'domain': item.domain
          })
        }

       else {


        service.serviceItems.push({

          'category': 'addon',
          'description': item.description,
          'value': 0,
          'unit': '',
          'cost': item.cost,
          'domain': ''
        })

      }

    });

  }

  itemUpdateJson(items, service) {

    items.forEach(function(item, index) {


        if (item.category == 'voice') {

          service.serviceItems.push({
            id: item.id,
            category: 'voice',
            description: '',
            value: item.value,
            unit: 'minutes',
            cost: 0,
            domain: item.domain
          })
        } else if (item.category == 'data') {

          service.serviceItems.push({
            id: item.id,
            category: 'data',
            description: '',
            value: item.value,
            unit: 'Gb',
            cost: 0,
            domain: item.domain
          })
        } else if (item.category == 'messaging') {
          service.serviceItems.push({
            id: item.id,
            category: 'messaging',
            description: '',
            value: item.value,
            unit: 'messages',
            cost: 0,
            'domain': item.domain
          })
        }

       else {

        service.serviceItems.push({
          'id': item.id,
          'category': 'addon',
          'description': item.description,
          'value': 0,
          'unit': '',
          'cost': item.cost,
          'domain': ''
        })

      }

    });

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
        carrierId: this.carrierId
      },
      relationships: {
        serviceitems: {
          data: this.serviceItems
        }
      }

    };
  }

}
