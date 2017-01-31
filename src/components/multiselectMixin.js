module.exports = {
  data() {
    return {search: '', isOpen: false, mutableValue: null}
  },
  props: {
    field: {
      type: String,
      required: true
    },
    labelAttr: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
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

    limit(options) {
      return options.slice(0, 10)
    },
	   onAfterSelect(option) {
					this.isOpen = !this.isOpen
					this.search = ''
			},

    filteroptions(list, value) {
      let self = this
      return list.filter(function(item) {

        return item[self.labelAttr].toString().indexOf(value) > -1;
      });

    },

    select(option, index) {

      if (this.isOptionSelected(option)) {
        this.deselect(option)
        this.callback();
          this.onAfterSelect(option)
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

    /**
     * Opens the multiselect’s dropdown.
     * Sets this.isOpen to TRUE
     */
    activate() {
      /* istanbul ignore else */
      if (this.isOpen)
        return

      this.isOpen = true

    },
    /**
     * Closes the multiselect’s dropdown.
     * Sets this.isOpen to FALSE
     */
    deactivate() {
      /* istanbul ignore else */
      if (!this.isOpen)
        return
      this.isOpen = false

    },



    toggle() {
      this.search = "";
      this.isOpen
        ? this.deactivate()
        : this.activate()
    }
  }
}
