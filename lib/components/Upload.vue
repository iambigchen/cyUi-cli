<template>
  <div class="uploadWrap">
    <el-upload
      ref="uploader"
      :auto-upload="!cropper"
      :multiple="false"
      :data="_exData"
      :action="action"
      :name='name'
      :show-file-list=false
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-change="fileChange"
      :before-upload="uploadBefore"
      v-loading.fullscreen.lock="fullscreenLoading">
      <ex-dialog title="剪切图片" :visible.sync="dialog.cropperShow" width="1000px" @close="clearFiles">
        <Cropper :src="selectedImg.url" @select="cropperSelect" :aspectRatio="aspectRatio" style="margin:0 auto"></Cropper>
        <div style="text-align: center;margin:20px">
          <el-button type="custom-btn2" size="mini" @click="submitUpload">确定</el-button>
          <el-button type="danger" size="mini" @click="dialog.cropperShow = false">取消</el-button>
        </div>
      </ex-dialog>
      <slot name="uploadBotton">
        <img src="../assets/images/upImg.jpg" />
        <b>{{title ? title : '添加附件'}}</b>
      </slot>
    </el-upload>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialog: {
          cropperShow: false
        },
        file: {},
        fullscreenLoading: false,
        selectedImg: {
          url: ''
        },
        rect: {
          sHeight: '',
          sWidth: '',
          sX: '',
          sY: ''
        }
      }
    },
    props: {
      exData: {
        type: Object,
        default () {
          return {}
        }
      },
      title: String,
      cropper: false,
      name: {
        type: String,
        default: 'uploadfiles'
      },
      action: {
        type: String,
        default: '/landz-one-contract/fileupload/uploadtempencfiles'
      },
      aspectRatio: {
        validator(val) {
          if (val === undefined || val instanceof Array) {
            return true
          } else {
            return false
          }
        },
        default() {
          return [1500, 1000]
        }
      },
      fileType: {
        type: Array,
        default() {
          return ['jpeg', 'jpg', 'gif', 'png', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'pdf']
        }
      }
    },
    computed: {
      _exData() {
        if (this.cropper) {
          return {
            ...this.rect,
            ...this.exData
          }
        } else {
          return {}
        }
      }
    },
    methods: {
      clearFiles() {
        this.$refs['uploader'].clearFiles()
      },
      fileChange(file, fileList) {
        if (this.cropper && fileList.length > 0) {
          this.validator(file, (isPass) => {
            if (isPass) {
              this.selectedImg = file
              this.dialog.cropperShow = true
            }
          })
        }
      },
      cropperSelect(rect) {
        this.rect.sHeight = rect.naturalH
        this.rect.sWidth = rect.naturalW
        this.rect.sX = rect.naturalX
        this.rect.sY = rect.naturalY
      },
      submitUpload() {
        this.$refs['uploader'].submit()
      },
      uploadSuccess: function (val) {
        this.fullscreenLoading = false
        this.dialog.cropperShow = false
        this.file.filePatch = val.result[0]
        let newFile = {}
        newFile.fileName = this.file.fileName
        newFile.filePatch = this.file.filePatch
        newFile.fileSize = this.file.fileSize
        this.$emit('listenUpload', newFile)
        this.$emit('uploadSuccess', {
          files: val,
          ...this._exData
        })
        this.clearFiles()
      },
      uploadError: function () {
        this.fullscreenLoading = false
      },
      uploadBefore: function (file) {
        return this.validator(file, () => {
          this.file.fileName = file.name
          this.file.fileSize = file.size
          this.fullscreenLoading = true
        })
      },
      validator(file, cb = () => {
      }) {
        let that = this
        let vali = false
        let typeArr = file.name.split('.')
        let type = typeArr[typeArr.length - 1]
        let isJPG = false
        for (let idx in this.fileType) {
          if (type === this.fileType[idx]) {
            isJPG = true
            break
          }
        }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isJPG) {
          this.$alert('不支持该格式!', '提示')
          this.clearFiles()
        } else if (!isLt2M) {
          this.$alert('上传大小不能超过 10MB!', '提示')
          this.clearFiles()
        } else {
          //图片剪切参数校验
          if (this.cropper && file.name) {
            let img = new Image()
            let limitW = that.aspectRatio[0]
            let limitH = that.aspectRatio[1]
            img.src = file.url
            img.onload = function () {
              let w = img.width
              let h = img.height
              if (w < limitW) {
                that.$alert(`图片的宽不得小于${limitW}像素`, '提示')
                that.clearFiles()
              } else if (h < limitH) {
                that.$alert(`图片的高不得小于${limitH}像素`, '提示')
                that.clearFiles()
              } else {
                vali = true
                cb(vali)
              }
            }
          } else {
            vali = true
            cb(isJPG && isLt2M)
            return vali
          }
        }
      }
    }
  }
</script>
<style scoped>
  .uploadWrap {
    display: inline-block;
    margin: 0 5px;
  }

  .uploadWrap * {
    box-sizing: border-box;
  }

  .uploadWrap b {
    display: block;
    line-height: 20px;
    padding: 5px 0;
    color: #333;
    font-size: 12px;
  }

  .uploadWrap img {
    display: block;
    width: 134px;
    height: 94px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
