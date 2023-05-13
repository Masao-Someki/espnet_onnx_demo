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
            :error="selectError"
            dense
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
import axios from "axios";

export default {
  name: "ASRDemoSheet",
  data: () => ({
    model: "",
    models: ["pyf98/librispeech_conformer_hop_length160"],
    modelInfo: {
      "pyf98/librispeech_conformer_hop_length160": [
        {
          name: "url",
          value:
            "https://huggingface.co/pyf98/librispeech_conformer_hop_length160",
        },
        {
          name: "encoder",
          value: "Conformer",
        },
        {
          name: "decoder",
          value: "Transformer",
        },
      ],
    },
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
        .get("/api/asr/load_model", {
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
    runModel() {
      this.ASRLoadingFlag = true;
      // if (!this.modelLoaded) {
      //   this.showAlert = true;
      //   this.selectError = true;
      //   this.message = "Please load a model before generating audio.";
      //   this.ASRLoadingFlag = false;
      //   this.barType = "error";
      //   this.hide_alert();
      //   return;
      // }
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
