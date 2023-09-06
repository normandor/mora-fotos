<template>
  <div>
    <div class="image-container">
      <!-- <div
        v-for="image in filteredImages"
        v-bind:key="image.id"
        v-bind:src="image"
      >
        <img v-bind:src="image.url" v-bind:key="image.nams"> 
      </div>  -->

      <v-hover v-slot="{ hover }" v-for="image in filteredImages" v-bind:key="image.id">
        <v-card :elevation="0" :class="{ 'on-hover': hover }">
          <v-img class="image" :src="image.url"></v-img>
          <div class="hover-button">
            <v-btn icon elevation="0" style="background-color: rgba(55, 55, 55, 0.75) !important;"
              :class="{ 'show-btn': hover }" class="grey lighten-4 ml-1 mr-1" @click="addToCart(image.url)">
              <v-icon color="white" class="pa-2">
                mdi-cart-plus
              </v-icon>
            </v-btn>
            <v-btn icon elevation="0" style="background-color: rgba(55, 55, 55, 0.75) !important;"
              :class="{ 'show-btn': hover }" class="grey lighten-4 ml-1 mr-1" @click="maximize(image.url)">
              <v-icon color="white" class="pa-2">
                mdi-fullscreen
              </v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-hover>

      <v-overlay
        color="rgba(0,0,0,1)"
        opacity="0.7"
        :z-index="zIndex"
        :value="overlay"
      >
      <v-btn
        class="white--text visible"
        color="teal"
        @click="overlay = false"
      >
        Hide Overlay
      </v-btn>
    </v-overlay>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ImageList',
  data: () => ({
      overlay: false,
      zIndex: 10,
    }),
  computed: {
    ...mapGetters(['allImages']),
    filteredImages() {
      if (!this.$store.state.task.dueDate) {
        return this.allImages;
      }

      return this.allImages.filter(image => {
        return image.date === this.$store.state.task.dueDate
      })
    }
  },
  methods: {
    ...mapActions(['fetchImages']),
    onBtnClick() {
      alert('Button clicked!')
    },
    maximize(imgUrl) {
      this.overlay = true;
      // alert(`maximized: ${imgUrl}`)
    },
    addToCart(imgUrl) {
      alert(`add to cart: ${imgUrl}`)
    }
  },
  created() {
    const images = this.fetchImages();
  }
}
</script>

<style scoped>
.image-container {
  column-count: 3;
  column-gap: 0;
}

.v-card.v-sheet {
  max-width: 100%;
  padding: 5px;
}

.v-card .v-image {
  transition: filter .4s ease-in-out;
}

.v-btn {
  opacity: 0;
  transition: opacity .4s ease-in-out;
}

.visible {
  opacity: 1;
}

.show-btn {
  opacity: 0.7;
}

.hover-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
}

</style>