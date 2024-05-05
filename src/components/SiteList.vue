<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-btn
      flat
      no-caps
      unelevated
      :to="`/sites/${site.slug}`"
      v-for="site in siteList"
      :key="site.name"
      class="q-pa-none"
    >
      <q-card
        class="site-card q-pa-md q-hoverable"
        flat
        bordered
        v-ripple
      >
        <span class="q-focus-helper"></span>
        <q-item class="q-pa-sm">
          <q-item-section avatar>
            <q-avatar
              square
              v-shared-element:[`logo-${site.slug}`]
            >
              <img :src="site.logo">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1 text-bold">
              <span v-shared-element:[`name-${site.slug}`]="{compositeOnly:true}">{{site.name}}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced></q-separator>
        <q-card-section class="q-pa-sm site-description ellipsis-3-lines">
          <span>{{ site.description }}</span>
        </q-card-section>
        <q-card-section class="q-px-sm">
          <q-list dense>
            <q-item
              v-for="prop in filterArrayByKeys(properties,'slug',site.properties)"
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
      </q-card>
    </q-btn>
  </div>
</template>
<script>
import {useGlobalStore} from "stores/store";
import {defineComponent, computed} from 'vue'
import {filterArrayByKeys} from '../services/utils'

export default defineComponent({
  name: 'SiteList',
  components: {
  },
  props: {
  },
  setup(props) {
    const globalStore = useGlobalStore()
    const tagList = computed(() => globalStore.selectedTags)
    const selectedCategory = computed(() => globalStore.selectedCategory)
    const siteList = computed(() => {
      const list = selectedCategory.value ? globalStore.siteList.filter(s => s.categories.includes(selectedCategory.value)) : globalStore.siteList
      if (tagList.value.length) {
        return list.filter(site => site.tags.some(t => tagList.value.includes(t)))
      }
      return list
    })
    const properties = computed(() => globalStore.properties)
    return {
      siteList,
      properties,
      filterArrayByKeys
    }
  }
})
</script>

<style lang="scss">
  .site-card {
    width: 100%;
    max-width: 280px;
    .site-description {
      max-height: 75px;
      overflow: hidden;
    }
    .prop-line {
      padding: 0 !important;
      .prop-value {
        font-family: 'CrimsonText';
        //font-size: 1.1em;
        font-weight: bold;
      }
    }
    &.q-hoverable:hover > .q-focus-helper {
      opacity: 0.08 !important;
      box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.5)
    }
  }
</style>
