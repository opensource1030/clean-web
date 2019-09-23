<template>
  <div class="steps">
    <div v-if="showBackButton" class="steps-back" @click="goBack">
      <i class="fa fa-chevron-left"></i>Back
    </div>
    <div
      v-for="(step, index) of steps"
      class="steps-item"
      v-bind:class="{ active: index <= activeStep, passed: index < activeStep }"
    >
      <div class="steps-item-dot">
        <div class="steps-item-dot-icon"></div>
        <i class="steps-item-dot-check fas fa-check"></i>
      </div>
      {{ step.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Steps",

  props: {
    steps: {
      type: Array,
      required: true
    },
    activeStep: {
      type: Number,
      required: true
    },
    showBackButtonOnFirstStep: {
      type: Boolean
    }
  },

  methods: {
    goBack() {
      this.$emit("back");
    }
  },

  computed: {
    showBackButton() {
      if (this.showBackButtonOnFirstStep) {
        return true;
      } else {
        return this.activeStep > 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 45px;
  color: #657089;
  font-size: 10px;
  user-select: none;
  position: relative;

  &-back {
    position: absolute;
    left: 0;
    top: 20px;
    cursor: pointer;

    i {
      color: #20a8d2;
      margin-right: 5px;
    }
  }

  &-item {
    position: relative;
    text-align: center;
    width: 200px;

    &::before {
      position: absolute;
      width: 1000px;
      height: 1px;
      left: 50%;
      top: -13px;
      border: 1px solid #e8e8e8;
      content: "";
    }

    &-dot-check {
      position: absolute;
      left: calc(50% + 1px);
      top: calc(50% - 1px);
      transform: translate(-50%, -50%);
      color: white;
      font-size: 11px;
      display: none;
    }

    &.passed {
      .steps-item-dot-check {
        display: block;
      }
    }

    &-dot {
      position: absolute;
      padding: 0 5px;
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;

      &-icon {
        width: 13px;
        height: 13px;
        border-radius: 8px;
        background-color: white;
        border: 1px solid #20a8d2;
      }
    }

    &.active {
      &::before {
        border-color: #20a8d8;
      }

      .steps-item-dot-icon {
        background-color: #20a8d8;
      }
    }

    &:last-child {
      &::before {
        top: -14px;
        border-width: 4px;
        border-color: white;
      }
    }
  }
}
</style>
