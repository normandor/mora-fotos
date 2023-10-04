<template>
    <v-container class="main-container">
    <div class="page-title">
      <h1>SURF PHOTOS AND VIDEOS</h1>
      <h2>Book your session with us</h2>
    </div>
    <p>
      We will coordinate with you best time and place<br>
      to surf and shoot some video/photo according to your<br>
      surfing skills and ocean conditions.
    </p>
    <p>
      We will provide you all the material in the best suitable way<br>
      for you (airdrop, memory transfer, google drive).
    </p>
    <p>
      Photo/Video session is around 1,5hs/ 2hs 
    </p>
    <p>
      Bring back home some nice memories to share with your beloved ones.
    </p>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ImageList',
  data: () => ({
    overlay: false,
    zIndex: 10,
    selectedPhoto: null
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
      alert(`add to cart: ${imgUrl}`)
    }
  },
  created() {
    const images = this.fetchImages();
  },
  mounted() {
    this.$store.dispatch('setHeaderImage', '3.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
  }
}
</script>
