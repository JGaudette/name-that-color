import 'alpinejs';

import './styles.scss';

const ntc = require('ntcjs');

window.App = function () {
  let data = {
    colorHex: null,
    name: null,
    colors: [],
  };

  let actions = {
    toggleLock() {
      let action = this.locked ? 'unlock' : 'lock';

      socket.emit(action);
    },
    mounted() {
      console.log('mounted');
    },
    setColorName() {
      if (!this.colorHex.startsWith('#')) {
        this.colorHex = `#${this.colorHex}`;
      }

      this.colorHex = this.colorHex.replace(/#+/, '#');

      if (!/^#[0-9A-F]{6}$/i.test(this.colorHex)) {
        this.name = '';
        return;
      }

      this.name = ntc.name(this.colorHex)[1];

      if (this.colors.map((e) => e.hex).includes(this.colorHex)) {
        return;
      }

      this.colors.push({
        hex: this.colorHex,
        name: this.name,
      });
    },
    clipboardSass() {
      const name = this.name.replace(/ \/ /, '-').replace(/ /, '-');
      navigator.clipboard.writeText(`$${name}: ${this.colorHex};`.toLowerCase());
    },
    clipboardLess() {
      const name = this.name.replace(/ \/ /, '-').replace(/ /, '-');
      navigator.clipboard.writeText(`@${name}: ${this.colorHex};`.toLowerCase());
    },
  };

  return {
    ...data,
    ...actions,
  };
};
