export default class User {

  constructor(type, id, uuid, identification, email, alternateEmail, password, username, confirmation_code, remember_token, confirmed, firstName,
    lastName, alternateFirstName, supervisorEmail, companyUserIdentifier, isSupervisor, isValidator, isActive, rgt, lft, hierarchy,
    defaultLang, notes, level, notify, companyId, syncId, supervisorId, externalId, approverId, defaultLocationId, addressId) {
    this.id = id;
    this.type = type;
    this.uuid = uuid;
    this.identification = identification;
    this.email = email;
    this.alternateEmail = alternateEmail;
    this.password = password;
    this.username = username;
    this.confirmation_code = confirmation_code;
    this.remember_token = remember_token;
    this.confirmed = confirmed;
    this.firstName = firstName;
    this.lastName = lastName;
    this.alternateFirstName = alternateFirstName;
    this.supervisorEmail = supervisorEmail;
    this.companyUserIdentifier = companyUserIdentifier;
    this.isSupervisor = isSupervisor;
    this.isValidator = isValidator;
    this.isActive = isActive;
    this.rgt = rgt;
    this.lft = lft;
    this.hierarchy = hierarchy;
    this.defaultLang = defaultLang;
    this.notes = notes;
    this.level = level;
    this.notify = notify;
    this.companyId = companyId;
    this.syncId = syncId;
    this.supervisorId = supervisorId;
    this.externalId = externalId;
    this.approverId = approverId;
    this.defaultLocationId = defaultLocationId;
    this.addressId = addressId;
  }
  toJSON() {
    return {
      type: this.type,
      id: this.id,
      attributes: {
        uuid: this.uuid,
        identification: this.identification,
        email: this.email,
        alternateEmail: this.alternateEmail,
        password: this.password,
        username: this.username,
        confirmation_code: this.confirmation_code,
        remember_token: this.remember_token,
        confirmed: this.confirmed,
        firstName: this.firstName,
        lastName: this.lastName,
        alternateFirstName: this.alternateFirstName,
        supervisorEmail: this.supervisorEmail,
        companyUserIdentifier: this.companyUserIdentifier,
        isSupervisor: this.isSupervisor,
        isValidator: this.isValidator,
        isActive: this.isActive,
        rgt: this.rgt,
        lft: this.lft,
        hierarchy: this.hierarchy,
        defaultLang: this.defaultLang,
        notes: this.notes,
        level: this.level,
        notify: this.notify,
        companyId: this.companyId,
        syncId: this.syncId,
        supervisorId: this.supervisorId,
        externalId: this.externalId,
        approverId: this.approverId,
        defaultLocationId: this.defaultLocationId,
        addressId: this.addressId,
      }
    };
  }
}
