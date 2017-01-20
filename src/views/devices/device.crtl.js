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
    money(){
        switch(this.d.money) {
    case 'USD':
           return '$'
        break;
    case 'EUR':
          return '€'
        break;
    case 'GBP':
        return '£'
        break;

}

    },
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
    if(this.pricess.length>0 && this.add==true){
      this.add=false;

    return this.pricess
    }
    else{

  this.pricess = [];

  for(let price of this.priceData){
      let capacityId=null;
      let styleId=null;
    for(let modi of price.modifications){
          if(modi.modType=="capacity"){
            capacityId=modi.id;
          }else{
            styleId=modi.id;
          }

    }

    price= Object.assign({}, price, {
      id:price.id,
      styles:this.vStyles,
      capacitys: this.vCapacity,
      carriers: this.vCarriers,
      companys: this.vCompanies,
      style:styleId,
      capacity:capacityId,
      carrierId:price.carrierId,
      companyId:price.companyId,
      imageVariations: {
        url: process.env.URL_API+'/images/'+price.images[0].id,
        id: price.images[0].id
      }


    });
      this.pricess.push(price);

  }


  return this.pricess;
}

  }


  else  if (this.vCompanies != '' && this.vStyles != '' && this.vCapacity != '' && this.vCarriers != '') {
      if(this.price.length>0 && this.add==true){

        this.add=false;
      return this.price
      }
      else{

      this.price = [];
      this.company = Object.assign({}, this.company, {
        styles:this.vStyles,
        capacitys: this.vCapacity,
        carriers: this.vCarriers,
        companys: this.vCompanies,
        imageVariations: {
          url: "./../assets/logo.png",
          id: 0
        },
        style:null,
        capacity:null,
        carrierId:null,
        companyId:null,
        priceRetail: this.d.defaultPrice,
        price1: 0,
        price2: 0,
        priceOwn: 0
      });

      this.price.push(this.company);

      return this.price
}
}
else{
  return '';
}

}


  },
  methods : {
    findByPrices,
    submit() {
      if (this.id != null) {

        device.updateDevice(this.id, this, this.pricess, this.vStyles, this.vCapacity,this.d, this.image);
      } else {
        device.addDevice(this, this.price, this.vStyles, this.vCapacity,this.d, this.image);
      }
    },
    toggle() {
     this.show = !this.show;
   },
    adds(){
      this.add=true;

      this.company = Object.assign({}, this.company, {
        id:0,
        styles:this.vStyles,
        capacitys: this.vCapacity,
        carriers: this.vCarriers,
        companys: this.vCompanies,
        style:null,
        capacity:null,
        carrier:null,
        imageVariations: {
          url: "./../assets/logo.png",
          id: 0
        },
        company:null,
        priceRetail: this.d.defaultPrice,
        price1: 0,
        price2: 0,
        priceOwn: 0
      });
      if(this.pricess.length>0){
      this.pricess.push(this.company)
    }else{
      this.price.push(this.company);
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
    onFileChanges(e,index) {
      var files = e.target.files || e.dataTransfer.files;
      var formData = new FormData();
      formData.append('filename', files[0]);
      console.log(index)
      device.createImageVariation(this, formData,index);
    },
    changeStatusCarrier(className, index) {
      var el = document.getElementsByClassName('static')[index];
      el.classList.toggle(className);
    },
    capacit() {
      if (this.gigas == '' || this.gigas == null || isNaN(this.gigas) ) {
        this.error = 'Incorrect value Capacity';
      } else {
        this.error = '';
        console.log(this.gigas)
        var addModification = {
          value: this.gigas+this.units,
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
      message:'',
      imageVariations: {
        url: "",
        id: 0
      },


      add:false,
      /*filter */

      filter: {
        capacity:{},
        style:{},
        carrier:{},
        company:{}
      },
      companyFilter: '',
      d: {
        name: '',
        description: '',
        defaultPrice:null,
        currency:'',
        make:'',
        model:'',
        type: null,
        money:'USD'


      },
      units:'Gb',
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
      colorV:'#CCCCCC',
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
