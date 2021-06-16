<template>
  <el-upload
    :class="'avatar-uploader ' + size"
    :action="url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl && show" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>

import { fGetUrl } from '@/utils'

export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    show: {
      type: Boolean,
      default: true
    },
    accept: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    return {
      imageUrl: this.image,
      url: fGetUrl() + '/common/file/upload'
    }
  },
  watch: {
    image(val) {
      this.imageUrl = val || ''
    }
  },
  methods: {
    handleAvatarSuccess({ data }) {
      data.name = data.fileName
      this.imageUrl = data.url
      this.$emit('fChangeImg', data)
    },
    beforeAvatarUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)

      if (this.accept) {
        if (this.accept.indexOf(fileSuffix) === -1) {
          this.$message(`上传文件只能是${this.accept}格式`, 'error')
          return false
        }
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="scss">
  .avatar-uploader{
    display: inline-block;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: block;
    }

    .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    &.small{
      .avatar, .avatar-uploader-icon{
        width: 88px;
        height: 88px;
        line-height: 88px;
      }
    }

    &.mini{
      .avatar, .avatar-uploader-icon{
        width: 46px;
        height: 46px;
        line-height: 46px;
      }
    }
  }
</style>
