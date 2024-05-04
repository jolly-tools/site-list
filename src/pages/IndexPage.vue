<template>
  <q-page class="main-page">
    <div class="q-ml-md">
      <h1 class="text-h3 title q-mb-sm" v-html="config.title"></h1>
      <h2 class="text-h6" v-html="config.subtitle"></h2>
    </div>
    <q-toolbar >
      <q-select
        label="Category"
        stack-label
        emit-value
        map-options
        filled
        :options="categories"
        v-model="selectedCategory"
        class="col-auto"
        style="min-width: 150px;"
      >
      </q-select>
      <q-separator vertical spaced></q-separator>
      <q-select
        label="Tags"
        stack-label
        emit-value
        map-options
        filled
        multiple
        use-chips
        :options="tags"
        v-model="selectedTags"
        class="col"
      >
      </q-select>
    </q-toolbar>
    <SiteList></SiteList>
  </q-page>
</template>

<script>
import {computed, defineComponent, ref} from 'vue'
import SiteList from '../components/SiteList.vue'
import {useGlobalStore} from "stores/store";

export default defineComponent({
  name: 'IndexPage',
  props: {
  },
  components: {
    SiteList
  },
  setup(props) {
    const globalStore = useGlobalStore()
    const config = computed(() => globalStore.config)
    const categories = computed(() => [ {label: 'All categories', value: null}, ...globalStore.categories.map(c => ({label: c.title, value: c.slug}))])
    const selectedCategory = computed({
      get() {
        return globalStore.selectedCategory
      },
      set(cat) {
        globalStore.selectedCategory = cat
      }
    })
    const tags = computed(() => globalStore.tags)
    const selectedTags = computed({
      get() {
        return globalStore.selectedTags
      },
      set(tagList) {
        globalStore.selectedTags = tagList
      }
    })

    return {
      config,
      categories,
      selectedCategory,
      tags,
      selectedTags
    }
  }
})
</script>
<style lang="scss">
.main-page {
  width: 100%;
  max-width: 910px;
  margin: 0 auto;
}
</style>
