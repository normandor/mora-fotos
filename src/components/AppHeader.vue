<template>
  <v-container class="header-container pa-0">
    <transition name="fade">
      <v-img
        height="700px"
        ref="headerImage"
        :src="headerImage"
        :load="loaded=true"
        :show="loaded"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      ></v-img>
    </transition>

      <v-img
        width="200px"
        style="position:absolute; top:200px; left:50%; transform: translate(-50%);"
        src="logo_mora.png"
      ></v-img>
        
        <v-app-bar height="100px" :class="{'black-bg': scrollPosition >100}" flat fixed>
          <v-row class="pt-4 pb-6" >
          <div class="header-menu-text ml-4 mr-8" @click="changeImage('6.jpg'); goto('/', $event)">
            HOME
          </div>

          <div class="header-menu-text mr-8" @click="changeImage('5.jpg'); goto('/lessons', $event)">
            LESSONS
          </div>

          <div class="header-menu-text mr-8" @click="changeImage('3.jpg'); goto('/tours', $event)">
            TOURS
          </div>

          <div class="header-menu-text mr-8" @click="changeImage('4.jpg'); goto('/photos', $event)">
            PHOTOS
          </div>

          <div class="header-menu-text" @click="changeImage('2.jpg'); goto('/info', $event)">
            CONTACT
          </div>
        </v-row>
          <!-- <div>
            <v-btn to="/" class="text-none mr-2" stacked icon>
              <v-icon>
                mdi-home-outline
              </v-icon>
            </v-btn>

            <v-btn to="/info" class="text-none mr-2" stacked icon>
              <v-icon>
                mdi-information-outline
              </v-icon>
            </v-btn>
            
            <v-btn class="text-none mr-2" stacked icon>
              <v-icon>
                mdi-flag-outline
              </v-icon>
            </v-btn>

            <v-btn class="text-none mr-2" stacked icon>
              <v-badge color="green" :content="12" offset-x="12px" offset-y="32px">
                <v-icon>
                  mdi-cart-outline
                </v-icon>
              </v-badge>
            </v-btn>
          </div> -->
        </v-app-bar>
      </v-container>
</template>

<script>
export default {
  data: () => ({
    scrollPosition: null,
    lastEvent: null,
    headerImage: '2.jpg'
  }),
  methods: {
    goto(to, event) {
      event.target.classList.toggle('active')

      if (this.lastEvent) {
        console.log(this.lastEvent.target.classList)
        this.lastEvent.target.classList.toggle('active')
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
  .fade-enter-active
    transition: opacity 3s ease-in-out
  .fade-enter-to
    opacity: 1
  .fade-enter
    opacity: 0

</style>