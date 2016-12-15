export default class Device {

  constructor(type, id,identification, name, properties, deviceTypeId, statusId, imageId) {
    this.id = id;
    this.identification=identification;
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
        priceRetail: p.priceRetail,
        price1: p.price1,
        price2: p.price2,
        priceOwn: p.priceOwn
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
        priceRetail: p.priceRetail,
        price1: p.price1,
        price2: p.price2,
        priceOwn: p.priceOwn
      })

    });

  }

  toJSON() {
    return {
      type: this.type,
      id:this.id,
      attributes: {
        name: this.name,
        properties: this.properties,
        deviceTypeId: this.deviceTypeId,
        statusId: 1,
        identification: this.identification,
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
