import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import images from './modules/images';

let db = new Localbase('db')
db.config.debug = false;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    task: {
      id: null,
      dueDate: null
    }
  },
  modules: {
    images
  },
  getters: {
  },
  mutations: {
    updateTaskDueDate(state, payload) {
      state.task.dueDate = payload
    },
    setImages(state, value) {
    },
    setSearch(state, value) {
      state.search = value;
    },
   

  },
  actions: {
    // addTask({ commit }, newTaskTitle) {
    //   let newTask = {
    //     id: Date.now(),
    //     title: newTaskTitle,
    //     done: false,
    //     dueDate: null
    //   }
    //   db.collection('tasks').add(newTask)
    //   .then(() => {
    //     commit('addTask', newTask)
    //   })
    // },
    updateTaskDueDate({ commit }, payload) {
      commit('updateTaskDueDate', payload)
      // db.collection('tasks').doc({ id: payload.id}).update({
      //   dueDate: payload.dueDate
      // }).then(() => {
      //   commit('updateTaskDueDate', payload)
      // });
    },
    // getTasks({ commit }) {
    //   db.collection('tasks').get().then(tasks => {
    //     commit('setTasks', tasks)
    //   });
    // },

  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      }

      return state.tasks.filter(
        task => task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  }
})
