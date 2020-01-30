export interface CompleteConfig {
  episode: Episode.Config | {};
  config: Player.Config | {};
}

export declare namespace Episode {

  interface Chapter {
    start: string;
    title: string;
    href: string;
    image: string;
  }

  interface Show {
    title: string;
    subtitle: string;
    summary: string;
    poster: string;
    link: string;
  }

  type AudioMimeType = "audio\/mp4" | "audio\/opus" | "audio\/ogg" | "audio\/mpeg";

  interface AudioFileMeta {
    url: string;
    size: string;
    title: string;
    mimeType: AudioMimeType;
  }

  interface ContributorRole {
    id: string;
    slug: string;
    title: string;
  }

  interface ContributorGroup {
    id: string;
    slug: string;
    title: string;
  }

  interface Contributor {
    id: string;
    name: string;
    avatar: string
    role: ContributorRole;
    group: ContributorGroup;
    comment?: string;
  }

  interface Config {
    version: number;
    show: Show;
    title: string;
    subtitle: string;
    summary: string;
    publicationDate: string;
    poster: string;
    duration: string;
    link: string;
    audio: AudioFileMeta[];
    chapters: string | Chapter[];
    contributors: Contributor[];
    transcripts: string;
  }
}

export declare namespace Player {
  interface Token {
    brand: string;
    brandDark: string;
    brandDarkest: string;
    brandLightest: string;
    shadeDark: string;
    shadeBase: string;
    contrast: string;
    alt: string;
  }

  interface Font {
    name: string;
    family: string[];
    weight: number;
    src: string[];
  }


  interface Theme {
    tokens: Token
    fonts: { [key: string]: Font }
  }

  interface Share {
    channels: string[];
    outlet: string;
    sharePlayTime: boolean;
  }

  interface PlaylistItem {
    title: string;
    config: string | Episode.Config;
    duration: string;
  }

  type Playlist = PlaylistItem[];

  interface Config {
    activeTab: string;
    theme: Theme;
    "subscribe-button": SubscribeButton.Button;
    playlist: string | Playlist;
    share: Share;
    base: string;
  }
}

export declare namespace SubscribeButton {
  interface Client {
    id: string;
    service: string;
  }

  interface Button {
    feed: string;
    clients: Client[];
  }
}


export function chapters(config: Episode.Config): string | Episode.Chapter[]