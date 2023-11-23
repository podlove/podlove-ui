import type { PodloveWebPlayerShow } from './show.js';
import type { PodloveWebPlayerChapter } from './chapter.js';
import type { PodloveWebPlayerAudio } from './audio.js';
import type { PodloveWebPlayerFile } from './file.js';
import type { PodloveWebPlayerContributor } from './contributor.js';
import type { PodloveWebPlayerTranscript } from './transcript.js';

/**
 * Episode
 * @see https://docs.podlove.org/podlove-web-player/v5/configuration
 */
export interface PodloveWebPlayerEpisode {
  // Configuration Version
  version: number;

  /**
   * Show Related Information
   */
  show: PodloveWebPlayerShow;

  /**
   * Episode related Information
   */
  title: string;
  subtitle: string;
  summary: string;
  /**
   * ISO 8601 DateTime format, this is capable of adding a time offset, see https://en.wikipedia.org/wiki/ISO_8601
   */
  publicationDate: string;
  /**
   * ISO 8601 Duration format ([hh]:[mm]:[ss].[sss]), capable of add ing milliseconds, see https://en.wikipedia.org/wiki/ISO_8601
   */
  duration: string;
  poster: string;
  link: string;

  /**
   * Chapters:
   * - can be a plain list or a reference to a json file
   * - if present chapters tab will be available
   */
  chapters?: string | PodloveWebPlayerChapter[];

  /**
   * Audio Assets
   * - media Assets played by the audio player
   * - format support depends on the used browser (https://en.wikipedia.org/wiki/HTML5_audio#Supported_audio_coding_formats)
   * - also supports HLS streams
   *
   * Asset
   * - url: absolute path to media asset
   * - size: file size in  byte
   * - (title): title to be displayed in download tab
   * - mimeType: media asset mimeType
   */
  audio: PodloveWebPlayerAudio[];

  /**
   * Files
   * - list of files available for download
   * - if no files are present, audio assets will be used as downloads
   *
   * Asset
   * - url: absolute path to media asset
   * - size: file size in  byte
   * - title: title to be displayed in download tab
   * - (mimeType): media asset mimeType
   */
  files?: PodloveWebPlayerFile[];

  /**
   * Contributors
   * - used by info and transcripts tab
   *
   * Contributor
   * - id: used as a reference in transcripts
   * - name: name of the contributor
   * - (avatar): avatar of the contributor
   * - (group): contributors group
   */
  contributors?: PodloveWebPlayerContributor[];

  /**
   * Transcripts:
   * - can be a plain list or a reference to a json file
   * - if present transcripts tab will be available (if the template includes it)
   */
  transcripts?: string | PodloveWebPlayerTranscript[];
}
