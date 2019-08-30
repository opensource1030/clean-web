<template>
  <div class="toggle">
    <div
      class="toggle-content"
      v-bind:class="{
        'toggle-content--on': active,
        'toggle-content--off': !active
      }"
      @click="toggleChange"
    >
      <div class="toggle-item toggle-item--off">
        <div class="toggle-item-text">No</div>
      </div>

      <div class="toggle-item toggle-item--on">
        <div class="toggle-item-text">Yes</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toggle",

  props: {
    active: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    toggleChange() {
      if (!this.disabled) {
        this.$emit("change", !this.active);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  padding: 0 30px;
  user-select: none;

  &-content {
    display: flex;
    width: 30px;
    border: 1px solid #afbad4;
    border-radius: 10px;
    color: #afbad4;

    &--on {
      .toggle-item--on {
        background-color: #20a8d8;

        .toggle-item-text {
          color: #657089;
        }
      }
    }

    &--off {
      .toggle-item--off {
        background-color: #afbad4;

        .toggle-item-text {
          color: #657089;
        }
      }
    }
  }

  &-item {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    &-text {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &--on {
      .toggle-item-text {
        left: calc(100% + 10px);
      }
    }

    &--off {
      .toggle-item-text {
        right: calc(100% + 10px);
      }
    }
  }
}
</style>
