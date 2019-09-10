<template>
  <div class="help-pop">
    <b-button :id="id" variant="primary">?</b-button>
    <b-popover
      :target="id"
      :placement="placement"
      triggers="hover focus"
      :content="helpText"
    ></b-popover>
  </div>
</template>

<script>
import uuid from "uuid/v1";

export default {
  name: "HelpPop",

  props: {
    placement: {
      type: String,
      default: "top"
    },
    helpText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      id: 'help-pop-button',
    }
  },

  created() {
    this.id = uuid();
  }
};
</script>

<style lang="scss" scoped>
.help-pop {
  position: relative;

  button {
    font-size: 9px;
    padding: 1px 5px;
    border-radius: 50%;
    background-color: #afbad4;
    border: none;
  }
}
</style>
