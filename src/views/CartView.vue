<template>
  <v-container class="header-container pa-0">
    <v-row>
      <v-col cols="12" sm="8">
        <div class="col-12 col-sm-12">
          <div class="cart-title">Shopping Cart ({{ cartCount }} items)</div>
          <hr>
          <v-content class="container">
            <v-container class="bg-surface-variant">
              <v-row class="mb-6" no-gutters>
                <v-col align="right">
                  <v-sheet class="pa-2 ma-2">
                    <div class="grey--text strong">ITEM</div>
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-2 ma-2">

                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-2 ma-2">
                    <div class="grey--text strong">QTY</div>
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-2 ma-2">
                    <div class="grey--text strong">PRICE</div>
                  </v-sheet>
                </v-col>

                <v-col align="center">
                  <v-sheet class="pa-2 ma-2">
                    <div class="grey--text strong">TOTAL</div>
                  </v-sheet>
                </v-col>
              </v-row>

              <v-row class="mb-6" no-gutters v-for="item in this.$store.state.cartItems" :key="item.id">
                <v-col align="center">
                  <v-sheet class="pa-2 ma-2">
                    <v-img width="100" :src="item.url" />
                  </v-sheet>
                </v-col>

                <v-col>
                  <v-sheet class="pa-2 ma-2 pt-3">
                    {{ item.name }}
                  </v-sheet>
                </v-col>


                <v-col align="center">
                  <v-sheet class="pa-2 ma-2 float-right" style="white-space: nowrap;">
                    <v-btn icon @click="removeOneFromItemList(item)">
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
          </v-content>

        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
          tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus
          consequuntur!
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
          tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus
          consequuntur!
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
          tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus
          consequuntur!
        </p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
          tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus
          consequuntur!
        </p>
      </v-col>
      <v-col cols="4" sm="4">
        <div style="position: sticky; top: 120px;">

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
                  <v-col class="pl-4 pr-4" cols="12" md="6">Items: {{ cartCount }}</v-col>
                  <v-col align="right" cols="12" md="6">{{ amountSum }} USD</v-col>
                </v-row>
                <v-row>
                  <v-col class="pl-4 pr-4" cols="12" md="12">
                  <v-btn color="green" block class="mt-8 white--text">
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
    }
  }
}
</script>

<style scoped>
.cart-title {
  font-size: 30px;
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

</style>