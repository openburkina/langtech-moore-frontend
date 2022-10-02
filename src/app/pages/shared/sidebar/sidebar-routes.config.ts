import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '/pages/home',
    title: 'Tableau de Bord',
    icon: 'bx bx-home-circle',
    class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], authorities: []
  },
  {
    path: '/pages/me-uploads',
    title: 'Sources de données',
    icon: 'bx bx-data', class: '', badge: '', badgeClass: '',
    isExternalLink: false,
    submenu: [],
    authorities: ['ROLE_USER']
  },
  {
    path: '/pages/me-demandes',
    title: 'Traductions',
    icon: 'bx bx-play-circle',
    class: '', badge: '', badgeClass: '',
    isExternalLink: false,
    submenu: [],
    authorities: ['ROLE_USER']
  },
  {
    path: '/pages/me-demandes',
    title: 'Contributeurs',
    icon: 'lni lni-users',
    class: '', badge: '', badgeClass: '',
    isExternalLink: false,
    submenu: [],
    authorities: ['ROLE_USER']
  },
  {
    path: '', title: 'Utilisateurs', icon: 'lni lni-users', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      {
        path: '/pages/users/create-update-user/null', title: 'Créer un utilisateur', icon: 'bx bx-user-plus', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], authorities: []
      },
      {
        path: '/pages/users', title: 'Liste des Utilisateurs', icon: 'lni lni-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], authorities: []
      },
      {
        path: '/pages/profils', title: 'Liste des Profils', icon: 'lni lni-unlink', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], authorities: []
      },
    ], authorities: ['ROLE_USER', 'ROLE_ADMIN']
  },
  {
    path: '', title: 'Paramètres', icon: 'bx bx-cog', class: 'sub',
    badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      {
        path: '/pages/parametres/categories', title: 'Catégories', icon: 'bx bx-category', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], authorities: []
      },
    ], authorities: ['ROLE_USER', 'ROLE_ADMIN']
  },
  {
    path: '', title: '', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], authorities: []
  },
  {
    path: '', title: 'Template Resources', icon: 'bx bx-transfer', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      {
        path: '', title: 'Dashboard', icon: 'bx bx-home-circle', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/pages/dashboard/default', title: 'Default', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/dashboard/alternate', title: 'Alternate', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ], authorities: []
      },
      {
        path: '', title: 'Application', icon: 'bx bx-category', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/application/email-app', title: 'Email', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/application/chat-box', title: 'Chat Box', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/application/file-manager', title: 'File Manager', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/application/contatcs', title: 'Contatcs', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/application/invoice', title: 'Invoice', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/application/calendar', title: 'Calendar', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      { path: '/pages/widgets', title: 'Widgets', icon: 'bx bx-cookie', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
      {
        path: '', title: 'eCommerce', icon: 'bx bx-cart', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/ecommerce/products', title: 'Products', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/ecommerce/products-details', title: 'Products Details', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/ecommerce/add-new-products', title: 'Add New Products', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/ecommerce/orders', title: 'Orders', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '', title: 'Components', icon: 'bx bx-bookmark-heart', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/components/alerts', title: 'Alerts', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/badge', title: 'Badge', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/buttons', title: 'Buttons', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/cards', title: 'Cards', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/carousel', title: 'Carousel', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/acordians', title: 'Accordion', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/list-groups', title: 'List Groups', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/media-objects', title: 'Media Objects', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/modals', title: 'Modals', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/navs', title: 'Navs', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/navbar', title: 'Navbar', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/pagination', title: 'Pagination', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/progress-bar', title: 'Progress Bars', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/spinners', title: 'Spinners', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/components/avtars-chips', title: 'Avatrs & Chips', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '', title: 'Content', icon: 'bx bx-repeat', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/content/grid-system', title: 'Grid System', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/content/typography', title: 'Typography', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/content/text-utilities', title: 'Text Utilities', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '', title: 'Icons', icon: 'bx bx-donate-blood', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/icons/line-icons', title: 'Line Icons', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/icons/boxicons', title: 'Boxicons', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '', title: 'Form', icon: 'bx bx-message-square-edit', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/form/form-elements', title: 'Form Elements', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/input-groups', title: 'Input Groups', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/form-layouts', title: 'Forms Layouts', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/form-validation', title: 'Form Validation', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/form-wizard', title: 'Form Wizard', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/text-editor', title: 'Text Editor', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/file-upload', title: 'File Upload', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/form/select2', title: 'Select2', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '/pages/table/table', title: 'Table', icon: 'bx bx-grid-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
      },
      {
        path: '', title: 'Authentication', icon: 'bx bx-lock', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [

          { path: '/auth/sign-in', title: 'Sign In', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/auth/sign-up', title: 'Sign Up', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/auth/signin-with-header-footer', title: 'SignIn With Header Footer', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/auth/signup-with-header-footer', title: 'SignUp With Header Footer', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/auth/forgot-password', title: 'Forgot Password', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/auth/reset-password', title: 'Reset Password', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/auth/lock-screen', title: 'Lock Screen', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

        ]
      },
      { path: '/pages/user-profile', title: 'User Profile', icon: 'bx bx-user-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
      { path: '/pages/timeline', title: 'Timeline', icon: 'bx bx-video-recording', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
      {
        path: '', title: 'Errors', icon: 'bx bx-error', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/error/error-404', title: '404 Error', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/error/error-500', title: '500 Error', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/error/coming-soon', title: 'Coming Soon', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
      },
      { path: '/pages/faq', title: 'FAQ', icon: 'bx bx-help-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/pricing', title: 'Pricing', icon: 'bx bx-diamond', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/earnings', title: 'Earnings', icon: 'bx bx-dollar-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/pages/downloads', title: 'Downloads', icon: 'bx bx-download', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      {
        path: '', title: 'Charts', icon: 'bx bx-line-chart', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/charts/apex-chart', title: 'Apex Charts', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/charts/chartjs', title: 'ChartJs', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/charts/highcharts', title: 'Highcharts', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '', title: 'Maps', icon: 'bx bx-map-alt', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/pages/maps/google-maps', title: 'Google Maps', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/pages/maps/fullscreen', title: 'Fullscreen Map', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: 'javascript:;', title: 'Menu Levels', icon: 'bx bx-menu', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: 'javascript:;', title: 'Level 1', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: 'javascript:;', title: 'Level 1', icon: 'bx bx-right-arrow-alt', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
            submenu: [
              { path: 'javascript:;', title: 'level 2', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
              { path: 'javascript:;', title: 'level 2', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            ] },
        ]
      },
      { path: 'https://codervent.com/rocker-angular/demo/vertical/docs/', title: 'Documentation', icon: 'bx bx-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: 'https://themeforest.net/user/codewrrap/portfolio', title: 'Support', icon: 'bx bx-support', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
    ], authorities: []
  },
];
