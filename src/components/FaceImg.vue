<template>
  <svg id="badge" xmlns="http://www.w3.org/2000/svg" width="417" height="468">
    <image
      v-if="face"
      :href="require(`@/assets/img/report/${face}.svg`)"
      height="100%"
      width="100%"
    />
    <image
      v-if="eyes"
      :href="require(`@/assets/img/report/${eyes}.svg`)"
      height="100%"
      width="100%"
    />
    <image
      v-if="mouth"
      :href="require(`@/assets/img/report/${mouth}.svg`)"
      height="100%"
      width="100%"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  face: {
    type: [String, Object],
    default: 'report6_notice_face',
  },
  eyes: {
    type: String,
    default: null,
  },
  mouth: { type: String, default: null },
});
console.log(props.face);
</script>

<style>
/* Footer 스타일 */
</style>
