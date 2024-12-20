// Styles
import "../../../src/components/VRadioGroup/VRadio.sass";
import VLabel from '../VLabel';
import VIcon from '../VIcon';
import VInput from '../VInput'; // Mixins

import BindsAttrs from '../../mixins/binds-attrs';
import Colorable from '../../mixins/colorable';
import { factory as GroupableFactory } from '../../mixins/groupable';
import Rippleable from '../../mixins/rippleable';
import Themeable from '../../mixins/themeable';
import Selectable, { prevent } from '../../mixins/selectable'; // Utilities

import { getSlot } from '../../util/helpers';
import mixins from '../../util/mixins';
import { mergeListeners } from '../../util/mergeData';
const baseMixins = mixins(BindsAttrs, Colorable, Rippleable, GroupableFactory('radioGroup'), Themeable);
/* @vue/component */

export default baseMixins.extend().extend({
  name: 'v-radio',
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: null
    },
    id: String,
    label: String,
    name: String,
    offIcon: {
      type: String,
      default: '$radioOff'
    },
    onIcon: {
      type: String,
      default: '$radioOn'
    },
    readonly: {
      type: Boolean,
      default: null
    },
    value: {
      default: null
    }
  },
  data: () => ({
    isFocused: false
  }),
  computed: {
    classes() {
      return {
        'v-radio--is-disabled': this.isDisabled,
        'v-radio--is-focused': this.isFocused,
        ...this.themeClasses,
        ...this.groupClasses
      };
    },

    computedColor() {
      if (this.isDisabled) return undefined;
      return Selectable.options.computed.computedColor.call(this);
    },

    computedIcon() {
      return this.isActive ? this.onIcon : this.offIcon;
    },

    computedId() {
      return VInput.options.computed.computedId.call(this);
    },

    hasLabel: VInput.options.computed.hasLabel,

    hasState() {
      return (this.radioGroup || {}).hasState;
    },

    isDisabled() {
      var _a;

      return (_a = this.disabled) !== null && _a !== void 0 ? _a : !!this.radioGroup && this.radioGroup.isDisabled;
    },

    isReadonly() {
      var _a;

      return (_a = this.readonly) !== null && _a !== void 0 ? _a : !!this.radioGroup && this.radioGroup.isReadonly;
    },

    computedName() {
      if (this.name || !this.radioGroup) {
        return this.name;
      }

      return this.radioGroup.name || `radio-${this.radioGroup._uid}`;
    },

    rippleState() {
      return Selectable.options.computed.rippleState.call(this);
    },

    validationState() {
      return (this.radioGroup || {}).validationState || this.computedColor;
    }

  },
  methods: {
    genInput(args) {
      // We can't actually use the mixin directly because
      // it's made for standalone components, but its
      // genInput method is exactly what we need
      return Selectable.options.methods.genInput.call(this, 'radio', args);
    },

    genLabel() {
      if (!this.hasLabel) return null;
      return this.$createElement(VLabel, {
        on: {
          // Label shouldn't cause the input to focus
          click: prevent
        },
        attrs: {
          for: this.computedId
        },
        props: {
          color: this.validationState,
          focused: this.hasState
        }
      }, getSlot(this, 'label') || this.label);
    },

    genRadio() {
      const {
        title,
        ...radioAttrs
      } = this.attrs$;
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [this.$createElement(VIcon, this.setTextColor(this.validationState, {
        props: {
          dense: this.radioGroup && this.radioGroup.dense
        }
      }), this.computedIcon), this.genInput({
        name: this.computedName,
        value: this.value,
        ...radioAttrs
      }), this.genRipple(this.setTextColor(this.rippleState))]);
    },

    onFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },

    onBlur(e) {
      this.isFocused = false;
      this.$emit('blur', e);
    },

    onChange() {
      if (this.isDisabled || this.isReadonly || this.isActive) return;
      this.toggle();
    },

    onKeydown: () => {} // Override default with noop

  },

  render(h) {
    const data = {
      staticClass: 'v-radio',
      class: this.classes,
      on: mergeListeners({
        click: this.onChange
      }, this.listeners$),
      attrs: {
        title: this.attrs$.title
      }
    };
    return h('div', data, [this.genRadio(), this.genLabel()]);
  }

});
//# sourceMappingURL=VRadio.js.map