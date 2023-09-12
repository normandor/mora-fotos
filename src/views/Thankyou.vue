<template>
  <v-container class="main-container">
  <div class="page-title">
    <h1>Thank you</h1>
    <p>Your order was successfully placed, you'll receive the images shortly in your email address: xxx@xxx.com</p>
  </div>    
</v-container>
</template>

<script>

export default {
 // mounted
 async mounted () {
      const stripe = window.Stripe(
        process.env.VUE_APP_STRIPE_KEY
      )
      const clientSecret = new URLSearchParams(
        window.location.search
      ).get(
        'payment_intent_client_secret'
      )
      const {
        paymentIntent, error
      } = await stripe.retrievePaymentIntent(
        clientSecret
      )
      if (error) {
        console.log(error)
        this.message = 'An error has ocurred'
      }
      if (paymentIntent.status === 'succeeded') {
        this.message = paymentIntent.status
        const payment_id = paymentIntent.id
        this.$store.dispatch('checkout', { payment_id })
          .catch((_err) => {
            this.loading = false
            const show = true
            const color = 'red darken-3'
            const text = 'An error has ocurred'
            console.log(text, _err)
          })
      } else {
        this.message = paymentIntent.status
      }
    }
    
}
    
</script>
