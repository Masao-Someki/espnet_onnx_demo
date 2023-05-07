<template>
  <v-container>
    <v-card flat class="mt-4">
      <v-row>
        <v-col cols="3">
          <a href="https://github.com/espnet/espnet">
            <img src="https://github.com/Masao-Someki/espnet_onnx_demo/blob/master/public/image/espnet-logo.png" width="100%" />
          </a>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1" style="text-align: right">
          <a href="https://github.com/espnet/espnet_onnx">
            <img src="https://github.com/Masao-Someki/espnet_onnx_demo/blob/master/public/image/github-mark.png" width="100%" />
          </a>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DemoHeader",
  data: () => ({
    hoverFlag: false,
  }),
  methods: {
    hover() {
      this.hoverFlag = true;
    },
    out() {
      this.hoverFlag = false;
    },
  },
};
</script>
