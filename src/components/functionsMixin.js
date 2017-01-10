module.exports = {
  methods: {
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
  }
}
