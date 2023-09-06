<template>
  <div class="home">
    <list-tasks v-if="$store.state.tasks.length" />
    <no-tasks v-else />
    <button-done-sorting
      v-if="$store.state.sorting"
    />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    'button-done-sorting': require('@/components/Todo/ButtonDoneSorting.vue').default,
    'list-tasks': require('@/components/ListTasks.vue').default,
    'no-tasks': require('@/components/Todo/NoTasks.vue').default,
  },
}
</script>
