import Vue from 'vue';
import device from './../../api/device/device';
import {findByPrices, filterByModifications} from './../../components/filters.js';
import modal from './../../components/modal.vue';
import inputValidate from './../../components/inputValidate.vue'

Vue.directive('f-accordion', {
  bind: function(el) {
    Vue.nextTick(function() {
      $(el).foundation();
    });
  }
});
export default {
  name : 'Device',
  components: {
    modal,
  inputValidate
  },
  beforeCreate() {

    device.getDevice(this, 1);
    this.id = this.$route.params.id;
    if (this.id != null) {
      device.getDataDevice(this, this.id);
    }
  },

  computed : {
    mCapacity() {
      if (this.modifications.data != null) {
        let value = 'capacity';

        return this.modifications.data.filter(function(item) {
          return item.attributes.modType.indexOf(value) > -1;
        });
      }

      return '';
    },

    mStyle() {
      if (this.modifications.data != null) {
        let value = 'style';

        return this.modifications.data.filter(function(item) {
          return item.attributes.modType.indexOf(value) > -1;
        });
      }

      return '';
    },

    vStyles() {
      if (this.mStyle != '') {
        return this.mStyle.filter(style => {
          return style.check;
        });
      }

      return '';
    },

    vCapacity() {
      if (this.mCapacity != '') {
        return this.mCapacity.filter(capacity => {
          return capacity.check;
        });
      }

      return '';
    },

    vCompanies() {
      if (this.companies.data != null) {
        return this.companies.data.filter(company => {
          return company.check;
        });
      }

      return '';
    },

    vCarriers() {
      if (this.carriers.data != null) {
        return this.carriers.data.filter(carrier => {
          return carrier.check;
        });
      }

      return '';
    },

    priceTable() {
      if (this.priceData.length > 0 && this.vCompanies != '' && this.vStyles != '' && this.vCapacity != '' && this.vCarriers != '') {
        this.pricess = [];
        var a = false;
        for (let price of this.priceData) {

          let co = this.findById(this.vCompanies, price, price.companyId, "company")

          let st = this.findById(this.vStyles, price, price.styleId, "style")

          let cy = this.findById(this.vCapacity, price, price.capacityId, "capacity")

          let ca = this.findById(this.vCarriers, price, price.carrierId, "carrier")

          if (ca == true && cy == true && st == true && co == true) {
            this.pricess.push(price);
          }

        }

        for (let companies of this.vCompanies) {
          for (let styles of this.vStyles) {
            for (let capacitys of this.vCapacity) {
              for (let carriers of this.vCarriers) {

                this.company = Object.assign({}, this.company, {
                  style: styles,
                  capacity: capacitys,
                  carrier: carriers,
                  company: companies,
                  id: 0,
                  priceRetail: 0,
                  price1: 0,
                  price2: 0,
                  priceOwn: 0
                });

                this.price.push(this.company);

              }
            }
          }
        }

        for (let pri of this.price) {
          var b = true;
          for (let p of this.pricess) {
            if (JSON.stringify(pri.style) == JSON.stringify(p.style) && JSON.stringify(pri.capacity) == JSON.stringify(p.capacity) && JSON.stringify(pri.company) == JSON.stringify(p.company) && JSON.stringify(pri.carrier) == JSON.stringify(p.carrier)) {
              b = false;
              break;
            }
          }

          if (b == true) {
            if (pri.company.check != false && pri.capacity.check != false && pri.style.check != false && pri.carrier.check != false) {
              this.pricess.push(pri);
            }
          }
        }
  console.log("fdfd")
        return this.pricess;
      } else {
        if (this.vCompanies != '' && this.vStyles != '' && this.vCapacity != '' && this.vCarriers != '') {
          this.price = [];
          for (let companies of this.vCompanies) {

            if (companies.check == false) {}
            for (let styles of this.vStyles) {
              if (styles.check == false) {}
              for (let capacitys of this.vCapacity) {

                for (let carriers of this.vCarriers) {
                  this.company = Object.assign({}, this.company, {
                    style: styles,
                    capacity: capacitys,
                    carrier: carriers,
                    company: companies,
                    priceRetail: 0,
                    price1: 0,
                    price2: 0,
                    priceOwn: 0
                  });
                  this.price.push(this.company);
                }
              }
            }
          }
          console.log("fdfd")
          return this.price;
        } else {
          return '';
        }
      }
    }
  },
  methods : {
    findByPrices,
    submit() {
      if (this.id != null) {
        device.updateDevice(this.id, this, this.pricess, this.vStyles, this.vCapacity, this.vCarriers, this.vCompanies, this.d, this.image);
      } else {
        device.addDevice(this, this.price, this.vStyles, this.vCapacity, this.vCarriers, this.vCompanies, this.d, this.image);
      }
    },

    checkcarrier() {
      var vm = this;
      this.$nextTick(function() {
        var i = 0;
        for (let carrier of vm.carriers.data) {
          if (carrier.check == true) {
            vm.changeStatusCarrier('active', i);
          }

          i++;
        }
      });
    },
    findCompany(){

        device.filterCompanies(this,this.page,this.companyFilter);


    },

    findById(relationships, price, priceId, type) {

      for (let relation of relationships) {

        if (relation.id == priceId) {

          price[type] = relation

          return true;

        }

      }
      return false;
    },

    updateRetail(i, e) {

      console.log(e);
      var price = this.pricePost[i];
      var extending = Object.assign({}, price, {retail: value});

      Vue.set(this.pricePost, i, extending)
    },

    updateOne(i, e) {
      var value = e.target.value;
      console.log(value);
      var price = this.pricePost[i];
      var extending = Object.assign({}, price, {priceOne: value});
      Vue.set(this.pricePost, i, extending)
    },

    updateTwo(i, e) {
      var value = e.target.value;
      var price = this.pricePost[i];
      var extending = Object.assign({}, price, {priceTwo: value});
      Vue.set(this.pricePost, i, extending)
    },

    updateOwn(i, e) {
      var value = e.target.value;
      var price = this.pricePost[i];
      var extending = Object.assign({}, price, {Own: value});
      Vue.set(this.pricePost, i, extending)
    },

    toggle() {
      this.show = !this.show;
      this.pricePost = [];
      if (this.id != null) {
        for (let price of this.pricess) {
          console.log(price);
          this.pricePost.push(price);
        }
      } else {
        for (let price of this.price) {
          this.pricePost.push(price);
        }
      }
    },

    changeStatusCompany(index) {
      this.companies.data[index].check = !this.companies.data[index].check;
      console.log(this.companies.data[index].check);

    },

    showFalse() {
      this.show = false;
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      var formData = new FormData();
      formData.append('filename', files[0]);
      device.createImage(this, formData);
    },

    changeStatusCarrier(className, index) {
      var el = document.getElementsByClassName('static')[index];
      el.classList.toggle(className);
    },

    capacit() {
      if (this.gigas == '' || this.gigas == null) {
        this.error = 'Incorrect value Capacity';
      } else {
        this.error = '';

        var addModification = {
          value: this.gigas,
          type: 'capacity'
        };
        device.addModifications(this, addModification);
      }
    },

    colors() {
      if (this.color == '' || this.color == null) {
        this.error = 'Incorrect value Style';
      } else {
        this.error = '';
        var addModification = {
          value: this.color,
          type: 'style'
        };
        device.addModifications(this, addModification);
      }
    }
  },
  data() {
    return {
      /*image default device*/
      image: {
        url: "./../assets/logo.png",
        id: 0
      },
      /*filter */
      filter: {
        capacity: '',
        style: '',
        carrier: '',
        company: ''
      },
      companyFilter: '',
      d: {
        name: '',
        description: '',
        id: null,
        type: null
      },
      /*add modifications*/
      id: null,
      priceData: [],
      gigas: '',
      color: '',
      /*Api arrays*/
      carriers: {
        data: []
      },
      companies: [],
      modifications: [],
      showModal:false,
      deviceType: [],
      /*paginations*/
      pageCarriers: 1,
      pageCompanies: 1,
      /*table price*/
      price: [],
      pricess: [],
      pricePost: [],
      company: {},
      /*errors*/
      error: '',
      /*css modificacions*/
      checked: true,
      unchecked: false,
      show: false,
      shadow: 'initial'
    };
  }
};
