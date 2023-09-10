import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import images from './modules/images';

let db = new Localbase('db')
db.config.debug = false;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: [],
    currentPath: '/',
    appTitle: process.env.VUE_APP_TITLE,
    task: {
      id: null,
      dueDate: null
    },
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
    updateTaskDueDate(state, payload) {
      state.task.dueDate = payload
    },
    setHeaderImage(state, value) {
      state.headerImage = value
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
    }
  },
  actions: {
    addCartItem({ commit, dispatch }, newItem) {
      let existingItem = this.state.cartItems.filter(
        item => item.id === newItem.id
      )
      // console.log('newItem', newItem)
      // console.log('existingItem', existingItem)
      if (existingItem.length === 0) {
        console.log('adding new', newItem)
      
        db.collection('cart').add(newItem)
        .then(() => {
          commit('addCartItem', newItem)
        })
      } else {
        console.log('existing item', existingItem[0])
        dispatch('addQtyToItem', existingItem[0])
      }      
    },
    setHeaderImage({ commit }, value) {
      commit('setHeaderImage', value)
    },
    setCurrentPath({ commit }, value) {
      commit('setCurrentPath', value)
    },
    getTasks({ commit }) {
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
      console.log('substracting', payload)
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
    }
  },
})
