<template>
  <div class="help-pop">
    <b-button id="help-pop-button" variant="primary">?</b-button>
    <b-popover
      target="help-pop-button"
      :placement="placement"
      triggers="hover focus"
      :content="helpText"
    ></b-popover>
  </div>
</template>

<script>
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
