export default class Device {

  constructor(type, id, name, properties, deviceTypeId, statusId, imageId) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.properties = properties;
    this.deviceTypeId = deviceTypeId;
    this.statusId = statusId;
    this.imageId = imageId;
    this.modifications = [];
    this.carriers = [];
    this.companies = [];
    this.prices = [];

  }
  modificationsJson(capacity, style, device) {
    let modification = [];

    for (let c of capacity) {
      modification.push(c);

    }

    for (let sty of style) {
      modification.push(sty);
    }

    modification.forEach(function(m, index) {
      device.modifications.push({type: 'modifications', id: m.id})

    });

  }

  carriersJson(carrier, device) {
    console.log(carrier);

    carrier.forEach(function(c, index) {
      device.carriers.push({type: 'carriers', id: c.id})

    });

  }

  companiesJson(company, device) {

    company.forEach(function(c, index) {
      device.companies.push({type: 'companies', id: c.id})

    });

  }

  pricesJson(price, device) {

    price.forEach(function(p, index) {
      device.prices.push({
        type: 'prices',
        capacityId: p.capacity.id,
        styleId: p.style.id,
        carrierId: p.carrier.id,
        companyId: p.company.id,
        priceRetail: p.retail,
        price1: p.priceOne,
        price2: p.priceTwo,
        priceOwn: p.Own
      })

    });

  }

  pricesUpdateJson(price, device) {

    price.forEach(function(p, index) {
      device.prices.push({
        type: 'prices',
        id: p.id,
        capacityId: p.capacity.id,
        styleId: p.style.id,
        carrierId: p.carrier.id,
        companyId: p.company.id,
        priceRetail: p.retail,
        price1: p.priceOne,
        price2: p.priceTwo,
        priceOwn: p.Own
      })

    });

  }

  toJSON() {
    return {
      type: this.type,
      attributes: {
        name: this.name,
        properties: this.properties,
        deviceTypeId: this.deviceTypeId,
        statusId: 1,
        identification: this.id
      },
      relationships: {
        modifications: {
          data: this.modifications
        },
        carriers: {
          data: this.carriers
        },
        companies: {
          data: this.companies
        },
        prices: {
          data: this.prices
        },
        images: {
          data: [
            {
              type: 'images',
              id: this.imageId
            }
          ]
        }
      }
    };
  }
}
