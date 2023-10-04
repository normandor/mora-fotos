<template>
  <v-container class="main-container">
    <div class="page-title">
      <h1>SURF PHOTO DAY BY DAY</h1>
      <h2>Select the day you where surfing and the spot</h2>
    </div>
    <p>
      If you find yourself and would love to<br>
      download the picture in high resolution,<br>
      just click on it.
    </p>
    <v-menu v-model="datePicker" :close-on-content-click="false" :nudge-left="40" transition="scale-transition" offset-y
       min-width="auto">

      <template v-slot:activator="{ on, attrs }">
        <v-responsive class="mx-auto" max-width="190" style="text-align: center;">
          <span class="respons-content">Date</span>
          <v-text-field
            v-model="date"
            v-bind="attrs"
            v-on="on"
            class="respons-content-date"
            label="Date"
            prepend-icon="mdi-calendar"
            @click:prepend="on.click"
            flat
            readonly
            solo
            append-icon="mdi-close"
            @click:append="clearDate"
          >
          
          </v-text-field>
        </v-responsive>
      </template>
      <v-date-picker v-model="date" @input="datePicker = false" @change="updateDate"></v-date-picker>

    </v-menu>

    <div>
      <v-row>
        <v-col>

        </v-col>
      </v-row>
      <div class="image-container">
        <v-hover v-slot="{ hover }" v-for="image in filteredImages" v-bind:key="image.id">
          <v-card :elevation="0" :class="{ 'on-hover': hover }">
            <v-img class="image" :src="image.url"></v-img>
            <div class="hover-button">
              <v-btn icon elevation="0" style="background-color: rgba(55, 55, 55, 0.75) !important;"
                :class="{ 'show-btn': hover }" class="grey lighten-4 ml-1 mr-1" @click="addToCart(image)">
                <v-icon color="white" class="pa-2">
                  mdi-cart-plus
                </v-icon>
              </v-btn>
              <v-btn icon elevation="0" style="background-color: rgba(55, 55, 55, 0.75) !important;"
                :class="{ 'show-btn': hover }" class="grey lighten-4 ml-1 mr-1" @click="maximize(image)">
                <v-icon color="white" class="pa-2">
                  mdi-fullscreen
                </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-hover>

        <v-overlay color="rgba(0,0,0,1)" opacity="0.7" :z-index="zIndex" :value="overlay">
          <v-card class="mx-auto my-12 image-overlay">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img v-if="this.selectedPhoto" :src="this.selectedPhoto.url" class="image">
              <v-btn icon class="visible" style="position:absolute; top:0; right:0;" @click="overlay = false">
                <v-icon size="34">mdi-close</v-icon>
              </v-btn>
              <v-btn icon @click="nextPhoto" class="visible" style="position:absolute; top:50%; right:0;">
                <v-icon size="54">mdi-chevron-right</v-icon>
              </v-btn>
              <v-btn icon @click="previousPhoto" class="visible" style="position:absolute; top:50%; left:0;">
                <v-icon size="54">mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn icon @click="addToCart(selectedPhoto)" class="visible" style="background: rgba(0, 0, 0, 0.35);position:absolute; bottom:10px; left:50%; 
              transform: translate(-50%)">
                <v-icon color="white" class="pa-2">
                  mdi-cart-plus
                </v-icon>
              </v-btn>
            </v-img>

            <v-card-text>
              <div class="my-4 text-subtitle-1">
                Info de la foto (?)
              </div>

            </v-card-text>
          </v-card>
        </v-overlay>

      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ImageList',
  data: () => ({
    overlay: false,
    zIndex: 10,
    selectedPhoto: null,
    date: localStorage.getItem('selectedDate'),
    datePicker: false,
  }),
  computed: {
    ...mapGetters(['allImages']),
    filteredImages() {
      if (!this.$store.state.selectedDate) {
        return this.allImages;
      }

      return this.allImages.filter(image => {
        return image.date === this.$store.state.selectedDate
      })
    },
  },
  methods: {
    ...mapActions(['fetchImages']),
    onBtnClick() {
      alert('Button clicked!')
    },
    updateDate() {
      localStorage.setItem('selectedDate', this.date)
      this.$store.dispatch('setSelectedDate', this.date)
    },
    clearDate() {
      this.date = ''
      localStorage.setItem('selectedDate', '')
      this.$store.dispatch('setSelectedDate', '')
    },
    maximize(image) {
      this.selectedPhoto = image;
      this.overlay = true;
    },
    nextPhoto() {
      let selectedPhotoItem = this.filteredImages.findIndex(image => {
        return image.url === this.selectedPhoto.url
      })

      if (this.filteredImages.length === selectedPhotoItem + 1) {
        selectedPhotoItem = -1
      }
      this.selectedPhoto = this.filteredImages[selectedPhotoItem + 1]
    },
    previousPhoto() {
      let selectedPhotoItem = this.filteredImages.findIndex(image => {
        return image.url === this.selectedPhoto.url
      })

      if (selectedPhotoItem === 0) {
        selectedPhotoItem = this.filteredImages.length
      }
      this.selectedPhoto = this.filteredImages[selectedPhotoItem - 1]
    },
    addToCart(image) {
      this.$store.dispatch('addCartItem', image)
    }
  },
  created() {
    const images = this.fetchImages()
    if (localStorage.getItem('selectedDate')) {
      this.date = localStorage.getItem('selectedDate')
      this.updateDate()
    }
  },
  mounted() {
    this.$store.dispatch('setHeaderImage', '5.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
    this.selectedDate = this.$store.state.selectedDate
  }
}
</script>

<style scoped>
@media (min-width: 760px) {
  .image-container {
    column-count: 3;
    column-gap: 0;
  }

  i.v-icon {
    font-size: 54px;
  }

  .image-overlay {
    width: 640px;
  }
}

@media (max-width: 760px) {
  .image-container {
    column-count: 2;
    column-gap: 0;
  }

  i.v-icon {
    font-size: 20px !important;
  }

  .image {
    width: 50vh;
  }
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
  white-space: nowrap;
}

.respons-content {
    text-align: center;
    color: black;
    font-size: 22px;
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
    line-height: 1.5;
    padding-bottom: 20px;
    white-space: pre-line;
}

.respons-content-date {
    border-top: 1px solid #ccc;
    border-radius: 0;
    text-align: center;
    color: black;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
}
</style>