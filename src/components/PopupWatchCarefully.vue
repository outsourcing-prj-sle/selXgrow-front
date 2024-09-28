<template>
  <div
    class="absolute bg-white left-1/2 -translate-x-1/2 top-[129px] border-[#19146A] rounded-[20px] border-[5px] w-[540px] flex flex-col justify-center items-center py-[56px]"
  >
    <div
      class="bg-[#19146A] rounded-lg font-bold text-[#D3F571] text-[27px] px-8 py-5 relative"
    >
      Watch carefully!
      <img
        :src="require(`@/assets/img/watch_popup_left.svg`)"
        class="w-[20px] absolute top-2 left-2"
        alt="watch_popup_left"
      />
      <img
        :src="require(`@/assets/img/watch_popup_right.svg`)"
        class="w-[20px] absolute bottom-2 right-2"
        alt="watch_popup_right"
      />
    </div>
    <span class="text-[#19146A] text-2xl font-bold mt-7">
      The photo will only be displayed<br />
      on the screen for a short amount of time.
    </span>
  </div>
</template>

<script setup></script>

<style scoped></style>
