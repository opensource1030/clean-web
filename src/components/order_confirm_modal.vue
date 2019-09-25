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
        <div class="col pt-4 pl-3 pr-0">
          <div class="confirm-modal-thankyou-message">Thank You!</div>
          <p>
            Your order has been submitted.
            <br />We've sent you a confirmation email.
          </p>
          <b-btn variant="default" @click="closeModal">Got it!</b-btn>
        </div>
        <div class="col p-0">
          <img src="@/assets/images/confirm_modal_thank.svg" alt="Thank you" />
        </div>
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
    padding: 2rem 0rem 0rem 2rem;
  }

  .modal-content {
    border-radius: 0;
    border-width: 0;
  }

  &-thankyou-message {
    color: #1f2027;
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

@media (min-width: 992px) {
  .confirm-modal {
    .modal-lg,
    .modal-xl {
      max-width: 700px;
    }
  }
}
</style>
