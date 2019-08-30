<template>
  <b-modal
    modal-class="confirm-modal"
    size="lg"
    id="confirm-modal"
    :visible="visible"
    :hide-header="true"
    :hide-footer="true"
  >
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Thank You!</h1>
          <p>
            Your order has been submitted.
            <br />We've sent you a confirmation email.
          </p>
          <b-btn variant="default" @click="closeModal">Got it!</b-btn>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ConfirmModal",

  props: ["visible"],

  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.confirm-modal {
  font-family: Montserrat;

  .modal-body {
    padding: 3rem;
  }

  .modal-content {
    border-radius: 0;
    border-width: 0;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
  }

  p {
    color: #1f2027;
    font-size: 12px;
    line-height: 21px;
    margin-top: 17px !important;
  }

  button {
    margin-top: 53px;
    padding: 6px 25px;
    font-size: 12px;
  }
}
</style>
