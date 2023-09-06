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
      <v-card
    class="mx-auto my-12"
    max-width="1024"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      :src="this.selectedPhoto"
    >
    <v-btn
      icon
      class="visible"
      style="position:absolute; top:0; right:0;"
      @click="overlay = false"
    >
      <v-icon size="34">mdi-close</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="nextPhoto"
      class="visible"
      style="position:absolute; top:50%; right:0;"
    >
      <v-icon size="54">mdi-chevron-right</v-icon>
    </v-btn>    
    <v-btn
      icon
      @click="previousPhoto"
      class="visible"
      style="position:absolute; top:50%; left:0;"
    >
     <v-icon size="54">mdi-chevron-left</v-icon>
    </v-btn>
  </v-img>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >

      </v-row>

      <div class="my-4 text-subtitle-1">
        Info de la foto (?)
      </div>

    </v-card-text>
  </v-card>


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
      selectedPhoto: null,
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
      this.selectedPhoto = imgUrl;
      this.overlay = true;
      // alert(`maximized: ${imgUrl}`)
    },
    nextPhoto() {
      let selectedPhotoItem = this.filteredImages.findIndex(image => {
        return image.url === this.selectedPhoto
      })

      if (this.filteredImages.length === selectedPhotoItem + 1) {
        selectedPhotoItem = -1
      }
      this.selectedPhoto = this.filteredImages[selectedPhotoItem+1].url
    },
    previousPhoto() {
      let selectedPhotoItem = this.filteredImages.findIndex(image => {
        return image.url === this.selectedPhoto
      })

      if (selectedPhotoItem === 0) {
        selectedPhotoItem = this.filteredImages.length
      }
      this.selectedPhoto = this.filteredImages[selectedPhotoItem-1].url
    },
    addToCart(imgUrl) {
      alert(`add to cart: ${imgUrl}`);
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