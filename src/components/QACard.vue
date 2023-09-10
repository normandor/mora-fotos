<template>
  <p class="m-0 p-0">
    <v-card flat rounded="lg" color="#eee" class="pb-6 pt-6">
      <v-row class="pa-6">
        <v-col
          cols="12"
        >
          <div class="feature-title">
            {{ question }}
          </div>
            <div class="feature-text">
              {{ answer }}
            </div>
        </v-col>
      </v-row>

    </v-card>

  </p>
</template>

<script>
export default {
  data: () => ({
    
  }),
  props: ['question', 'answer']
}

</script>

<style scoped>
.feature-title {
  text-align: left;
  font-size: 22px;
  font-weight: bold;
  white-space: pre-line;
  padding-bottom: 20px;
}
.feature-text {
  text-align: left;
  font-size: 16px;
  white-space: pre-line;
}


</style>