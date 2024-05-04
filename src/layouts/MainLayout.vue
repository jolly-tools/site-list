<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <q-header bordered>
      <q-toolbar
        class="bg-grey-2 text-black"
      >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{name}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Categories
        </q-item-label>

        <CategoryLink
          v-for="category in categories"
          :key="category.slug"
          v-bind="category"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useGlobalStore } from "stores/store";
import CategoryLink from 'components/CategoryLink.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    CategoryLink
  },

  setup () {
    const globalStore = useGlobalStore()
    const name = computed(() => globalStore.config.name)
    const categories = computed(() => globalStore.categories)
    const leftDrawerOpen = ref(false)

    return {
      name,
      categories,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
