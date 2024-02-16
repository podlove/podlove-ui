export const defaultLang = 'de';

const de = {
  HEADER: {
    SUBSCRIBE: 'Subscribe',
    EPISODES: 'Episoden',
    CONTRIBUTORS: 'Kontributoren'
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
    WORDS_TOTAL_TOOLTIP: '{relative}% aller Wörter in diesem Podcast ({total})',
    TALK_TIME_TOTAL: 'Sprechzeit',
    TALK_TIME_TOTAL_TOOLTIP: '{relative}% der gesamten Sprechzeit in diesem Podcast ({total})',
    EPISODES_TOTAL: 'Episoden',
    EPISODES_TOTAL_TOOLTIP: '{relative}% aller Episoden in diesem Podcast ({total})'
  },
  CONTRIBUTOR_LIST: {
    TITLE: 'Kontributoren',
    EPISODES_COUNT: ({ count }: { count: number }) => (count <= 1 ? `${count} Episode` : `${count} Episoden`)
  },
  SEARCH: {
    PLACEHOLDER: 'Suchen',
    NO_RESULTS: 'Es wurden keine Ergebnisse gefunden',
    INDEXING: 'Suchindex wird erstellt',
    EPISODE: `Episode {number} - {title}`,
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
    PLAYER_CHAPTER_NEXT: 'Zum nächsten Kapitel: {index} - {title}',
    PLAYER_CHAPTER_START: 'Zum Start der Episode springen',
    PLAYER_CHAPTER_PREVIOUS: 'Zum vorhergehenden Kapitel: {index} - {title}',
    PLAYER_CHAPTER_CURRENT: 'Zum Anfang des aktiven Kapitels springen: {index} - {title}',
    PLAYER_STEPPER_BACK: '{seconds} Sekunden zurückspringen',
    PLAYER_STEPPER_FORWARD: '{seconds} Sekunden vorspringen',
    PROGRESSBAR_INPUT: 'Spielzeit in Prozent ändern',
    PLAYER_PLAY: 'Episode abspielen',
    PLAYER_START: 'Starte Episode - Dauer: {hours} Stunden {minutes} Minuten {seconds} Sekunden',
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
  de
};
