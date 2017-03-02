import { getFilters} from './filters.js';
const {Store,} = require('yayson')();
const store = new Store();
module.exports = {
  data() {
    return {search: '', isOpen: false, mutableValue: null,filter:[],show:false}
  },
  props: {


    callback: {
      type: Function,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    api: {
      type: String,
      required: true
    },
    fieldSearch:{
      type:String,
      required:true
    },

    labelAttr: {
      type: String,
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      default: null
    }
  },
  created() {
    this.mutableValue = this.value

  },
  computed() {},
  watch: {
    value(val) {
      this.mutableValue = val
    }
  },
  methods: {

	   onAfterSelect(option) {
					this.isOpen = !this.isOpen
					this.search = ''
			},

    filteroptions() {
if(this.search=="" || this.search==null){
        this.show=false;

}else{

        let params1;
    if(this.api=="/carriers" || this.api=="/companies") {
       params1 = {
            params: {
                'filter[active]':1,
            }
        };
      }
      else{
       params1 = {
            params: {
            }
        };


      }

          params1.params['filter['+this.fieldSearch+'][like]']= '%'+this.search+'%';


            this.$http.get(process.env.URL_API + this.api, params1).then((response) =>
                        {
                            let event = store.sync(response.data);
                            if(this.labelAttr!=null){
                                  this.filter=event
                            }else{
                              this.filter=[];
                              for(let device of event){

                              switch(this.fieldSearch) {
                          case 'make':
                              this.filter= getFilters(this.filter, device.make, 'string');
                              break;
                          case 'defaultPrice':
                              this.filter=getFilters(this.filter, device.defaultPrice, 'number');
                              break;
                            }

                          }

                            }

                            if(this.filter.length==0){
                              this.show=true;
                            }


                        }, (response) => {}
                    );



                  }



    },

    select(option, index) {

      if (this.isOptionSelected(option)) {
        this.deselect(option)
        this.callback();
      } else {
          this.value.push(option)
            this.callback();
        this.onAfterSelect(option)
      }

    },
    deselect(option) {
      let ref = -1
      this.mutableValue.forEach((val) => {
        if (val === option) {
          ref = val
        }
      })
      var index = this.mutableValue.indexOf(ref)
      this.mutableValue.splice(index, 1)

    },
    isOptionSelected(option) {
      if (this.mutableValue) {
        let selected = false
        this.mutableValue.forEach(opt => {
          if (opt === option) {
            selected = true
          }
        })
        return selected
      }
      return this.mutableValue === option
    },
    toggle() {
      this.search = "";
      this.isOpen
        ? this.deactivate()
        : this.activate()
    }
  }
}
