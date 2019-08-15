<template>
  <div class="drawer" v-bind:class="{ open: open }">
    <div class="drawer-mask" @click="onClose()">
    </div>

    <transition name="slide">
      <div v-if="open" class="drawer-content">
        <slot>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Drawer",

    props: ['open'],

    watch: {
      open(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal === true) {
            $('body').addClass('overflow-hidden');
          } else {
            $('body').removeClass('overflow-hidden');
          }
        }
      }
    },

    // mounted() {
    //   $('body').addClass('overflow-hidden');
    // },

    // destroyed() {
    //   $('body').removeClass('overflow-hidden');
    // },

    methods: {
      onClose() {
        this.$emit('close')
      }
    },
  }
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
      // min-width: 500px;
      height: 100%;
      overflow-y: auto;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    }
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }

  .slide-enter {
    transform: translateX(100%);
  }

  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
