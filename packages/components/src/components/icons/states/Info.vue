<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
    stroke-linejoin="round"
    stroke-miterlimit="1.414"
  >
    <circle cx="25" cy="25" r="18.05" fill="none" :stroke="color" stroke-width="2" />
    <circle cx="25" cy="16.6" r="2.749" :fill="color" />
    <path d="M21 22h6v12h2v2h-8v-2h2V24h-2v-2z" :fill="color" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 25
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
