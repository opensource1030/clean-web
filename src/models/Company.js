export default class Company {

  constructor(type, id, name, label, active, isCensus, logo) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.label = label;
    this.active = active;
    this.isCensus = isCensus;
    this.logo = logo;
    this.customFields = [];
  }

  customFieldsJson(customField, company) {
    console.log(customField);
    if (customField) {
      customField.forEach(function(c, index) {
        company.customFields.push({label: c.label, value: c.value})
      });
    }
  }
  
  toJSON() {
    return {
      type: this.type,
      attributes: {
        identification: this.id,
        id: this.id,
        name: this.name,
        label: this.label,
        active: this.active,
        isCensus: this.isCensus,
        logo: this.logo,
        customFields: this.customFields
      },
      relationships: {
        
      }
    };
  }
}
