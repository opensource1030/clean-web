export default class Packageid {

  constructor(id, type, name, companyId, conditions, apps, devicevariations, services, address) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.companyId = companyId;
    this.conditions = conditions;
    this.apps = apps;
    this.devicevariations = devicevariations;
    this.services = services;
    this.address = address;
  }

  toJSON() {
    return {
      type: this.type,
      id: this.id,
      attributes: {
        name: this.name,
        addressId: this.addressId,
        companyId: this.companyId,
      },
      relationships: {
        conditions: {
          data: this.conditions
        },
        apps: {
          data: this.apps
        },
        devicevariations: {
          data: this.devicevariations
        },
        services: {
          data: this.services
        },
        address: {
          data: this.address
        }
      }
    };
  }
}
