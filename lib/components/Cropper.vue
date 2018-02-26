<template>
  <div class="cropperWrap">
    <img :src="src" ref="cropper"/>
  </div>
</template>
<script>
  import _$ from 'jquery'
//  let _$ = $Constructor(window)
  import jcropConstructor from '../assets/plugins/jcrop/jquery.Jcrop.js'
  import '../assets/plugins/jcrop/jquery.Jcrop.css'

  jcropConstructor(_$)
  export default {
    data() {
      return {
        jcrop: null,
        rect: {
          imgSceneWidth: 0,
          imgSceneHeight: 0,
          imgNaturalWidth: 0,
          imgNaturalHeight: 0,
          cutMinWidth: 0,
          cutMinHeight: 0
        },
        Instance: {}
      }
    },
    props: {
      aspectRatio: Array,
      src: ''
    },
    computed: {},
    watch: {
      src() {
        this.$nextTick(function () {
          this.initCrop()
        })
      }
    },
    methods: {
      onSelect(rect) {
        let rate = this.rect.imgSceneWidth / this.rect.imgNaturalWidth
        this.rect = Object.assign(this.rect, rect, {
          naturalX: rect.x / rate,
          naturalY: rect.y / rate,
          naturalW: (rect.w / rate).toFixed(0),
          naturalH: (rect.h / rate).toFixed(0)
        })
        this.$emit('select', this.rect)
      },
      destroy() {
        if (this.jcrop && this.jcrop.destroy) {
          this.jcrop.destroy()
          this.Instance.$img.css({
            width: '100%',
            height: 'auto'
          })
        }
      },
      initCrop() {
        let that = this
        let minCutWidth = this.aspectRatio[0]
        let minCutHeight = this.aspectRatio[1]
        let img = this.$refs['cropper']
        this.Instance.$img = _$(img)
        let imgSceneWidth = this.rect.imgSceneWidth = _$(img).width()
        let imgSceneHeight = this.rect.imgSceneHeight = _$(img).height()
        this.rect.imgNaturalWidth = img.naturalWidth
        this.rect.imgNaturalHeight = img.naturalHeight
        let cutMinWidth = this.rect.cutMinWidth = (parseFloat(minCutWidth) * parseFloat(imgSceneWidth)) / parseFloat(img.naturalWidth)
        let cutMinHeight = this.rect.cutMinHeight = (parseFloat(minCutHeight) * parseFloat(imgSceneHeight)) / parseFloat(img.naturalHeight)
        this.destroy()
        console.log(this.src)
        _$(that.$refs['cropper']).Jcrop({
          aspectRatio: minCutWidth / minCutHeight,
          onSelect: that.onSelect,
          setSelect: [20, 20, cutMinWidth, cutMinHeight],
          minSize: [cutMinWidth, cutMinHeight] /*边框最小尺寸*/
        }, function () {
          that.jcrop = this
        })
      }
    },
    mounted() {
      let that = this
      setTimeout(function () {
        that.initCrop()
      }, 500)
    }
  }
</script>
<style scoped>
  .cropperWrap {
    width: 900px;
  }

  .cropperWrap img {
    width: 100%;
  }
</style>
