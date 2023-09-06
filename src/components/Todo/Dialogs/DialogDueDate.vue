<template>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            :elevation=0
            :ripple=false
            class="button-calendar-open"
          >
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
        </template>
        <v-date-picker
          v-model="date"
          @input="saveDate"
        ></v-date-picker>
      </v-menu>
</template>

<script>
export default {
  data() {
    return {
      date: this.$store.state.task.dueDate,
      menu2: false,
    }
  },
  methods: {
    saveDate() {
      this.$store.dispatch('updateTaskDueDate', this.date)
      this.menu2 = false
    }
  },
  mounted() {
    if (this.$store.state.task.dueDate) {
      this.date = this.$store.state.task.dueDate
    }
  }
}
</script>

<style lang="sass">
  .button-calendar-open
    background-color: transparent !important
</style>