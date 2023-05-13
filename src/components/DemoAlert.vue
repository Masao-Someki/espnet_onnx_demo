<template>
  <v-alert
    colored-border
    :type="barType"
    border="top"
    elevation="2"
  >
    {{ alertMessage }}
  </v-alert>
</template>
<script>
export default {
  props: [
    'alertMessage',
    'barType'
  ],
  data () {
    return {
      alert: true,
    }
  },
  created () {
    setTimeout(() => {
      this.alert = false
    }, 4000)
  },

}
</script>