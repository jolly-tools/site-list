import { defineStore } from 'pinia';
import _config from '../../data/site-config.json'
import _siteList from '../../data/site-list.json'
import _categories from '../../data/categories.json'
import _properties from '../../data/properties.json'
import _seoConfig from '../../data/seo-config.json'
import _actions from '../../data/actions.json'

import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()
  // const routerStore = useRouterStore()
  // const router = routerStore.router
  const seoConfig = computed(() => _seoConfig)
  const properties = computed(() => _properties)
  const categories = computed(() => _categories)
  const categoriesMap = computed(() => _categories.reduce((obj, item) => (obj[item.slug] = item, obj) ,{}))
  const siteList = computed(() => _siteList)
  const config = computed(() => _config)
  const actions = computed(() => _actions)
  const siteMap = computed(() => siteList.value.reduce(function(map, site) {
      map[site.slug] = site
      return map;
    }, {})
  )

  const tagSet = siteList.value.reduce(function (set, site) {
    for (const tag of site.tags) {
      set.add(tag)
    }
    return set
  }, new Set())
  const tags = ref(Array.from(tagSet.values()).sort())

  const _selectedCategory = ref(null)
  const _selectedTags = ref([])
  const selectedCategory = computed({
    get() {
      return _selectedCategory.value
    },
    set(cat) {
      if (cat === _selectedCategory.value) {
        return
      }
      _selectedCategory.value = cat
      router.push(buildUrl({category: _selectedCategory.value, tags:_selectedTags.value}))
    }
  })
  const selectedTags = computed({
    get() {
      return _selectedTags.value
    },
    set(tags) {
      if (_selectedTags.value.join(',') === (tags || []).join(',')) {
        return
      }
      _selectedTags.value = tags || []
      router.push(buildUrl({category: _selectedCategory.value, tags:_selectedTags.value}))
    }
  })
  const addTag = tag => {
    _selectedTags.value.push(tag)
    router.push(buildUrl({category: _selectedCategory.value, tags:_selectedTags.value}))
  }
  const removeTag = tag => {
    const idx = _selectedTags.value.indexOf(tag)
    if (idx >= 0) {
      _selectedTags.value.splice(idx, 1)
      router.push(buildUrl({category: _selectedCategory.value, tags: _selectedTags.value}))
    }
  }

  // router.afterEach((to) => {
  //   if (to.query.tags && selectedTags.value.join(',') !== to.query.tags) {
  //     selectedTags.value = to.query.tags.split(',')
  //   }
  //   if (to.params.category && selectedCategory.value !== to.params.category) {
  //     selectedCategory.value = to.params.category
  //   }
  // })

  return {
    config,
    siteList,
    siteMap,
    categories,
    categoriesMap,
    properties,
    seoConfig,
    actions,
    selectedCategory,
    tags,
    selectedTags,
    addTag,
    removeTag
  }
});



function buildUrl({category, tags}) {
  let path = '/'
  if (category) {
    path += `categories/${category}`
  }
  if (tags?.length) {
    path += `?tags=${tags.join(',')}`
  }
  return path
}
