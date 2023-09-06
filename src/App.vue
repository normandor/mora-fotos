<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark prominent :height="'220px'" src="mountains.jpeg">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.7)"></v-img>
      </template>

      <v-container class="header-container pa-0 pt-6 pr-8">
        <v-row>
          <v-app-bar-title class="text-h4 ml-4">{{ $store.state.appTitle }}</v-app-bar-title>
          <v-spacer></v-spacer>
          <div>
            <v-btn to="/" class="text-none mr-2" stacked icon>
              <v-icon>
                mdi-home-outline
              </v-icon>
            </v-btn>

            <v-btn to="/info" class="text-none mr-2" stacked icon>
              <v-icon>
                mdi-information-outline
              </v-icon>
            </v-btn>
            
            <v-btn class="text-none mr-2" stacked icon>
              <v-icon>
                mdi-flag-outline
              </v-icon>
            </v-btn>

            <v-btn class="text-none mr-2" stacked icon>
              <v-badge color="green" :content="12" offset-x="12px" offset-y="32px">
                <v-icon>
                  mdi-cart-outline
                </v-icon>
              </v-badge>
            </v-btn>
          </div>
        </v-row>

        <v-row v-if="$route.path === '/'" class="subtitle ml-1" align="baseline">
          <div v-if="$store.state.task.dueDate">
            Fecha: {{ dueDate | niceDate }}
            <v-btn @click="$store.state.task.dueDate = null" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <div v-else>
            Fecha: (ninguna)
          </div>

          <div class="date-picker">
            <dialog-due-date v-if="dialogs.dueDate">
            </dialog-due-date>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>

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
    //this.$store.dispatch('getTasks');
  },
  filters: {
    niceDate(value) {
      return format(new Date(value), 'MMM d yyy');
    }
  },
  components: {
    'dialog-due-date': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
  }
}
</script>

<style lang="sass">
  .header-container
    max-width: none !important
  .date-picker
    max-width: 120px
    .v-text-field > .v-input__control > .v-input__slot:before
    .v-text-field > .v-input__control > .v-input__slot:after
      border-style: none !important
  .shopping-cart-counter
    transform: translate(-20px, 30px)
  .v-app-bar-title__content
    min-width: 400px
  .subtitle
    font-size: 1.5rem !important
      
</style>