export default class Packageid {

    constructor(id, type, name, addressId, companyId, conditions, apps, devicevariations, services) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.addressId = addressId;
        this.companyId = companyId;
        this.conditions = conditions;
        this.apps = apps;
        this.devicevariations = devicevariations;
        this.services = services;
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
                }
            }
        };
    }
}
