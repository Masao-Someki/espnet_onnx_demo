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
          <span class="text-h6"> Language </span>
        </v-col>
        <v-col cols="7">
          <v-combobox
            v-model="lang"
            :items="models"
            :error="selectError"
            auto-select-first
            dense
          >
          </v-combobox>
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
          <div class="my-auto">
            <span class="text-h6"> Upload audio </span>
          </div></v-col
        >
        <v-col cols="7">
          <audio-recorder
            :attempts="3"
            :time="1"
            sample-rate="16000"
            :show-download-button="false"
            :show-upload-button="false"
            format="mp3"
            :select-record="selectRecord"
            :after-recording="afterRecord"
            style="box-shadow: none; background: none"
          />
        </v-col>
        <v-col cols="2" class="d-flex flex-column">
          <v-spacer />
          <v-btn
            @click="runModel"
            outlined
            width="100%"
            :loading="ASRLoadingFlag"
            class="mt-auto"
          >
            Run
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
          <span class="text-h6"> Text </span></v-col
        >
        <v-col cols="9">
          <v-textarea v-model="text" dense readonly></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col
          cols="3"
          style="text-align: center"
          class="py-auto"
          height="100%"
        >
          <span class="text-h6"> Detail </span>
          <!-- <v-spacer></v-spacer> -->
        </v-col>
        <v-col cols="9">
          <v-card flat>
            <v-simple-table>
              <tbody>
                <tr v-for="item in modelInfo[lang]" :key="item.name">
                  <td>{{ item.name }}</td>

                  <td v-if="item.url">
                    <a :href="item.url">{{ item.value }}</a>
                  </td>
                  <td v-else>{{ item.value }}</td>
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
import axios from "axios";
import { asr_model_info } from "../utils/ASR_models.js";

console.log(asr_model_info);
export default {
  name: "ASRDemoSheet",
  data: () => ({
    lang: "",
    models: Object.keys(asr_model_info),
    modelInfo: asr_model_info,
    loadingFlag: false,
    text: "",
    ASRLoadingFlag: false,
    showAlert: false,
    message: "",
    barType: "success",
    selectError: false,
    audioFile: "",
    audioError: false,
    soundSrc: [],
    record: null,
  }),
  methods: {
    hide_alert: function () {
      // `event` is the native DOM event
      window.setInterval(() => {
        this.showAlert = false;
      }, 3000);
    },
    loadModel() {
      this.loadingFlag = true;
      if (this.lang === "" || !this.models.includes(this.lang)) {
        this.showAlert = true;
        this.selectError = true;
        this.message = "Please select a language from list";
        this.loadingFlag = false;
        this.barType = "error";
        this.hide_alert();
        return;
      }
      this.selectError = false;
      axios
        .get("/api/asr/load_model", {
          params: {
            model_name: this.modelInfo[this.lang][1].value,
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
    runModel() {
      this.ASRLoadingFlag = true;
      if (!this.modelLoaded) {
        this.showAlert = true;
        this.selectError = true;
        this.message = "Please load a model before generating audio.";
        this.ASRLoadingFlag = false;
        this.barType = "error";
        this.hide_alert();
        return;
      }
      if (!this.record) {
        this.showAlert = true;
        this.audioError = true;
        this.message = "Please record at least one audio.";
        this.ASRLoadingFlag = false;
        this.barType = "error";
        this.hide_alert();
        return;
      }

      let formData = new FormData();
      formData.append("audio", this.record.blob, `${this.record.filename}.mp3`);

      axios
        .post("/api/asr/recognize", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.message = "Recognition finished.";
          this.barType = "success";
          this.ASRLoadingFlag = false;
          this.alert = true;
          this.text = res.data.text;
          this.hide_alert();
        })
        .catch((error) => {
          this.message = "Error happened while executing model";
          this.ASRLoadingFlag = false;
          this.alert = true;
          this.barType = "error";
          this.hide_alert();
          console.log(error);
        });
    },
    selectRecord(r) {
      this.record = r;
    },
    afterRecord(r) {
      this.record = r;
    },
  },
};
</script>
<style>
.ar-records {
  height: auto !important;
}

.ar-records__record--selected {
  border: 1px solid #1f1e33 !important;
}
</style>
