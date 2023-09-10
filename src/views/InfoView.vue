<template>
  <v-container class="main-container">
  <div class="page-title">
    <h1>Contacto</h1>
    <h2>Welcome</h2>
  </div>

    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quaerat quasi. Aliquam corporis quod suscipit
      tenetur libero dicta quo omnis quae, animi pariatur facilis, blanditiis, non velit natus repellendus consequuntur!
    </p>
    
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Info',
  mounted() {
    this.$store.dispatch('setHeaderImage', '7.jpg')
    this.$store.dispatch('setCurrentPath', this.$router.currentRoute.path)
  }
}
</script>