export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'REPORTS',
      url: '',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Change',
          url: '',
        },
        {
          name: 'Top 10 Reports',
          url: '',
        },
        {
          name: 'Zero Usage',
          url: '',
        },
        {
          name: 'Usage',
          url: '',
        },
        {
          name: 'International',
          url: '',
        }        
      ]
    },
    {
      name: 'INVENTORY',
      url: '',
      icon: 'icon-cursor',
      children: [
        {
          name: 'New Employee',
          url: '',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'GET SUPPORT',
      url: '',
      icon: 'icon-pie-chart'
    },
    {
      divider: true
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/vue/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    }
  ]
}
