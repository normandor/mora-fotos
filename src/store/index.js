import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import images from './modules/images';
import axios from 'axios';
import router from '../router/index'
let db = new Localbase('db')
db.config.debug = false;

Vue.use(Vuex)

const dev = false
const API_BASE = dev ? 'http://localhost:4242' : 'https://stripe.wichisoft.com.ar'

export default new Vuex.Store({
  state: {
    cartItems: [],
    secret: {
      clientSecret: null,
      tax: 0
    },
    currentPath: '/',
    appTitle: process.env.VUE_APP_TITLE,
    id: null,
    selectedDate: null,
    headerImage: '2.jpg'
  },
  modules: {
    images
  },
  getters: {
  },
  mutations: {
    addCartItem(state, payload) {
      let existingItem = state.cartItems.filter(item => item.id === payload.id)[0];
      if (!existingItem) {
        state.cartItems.push(payload)
      } else {
        existingItem.qty++
      }
    },
    setCartItems(state, items) {
      state.cartItems = items
    },
    setHeaderImage(state, value) {
      state.headerImage = value
    },    
    setSelectedDate(state, value) {
      state.selectedDate = value
    },
    setSearch(state, value) {
      state.search = value
    },
    setCurrentPath(state, value) {
      state.currentPath = value
    },
    updateItemQty(state, payload) {
      let image = state.cartItems.filter(image => image.id === payload.id)[0];
      image.qty = payload.qty;
    },
    deleteItem(state, id) {
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
    clientSecret(state, payload) {
      state.secret.clientSecret = payload.clientSecret
      state.secret.totalAmountInCents = payload.totalAmountInCents
    },
    clearCart(state) {
      state.cartItems = []
    },
  },
  actions: {
    addCartItem({ commit, dispatch }, newItem) {
      let existingItem = this.state.cartItems.filter(
        item => item.id === newItem.id
      )
      // console.log('newItem', newItem)
      // console.log('existingItem', existingItem)
      if (existingItem.length === 0) {
      
        db.collection('cart').add(newItem)
        .then(() => {
          commit('addCartItem', newItem)
        })
      } else {
        dispatch('addQtyToItem', existingItem[0])
      }      
    },
    setSelectedDate({ commit }, value) {
      commit('setSelectedDate', value != '' ? value : null)
    },
    setHeaderImage({ commit }, value) {
      commit('setHeaderImage', value)
    },
    setCurrentPath({ commit }, value) {
      commit('setCurrentPath', value)
    },
    getItems({ commit }) {
      db.collection('cart').get().then(items => {
        commit('setCartItems', items)
      });
    },
    addQtyToItem({ commit }, payload) {
      payload.qty++
      db.collection('cart').doc({ id: payload.id}).update({
        qty: payload.qty
      }).then(() => {
        commit('updateItemQty', payload)
      });
    },
    substractQtyFromItem({ commit }, payload) {
      payload.qty--
      db.collection('cart').doc({ id: payload.id}).update({
        qty: payload.qty
      }).then(() => {
        commit('updateItemQty', payload)
      });
    },
    removeItemFromCart({ commit }, item) {
      db.collection('cart').doc({ id: item.id }).delete()
      .then(() => {
        commit('deleteItem', item.id)
      })
    },
    async paymentIntent({ commit }) {
      const res = await axios.post(`${API_BASE}/create-payment-intent/`, {
        cart: this.state.cartItems
      })
      if (res.status === 201) {
        commit('clientSecret', {
          clientSecret: res.data.clientSecret,
          totalAmountInCents: res.data.totalAmountInCents,
        })
        router.push('/checkout')
      }
    },
    async checkout ({ commit, state, getters }, payload) {
      const res = await axios.post(`${API_BASE}/orders/order/`, {
        order: {
          // stripe_id: payload.payment_id,
          // subtotal: getters.subTotal,
          // total: getters.grandTotal,
          // tax: state.secret.tax,
          // cart: state.cart,
          // rating: state.stars,
          // first_name: state.user.first_name,
          // last_name: state.user.last_name,
          // email: state.user.email,
          // phone: state.user.phone,
          // address: state.user.address,
          // city: state.user.city,
          // state: state.user.state,
          // zipcode: state.user.zipcode
        }
      })
      if (res.status === 200) {
        // Clear the state except for the user
        commit('clearCart')
        commit('clientSecret', {
          clientSecret: null,
          totalAmountInCents: 0
        })
      }
    },
  },
})
