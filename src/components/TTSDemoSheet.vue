<template>
  <v-container>
    <v-sheet class="mt-6 mx-3">
      <v-row>
        <v-col
          cols="3"
          style="text-align: center"
          class="py-auto"
          height="100%"
        >
          <span class="text-h6"> Select model </span>
        </v-col>
        <v-col cols="7">
          <v-select
            v-model="model"
            :items="models"
            dense
            :error="selectError"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="loadModel"
            outlined
            width="100%"
            :loading="loadingFlag"
          >
            Load
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          style="text-align: center"
          class="py-auto"
          height="100%"
        >
          <span class="text-h6"> Write text </span></v-col
        >
        <v-col cols="7">
          <v-textarea
            v-model="text"
            dense
            clearable
            rows="2"
            counter
            :error="textError"
            v-bind:rules="textLengthRules"
          >
          </v-textarea>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="runModel"
            outlined
            width="100%"
            :loading="TTSLoadingFlag"
          >
            Generate
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
          style="text-align: center"
          class="py-auto"
          height="100%"
        >
          <span class="text-h6"> Generated audio </span></v-col
        >
        <v-col cols="9">
          <AudioPlayer :audioPath="audioPath" ref="audioPlayer"></AudioPlayer>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col
          cols="3"
          style="text-align: center"
          class="py-auto"
          height="100%"
        >
          <span class="text-h6"> Model Detail </span>
          <!-- <v-spacer></v-spacer> -->
        </v-col>
        <v-col cols="9">
          <v-card flat>
            <v-simple-table>
              <tbody>
                <tr v-for="item in modelInfo[model]" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-alert
      :value="showAlert"
      :type="barType"
      colored-border
      border="top"
      elevation="2"
    >
      {{ message }}</v-alert
    >
  </v-container>
</template>
<script>
import AudioPlayer from "./AudioPalyer.vue";
import axios from "axios";

export default {
  name: "ASRDemoSheet",
  components: {
    AudioPlayer,
  },
  data: () => ({
    model: "",
    models: ["kan-bayashi/ljspeech_vits"],
    modelInfo: {
      "kan-bayashi/ljspeech_vits": [
        {
          name: "url",
          value: "https://huggingface.co/espnet/kan-bayashi_ljspeech_vits",
        },
        {
          name: "model",
          value: "VITS",
        },
      ],
    },
    counter: {
      max: 20,
    },
    loadingFlag: false,
    text: "",
    TTSLoadingFlag: false,
    textLengthRules: [
      (text) => text.length <= 100 || "Maximum 100 characters allowed",
    ],
    showAlert: false,
    message: "",
    modelLoaded: false,
    audioPath: "",
    textError: false,
    barType: "success",
    selectError: false,
  }),
  methods: {
    hide_alert: function () {
      // `event` is the native DOM event
      window.setInterval(() => {
        this.showAlert = false;
      }, 3000);
    },
    loadModel: function () {
      this.loadingFlag = true;
      if (this.model === "") {
        this.showAlert = true;
        this.selectError = true;
        this.message = "Please select a model";
        this.loadingFlag = false;
        this.barType = "error";
        this.hide_alert();
        return;
      }
      this.selectError = false;
      axios
        .get("/api/tts/load_model", {
          params: {
            model_name: this.model,
          },
        })
        .then(() => {
          this.message = "Successfully loaded model";
          this.barType = "success";
          this.loadingFlag = false;
          this.alert = true;
          this.modelLoaded = true;
          this.showAlert = true;
          this.hide_alert();
        })
        .catch((error) => {
          this.message = "Error happened while loading model";
          this.loadingFlag = false;
          this.alert = true;
          this.barType = "error";
          this.showAlert = true;
          this.hide_alert();
          console.log(error);
        });
    },
    runModel: function () {
      this.TTSLoadingFlag = true;
      if (!this.modelLoaded) {
        this.showAlert = true;
        this.selectError = true;
        this.message = "Please load a model before generating audio.";
        this.TTSLoadingFlag = false;
        this.barType = "error";
        this.hide_alert();
        return;
      }
      if (!this.text) {
        this.showAlert = true;
        this.textError = true;
        this.message = "Please write text.";
        this.TTSLoadingFlag = false;
        this.barType = "error";
        this.hide_alert();
        return;
      }
      this.selectError = false;
      axios
        .post("/api/tts/generate", {
            text: this.text,
        })
        .then((res) => {
          this.message = "Successfully generated audio";
          this.barType = "success";
          this.TTSLoadingFlag = false;
          this.alert = true;
          this.audioPath = res.data.audio_path;
          this.hide_alert();
          this.$refs.audioPlayer.reload();
        })
        .catch((error) => {
          this.message = "Error happened while loading model";
          this.TTSLoadingFlag = false;
          this.alert = true;
          this.barType = "error";
          this.hide_alert();
          console.log(error);
        });
    },
  },
};
</script>
<style>
.v-alert {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
