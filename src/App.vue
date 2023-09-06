<template>
  <v-app id="inspire">
    <app-header></app-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { format } from 'date-fns';

export default {
  data: () => ({
    date: null,
    dialogs: {
      edit: false,
      delete: false,
      dueDate: true
    },
    items: [
      { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
    scrollPosition: null
  }),
  computed: {
    dueDate() {
      return this.$store.state.task.dueDate
    }
  },
  mounted() {
    if (!this.$store.state.task.dueDate) {
      this.$store.state.task.dueDate = null // format(new Date(), 'yyyy-MM-dd');
      this.date = this.$store.state.task.dueDate
    }
  },
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d yyy');
    }
  },
  components: {
    'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
    'app-header': require('@/components/AppHeader.vue').default,
  }
}
</script>

<style lang="sass" scoped>

</style>