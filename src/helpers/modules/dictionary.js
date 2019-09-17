const dict = {
    custom: {
      carrierInfo: {
          required: () => 'Required',
      },
      wirelessNo: {
          required: () => 'Required',
          numeric: () => 'Only Numbers'
      },
      accountName: {
          required: () => 'Required',
      },
      accountNumber: {
          required: () => 'Required',
          numeric: () => 'Only Numbers',
      },
      billingPassword: {
          required: () => 'Required',
      },
      transferType: {
          required: () => 'Required',
      },

    }
};

export { dict }

