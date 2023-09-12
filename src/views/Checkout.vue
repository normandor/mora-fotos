<template>
  <v-container class="header-container pa-0">
    <v-row>
      <v-col cols="12" sm="8">
        <div class="col-12 col-sm-12">
          <div class="cart-title">Amount due: {{ totalAmountInEuros }} EUR</div>

          <form id="payment-form">
            <br>
            <div ref="paymentElement" id="payment-element">
              <!-- Elements will create form elements here -->
            </div>
            <br>
            <div id="error-message">
              <!-- Display error message to your customers -->
            </div>
          </form>
          
        </div>
        <v-card-actions>
    <v-btn
      v-if="totalAmountInEuros >= 0"
      id="submit"
      :loading="loading"
      block
      color="success"
      class="mt-3"
      elevation="2"
      rounded
      dark
      @click="Submit"
    >
      Pay
    <v-icon class="ml-2">mdi-basket</v-icon>
    </v-btn>
  </v-card-actions>
  <p>Note: payments are done via a 3rd party, no information about this payment or credit card is kept in our services.</p>
  <p>Run in the Stripe Shell

4242 4242 4242 4242
Payment requires authentication

4000 0025 0000 3155
Payment is declined

4000 0000 0000 9995</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import store from '../store'

const stripe = window.Stripe(
  process.env.VUE_APP_STRIPE_KEY
)

const options = {
  clientSecret: store.state.secret.clientSecret,
  // Stripe themes are fully customizable
  appearance: { theme: 'stripe' }
}
const elements = stripe.elements(options)

const paymentElement = elements.create('payment')

export default {
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    paymentElement.mount(this.$refs.paymentElement)
    paymentElement.on('change', (event) => {
      this.displayError(event)
    })
  },
  computed: {
    totalAmountInEuros() {
      return store.state.secret.totalAmountInCents / 100
    },
  },
  methods: {
    displayError(event) {
      const displayError = document.getElementById(
        'error-message'
      )
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    },
    async Submit () {
      this.loading = true
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: project final route thankyou.vue
          return_url: 'http://localhost:8080/#/thankyou/',
          shipping: {
            address: {
              city: this.city,
              line1: this.address,
              postal_code: this.zipcode,
              state: this.state,
              country: 'USA'
            },
            name: `${this.first_name} ${this.last_name}`,
            phone: this.phone
          }
        }
      })
      if (error) {
        this.loading = false
        const messageContainer = document.querySelector(
          '#error-message'
        )
        messageContainer.textContent = error.message
      } else {
        // Customer redirection to return_url.
      }
    }
  }

}
</script>

<style scoped>
.cart-title {
  font-size: 30px;
  text-align: center;
}
</style>