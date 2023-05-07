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
          <v-select v-model="model" :items="models" dense></v-select>
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
        <v-col cols="9">
          <v-textarea v-model="text" dense
          clearable
          rows="2"
          counter
          v-bind:rules="textLengthRules">
          </v-textarea>
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
          <AudioPlayer></AudioPlayer>
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
  </v-container>
</template>
<script>
import AudioPlayer from './AudioPalyer.vue'

export default {
  name: "ASRDemoSheet",
  components: {
    AudioPlayer
  },
  data: () => ({
    model: "",
    models: [
      "espnet/kan-bayashi_ljspeech_vits",
      "julien-c/kan-bayashi_csmsc_tacotron2",
    ],
    modelInfo: {
      "espnet/kan-bayashi_ljspeech_vits": [
        {
          name: "url",
          value:
            "https://huggingface.co/espnet/kan-bayashi_ljspeech_vits",
        },
        {
          name: "model",
          value: "VITS",
        },
      ],
      "julien-c/kan-bayashi_csmsc_tacotron2":
        [
          {
            name: "url",
            value:
              "https://huggingface.co/julien-c/kan-bayashi_csmsc_tacotron2",
          },
          {
            name: "model",
            value: "Tacotron2",
          },
        ],
    },
    counter: {
      max: 20

    },
    loadingFlag: false,
    text: "",
    TTSLoadingFlag: false,
    textLengthRules: [
      text => text.length <= 100 || 'Maximum 100 characters allowed',
    ]
  }),
  methods: {
    loadModel() {
      this.loadingFlag = true;
      // axios
      // .get(this.modelInfo[this.model][0].value)
      // .then((response) => {
      //     this.modelInfo[this.model][0].value = response.data.url;
      //     this.modelInfo[this.model][1].value = response.data.encoder;
      //     this.modelInfo[this.model][2].value = response.data.decoder;
      //     this.loadingFlag = false;
      //   })
      // .catch((error) => {
      //     this.loadingFlag = false;
      //     console.log(error);
      //   });
    },
    runModel() {
      this.ASRLoadingFlag = true;
            // axios
            // .post(this.modelInfo[this.model][0].value, {
            //     text: this.text,
            //   })
            // .then((response) => {
            //     this.ASRLoadingFlag = false;
            //   })
            // .catch((error) => {
            //     this.ASRLoadingFlag = false;
            //     console.log(error);
            //
    }
  },
};
</script>
