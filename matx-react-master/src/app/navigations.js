export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },
  {
    name: 'User Settings',
    icon: 'security',
    children: [
      // { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      // { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' },
    ],
  },
  { label: 'Actions', type: 'label' },
  {
    name: 'Expand',
    icon: 'assistant_photo',
    badge: { value: '', color: 'secondary' },
    children: [
      { name: 'Trust Funds', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Deposit', path: '/material/buttons', iconText: 'B' },
      { name: 'Withdraw', path: '/material/checkbox', iconText: 'C' },
      { name: 'Mutual Funds', path: '/material/dialog', iconText: 'D' },
      { name: 'Fixed Deposit', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Loans', path: '/material/form', iconText: 'F' },
      { name: 'Insurance', path: '/material/icons', iconText: 'I' },
      // { name: 'Menu', path: '/material/menu', iconText: 'M' },
      // { name: 'Progress', path: '/material/progress', iconText: 'P' },
      // { name: 'Radio', path: '/material/radio', iconText: 'R' },
      // { name: 'Switch', path: '/material/switch', iconText: 'S' },
      // { name: 'Slider', path: '/material/slider', iconText: 'S' },
      // { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      // { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },

  {label: 'CrowdFunds', type: 'label'},
  {
    name: 'Add Yours',
    icon: 'edit',
    path: '/material/form',
  },


  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  // },
];
