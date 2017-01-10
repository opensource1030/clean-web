module.exports = {
  data() {
    return {search: '', isOpen: false, mutableValue: null,filter:[],show:false}
  },
  props: {
    callback: {
      type: Function,
      required: true
    },
    val: {
      default: null
    }
  },
  created() {
    this.mutableValue = this.val

  },
  computed() {},
  watch: {
    value(val) {
      this.mutableValue = val
    }
  },
  methods: {

    addValue() {

      if(this.search!="" ){
                this.val.push(this.search)
                this.isOpen=false;
                this.toggle();
                this.callback();


      }else{
        this.isOpen=false;
        this.toggle();
      }


    },
    deleteValues(i){
      this.mutableValue.splice(i, 1)
        this.toggle();
        this.callback();
    },
    activate() {

     if (this.isOpen)
        return

      this.isOpen = true

    },

    deactivate() {

      if (!this.isOpen)
        return
      this.isOpen = false

    },
   toggle() {
    //  this.search = "";
    this.show=true;
      this.isOpen
        ? this.deactivate()
        : this.activate()
    }
  }
}
