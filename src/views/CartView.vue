<template>
  <v-container class="header-container pa-0">
    <v-row>
      <v-col cols="12" sm="8">
        <div class="col-12 col-sm-12">
          <div class="cart-title">Shopping Cart ({{ cartCount }} items)</div>
          <hr>
          <v-main class="container">
            <v-container class="bg-surface-variant">
              
              <div class="small-screen-only">
              <table width="100%" style="table-layout: fixed">
                <tr style="color: grey">
                  <td>
                    ITEM
                  </td>
                  <td>
                    QTY
                  </td>
                  <td>
                    PRICE
                  </td>
                  <td>
                    TOTAL
                  </td>
                </tr>
                <tr
                  style="vertical-align: middle;"
                  v-for="item in this.$store.state.cartItems" :key="item.id"
                >
                <td>
                  <img :src="item.url" width="100%">
                    {{ item.name }}
                  </td>
                  <td style="white-space: nowrap;">
                    <v-btn icon @click="removeOneFromItemList(item)">
                      -
                    </v-btn>
                    {{ item.qty }}
                    <v-btn icon @click="addOneToItemList(item)">
                      +
                    </v-btn>
                  </td>
                  <td>
                    {{ item.price }}
                  </td>
                  <td>
                    {{ item.price * item.qty }} {{ currency }}
                  </td>
                </tr>
              </table>
            </div>

              <v-row class="large-screen-only mb-6" no-gutters>
                <v-col align="right">
                  <v-sheet class="pa-0 ma-0">
                    <div class="grey--text strong">ITEM</div>
                  </v-sheet>
                </v-col>

                <v-col style="" align="center" class="large-screen-only">
                  <v-sheet class="pa-0 ma-0">
                    &nbsp;
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-0 ma-0">
                    <div class="grey--text strong">QTY</div>
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-0 ma-0">
                    <div class="grey--text strong">PRICE</div>
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-0 ma-0">
                    <div class="grey--text strong">TOTAL</div>
                  </v-sheet>
                </v-col>
              </v-row>

              <v-row class="large-screen-only mb-6" no-gutters v-for="item in this.$store.state.cartItems" :key="item.id">
                <v-col align="center">
                  <v-sheet class="pa-2 ma-2">
                    <v-img width="100" :src="item.url" />
                    <div class="small-screen-only">
                      {{ item.name }}
                    </div>
                  </v-sheet>
                </v-col>

                <v-col class="large-screen-only">
                  <v-sheet class="pa-2 ma-2 pt-3">
                    {{ item.name }}
                  </v-sheet>
                </v-col>


                <v-col align="center">
                  <v-sheet class="float-right" style="white-space: nowrap;">
                    <v-btn style="font-size: 8px;" icon @click="removeOneFromItemList(item)">
                      -
                    </v-btn>
                    {{ item.qty }}
                    <v-btn icon @click="addOneToItemList(item)">
                      +
                    </v-btn>
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-2 ma-2 pt-3">
                    {{ item.price }} {{ item.currency }}
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-2 ma-2 pt-3">
                    {{ item.price * item.qty }} {{ item.currency }}
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-main>

        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="ml-2 mr-2" style="position: sticky; top: 120px;">
          <v-sheet min-height="268" color="#eee">
            <template>
              <div class="pa-4">
              <p class="pa-0 ma-0 left underline">
                Order summary
              </p>
              <div class="border-bottom"></div>
            </div>
              <v-container>

                <v-row>
                  <v-col class="pl-4 pr-4" cols="6">Items: {{ cartCount }}</v-col>
                  <v-col align="right" cols="6">{{ amountSum }} USD</v-col>
                </v-row>
                <v-row>
                  <v-col class="pl-4 pr-4" cols="12" md="12">
                  <v-btn
                    class="mt-8 white--text"
                    color="green"
                    block
                    :disabled="cartCount == 0"
                    @click="paymentIntent"
                  >
                    CHECKOUT
                  </v-btn>
                </v-col>
                </v-row>
              </v-container>
            </template>


          </v-sheet>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.state.cartItems.forEach(item => {
      if (item.qty === 0) {
        this.$store.dispatch('removeItemFromCart', item)
      }
    })
  },
  mounted() {
    this.$store.dispatch('setHeaderImage', '4.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
  },
  computed: {
    cartCount() {
      let total = 0
      this.$store.state.cartItems.forEach(item => {
        total += item.qty
      })
      return total
    },
    amountSum() {
      let total = 0
      this.$store.state.cartItems.forEach(item => {
        total += item.qty * item.price
      })
      return total
    },
    currency() {
      if (this.$store.state.cartItems.length > 0) {
        return this.$store.state.cartItems[0].currency
      }
      
      return ''
    }
  },
  methods: {
    addOneToItemList(item) {
      this.$store.dispatch('addQtyToItem', item)
    },
    removeOneFromItemList(item) {
      if (item.qty > 0) {
        this.$store.dispatch('substractQtyFromItem', item)
      }
    },
    paymentIntent () {
      this.$store.dispatch('paymentIntent')
        .catch((_err) => {
          this.loading = false
          const show = true
          const color = 'red darken-3'
          const text = 'Server Error, try again later!'
          console.log(_err)
        })
    }
  }
}
</script>

<style scoped>
td {
  text-align: center;
  padding-top: 30px;
}
.cart-title {
  font-size: 30px;
}

.large-screen-only {
  @media (max-width: 760px) {
    display: none;
  }
  @media (min-width: 760px) {
    display: flex;
  }
}

.align-right {
  text-align: right;
}

.table-header {
  padding-top: 30px;
}

.sticky-top {
  position: sticky;
  top: 0;
}

.left {
  text-align: left;
}
.border-bottom {
  border-bottom: 1px solid gray;
}

.small-screen-only {
  @media (max-width: 760px) {
    display: flex;
    .v-btn--icon.v-size--default {
      width: 16px;
      height: 16px;
    }
  }
  @media (min-width: 760px) {
    display: none;
  }
}

</style>