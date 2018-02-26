<template>
  <div class="_ex-inputpicker">
    <el-popover ref="PopoverCon" placement="bottom-end" width="322" trigger="click" v-model="isShowPopoverOpen">
      <slot></slot>
    </el-popover>
    <el-input v-model="_value" v-popover:PopoverCon @mouseenter.native="isHideClearBtn = false"
              @mouseleave.native="isHideClearBtn = true">
      <i slot="suffix" v-if="isHideClearBtn || value === ''">{{suffixText}}</i>
      <i slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clearval"
         v-if="!isHideClearBtn && value !== ''"></i>
    </el-input>
  </div>
</template>
<script>
  export default {
    props: {
      value: '',
      suffixText: {
        type: String,
        default: '月'
      }
    },
    data() {
      return {
        isShowPopoverOpen: false,
        isHideClearBtn: true
      }
    },
    methods: {
      clearval() {
        this.$emit('input', '')
      },
      close() {
        this.isShowPopoverOpen = false
      }
    },
    computed: {
      _value: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
<style scoped>
</style>
