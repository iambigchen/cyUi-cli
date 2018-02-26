<template>
  <el-autocomplete :value="value"
                   :value-key="valueKey"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :debounce="debounce"
                   :fetch-suggestions="fetchSuggestions"
                   :popper-class="popperClass"
                   :trigger-on-focus="triggerOnFocus"
                   :name="name"
                   :select-when-unmatched="selectWhenUnmatched"
                   :label="label"
                   :prefix-icon="prefixIcon"
                   :suffix-icon="suffixIcon"
                   @input="handleChange"
                   @select="handleSelect"
                   @blur="handleBlur"
                   @focus="handleFocus"
                    ref="_autocomplete">
    <template slot-scope="props">
      <slot :item="props.item">
        {{ props.item[valueKey] }}
      </slot>
    </template>
  </el-autocomplete>
</template>
<script>
  export default {
    name: 'ExAutocomplete',
    data () {
      return {
      }
    },
    props: {
      valueKey: {
        type: String,
        default: 'value'
      },
      popperClass: String,
      placeholder: String,
      disabled: Boolean,
      name: String,
      size: String,
      value: String,
      autofocus: Boolean,
      fetchSuggestions: Function,
      triggerOnFocus: {
        type: Boolean,
        default: true
      },
      customItem: String,
      selectWhenUnmatched: {
        type: Boolean,
        default: false
      },
      prefixIcon: String,
      suffixIcon: String,
      label: String,
      debounce: {
        type: Number,
        default: 300
      }
    },
    methods: {
      handleChange (value) {
        this.$emit('input', value)
      },
      handleSelect (item) {
        this.$emit('select', item)
        setTimeout(() => {
          this.$refs['_autocomplete'].broadcast('ElAutocompleteSuggestions', 'visible', [false, '0'])
        }, 500)
      },
      handleBlur (event) {
        this.$emit('blur', event)
      },
      handleFocus (event) {
        this.$emit('focus', event)
      }
    }
  }
</script>
