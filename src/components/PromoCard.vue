<template>
  <v-hover v-slot="{ hover }" v-bind:key="img">
    <v-card>
      <v-img
        :class="{ 'on-hover': hover }"
        :src="img"
        class="white--text align-end image"
        :gradient="hover ? '': 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'"
        height="300px"
      >
        <v-card-text>
          <p class="white--text card-title">
            {{ title }}<br>
            <v-btn :to="link">LEARN MORE</v-btn>
          </p>

        </v-card-text>

      </v-img>


    </v-card>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
  }),
  props: ['title', 'link', 'img']
}
</script>

<style scoped>
p {
  text-align: center;
}

.on-hover {}

.v-card__title {
  display: block;
}

.card-title {
  font-size: 30px;
  padding-bottom: 20px;
}

.card-title {
  font-size: 40px;
}

.card-title {
  font-size: 38px;
  bottom: 0px;
  padding-bottom: 20px;
  font-weight: 300;
}

.hover-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
}
</style>