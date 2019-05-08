export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'REPORTS',
      url: '/reports',
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
      url: '/inventory',
      icon: 'icon-cursor',
      children: [
        {
          name: 'New Employee',
          url: '/employees/new',
        }
      ]
    },
    {
      name: 'GET SUPPORT',
      url: '',
      icon: 'icon-pie-chart'
    }
  ]
}
