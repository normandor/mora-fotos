<template>
  <v-container class="main-container">

  <div class="page-title">
    <h1>SURF LESSONS & TOURS</h1>
    <h2>Santa Teresa, Costa Rica</h2>
  </div>
  <p>
    Our lessons are taught by experienced, certified instructorswho will take you 
    step-by-step through the basics of surfing. We’ll teach you how to stand up on 
    your board, paddle, and catch waves.
  </p><p>We’ll also teach you about the different types of waves and how to choose
    the right one for your level.
  </p><p>Our lessons are small and personalized, so you will get plenty of attention
    from your instructor.
  </p><p>After your lesson, you will be able to surf independently and enjoy the waves.
  </p><p class="pb-12">We provide best surfing experience for beginners
    and experienced surfers, for adults and kids, for couples and families.
  </p><p>Perfect waves for all levels and beautiful scenery and relax atmosphere.
  </p>

  <v-row>
      <v-col cols="12" md="6">
        <promo-card title="SURF LESSONS" link="/lessons" img="1.jpg"></promo-card>
      </v-col>
      <v-col cols="12" md="6">
        <promo-card title="SURF TOURS" link="/tours" img="2.jpg"></promo-card>
      </v-col>
    </v-row>

 </v-container>
</template>

<script>
export default {
  components: {
    'promo-card': require('@/components/PromoCard.vue').default,
  },
  mounted() {
    this.$store.dispatch('setHeaderImage', '1.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
  }
}
</script>

<style scoped>
p {
  padding-bottom: 20px;
}
</style>