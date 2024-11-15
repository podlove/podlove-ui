export const defaultLang = 'de';

const en = {
  ARCHIVE: {
    LOAD_MORE: 'Load More'
  },
  HEADER: {
    SUBSCRIBE: 'Subscribe',
    EPISODES: 'Episodes',
    CONTRIBUTORS: 'Contributors'
  },
  FOOTER: {
    COPYRIGHT: ({ copyright }: { copyright: string }) => `© ${copyright}`,
    CREATED_WITH: ({ name, buildDate }: { name: string, buildDate: string }) => `Created with ${name} on ${buildDate}`,
    CONTACT: ({ name }: { name: string }) => `Contact: ${name}`,
  },
  EPISODE: {
    SUMMARY: 'Summary',
    SHOWNOTES: 'Shownotes',
    TIMELINE: 'Timeline',
    DISCUSS: 'Discuss'
  },
  PLAYBAR: {
    CHAPTERS: 'Chapters'
  },
  CONTRIBUTOR: {
    SOCIAL: 'Social',
    DONATION: 'Support',
    SUMMARY: 'Summary',
    EPISODES: 'Episodes',
    EPISODE: 'Episode',
    TIMELINE: 'Timeline',
    WORDS_TOTAL: 'Words',
    WORDS_TOTAL_TOOLTIP: ({ relative, total }: { relative: string; total: number }) => `${relative}% of all words in this podcast (${total})`,
    TALK_TIME_TOTAL: 'Speaking Time',
    TALK_TIME_TOTAL_TOOLTIP: ({ relative, total }: { relative: string; total: number }) => `${relative}% of the total speaking time in this podcast (${total})`,
    EPISODES_TOTAL: 'Episodes',
    EPISODES_TOTAL_TOOLTIP: ({ relative, total }: { relative: string; total: number }) => `${relative}% of all episodes in this podcast (${total})`
  },
  CONTRIBUTOR_LIST: {
    TITLE: 'Contributors',
    EPISODES_COUNT: ({ count }: { count: number }) => (count <= 1 ? `${count} episode` : `${count} episodes`)
  },
  SEARCH: {
    PLACEHOLDER: 'Search',
    NO_RESULTS: 'No results were found',
    INDEXING: 'Search index is created',
    EPISODE: ({ title, number }: { title: string; number: number }) => `Episode ${number} - ${title}`,
    CATEGORY: {
      EPISODE: 'Episodes',
      CONTRIBUTOR: 'Contributors',
      TRANSCRIPT: 'Transcripts'
    }
  },
  SUBSCRIBE_BUTTON: {
    CLIENTS: 'Podcast Clients',
    FEED: 'RSS Feed'
  },
  A11Y: {
    PLAYER_CHAPTER_END: 'Skip to the end of the episode',
    PLAYER_CHAPTER_NEXT: ({ title, index }: { title: string; index: number }) => `Skip to the next chapter: ${index} - ${title}`,
    PLAYER_CHAPTER_START: 'Skip to the start of the episode',
    PLAYER_CHAPTER_PREVIOUS: ({ title, index }: { title: string; index: number }) => `Skip to the previous chapter: ${index} - ${title}`,
    PLAYER_CHAPTER_CURRENT: ({ title, index }: { title: string; index: number }) => `Jump to the beginning of the active chapter: ${index} - ${title}`,
    PLAYER_STEPPER_BACK: ({ seconds }: { seconds: number }) => `Jump back ${seconds} seconds`,
    PLAYER_STEPPER_FORWARD: ({ seconds }: { seconds: number }) => `Jump forward ${seconds} seconds`,
    PROGRESSBAR_INPUT: 'Change playing time in percent',
    PLAYER_PLAY: 'Play Episode',
    PLAYER_START: ({ seconds, hours, minutes }: { seconds: number; hours: number; minutes: number }) => `Start Episode - Duration: ${hours} hours ${minutes} minutes ${seconds} seconds`,
    PLAYER_RESTART: 'Restart episode',
    PLAYER_ERROR: 'Try to play the episode again',
    PLAYER_PAUSE: 'Pause episode',
    PLAYER_LOADING: 'Episode is loading'
  },
  TIMELINE: {
    START: 'Start',
    END: 'End',
  }
};

