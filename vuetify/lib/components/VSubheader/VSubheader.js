// Styles
import "../../../src/components/VSubheader/VSubheader.sass"; // Mixins

import Themeable from '../../mixins/themeable';
import mixins from '../../util/mixins';
import { getSlot } from '../../util/helpers';
export default mixins(Themeable
/* @vue/component */
).extend({
  name: 'v-subheader',
  props: {
    inset: Boolean
  },

  render(h) {
    return h('div', {
      staticClass: 'v-subheader',
      class: {
        'v-subheader--inset': this.inset,
        ...this.themeClasses
      },
      attrs: this.$attrs,
      on: this.$listeners
    }, getSlot(this));
  }

});
//# sourceMappingURL=VSubheader.js.map