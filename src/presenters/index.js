const Presenter = require('yayson')({ adapter: 'default' }).Presenter

export class ImagesPresenter extends Presenter {
}
ImagesPresenter.prototype.type = 'images'

export class ModificationsPresenter extends Presenter {
}
ModificationsPresenter.prototype.type = 'modifications'

export class CarriersPresenter extends Presenter {
}
CarriersPresenter.prototype.type = 'carriers'

export class CompaniesPresenter extends Presenter {
}
CompaniesPresenter.prototype.type = 'companies'

export class DeviceTypesPresenter extends Presenter {
}
DeviceTypesPresenter.prototype.type = 'devicetypes'

export class DeviceVariationsPresenter extends Presenter {
  attributes (instance) {
    const attrs = super.attributes(instance)
    delete attrs["deleted"]
    // attrs['carrierId'] = instance.carriers[0].id
    // attrs['companyId'] = instance.companies[0].id
    return attrs
  }

  relationships () {
    return {
      images: ImagesPresenter,
      modifications: ModificationsPresenter,
      carriers: CarriersPresenter,
      companies: CompaniesPresenter
    }
  }
}
DeviceVariationsPresenter.prototype.type = 'devicevariations'

export class DevicesPresenter extends Presenter {
  // type = 'devices'

  // constructor () {
  //   super()
  //   this.type = 'devices'
  // }

  // getSuper(instance, isCtor) {
  //   var ctor = isCtor ? instance: instance.constructor;
  //   if (!ctor.hasOwnProperty('__super__')) {
  //      Object.defineProperty(ctor, '__super__', { configurable: true, value: Object.getPrototypeOf(ctor) || ctor.__proto__ }); // eslint-disable-line
  //   }
  //   return ctor.__super__ // eslint-disable-line; 
  // }

  attributes (instance) {
    const attrs = super.attributes(instance)
    // console.log(instance)
    // console.log(attrs)
    delete attrs["externalId"]
    delete attrs["syncId"]
    attrs['deviceTypeId'] = instance.devicetypes[0].id
    return attrs
  }

  relationships () {
    return {
      devicetypes: DeviceTypesPresenter,
      images: ImagesPresenter,
      modifications: ModificationsPresenter,
      devicevariations: DeviceVariationsPresenter
    }
  }
}
DevicesPresenter.prototype.type = 'devices'