const de: typeof en = {
  ARCHIVE: {
    LOAD_MORE: 'Mehr Anzeigen'
  },
  HEADER: {
    SUBSCRIBE: 'Subscribe',
    EPISODES: 'Episoden',
    CONTRIBUTORS: 'Kontributoren'
  },
  FOOTER: {
    COPYRIGHT: ({ copyright }: { copyright: string }) => `© ${copyright}`,
    CREATED_WITH: ({ name, buildDate }: { name: string, buildDate: string }) => `Erstellt mit ${name} am ${buildDate}`,
    CONTACT: ({ name }: { name: string }) => `Kontakt: ${name}`,
  },
  EPISODE: {
    SUMMARY: 'Info',
    SHOWNOTES: 'Shownotes',
    TIMELINE: 'Timeline',
    DISCUSS: 'Kommentare'
  },
  PLAYBAR: {
    CHAPTERS: 'Kapitel'
  },
  CONTRIBUTOR: {
    SOCIAL: 'Social',
    DONATION: 'Support',
    SUMMARY: 'Zusammenfassung',
    EPISODES: 'Episoden',
    EPISODE: 'Episode',
    TIMELINE: 'Verlauf',
    WORDS_TOTAL: 'Wörter',
    WORDS_TOTAL_TOOLTIP: ({ relative, total }: { relative: string; total: number }) => `${relative}% aller Wörter in diesem Podcast (${total})`,
    TALK_TIME_TOTAL: 'Sprechzeit',
    TALK_TIME_TOTAL_TOOLTIP: ({ relative, total }: { relative: string; total: number }) => `${relative}% der gesamten Sprechzeit in diesem Podcast (${total})`,
    EPISODES_TOTAL: 'Episoden',
    EPISODES_TOTAL_TOOLTIP: ({ relative, total }: { relative: string; total: number }) => `${relative}% aller Episoden in diesem Podcast (${total})`
  },
  CONTRIBUTOR_LIST: {
    TITLE: 'Kontributoren',
    EPISODES_COUNT: ({ count }: { count: number }) => (count <= 1 ? `${count} Episode` : `${count} Episoden`)
  },
  SEARCH: {
    PLACEHOLDER: 'Suchen',
    NO_RESULTS: 'Es wurden keine Ergebnisse gefunden',
    INDEXING: 'Suchindex wird erstellt',
    EPISODE: ({ title, number }: { title: string; number: number }) => `Episode ${number} - ${title}`,
    CATEGORY: {
      EPISODE: 'Episoden',
      CONTRIBUTOR: 'Kontributoren',
      TRANSCRIPT: 'Transkripte'
    }
  },
  SUBSCRIBE_BUTTON: {
    CLIENTS: 'Podcast Clients',
    FEED: 'RSS Feed'
  },
  A11Y: {
    PLAYER_CHAPTER_END: 'Zum Ende der Episode springen',
    PLAYER_CHAPTER_NEXT: ({ title, index }: { title: string; index: number }) => `Zum nächsten Kapitel: ${index} - ${title}`,
    PLAYER_CHAPTER_START: 'Zum Start der Episode springen',
    PLAYER_CHAPTER_PREVIOUS: ({ title, index }: { title: string; index: number }) => `Zum vorhergehenden Kapitel: ${index} - ${title}`,
    PLAYER_CHAPTER_CURRENT: ({ title, index }: { title: string; index: number }) => `Zum Anfang des aktiven Kapitels springen: ${index} - ${title}`,
    PLAYER_STEPPER_BACK: ({ seconds}: { seconds: number }) => `${seconds} Sekunden zurückspringen`,
    PLAYER_STEPPER_FORWARD: ({ seconds}: { seconds: number }) => `${seconds} Sekunden vorspringen`,
    PROGRESSBAR_INPUT: 'Spielzeit in Prozent ändern',
    PLAYER_PLAY: 'Episode abspielen',
    PLAYER_START: ({ seconds, hours, minutes }: { seconds: number; hours: number; minutes: number }) => `Starte Episode - Dauer: ${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`,
    PLAYER_RESTART: 'Episode neustarten',
    PLAYER_ERROR: 'Nochmals versuchen Episode abzuspielen',
    PLAYER_PAUSE: 'Episode pausieren',
    PLAYER_LOADING: 'Episode lädt'
  },
  TIMELINE: {
    START: 'Start',
    END: 'End',
  }
};


export const messages = {
  de, en
};
