<template>
  <q-page class="main-page">
    <q-item class="q-px-none">
      <q-item-section side>
        <q-avatar square v-shared-element:[`logo-${site.slug}`]>
          <img :src="site.logo">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <h3 class="text-h4 title">
          <span v-shared-element:[`name-${site.slug}`]>{{site.name}}</span>
        </h3>
      </q-item-section>
    </q-item>
    <div class="row reverse q-col-gutter-md">
      <div class="col-md-5 col-12 justify-center">
        <q-card
          class="site-card full-width q-pa-sm rounded-borders"
          flat
          bordered
          style="position:sticky; top:60px;"
        >
          <h4 class="text-subtitle1 q-pa-none q-my-none">Details</h4>
          <q-card-section class="q-px-sm">
            <q-list dense>
              <q-item
                v-for="prop in properties"
                :key="prop.slug"
                class="prop-line"
              >
                <q-item-section side>
                  <q-icon :name="prop.icon" size="xs"/>
                </q-item-section>
                <q-item-section class="text-sm">{{ prop.label }}</q-item-section>
                <q-item-section side class="prop-value">{{site.properties[prop.slug]}}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions class="q-px-sm">
            <q-btn
              v-for="btn in sideButtons"
              :key="btn.key"
              v-bind="btn"
              :href="site.urls[btn.key]"
            ></q-btn>
          </q-card-actions>
          <q-separator></q-separator>
          <div class="text-subtitle2 q-pa-none q-my-none">Categories</div>
          <q-card-section class="q-px-sm row q-gutter-sm">
            <q-chip
              v-for="category in categories"
              :key="category.slug"
              outline
              color="grey-9"
              clickable
              @click="$router.push(`/categories/${category.slug}`)"
              :icon="category.icon"
              dense
            >
              {{category.title}}
            </q-chip>
          </q-card-section>
          <q-separator></q-separator>
          <div class="text-subtitle2 q-pa-none q-my-none">Tags</div>
          <q-card-section class="q-px-sm row q-gutter-sm">
            <q-chip
              v-for="tag in site.tags"
              :key="tag"
              outline
              color="grey-9"
              icon="las la-hashtag"
              clickable
              @click="selectTag(tag)"
              dense
            >
              {{tag}}
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <p class="text-body1">{{site.description}}</p>
        <div class="row q-gutter-md">
          <q-btn
            v-for="btn in mainSectionButtons"
            :key="btn.key"
            v-bind="btn"
            :href="site.urls[btn.key]"
          ></q-btn>
        </div>
        <div class="row q-my-md" v-for="image in site.screenshots" :key="image.url">
          <q-img
            width="100%"
            :src="image.url"
            :alt="image.alt || (site.name + ' screenshot')"
          ></q-img>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import {computed, defineComponent} from 'vue'
import {useGlobalStore} from "stores/store";
import {buildMetaTags, filterArrayByKeys} from '../services/utils'
import { useMeta } from 'quasar'


export default defineComponent({
  name: 'IndexPage',
  props: {
      siteSlug: {
        type: String,
        default: null
      }
  },
  components: {

  },
  setup(props) {
    const globalStore = useGlobalStore()
    const site = computed(() => globalStore.siteMap[props.siteSlug])
    const metaTags = buildMetaTags(globalStore.seoConfig.sitePage, {site: site.value, categories: globalStore.categoriesMap, siteConfig: globalStore.config})
    useMeta(metaTags.tags)
    const properties = computed(() => filterArrayByKeys(globalStore.properties, 'slug', site.value.properties))
    const categories = computed(() => globalStore.categories.filter(c => site.value.categories.includes(c.slug)))
    const actions = computed(() => filterArrayByKeys(globalStore.actions, 'key', site.value.urls ?? {}))
    const mainSectionButtons = computed(() => actions.value.filter(a => a.showOn.includes('site-page')))
    const sideButtons = computed(() => actions.value.filter(a => a.showOn.includes('site-page-side')))
    function selectTag(tag) {
      globalStore.selectedTags = [tag]
    }
    return {
      site,
      categories,
      selectTag,
      properties,
      mainSectionButtons,
      sideButtons
    }
  }
})
</script>
<style lang="scss" scoped>
.main-page {
  width: 100%;
  max-width: 910px;
  margin: 0 auto;
  .site-card {
    width: 100%;
    max-width: 100%;
    //max-width: calc(100% - 16px);
    //max-width: 300px;
  }
}
</style>
