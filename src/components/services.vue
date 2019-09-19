<template>
  <div class="services">
    <div class="row">
      <div v-for="service of services" class="col-md-6">
        <div class="service" @click="requestService(service)">
          <div class="d-flex justify-content-space-between align-items-start">
            <div class="service-title pr-1">{{ service.title }}</div>
            <div class="service-thumb"></div>
          </div>
          <div class="service-details mt-4">
            <div
              v-for="item of serviceItems(service)"
              class="mt-1"
            >{{ item.category | capitalize }} {{ item.value }} {{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Services",

  props: {
    services: {
      type: Array,
      required: true
    }
  },

  methods: {
    requestService(service) {
      this.$emit("requestService", service);
    },

    serviceItems(service) {
      return _.uniqBy(service.serviceitems, "id");
    }
  }
};
</script>

<style lang="scss" scoped>
.services {
  line-height: initial;
  font-family: Montserrat;

  .service {
    position: relative;
    width: 100%;
    padding: 20px;
    background-color: transparent;
    border: 1px solid #20a8d8;
    border-radius: 3px;
    user-select: none;
    margin-top: 2rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(32, 168, 216, 0.21);
    }

    &-name {
      color: #20a8d8;
      font-size: 11px;
      font-weight: 600;
    }

    &-title {
      flex: 1;
    }

    &-thumb {
      width: 38px;
      height: 38px;
      opacity: 0.37;
      background-color: #afbad4;
      border-radius: 8px;
    }

    &-details {
      color: #657089;
      font-size: 10px;
      font-weight: 500;
    }
  }
}
</style>
