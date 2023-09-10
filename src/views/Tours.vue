<template>
  <v-container class="main-container">
    <div class="page-title">
      <h1>SURF TOURS</h1>
      <h2>Best Surf Spots in the area</h2>
    </div>
    <p>
      We take surfers to any surf break around. In accordance with current ocean conditions and surfing experience.
    </p>

    <v-img class="mx-auto full-page-img" src="lessons_1.jpg" />

    <h2 class="vertical-margins strong">Prices</h2>
    <v-row class="p-0 m-0">
      <v-col class="p-0 m-0">
        <price-card
          title="Surf Spot Recommendation"
          subtitle="Driving"
          priceBold="50 USD"
          priceNormal=""
          text="We choose for you best break, bring you to the break, wait on the beach while you surf and drive you back.
Photo/Video Session - extra $50
Surfboard rental - extra $20"
        />
      </v-col>
      <v-col class="p-0 m-0">
        <price-card
          title="Surf Spot Recommendation"
          subtitle="Driving - Guiding in the water"
          priceBold="80 USD"
          priceNormal=""
          text="We choose for you best break, bring you to the break, wait on the beach while you surf and drive you back.
Photo/Video Session - extra $50
Surfboard rental - extra $20"
        />
      </v-col>
    </v-row>

    <p class="mt-10">
      Even if you know the name of surf spot and<br>
      have the point on the map it does not mean<br>
      you could easily find it and surf it. Let us bring<br>
      you to the best spots and guide you in the water,<br>
      we will make sure you catch as many waves as possible.
    </p>
    <p>
      If you book a surf tour for more than one person<br>
      we can arrange everything with you and photo/video<br>
      session in only charge ones.
    </p>
    <h2 class="vertical-margins strong">Why to take surf tour with guiding in the water?</h2>
    <feature-card-tours 
      type="tour"
      class="mt-6"
    />
  </v-container>
 
</template>

<script>
import { format } from 'date-fns';
import FeatureCardTours from '@/components/FeatureCardTours.vue';

export default {
  components: {
    'price-card': require('@/components/PriceCard.vue').default,
    'feature-card-tours': require('@/components/FeatureCardTours.vue').default
    ,
  },
  mounted() {
    this.$store.dispatch('setHeaderImage', '4.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
  }
}
</script>

<style scoped>
.full-page-img {
  width: 800px;
  margin-top: 60px;
  margin-bottom: 60px;
}

.v-card__title {
  display: block;
}

.card-title {
  font-size: 30px;
  padding-bottom: 20px;
}

.card-price {
  font-size: 22px;
  padding-bottom: 10px;
  font-weight: 300;
}

b.card-price {
  font-weight: 1000;
  font-size: 10px;
}

.card-text {
  font-size: 18px;
  padding-bottom: 20px;
  font-weight: 300;
}

</style>
