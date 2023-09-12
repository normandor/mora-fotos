<template>
  <p class="m-0 p-0">
    <v-card flat rounded="lg" color="#eee" width="480px" class="pl-4 pr-4 pb-6 pt-6">
      <div class="card-title">
        {{ title }}
      </div>
      <div class="card-subtitle">
        {{ subtitle }}
      </div>
      <div>
        <p class="card-text"><span class="strong">{{ priceBold }}</span> {{ priceNormal }}</p>
        <p class="card-text">{{ text }}</p>
      </div>

      <v-btn rounded color="primary" dark>
        Book now
      </v-btn>


    </v-card>

  </p>
</template>

<script>
export default {
  data: () => ({
  }),
  props: ['title', 'subtitle', 'priceBold', 'priceNormal', 'text']
}

</script>

<style scoped>
p {
  text-align: center;
  padding-bottom: 0px;
}

.v-card__title {
  display: block;
}

.card-title {
  font-size: 30px;
  padding-bottom: 10px;
}

.card-subtitle {
  font-size: 24px;
  padding-bottom: 20px;
}

.card-text {
  font-size: 20px;
  padding-bottom: 20px;

}
</style>