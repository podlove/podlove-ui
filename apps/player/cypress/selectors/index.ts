import controllbar from './controllbar';
import progressbar from './progressbar';
import header from './header';

// Tabs
import audio from './tabs/audio';
import chapters from './tabs/chapters';
import files from './tabs/files';
import info from './tabs/info';
import share from './tabs/share';

export default (cy) =>
  Object.assign({}, controllbar(cy), progressbar(cy), header(cy), {
    tabs: {
      audio: audio(cy),
      chapters: chapters(cy),
      files: files(cy),
      info: info(cy),
      share: share(cy)
    }
  })
