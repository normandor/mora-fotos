<template>
  <v-container class="header-container pa-0">
    <div>
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
      <v-app-bar-nav-icon 
        @click="drawer = true" 
        class="small-screen-only"
        color="white"
        dense
        >
      </v-app-bar-nav-icon>
      
      <v-row class="pt-4 pb-6" align="center">
        <div class="large-screen-only">
          <div 
            v-for="item in menuItems" :key="item.url"
            :class="$store.state.currentPath == item.url ? 'active' : ''"
            class="header-menu-text ml-4 mr-8"
            @click="goto(item.url, $event)">
            {{ item.label }}
          </div>
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
    </div>
      
    <v-navigation-drawer
      width="100%"
      v-model="drawer"
      fixed
      temporary
      app
    >
      <v-list
        nav
      >
        <v-list-item-group
          class="pt-16"
        >
          <v-btn 
            icon
            @click="drawer = false"
            style="position: absolute; right: 10px; top: 10px"
          
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
          <v-list-item v-for="(item) in menuItems" :key="item.url" :to="item.url">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
      {
        label: 'HOME',
        url: '/'
      },
      {
        label: 'LESSONS',
        url: '/lessons'
      },
      {
        label: 'TOURS',
        url: '/tours'
      },
      {
        label: 'PHOTOS & VIDEOS',
        url: '/photos'
      },
      {
        label: 'PHOTOS BY DAY',
        url: '/photos-by-day'
      },
      {
        label: 'CONTACT',
        url: '/info'
      },
    ],
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

.small-screen-only {
  @media (max-width: 760px) {
    display: flex;
  }
  @media (min-width: 760px) {
    display: none;
  }
}

.large-screen-only {
  @media (max-width: 760px) {
    display: none;
  }
  @media (min-width: 760px) {
    display: flex;
  }
}


</style>