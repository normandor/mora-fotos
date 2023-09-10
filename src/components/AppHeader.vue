<template>
  <v-container class="header-container pa-0" >
      <transition name="fade">
        <v-img 
          :height="this.$store.state.currentPath != '/cart' ? '700px' : '100px'"
          style="top:0"
          ref="headerImage" :src="this.$store.state.headerImage" :load="loaded = true" :show="loaded"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"></v-img>
      </transition>

      <v-img 
        v-if="this.$store.state.currentPath != '/cart'"
        width="200px" 
        style="position:absolute; top:200px; left:50%; transform: translate(-50%);"
        src="logo_mora.png">
      </v-img>
    <v-app-bar height="100px" :class="{ 'black-bg': scrollPosition > 50 }" flat fixed>
      <v-row class="pt-4 pb-6" align="center">
        <div :class="this.$store.state.currentPath == '/' ? 'active' : ''" class="header-menu-text ml-4 mr-8"
          @click="goto('/', $event)">
          HOME
        </div>

        <div :class="this.$store.state.currentPath == '/lessons' ? 'active' : ''" @click="goto('/lessons', $event)"
          class="header-menu-text mr-8">
          LESSONS
        </div>

        <div class="header-menu-text mr-8" :class="this.$store.state.currentPath == '/tours' ? 'active' : ''"
          @click="goto('/tours', $event)">
          TOURS
        </div>

        <div :class="this.$store.state.currentPath == '/photos' ? 'active' : ''" class="header-menu-text mr-8"
          @click="goto('/photos', $event)">
          PHOTOS & VIDEOS
        </div>

        <div :class="this.$store.state.currentPath == '/photos-by-day' ? 'active' : ''" class="header-menu-text mr-8"
          @click="goto('/photos-by-day', $event)">
          PHOTOS DAY BY DAY
        </div>

        <div :class="this.$store.state.currentPath == '/info' ? 'active' : ''" class="header-menu-text"
          @click="goto('/info', $event)">
          CONTACT
        </div>
        <v-spacer />
        <div class="pr-4">


          <v-btn class="pa-0 ma-0" dark stacked icon @click="goto('/cart')">
            <div>
              <template>
                <transition name="bounce" mode="out-in">
                  <v-badge :key="cartCount" :content="cartCount"
                    :color="cartCount > 0 ? 'green' : 'transparent'" offset-x="12px"
                    offset-y="32px">
                    <v-icon size="20">
                      mdi-cart-outline
                    </v-icon>
                  </v-badge>
                </transition>
              </template>
            </div>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    scrollPosition: null,
    lastEvent: null,
    drawer: false,
    group: null,
  }),
  methods: {
    goto(to, event) {
      //event.target.classList.toggle('active')

      if (this.lastEvent) {
        console.log(this.lastEvent.target.classList)
        // this.lastEvent.target.classList.toggle('active')
      }

      this.lastEvent = event
      if (this.$route.path != to) {
        this.$router.push(to)
      }
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    changeImage(img) {
      this.headerImage = img
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    //this.$store.dispatch('getTasks');
  },
  computed: {
    cartCount() {
      let total = 0
      this.$store.state.cartItems.forEach(item => {
        total += item.qty
      })
      return total
    }
  }
}
</script>

<style lang="sass" scoped>
  .opaque
    filter: brightness(0)
  .fadein
    transition: 2s ease
    filter: brightness(1)
    
  .active
    text-underline-offset: 8px
    text-decoration: underline
    text-decoration-thickness: 2px
  .theme--light.v-app-bar.v-toolbar.v-sheet
    background-color: transparent
    transition: background-color 1s ease
  .black-bg
    background-color: rgba(0,0,0,0.3) !important
    transition: background-color 1s ease
  .header-menu-text
    color: white
    font-size: 14px
    cursor: pointer
    font-family: 'Raleway', sans-serif
  .header-container
    max-width: none !important
  .date-picker
    max-width: 120px
    .v-text-field > .v-input__control > .v-input__slot:before
    .v-text-field > .v-input__control > .v-input__slot:after
      border-style: none !important
  .shopping-cart-counter
    transform: translate(-20px, 30px)
  .v-app-bar-title__content
    min-width: 400px
  .subtitle
    font-size: 1.5rem !important
</style>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.25s;
}

.bounce-leave-active {
  animation: bounce-in 0.25s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>