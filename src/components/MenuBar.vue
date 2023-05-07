<template>
  <div class="btn-containrt_foreground" :style="cssVariables">
    <div class="btn-containrt">
      <div
        v-for="(button, index) in localOptions"
        :key="`menu-label-${index}`"
        :class="{
          [`btn-item-${index} labels`]: true,
          ['checked']: button.isActive,
          ['unchecked']: !button.isActive,
        }"
        @click="handleLabelClick(button)"
      >
        <div class="active-label">
          <div class="btn-badge" v-if="button.badge">
            {{ button.badge }}
          </div>
          <slot name="icon" v-if="hasSlot('icon')" :props="button" />
          <template v-else>
            <v-icon> {{ button.icon }} </v-icon>
          </template>
        </div>

        <div class="btn-title">
          <slot name="title" v-if="hasSlot('title')" :props="button" />
          <template v-else>
            {{ button.title }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    value: {
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    badgeColor: {
      type: String,
      default: "#FBC02D",
    },
  },
  data: () => ({
    localOptions: [],
    showable: false,
  }),
  created() {
    this.localOptions = this.options.map((option) => ({
      ...option,
      isActive: this.isActive(option),
    }));
  },
  computed: {
    cssVariables() {
      return {
        "--color-badge": this.badgeColor,
      };
    },
    hasActiveClass() {
      return this.localOptions.some((option) => option.isActive);
    },
  },
  methods: {
    handleLabelClick(button) {
      if (!this.showable) {
        this.toggleClass();
      }
      this.updateValue(button.id);
      this.$emit("select", button.title);
    },
    updateValue(value) {
      this.localOptions.forEach(
        (option) => (option.isActive = this.isActive(option, value))
      );
      this.$emit("update", value);
    },
    toggleClass() {
      this.showable = !this.showable;
    },
    isActive(button, value = this.value) {
      return (
        button.id == value ||
        (button.childs || []).find((child) => child.id == value)
      );
    },
    hasSlot(slotName) {
      return this.$slots[slotName] || this.$scopedSlots[slotName];
    },
  },
};
</script>

<style scoped>
.btn-super-parant {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 55px;
  width: 100%;
  height: 60px;
  z-index: -1;
}
input {
  display: none;
}
.btn-containrt_foreground {
  direction: ltr;
  display: flex;
  align-items: flex-end;
  width: 80%;
  height: 60px;
  background: var(--color-foreground);
}
.btn-containrt {
  direction: ltr;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  width: 100%;
  height: 55px;
}
.active-label {
  width: 45px;
  height: 45px;
  border-radius: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  top: 10px;
  background: #fff !important;
  color: rgba(0, 0, 0, 0.54);
}
.btn-title {
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  text-align: center;
}
.btn-badge {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 25px;
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
  background: var(--color-badge);
}
.checked .active-label {
  transform: translateY(-10px);
  border-color: #d1d9e6 !important;
  border-radius: 15px;
  box-shadow: 2px 2px 4px #b8b9be, -2px -2px 4px #ffffff;
}
.checked .btn-title {
  animation: fadein 200ms;
  top: 50px;
}
.unchecked .active-label {
  background: transparent;
}
.unchecked .btn-title {
  visibility: hidden;
}
@media screen and (min-width: 576px) {
  .labels {
    cursor: pointer;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
