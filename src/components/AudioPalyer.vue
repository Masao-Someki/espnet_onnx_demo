<template>
  <div class="player">
    <v-row class="player-controls ma-0">
      <v-col cols="1" class="pa-2" style="text-align: center;" title="Stop">
        <v-btn icon @click="stop">
          <v-icon>mdi-stop</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1" class="pa-2" style="text-align: center;" title="Play/Pause">
        <v-btn icon @click="playing = !playing" >
          <v-icon v-show="playing">mdi-play</v-icon>
          <v-icon v-show="!playing">mdi-pause</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6" class="pa-0" >
        <div
          v-on:click="seek"
          class="player-progress"
          title="Time played : Total time"
        >
          <div
            :style="{ width: this.percentComplete + '%' }"
            class="player-seeker"
          ></div>
        </div>
        <div class="player-time">
          <div class="player-time-current">{{ currentTime }}</div>
          <div class="player-time-total">{{ durationTime }}</div>
        </div>
      </v-col>
      <v-col cols="4" style="text-align: center;" class="pa-2" >
        <v-slider
            v-model="volume"
            prepend-icon="mdi-volume-high"
            max="100"
            width="100%"
            dense
            hide-details="auto"
        ></v-slider>
      </v-col>
    </v-row>
    <audio
      :loop="innerLoop"
      ref="audiofile"
      :src="file"
      preload="auto"
      style="display: none"
    ></audio>
  </div>
</template>
<script>
const convertTimeHHMMSS = (val) => {
	let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

	return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
};

export default {
  name: "ASRDemoSheet",
  props: {
    file: {
      type: String,
      default: null,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    audio: undefined,
    currentSeconds: 0,
    durationSeconds: 0,
    innerLoop: false,
    loaded: false,
    playing: false,
    previousVolume: 35,
    showVolume: false,
    volume: 100,
  }),
  computed: {
    currentTime() {
      return convertTimeHHMMSS(this.currentSeconds);
    },
    durationTime() {
      return convertTimeHHMMSS(this.durationSeconds);
    },
    percentComplete() {
      return parseInt((this.currentSeconds / this.durationSeconds) * 100);
    },
    muted() {
      return this.volume / 100 === 0;
    },
  },
  watch: {
    playing(value) {
      if (value) {
        return this.audio.play();
      }
      this.audio.pause();
    },
    volume() {
      this.showVolume = false;
      this.audio.volume = this.volume / 100;
    },
  },
  methods: {
    download() {
      this.stop();
      window.open(this.file, "download");
    },
    load() {
      if (this.audio.readyState >= 2) {
        this.loaded = true;
        this.durationSeconds = parseInt(this.audio.duration);
        return (this.playing = this.autoPlay);
      }

      throw new Error("Failed to load sound file.");
    },
    mute() {
      if (this.muted) {
        return (this.volume = this.previousVolume);
      }

      this.previousVolume = this.volume;
      this.volume = 0;
    },
    seek(e) {
      if (!this.playing || e.target.tagName === "SPAN") {
        return;
      }

      const el = e.target.getBoundingClientRect();
      const seekPos = (e.clientX - el.left) / el.width;

      this.audio.currentTime = parseInt(this.audio.duration * seekPos);
    },
    stop() {
      this.playing = false;
      this.audio.currentTime = 0;
    },
    update() {
      this.currentSeconds = parseInt(this.audio.currentTime);
    },
  },
  created() {
    this.innerLoop = this.loop;
  },
  mounted() {
    this.audio = this.$el.querySelectorAll("audio")[0];
    this.audio.addEventListener("timeupdate", this.update);
    this.audio.addEventListener("loadeddata", this.load);
    this.audio.addEventListener("pause", () => {
      this.playing = false;
    });
    this.audio.addEventListener("play", () => {
      this.playing = true;
    });
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:400,700");

body {
  font-family: "Nunito", sans-serif;
}

$player-bg: #fff;
$player-border-color: darken($player-bg, 12%);
$player-link-color: darken($player-bg, 75%);
$player-progress-color: $player-border-color;
$player-seeker-color: $player-link-color;
$player-text-color: $player-link-color;

.player-wrapper {
  align-items: center;
  background-color: $player-bg;
  background-image: linear-gradient(90deg, #fff 0, darken(#fff, 12%));
  display: flex;
  justify-content: center;
  // height: 100vh;
}

.player {
  background-color: $player-bg;
  border: 1px solid $player-border-color;
  border-radius: 5px;
  // box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
  color: $player-text-color;
  display: inline-block;
  // line-height: 1.5625;
  width:100%;
}

.player-controls {
  display: flex;

  > div {
    border-right: 1px solid $player-border-color;

    &:last-child {
      border-right: none;
    }

    a {
      color: $player-link-color;
      display: block;
      // line-height: 0;
      // padding: 1em;
      text-decoration: none;
    }
  }
}

.player-progress {
  background-color: $player-progress-color;
  cursor: pointer;
  height: 50%;
  min-width: 200px;
  position: relative;

  .player-seeker {
    background-color: $player-seeker-color;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
  }
}

.player-time {
  display: flex;
  // font-size: 18px;
  justify-content: space-between;

  .player-time-current {
    font-weight: 700;
    padding-left: 5px;
  }

  .player-time-total {
    opacity: 0.5;
    padding-right: 5px;
  }
}
</style>
