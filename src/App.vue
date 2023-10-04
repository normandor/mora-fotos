<template>
  <v-app id="inspire">
    <app-header></app-header>
    <v-main>
      <router-view></router-view>
    </v-main>
    <app-footer class="mt-10"/>
  </v-app>
</template>

<script>
import { format } from 'date-fns';

export default {
  data: () => ({
    date: null,
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
    scrollPosition: null
  }),
  computed: {
    selectedDate() {
      return this.$store.state.selectedDate
    }
  },
  mounted() {
    if (!this.$store.state.selectedDate) {
      this.$store.state.selectedDate = null // format(new Date(), 'yyyy-MM-dd');
      this.date = this.$store.state.selectedDate
    }
    this.$store.dispatch('getItems')
  },
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d yyy');
    }
  },
  components: {
    'app-header': require('@/components/AppHeader.vue').default,
    'app-footer': require('@/components/AppFooter.vue').default,
  }
}
</script>

<style lang="sass" scoped>

</style>