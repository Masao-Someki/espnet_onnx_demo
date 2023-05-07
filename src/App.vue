<template>
  <v-app>
    <v-main>
      <DemoHeader></DemoHeader>
      <EspnetOnnxDemo></EspnetOnnxDemo>
      <DemoFooter></DemoFooter>
    </v-main>
  </v-app>
</template>

<script>
import DemoHeader from './components/DemoHeader.vue'
import DemoFooter from './components/DemoFooter.vue'
import EspnetOnnxDemo from './components/EspnetOnnxDemo.vue'

export default {
  name: 'App',

  components: {
    DemoHeader,
    DemoFooter,
    EspnetOnnxDemo
  },

};
</script>
