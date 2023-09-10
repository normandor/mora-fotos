import api from '../../api/imgur';
import { router } from '../../main';

const state = {
  images: []
}

const getters = {
  allImages: (state) => {
    return state.images
  }
}

const actions = {
  async fetchImages({ rootState, commit }) {
    // const { token } = rootState.auth;
    // const response = await api.fetchImages(token);
    
    // let images = [];
    // response.data.entries.forEach(async element => {
      // const imgLink = await api.fetchImageLink(token, element.path_display);
      // images.push(imgLink.data.link);  
    // });
    
    let images = [
      {
        id:1,
        url: '1.jpg',
        name: 'photo1',
        date: '2023-09-04',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 2,
        url: '2.jpg',
        name: 'photo2',
        date: '2023-09-04',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 3,
        url: '3.jpg',
        name: 'photo3',
        date: '2023-09-03',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 4,
        url: '4.jpg',
        name: 'photo4',
        date: '2023-09-03',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 5,
        url: '5.jpg',
        name: 'photo5',
        date: '2023-09-03',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 6,
        url: '6.jpg',
        name: 'photo6',
        date: '2023-09-02',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 7,
        url: '7.jpg',
        name: 'photo7',
        date: '2023-09-04',
        price: 5,
        currency: 'USD',
        qty: 1
      },
      {
        id: 8,
        url: '8.jpg',
        name: 'photo8',
        date: '2023-09-03',
        price: 5,
        currency: 'USD',
        qty: 1
      },
    ];
    
    commit('setImages', images);
  },
  async uploadImages({ rootState }, images) {
    const { token } = rootState.auth;
    await api.uploadImages(images, token);
    
    router.push('/');
  }
}

const mutations = {
  setImages: (state, images) => {
    state.images = images;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
