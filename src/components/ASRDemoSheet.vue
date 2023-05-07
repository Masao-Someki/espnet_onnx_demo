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
          <span class="text-h6"> Upload audio </span></v-col
        >
        <v-col cols="7">
          <v-file-input
            label="Select your audio file"
            prepend-icon="mdi-waveform"
            dense
            show-size
            accept="audio/*"
          ></v-file-input>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="runModel"
            outlined
            width="100%"
            :loading="ASRLoadingFlag"
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
  </v-container>
</template>
<script>
export default {
  name: "ASRDemoSheet",
  data: () => ({
    model: "",
    models: [
      "kamo-naoyuki/mini_an4_asr_train_raw_bpe_valid.acc.best",
      "Shinji Watanabe/librispeech_asr_train_asr_transformer_e18_raw_bpe_sp_valid.acc.best",
      "kamo-naoyuki/wsj",
    ],
    modelInfo: {
      "kamo-naoyuki/mini_an4_asr_train_raw_bpe_valid.acc.best": [
        {
          name: "url",
          value:
            "https://huggingface.co/espnet/kamo-naoyuki-mini_an4_asr_train_raw_bpe_valid.acc.best",
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
      "Shinji Watanabe/librispeech_asr_train_asr_transformer_e18_raw_bpe_sp_valid.acc.best":
        [
          {
            name: "url",
            value:
              "https://huggingface.co/espnet/shinji-watanabe-librispeech_asr_train_asr_transformer_e18_raw_bpe_sp_valid.acc.best",
          },
          {
            name: "encoder",
            value: "Transformer",
          },
          {
            name: "decoder",
            value: "Transformer",
          },
        ],
      "kamo-naoyuki/wsj": [
        {
          name: "url",
          value: "https://huggingface.co/espnet/kamo-naoyuki_wsj",
        },
        {
          name: "encoder",
          value: "Transformer",
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
