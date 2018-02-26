<template>
  <div class="fileWrap">
    <template v-if="isPicture">
      <div v-if="centerDialogVisible" class="bigImg" @click="centerDialogVisible=false">
        <img :src="path" >
      </div>
      <img :src="path" @click="showFile" class="miniImg">
      <b v-if="showNames">{{name | def}}</b>
      <i class="close" @click="remove" v-if="isShow">×</i>
    </template>
    <template v-if="!isPicture">
        <a :href="path" target="_blank"><img :src="filePath" class="miniImg"></a>
        <b>{{name|def}}</b>
        <i class="close" @click="remove" v-if="isShow">×</i>
    </template>
  </div>
</template>
<script>
  import Pdf from '../assets/images/PDF.jpg'
  import Excel from '../assets/images/Excel.jpg'
  import Txt from '../assets/images/Txt.jpg'
  import Word from '../assets/images/Word.jpg'
  export default{
    props: {
      path: '',
      name: '',
      pathShow: '',
      idx: '',
      isUpload: '',
      showName: undefined
    },
    data () {
      return {
        centerDialogVisible: false,
        filePath: '',
        isShow: 1,
        isPicture: true
      }
    },
    methods: {
      remove: function () {
        this.$emit('remove',this.idx)
      },
      showFile: function () {
        this.centerDialogVisible = true
      }
    },
    components: {

    },
    computed: {
      showNames () {
        if (this.showName === undefined) {
          return true
        } else {
          return this.showName
        }
      }
    },
    mounted () {
      if (this.isUpload === undefined || this.isUpload) {
        this.isShow = 1
      } else if (this.isUpload === 0 || this.isUpload === false) {
        this.isShow = 0
      }
      this.filePath = this.pathShow
      if (!this.name) return true
      let typeArr = this.name.split('.')
      let type = typeArr[typeArr.length - 1]
      if (type === 'doc' || type === 'docx') {
        this.filePath = Word
        this.isPicture = false
      } else if (type === 'xls' || type === 'xlsx') {
        this.filePath = Excel
        this.isPicture = false
      } else if (type === 'pdf') {
        this.filePath = Pdf
        this.isPicture = false
      } else if (type === 'txt') {
        this.filePath = Txt
        this.isPicture = false
      }
    }
  }
</script>
<style scoped>
.fileWrap {
  display: inline-block;
  word-wrap: break-word;
  vertical-align: top;
  text-align: center;
  width:134px;
  cursor: pointer;
  position: relative;
  margin: 0 5px;
}

.fileWrap img.miniImg{
  display: block;
  width: 134px;
  height: 94px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.fileWrap b {
  display: block;
  font-size: 12px;
  line-height: 20px;
  padding: 5px 0;
  color: #000;
  font-weight: normal;
  word-break: break-all;
}
i.close {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 15px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 14px;
  background: #fe0019;
  color: #fff;
}
.bigImg{
  position: fixed;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,.7);
  z-index:999;
}
.bigImg img{
  margin:auto;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  width:auto;
  max-width: 1000px;
  max-height: 900px;
  height: auto;
  z-index:9999
}
</style>
