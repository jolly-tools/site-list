
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        name: 'allSites',
        component: () => import('pages/IndexPage.vue'),
      },
      { path: '/categories/:category',
        name: 'category',
        component: () => import('pages/IndexPage.vue'),
      },
      { path: '/sites/:site',
        name: 'site',
        component: () => import('pages/SitePage.vue'),
        props: route => ({ siteSlug: route.params.site })
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
