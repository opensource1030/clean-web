
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

  let self =  this
    deviceVariations.forEach(function(p, index) {

      self.json.attributes.priceRetail=p.priceRetail;
      self.json.attributes.price1=p.price1;
      self.json.attributes.price2=p.price2;
      self.json.attributes.priceOwn=p.priceOwn;
      self.json.attributes.carrierId=p.carrierId;
      self.json.attributes.companyId=p.companyId;
      if(p.images!=null ){
      self.json.relationships.images.data[0].id=p.images[0].id;
    }
      self.json.relationships.modifications.data[0].id=p.capacity;
      self.json.relationships.modifications.data[1].id=p.style;

      if (p.id!=null){
        self.json.id=p.id;
      preset.devicevariations.push(self.json);
      }
      else{
      preset.devicevariations.push(self.json);
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
