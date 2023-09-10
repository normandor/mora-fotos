<template>
  <p class="m-0 p-0">
    <v-card flat rounded="lg" color="#eee" class="pb-6 pt-6">
      <v-row class="pa-6">
        <v-col
          v-for="item in docs"
          :key="item.title"
          cols="6"
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
        title: 'Best break recommendation',
        text: `You need left or righthand waves? Barreled or easy fun waves? Small or big? Reef or sand bottom? – Just text us and explain about your wishes and experience and we'll choose the best option for you according to the expected ocean conditions.`,
      },
      {
        title: 'Need to improve surfing skills',
        text: `You feel not confident in the new waves, afraid of reefs or stones, want to try faster waves or to learn basic surfing maneuvers (bottom turn, cut back). Or you have difficulties in choosing right position in the lineup and making take off- then the surf guide in the water is the best way to get good surfing practice and improve your skills.`,
      },
      {
        title: 'Feeling comfortable',
        text: `Although Santa Teresa and Playa Hermosa are known for its hospitality and friendly vibe, surf localism happens here as well. You could feel unwelcome in some surf breaks and that's why skip most waves. So let your local guide be your buddy and give you access to waves.`,
      },
      {
        title: 'Feeling safe',
        text: `Strong current, shallow reef bottom, too much white water – never know what to expect in the new surf break. The guide will explain to you all breaks features and help in any case. As always surf alone in unknown place is not good idea.
Don’t loose time looking around for waves, we know where to go.`,
      },
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