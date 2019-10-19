<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4704 17.2998C14.4704 17.2998 15.4148 18.2442 14.3703 19.2887L12.2328 21.4262V21.4262C10.866 22.793 8.64993 22.793 7.2831 21.4262L6.92891 21.072L6.57473 20.7178C5.20789 19.351 5.20789 17.1349 6.57473 15.768V15.768C7.02621 15.3166 7.66768 14.6751 8.7122 13.6306C9.75671 12.5861 10.6994 13.5288 10.6994 13.5288"
      :stroke="color"
      :stroke-width="filled ? 1.5 : 1.1"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M17.2988 14.4714C17.2988 14.4714 18.2432 15.4158 19.2877 14.3713L21.4252 12.2338V12.2338C22.792 10.867 22.792 8.65091 21.4252 7.28408L21.071 6.92989L20.7168 6.5757C19.35 5.20887 17.1339 5.20887 15.7671 6.5757V6.5757C15.3156 7.02719 14.6741 7.66866 13.6296 8.71317C12.5851 9.75768 13.5278 10.7004 13.5278 10.7004"
      :stroke="color"
      :stroke-width="filled ? 1.5 : 1.1"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M10.2928 17.7072L17.7071 10.293"
      :stroke="color"
      :stroke-width="filled ? 1.5 : 1.1"
      stroke-linecap="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 28
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    filled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
