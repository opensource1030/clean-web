// const Presenter = require('yayson')({ adapter: 'default' }).Presenter
// const Presenter = require('yayson')({ adapter: 'sequelize' }).Presenter
const Presenter = require('yayson')({adapter: null}).Presenter

export class UdlValuesPresenter extends Presenter {
}
UdlValuesPresenter.prototype.type = 'udlvalues'


export class UdlsPresenter extends Presenter {
  attributes (instance) {
    const attrs = super.attributes(instance)
    delete attrs['pid']
    delete attrs['value']
    delete attrs['companyId']
    delete attrs['legacyUdlField']
    attrs['inputType'] = 'string'
    return attrs
  }

  // relationships () {
  //   return {
  //     udlvalues: UdlValuesPresenter
  //   }
  // }
}
UdlsPresenter.prototype.type = 'udls'


export class GlobalSettingValuesPresenter extends Presenter {
  attributes (instance) {
    const attrs = super.attributes(instance)
    delete attrs['globalsettings']
    return attrs
  }
}
GlobalSettingValuesPresenter.prototype.type = 'globalsettingvalues'


export class AddressesPresenter extends Presenter {
  attributes (instance) {
    const attrs = super.attributes(instance)
    delete attrs['pid']
    return attrs
  }
}
AddressesPresenter.prototype.type = 'addresses'


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
  // relationships () {
  //   return {
  //     udls: UdlsPresenter
  //   }
  // }
}
CompaniesPresenter.prototype.type = 'companies'


export class EmployeesPresenter extends Presenter {
  attributes (instance) {
    const attrs = super.attributes(instance)
    delete attrs['password']
    delete attrs['confirmation_code']
    delete attrs['remember_token']
    return attrs
  }

  relationships () {
    return {
      addresses: AddressesPresenter,
      udlvalues: UdlValuesPresenter,
    }
  }
}
EmployeesPresenter.prototype.type = 'users'


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
    attrs['deviceTypeId'] = parseInt(instance.devicetypes[0].id)
    return attrs
  }

  relationships () {
    return {
      devicetypes: DeviceTypesPresenter,
      images: ImagesPresenter,
      modifications: ModificationsPresenter,
      // devicevariations: DeviceVariationsPresenter
    }
  }
}
DevicesPresenter.prototype.type = 'devices'


export class ServicesPresenter extends Presenter {
}
ServicesPresenter.prototype.type = 'services'


export class PresetsPresenter extends Presenter {
  relationships () {
    return {
      companies: CompaniesPresenter
    }
  }
}
PresetsPresenter.prototype.type = 'presets'


export class JobPresenter extends Presenter {
}
JobPresenter.prototype.type = 'companyuserimportjobs'
