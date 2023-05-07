<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <span class="text-h3">ESPnet-ONNX demo</span>
      </v-card-title>
      <v-card-text class="body-1">
        This is a demonstration space of ESPnet-ONNX project. Please select ASR
        or TTS to play!
      </v-card-text>
    </v-card>

    <MenuBar
      :options="options"
      v-model="selected"
      v-on:select="menuChanged"
      class="mt-6 mx-auto"
    />
    <div v-show="menuSelected == 'ASR'">
      <ASRDemoSheet
        class="mt-3"
      ></ASRDemoSheet>
    </div>
    <div v-show="menuSelected == 'TTS'">
      <TTSDemoSheet
        class="mt-3"
      ></TTSDemoSheet>
    </div>
  </v-container>
</template>
<script>
import MenuBar from "./MenuBar.vue";
import ASRDemoSheet from "./ASRDemoSheet.vue";
import TTSDemoSheet from "./TTSDemoSheet.vue";

export default {
  name: "EspnetOnnxDemo",
  components: {
    MenuBar,
    ASRDemoSheet,
    TTSDemoSheet,
  },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: "mdi-microphone-message", title: "ASR" },
      { id: 2, icon: "mdi-speaker-message", title: "TTS" },
    ],
    menuSelected: "ASR",
  }),
  methods: {
    menuChanged: function (e) {
      if (this.menuSelected != e) {
        this.menuSelected = e;
      }
    },
  }
};
</script>
