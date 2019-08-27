<template>
  <select
    class="form-control"
    v-model="inputValue"
    @change="$emit('change', $event)"
  >
    <option value="" disabled selected>-- Choose an issue --</option>
    <optgroup label="Billing">
      <option data-id="issue-4" data-support-tag="ALR4" data-value="Questions About My Monthly Statement" value="qamms">
        Questions About My Monthly Statement
      </option>
      <option data-id="issue-15" data-support-tag="ALR4" data-value="Other Billing Issues" value="obi">
        Other Billing Issues
      </option>
    </optgroup>
    <optgroup label="Device Support">
      <option data-id="issue-5" data-value="Activate My Device" data-support-tag="IRE0" value="amd">
        Activate My Device
      </option>
      <option data-id="issue-3" data-value="Email Connectivity" data-support-tag="IRE0" value="ec">
        Email Connectivity
      </option>
      <option data-id="issue-8" data-support-tag="IRE0" data-value="Issues While Traveling Abroad" value="iwta">
        Issues While Traveling Abroad
      </option>
      <option data-id="issue-9" data-support-tag="IRE0" data-value="Other Device Support Issues" value="odsi">
        Other Device Support Issues
      </option>
    </optgroup>
    <optgroup label="Service Plan / Feature">
      <option data-id="issue-6" data-support-tag="IRE1" data-value="Add/Remove International Features" value="aif">
        Add/Remove International Features
      </option>
      <option data-id="issue-10" data-support-tag="IRE1" data-value="Cancel Service" value="cs">
        Cancel Service
      </option>
      <option data-id="issue-2" data-support-tag="IRE1" data-value="Change Existing Features" value="cef">
        Change Existing Features
      </option>
      <option data-id="issue-12" data-support-tag="IRE1" data-value="Suspend/Unsuspend Wireless Service" value="sws">
        Suspend/Unsuspend Wireless Service
      </option>
      <option data-id="issue-13" data-support-tag="IRE1" data-value="Transfer Service to a Personal Account" value="tstpa">
        Transfer Service to a Personal Account
      </option>
      <option data-id="issue-14" data-support-tag="IRE1" data-value="Other Service and Plan Issues" value="osapi">
        Other Service and Plan Issues
      </option>
    </optgroup>
  </select>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      inputValue: this.value
    }
  },
  watch: {
    inputValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>
