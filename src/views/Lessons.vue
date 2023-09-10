<template>
  <v-container class="main-container">

    <div class="page-title">
      <h1>SURF LESSONS</h1>
      <h2>Santa Teresa and Playa Hermosa</h2>
    </div>

    <div class="divider"></div>

      <p>
        We will coordinate with you best time and place to<br>
        surf according to your surfing skills and ocean conditions.
      </p>
      <p>
        We work individually with each guest<br>
        and collaborate with best local instructors<br>
        to make your holidays memorable.
      </p>


    <v-img class="mx-auto full-page-img" src="lessons_1.jpg" />
    <h2 class="vertical-margins strong">Prices</h2>
    <v-row class="p-0 m-0">
      <v-col class="p-0 m-0">
        <price-card
          title="Beginner"
          subtitle="Santa Teresa and Playa Hermosa"
          priceBold="70 USD"
          priceNormal="per person"
          text="one lesson for one person
                personal instructor
                board rent included
                pick up/drop off by car in Hotel - no extra charge
                photos - extra $30"
        />
      </v-col>
      <v-col class="p-0 m-0">
        <price-card
          title="Advanced"
          subtitle="Santa Teresa and Playa Hermosa"
          priceBold="70 USD"
          priceNormal="per person"
          text="one lesson for one person
                personal instructor
                board rent included
                pick up/drop off by car in hotel - no extra charge
                photos - extra $30"
        />
      </v-col>
    </v-row>

    <v-row class="m-0 p-0">
      <v-col class="p-0 m-0">
        <price-card
          title="3 LESSONS BEGINNER"
          subtitle="Santa Teresa and Playa Hermosa"
          priceBold="180 USD"
          priceNormal="per person"
          text="3 lessons in different days for one person
                personal instructor
                board rent included
                pick up/drop off by car - no extra charge
                photos - extra $30 per session"
        />
      </v-col>
      <v-col class="p-0 m-0">
        <price-card
          title="5 LESSONS BEGINNER"
          subtitle="Santa Teresa and Playa Hermosa"
          priceBold="250 USD"
          priceNormal="per person"
          text="5 lessons in different days for one person
                personal instructor
                board rent included
                pick up/drop off by car - no extra charge
                photos - extra $30 per session"
        />
      </v-col>
    </v-row>

    <h2 class="vertical-margins strong">Our local surf guides</h2>
    <p>
      • Instructors have more than 10 years experience<br>
      of teaching both adults and kids
      <br>• We always follow safety rules and surf etiquette
      <br>• We speak English fluently
      <br>• We are easy going and friendly guys
    </p>

    <feature-card 
      class="mt-6"
    />
    
    <v-img class="mx-auto full-page-img" src="10.jpg" />

    <qa-card
      class="mt-10"
      question="Can I use the board after lesson?"
      answer="`Surfboard rent is included only during your lesson. If you want to use it after the lesson there will be additional charge - 20 USD. Just let us know and we will organize it.`"
    />
  
    <qa-card
      class="mt-6"
      question="Why you should take a personal surf instructor?"
      answer="`Your surf instructor will choose waves suitable for your level and experience 
Your learning process is specifically designed to meet your needs depending on your experience and wishes 
Personal coach give you access to waves despite the crowds of surfers around, so you ride much more waves, get intensive practice and improve your surf skills at fastest rate 
During the session after each wave your guide give you some tips how to improve your technique 
You feel confident in the water because your surf guide is always by you ready to assist`"
    />

  </v-container>
</template>

<script>
import { format } from 'date-fns';

export default {
  components: {
    'price-card': require('@/components/PriceCard.vue').default,
    'feature-card': require('@/components/FeatureCard.vue').default,
    'qa-card': require('@/components/QACard.vue').default,
  },
  mounted() {
    this.$store.dispatch('setHeaderImage', '2.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
  }
}
</script>

<style scoped>

.full-page-img {
  width: 800px;
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
