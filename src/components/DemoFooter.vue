<template>
  <v-container>
    <v-footer padless absolute>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center" color="#BFBFBF" cols="12">
          {{ new Date().getFullYear() }} — <strong>ESPnet-ONNX</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>
<script>

export default {
  name: 'DemoFooter',
}
</script>
