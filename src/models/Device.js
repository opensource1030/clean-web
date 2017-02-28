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
    this.json = {
      type: "devicevariations",
      "attributes": {
        "priceRetail": '',
        "price1": '',
        "price2": '',
        "priceOwn": '',
        "carrierId": '',
        "companyId": ''
      },
      "relationships": {
        "images": {
          "data": [
            {
              "type": "images",
              "id": ''
            }
          ]
        },
        "modifications": {
          "data": [
            {
              "type": "modifications",
              "id": ''
            }, {
              "type": "modifications",
              "id": ''
            }
          ]
        }
      }
    }
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

      this.json.attributes.priceRetail=p.priceRetail;
      this.json.attributes.price1=p.price1;
      this.json.attributes.price2=p.price2;
      this.json.attributes.priceOwn=p.priceOwn;
      this.json.attributes.carrierId=p.carrierId;
      this.json.attributes.companyId=p.companyId;
      this.json.relationships.images.data[0].id=p.imageVariations.id;
      this.json.relationships.modifications.data[0].id=p.capacity;
      this.json.relationships.modifications.data[1].id=p.style;

      if (p.id!=null){
        this.json.id=p.id;
      device.prices.push(this.json);
      }
      else{
      device.prices.push(this.json);
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
