<template>
  <el-dialog :append-to-body="true" :title="title" :sizes="width" :visible.sync="_visible" :width="width" @open="open" @close="close">
    <slot v-if="destroySlot"></slot>
  </el-dialog>
</template>
<script>
  export default {
    name: 'ExDialog',
    data () {
      return {
        destroySlot: true
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      _visible: {
        get () {
          return this.visible
        },
        set (val) {
          this.$emit('update:visible', val)
        }
      }
    },
    methods: {
      open () {
        this.$emit('open')
        this.destroySlot = true
      },
      close () {
        let that = this
        this.$emit('close')
        //动画结束消除节点
        setTimeout(function () {
          that.destroySlot = false
        }, 400)
      }
    }
  }
</script>
