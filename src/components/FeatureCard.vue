<template>
  <p class="m-0 p-0">
    <v-card flat rounded="lg" color="#eee" class="pb-6 pt-6">
      <v-row class="pa-6">
        <v-col
          v-for="item in docs"
          :key="item.title"
          cols="4"
        >
          <div class="feature-title">
            {{ item.title }}
          </div>
            <div class="feature-text">
              {{ item.text }}
            </div>
        </v-col>
      </v-row>

    </v-card>

  </p>
</template>

<script>
export default {
  data: () => ({
    docs: [
      {
        title: 'Features',
        text: `The lessons are recommended for those who able to swim. 
            We make only one-on-one coaching with well-experienced surf instructors. The guide ensures safety and stay next to you all the time. Board rent provided.`,
      },
      {
        title: 'Pick up / drop off',
        text: `Our lessons take place in Playa Hermosa and Santa Teresa. If you stay in one of those places the surf guide can pick you up by car or meet you on the beach. If you stay in mal pais or other area around - send us request please and we give you details about pickup service from your place.`,
      },
      {
        title: 'Location',
        text: `Our beginner lessons take place in Playa Hermosa and Playa Santa Teresa. Sometimes, depending on the current ocean conditions, we can go to Playa Cabuya or Mar Azul break. Just send us request and we will give you all the details.`,
      },
      {
        title: 'Time',
        text: `The time of lesson depends on the ocean conditions and discussed with each guest individually. The duration of one lesson is around 1,5-2 hours.`,
      },
      {
        title: 'What to wear / bring',
        text: `swimsuit / swim trunks 
towel 
strong sunblock cream 
rash guard if you have 
        `,
      },
      {
        title: 'Photo and Video',
        text: `Upon request we can order a cameraman who make photos/ video from the beach. We also collaborate with photographers who make pictures in the water.`,
      }
    ]
    
  }),
  props: ['title', 'subtitle', 'priceBold', 'priceNormal', 'text']
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