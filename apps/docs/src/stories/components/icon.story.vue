<script lang="ts">
import {
  PlayIcon,
  PlusIcon,
  PauseIcon,
  RestartIcon,
  LoadingIcon,
  NextIcon,
  PreviousIcon,
  ForwardIcon,
  BackwardsIcon,
  InfoIcon,
  CloseIcon,
  ClockIcon,
  CalendarIcon,
  LinkIcon,
  ChapterIcon,
  DownloadIcon,
  AudioFileIcon,
  ImageFileIcon,
  PdfFileIcon,
  TextFileIcon,
  VideoFileIcon,
  EmbedIcon,
  TwitterIcon,
  RedditIcon,
  PinterestIcon,
  MailIcon,
  LinkedinIcon,
  FacebookIcon,
  ContentShowIcon,
  ContentPlaytimeIcon,
  ContentChapterIcon,
  ContentEpisodeIcon,
  ShareIcon,
  CopyIcon,
  Speaker0Icon,
  Speaker25Icon,
  Speaker50Icon,
  Speaker75Icon,
  PodloveIcon,
  PodlovePlayerIcon,
  TranscriptsIcon,
  SearchClearIcon,
  SearchNextIcon,
  SearchPreviousIcon,
  MissingConnectionIcon,
  InvalidConfigurationIcon,
  SubscribeIcon,
  ArrowToRightIcon,
  ArrowToLeftIcon,
  Speed050Icon,
  Speed075Icon,
  Speed100Icon,
  Speed125Icon,
  Speed150Icon,
  Speed175Icon,
  Speed200Icon,
  ActiveTabIcon,
  PlaylistIcon,
  SearchIcon,
  MenuPlayIcon,
  MenuPauseIcon,
  MenuEmptyIcon,
  MessengerIcon,
  CheckMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XingIcon,
  WhatsAppIcon
} from '@podlove/components';

export default {
  components: {
    PlayIcon,
    PlusIcon,
    PauseIcon,
    RestartIcon,
    LoadingIcon,
    NextIcon,
    PreviousIcon,
    ForwardIcon,
    BackwardsIcon,
    InfoIcon,
    CloseIcon,
    ClockIcon,
    CalendarIcon,
    LinkIcon,
    ChapterIcon,
    DownloadIcon,
    AudioFileIcon,
    ImageFileIcon,
    PdfFileIcon,
    TextFileIcon,
    VideoFileIcon,
    EmbedIcon,
    TwitterIcon,
    RedditIcon,
    PinterestIcon,
    MailIcon,
    LinkedinIcon,
    FacebookIcon,
    ContentShowIcon,
    ContentPlaytimeIcon,
    ContentChapterIcon,
    ContentEpisodeIcon,
    ShareIcon,
    CopyIcon,
    Speaker0Icon,
    Speaker25Icon,
    Speaker50Icon,
    Speaker75Icon,
    PodloveIcon,
    PodlovePlayerIcon,
    TranscriptsIcon,
    SearchClearIcon,
    SearchNextIcon,
    SearchPreviousIcon,
    MissingConnectionIcon,
    InvalidConfigurationIcon,
    SubscribeIcon,
    ArrowToRightIcon,
    ArrowToLeftIcon,
    Speed050Icon,
    Speed075Icon,
    Speed100Icon,
    Speed125Icon,
    Speed150Icon,
    Speed175Icon,
    Speed200Icon,
    ActiveTabIcon,
    PlaylistIcon,
    SearchIcon,
    MenuPlayIcon,
    MenuPauseIcon,
    MenuEmptyIcon,
    MessengerIcon,
    CheckMarkIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    XingIcon,
    WhatsAppIcon
  }
};
</script>

<script setup lang="ts">
import { computed, ref, resolveComponent } from 'vue';
import { burntSienna, charcoal } from '../colors.js';

const iconTypes = [
  'PlayIcon',
  'PlusIcon',
  'PauseIcon',
  'RestartIcon',
  'LoadingIcon',
  'NextIcon',
  'PreviousIcon',
  'ForwardIcon',
  'BackwardsIcon',
  'InfoIcon',
  'CloseIcon',
  'ClockIcon',
  'CalendarIcon',
  'LinkIcon',
  'ChapterIcon',
  'DownloadIcon',
  'AudioFileIcon',
  'ImageFileIcon',
  'PdfFileIcon',
  'TextFileIcon',
  'VideoFileIcon',
  'EmbedIcon',
  'TwitterIcon',
  'RedditIcon',
  'PinterestIcon',
  'MailIcon',
  'LinkedinIcon',
  'FacebookIcon',
  'ContentShowIcon',
  'ContentPlaytimeIcon',
  'ContentChapterIcon',
  'ContentEpisodeIcon',
  'ShareIcon',
  'CopyIcon',
  'Speaker0Icon',
  'Speaker25Icon',
  'Speaker50Icon',
  'Speaker75Icon',
  'PodloveIcon',
  'PodlovePlayerIcon',
  'TranscriptsIcon',
  'SearchClearIcon',
  'SearchNextIcon',
  'SearchPreviousIcon',
  'MissingConnectionIcon',
  'InvalidConfigurationIcon',
  'SubscribeIcon',
  'ArrowToRightIcon',
  'ArrowToLeftIcon',
  'Speed050Icon',
  'Speed075Icon',
  'Speed100Icon',
  'Speed125Icon',
  'Speed150Icon',
  'Speed175Icon',
  'Speed200Icon',
  'ActiveTabIcon',
  'PlaylistIcon',
  'SearchIcon',
  'MenuPlayIcon',
  'MenuPauseIcon',
  'MenuEmptyIcon',
  'MessengerIcon',
  'CheckMarkIcon',
  'ChevronRightIcon',
  'ChevronLeftIcon',
  'XingIcon',
  'WhatsAppIcon'
];

const type = ref(iconTypes[0]);
const color = ref(burntSienna);
const background = ref(charcoal);
const size = ref(21);

const style = ref({
  '--podlove-component--icon--color': color,
  '--podlove-component--icon--background': background
});

const compType = computed(() => resolveComponent(type.value));
</script>

<template>
  <Story title="Components/Icon" auto-props-disabled>
    <component :is="compType" :size="size" :style="style" />

    <template #controls>
      <HstColor v-model="color" title="Color" />
      <HstColor v-model="background" title="Background" />
      <HstSelect v-model="type" title="Type" :options="iconTypes" />
      <HstNumber v-model="size" title="Size" />
    </template>
  </Story>
</template>
