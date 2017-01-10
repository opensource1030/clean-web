<<<<<<< HEAD
import Device from './Device'
export default class Preset extends Device {

  constructor(type, id,name, companyId) {
          super();
=======
export default class Preset {

  constructor(type, id,name, companyId) {
>>>>>>> 1b9e275... get data preset cp-1659
      this.id = id;
      this.type=type;
      this.name=name;
      this.companyId=companyId;
<<<<<<< HEAD
      this.devicevariations=[];

=======
      devicevariations=[];
>>>>>>> 1b9e275... get data preset cp-1659
  }

  deviceVariationsJson(deviceVariations, preset) {

    deviceVariations.forEach(function(p, index) {
<<<<<<< HEAD

      this.json.attributes.priceRetail=p.priceRetail;
      this.json.attributes.price1=p.price1;
      this.json.attributes.price2=p.price2;
      this.json.attributes.priceOwn=p.priceOwn;
      this.json.attributes.carrierId=p.carrierId;
      this.json.attributes.companyId=p.companyId;
      this.json.relationships.images.data[0].id=p.images[0].id;
      this.json.relationships.modifications.data[0].id=p.capacity;
      this.json.relationships.modifications.data[1].id=p.style;

      if (p.id!=null){
        this.json.id=p.id;
      preset.devicevariations.push(this.json);
      }
      else{
      preset.devicevariations.push(this.json);
=======
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
      preset.devicevariations.push(json);
      }
      else{
      preset.devicevariations.push(json);
>>>>>>> 1b9e275... get data preset cp-1659
    }
  });
    preset.relationships = Object.assign({}, preset.relationships, {
      devicevariations: {
        data:preset.devicevariations
      },
    });

}

  toJSON() {
    return {
      type: this.type,
      id:this.id,
      attributes: {
        name: this.name,
        companyId: this.companyId,
      },
      relationships:this.relationships
    };
  }
}
