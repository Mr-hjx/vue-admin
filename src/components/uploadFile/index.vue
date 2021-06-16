<template>
  <div>
    <el-upload
      :accept="accept"
      :action="action"
      :limit="1"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-success="upSuccess"
      :on-error="upError"
      :on-remove="handleRemove"
    >
      <el-button size="small" type="primary">
        <span class="iconfont icon-shangchuan" />上传文件
      </el-button>
    </el-upload>
    <!-- <span>上传文件只能是 pdf、doc、docx、xls、xlsx格式</span> -->
  </div>
</template>
<script>
import { fGetUrl } from '@/utils'
export default {
  props: {
    accept: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      action: fGetUrl() + '/common/file/upload',
      fileList: []
    }
  },
  methods: {

    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
      const whiteList = []
      whiteList[0] = this.accept
      if (this.accept.indexOf(fileSuffix) === -1) {
        this.$message(`上传文件只能是${this.accept}格式`, 'error')
        return false
      }

      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isLt2M) {
        this.$message('上传文件大小不能超过 10MB', 'error')
        return false
      }
    },
    // 上传成功
    upSuccess(response) {
      // console.log(response.data)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.fileList = [{ name: response.data.fileName, url: response.data.url }]
      this.$emit('uploadOK', response.data)
    },
    // 上传失败
    upError(e) {
      this.$message('上传失败', 'error')
    },
    handleRemove() {
      this.fileList = []
      this.$emit('uploadOK', {})
    }
  }
}
</script>
