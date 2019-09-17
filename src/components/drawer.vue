<template>
  <div class="drawer" v-bind:class="{ open: open }">
    <div class="drawer-mask" @click="onClose()"></div>

    <!-- <transition name="custom-classes-transition"
                enter-active-class="animated bounceRight"
    leave-active-class="animated bounceOutRight">-->
    <transition name="bounceRight">
      <div v-if="open && !confirmDialogOpened" class="drawer-content">
        <slot></slot>
      </div>
    </transition>

    <div v-if="confirmDialogOpened" class="drawer-close-confirm">
      <h1>Attention</h1>
      <h5>Are you sure you want to discard progress?</h5>
      <div class="row">
        <div class="col">
          <b-btn variant="outline-default w-100" @click="onStay">Stay</b-btn>
        </div>
        <div class="col">
          <b-btn variant="default w-100" @click="onDiscard">Discard</b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawer",

  props: ["open", "showCloseConfirm"],

  data() {
    return {
      confirmDialogOpened: false
    };
  },

  watch: {
    open(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal === true) {
          $("body").addClass("overflow-hidden");
        } else {
          $("body").removeClass("overflow-hidden");
        }
      }
    }
  },

  mounted() {
    // $("body").addClass("overflow-hidden");
  },

  destroyed() {
    $("body").removeClass("overflow-hidden");
  },

  methods: {
    onStay() {
      this.confirmDialogOpened = false;
    },

    onDiscard() {
      this.$emit("close");
    },

    onClose() {
      if (!this.showCloseConfirm) {
        this.$emit("close");
      } else {
        this.confirmDialogOpened = true;
      }
    }
  }
};
</script>

<style lang="scss">
.drawer {
  position: fixed;
  right: 0;
  top: 0;
  width: 0;
  height: 100%;
  z-index: 1020;

  &.open {
    width: 100%;

    .drawer-mask {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.65);
    }
  }

  &-mask {
    opacity: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }

  &-content {
    position: absolute;
    background-color: white;
    top: 0;
    right: 0;
    height: 100%;
    overflow-y: auto;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }

  &-close-confirm {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 45px 60px;
    width: 350px;
    text-align: center;

    h1 {
      color: #1f2027;
      font-size: 24px;
      font-weight: 600;
      line-height: 29px;
      margin-bottom: 17px;
    }

    h5 {
      color: #1f2027;
      font-size: 12px;
      line-height: 21px;
      margin-bottom: 27px;
    }

    button {
      font-size: 11px;

      &.btn-outline-default {
        border-width: 0;
      }
    }
  }
}

// .slide-leave-active,
// .slide-enter-active {
//   // -ms-transition-property: transform;
//   // -ms-transition-timing-function: linear;
//   // -ms-transition-duration: 0.3s;

//   transition-property: right;
//   transition-timing-function: linear;
//   transition-duration: 0.3s;
//   //transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

// }

// .slide-enter {
//   //-ms-transform: translateX(100%);
//   right: -600px;
// }

// .slide-leave-to {
//   //-ms-transform: translateX(100%);
//   right: -600px;
// }
</style>
