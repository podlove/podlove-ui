<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size / 1.3" viewBox="0 0 24.8 21">
    <!-- Muted / 0% -->
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g :stroke="color">
        <polyline points="9,17 12.5,20.5 12.5,12" />
        <path d="M12.5,6V0.5l-7,7H2C1.2,7.5,0.5,8.2,0.5,9v3c0,0.8,0.7,1.5,1.5,1.5h2.5" />
        <path d="M15.5,10.5c0,1.4-1.1,2.5-2.5,2.5h-0.5" />
        <path d="M1.5,20.5l20-20" />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 23
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
