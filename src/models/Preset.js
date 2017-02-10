
import Device from './Device'
export default class Preset extends Device {

  constructor(type, id,name, companyId) {
          super();
      this.id = id;
      this.type=type;
      this.name=name;
      this.companyId=companyId;
      this.devicevariations=[];

  }

  deviceVariationsJson(deviceVariations, preset) {

    deviceVariations.forEach(function(p, index) {

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
