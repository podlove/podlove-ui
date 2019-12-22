<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.7722 3.55L18.45 7.22782V19.45H5.55V3.55H14.7722Z"
      :stroke="color"
      stroke-width="1.1"
    />
    <path
      d="M14.5 3.5V6.75C14.5 7.16421 14.8358 7.5 15.25 7.5H18.5"
      :stroke="color"
      stroke-width="1.1"
    />
    <path
      d="M10.076 12.6998L10.133 12H7V12.6998H8.10129V16H9.00638V12.6998H10.076Z"
      :fill="color"
    />
    <path
      d="M12.7652 12C12.6913 12.1586 12.0374 13.4842 12.0374 13.4842L11.3032 12.0181L10.2841 12.0181L11.3411 13.9548C10.9677 14.5641 10.531 15.3424 10.1892 16H11.1449C11.2104 15.856 11.9741 14.3107 11.9741 14.3107L12.8222 16L13.8222 15.9819L12.664 13.8643C12.9994 13.3092 13.4171 12.5732 13.7146 12H12.7652Z"
      :fill="color"
    />
    <path
      d="M16.943 12.6998L17 12H13.867V12.6998H14.9683V16H15.8734V12.6998H16.943Z"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
