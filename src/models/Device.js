export default class Device {

  constructor(type, id,defaultPrice,name, properties, deviceTypeId, statusId, imageId,make,model,currency) {
    this.defaultPrice=defaultPrice;
    this.id = id;
    this.currency=currency;
    this.make=make;
    this.model=model;
    this.type = type;
    this.name = name;
    this.properties = properties;
    this.deviceTypeId = deviceTypeId;
    this.statusId = statusId;
    this.imageId = imageId;
    this.relationships={};
    this.modifications = [];
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

    device.relationships = Object.assign({}, device.relationships, {
      modifications: {
        data:device.modifications
      },

    });
  }

  imagesJson(device){
    let image = [{
      type: 'images',
      id: this.imageId
    }];

    device.relationships = Object.assign({}, device.relationships, {
      images: {
        data:image
      },
    });
  }

  pricesJson(price, device) {

    price.forEach(function(p, index) {
      let json=  {
        type: "devicevariations",
        "attributes": {
          "priceRetail": p.priceRetail,
          "price1": p.price1,
          "price2": p.price2,
          "priceOwn": p.priceOwn,
          "carrierId": p.carrierId,
          "companyId": p.companyId
        },
        "relationships": {
          "images": {
            "data": [
              {
                "type": "images",
                "id": p.imageVariations.id
              }
            ]
          },
          "modifications": {
            "data": [
              {
                "type": "modifications",
                "id": p.capacity
              }, {
                "type": "modifications",
                "id": p.style
              }
            ]
          }
        }
      }

      if (p.id!=null){
        json.id=p.id;
      }
      else{
      device.prices.push(json);
    }
  });
    device.relationships = Object.assign({}, device.relationships, {
      devicevariations: {
        data:device.prices
      },
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
        defaultPrice:parseFloat(this.defaultPrice),
        currency:this.currency,
        make:this.make,
        model:this.model,
        statusId: 1,
      },
      relationships:this.relationships
    };
  }
}
