import _ from 'lodash'
import modal from './../../components/modal.vue'
import employeeAPI from './../../api/employee-api.js'
// import addressAPI from './../../api/address-api.js'
import locationAPI from './../../api/location-api.js'
import {mapGetters} from 'vuex'
import {EmployeesPresenter, AddressesPresenter} from './../../presenters'
import {EmployeeHelper, Utils} from './../../helpers'

const {Store} = require('yayson')()
const store = new Store()

export default {
    name: 'EmployeeEdit',

    components: {
        modal,
    },

    data() {
        return {
            employee_id: '',
            employee: {
                id: 0,
                firstName: '',
                lastName: '',
                username: '',
                domainId: '',
                email: '',
                notify: 0,
                confirmed: 0,
                companyId: '',
                notes: '',
                locationId: 236,
                defaultLang: 'en',
                isSupervisor: 0,
                isActive: 0
            },
            languages: [
                {label: 'EN', value: 'en'},
                {label: 'DE', value: 'de'},
                {label: 'ES', value: 'es'},
                {label: 'FR', value: 'fr'}
            ],
            domains: [],
            locations: []
        }
    },

    computed: {
        ...mapGetters({
            companies: 'company/allCompanies',
        }),
        EmployeeHelper() {
            return EmployeeHelper
        }
    },

    created() {
        let employee_id = this.$route.params.id || 0;

        this.$store.dispatch('company/searchAllByActive', {query: 1, all: true}).then(res => {
            if (res.length) {
                this.employee.companyId = res[0].id;
                this.domains = res[0].domains;
                this.employee.domainId = this.domains[0].id;
            }

            let _params = {
                params: {
                    indexAll: 1
                }
            };

            locationAPI.search(_params, res => {
                this.$set(this, 'locations', store.sync(res.data));
                this.$set(this, 'employee_id', employee_id);
            });

            // if (employee_id > 0) {
            //   let _params = {
            //     params: {
            //       include: 'udlvalues,addresses,companies.udls.udlvalues'
            //     }
            //   }
            //   employeeAPI.get(employee_id, _params, res => {
            //     this.$set(this, 'employee', store.sync(res.data))
            //     // this.$set(this, 'activeCompany', (this.employee.companies.length > 0 && !!this.employee.companies[0] ? this.employee.companies[0] : null))
            //     // console.log('employee', this.employee)
            //     this.init()
            //     this.$set(this, 'employee_id', employee_id)
            //   })
            // } else {
            //   this.init()
            //   this.$set(this, 'employee_id', employee_id)
            // }
        }, err => {
            console.log('can not get companies')
        })
    },

    mounted() {
        // console.log('employee mounted')
    },

    methods: {
        // init () {
        //   if (!(this.employee.companies.length > 0 && parseInt(this.employee.companies[0].id) > 0)) {
        //     this.changeCompany(this.companies[0])
        //   } else {
        //     if (Utils.isEmptyArray(this.employee.udlvalues)) {
        //       this.initUdlValues()
        //     }
        //   }
        //
        //   if (Utils.isEmptyArray(this.employee.addresses)) {
        //     this.employee.addresses = [{}]
        //   }
        // },
        //
        // initUdlValues () {
        //   this.employee.udlvalues = []
        //   _.each(this.employee.companies[0].udls, (udl) => {
        //      if (! Utils.isEmptyArray(udl.udlvalues)) {
        //         this.employee.udlvalues.push(udl.udlvalues[0])
        //      }
        //   })
        //   // console.log('udlvalues', this.employee.udlvalues)
        // },

        onCompanyChange(company_id) {
            this.employee.companyId = company_id;
            let company = _.find(this.companies, (item) => {
                return item.id == company_id
            });

            this.domains = company.domains;
            this.employee.domainId = this.domains.length ? this.domains[0].id : '';

            this.$forceUpdate();
        },

        submitEmployee() {
            let _jsonData = EmployeesPresenter.toJSON(this.employee)
            delete _jsonData['included']
            delete _jsonData['data']['attributes']['companies']
            // delete _jsonData['data']['attributes']['addresses']
            delete _jsonData['data']['relationships']
            delete _jsonData['data']['attributes']['domainId']

            if (process.env.NODE_ENV === 'testing') {
                _jsonData['data']['id'] = parseInt(_jsonData['data']['id'])
            }
            // console.log(_jsonData)

            let _params = JSON.stringify(_jsonData)

            // if (this.employee_id > 0) {
            //   employeeAPI.update(this.employee.id, _params, res => {
            //     this.$router.push({path: '/employees/review/' + this.employee.id}), err => console.log('update err', err)
            //   })
            // } else {
            employeeAPI.create(_params, res => {
                // this.$store.dispatch('employee/searchByEmail', {query: this.employee.email})
                //
                // let employee_id = res.data.data.id
                // console.log(employee_id)
                let newEmployer = store.sync(res.data);
                this.$router.push({path: '/employees/review/' + newEmployer.id})
            }, err => {
                this.$store.dispatch('error/addNew', {message: err.statusText + '. Please contact administrator.'});
                console.log('update err', err)
            })
            // }
        },

        submit() {
            // validation
            if (!this.employee.firstName) {
                this.$store.dispatch('error/addNew', {message: 'Please enter employee first name'})
                return
            }

            if (!this.employee.lastName) {
                this.$store.dispatch('error/addNew', {message: 'Please enter employee first name'})
                return
            }

            if (!this.employee.username) {
                this.$store.dispatch('error/addNew', {message: 'Please enter employee username'})
                return
            }

            if (!this.employee.domainId) {
                this.$store.dispatch('error/addNew', {message: 'Please select a domain from the list'})
                return
            }

            let domain = _.find(this.domains, (item) => {
                return item.id == this.employee.domainId
            });
            this.employee.email = this.employee.username + '@' + domain.domain;

            this.submitEmployee();

            //
            // let _address = AddressesPresenter.toJSON(_.extend({}, this.employee.addresses[0]))
            // let addressId = parseInt(_.get(this.employee, 'addresses[0].id', 0))
            // if (addressId > 0) {
            //   addressAPI.update(addressId, _address, (res) => {
            //     let address = store.sync(res.data)
            //     this.employee.addresses[0] = address
            //     this.submitEmployee()
            //   }, () => {})
            // } else {
            //   addressAPI.create(_address, (res) => {
            //     let address = store.sync(res.data)
            //     this.employee.addresses[0] = address
            //     this.submitEmployee()
            //   }, () => {})
            // }
        },
    }
}
