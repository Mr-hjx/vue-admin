<template>
  <div>
    <el-upload
      :action="url"
      multiple
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :show-file-list="false"
    >
      <div>
        <el-button type="primary" size="small">点击上传</el-button>
        已上传 {{ fileList.length }} / 可上传 {{ limit }}
      </div>
    </el-upload>
    <ul class="file-list">
      <li v-for="(item, index) in fileList" :key="index">
        <p @click="handlePreview(item)">
          {{ item.name }}
          <i class="el-icon-close" @click.stop="handleRemove(index)" />
        </p>
      </li>
    </ul>
  </div>
</template>

<script>

import { fGetUrl } from '@/utils'

export default {
  props: {
    file: {
      type: Array,
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    },
    limit: {
      type: Number,
      default: 1
    },
    accept: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    return {
      fileList: [],
      url: fGetUrl() + '/common/file/upload'
    }
  },
  watch: {
    // file (val) {
    //   this.fileList = val.map(row => {
    //     return {
    //       ...row,
    //       name: row.fileName,
    //       fileDescription: row.fileDescription,
    //       url: row.fileUrl
    //     }
    //   })
    //   console.log(this.fileList)
    // }
    file: {
      immediate: true,
      handler(val) {
        if (this.file && this.file[0].url) {
          this.fileList = this.file.map(row => {
            row.name = row.fileName
            return row
          })
        } else {
          this.fileList = []
        }
      }
    }
  },
  created() {

  },
  methods: {
    handleAvatarSuccess({ data }) {
      data.name = data.fileName
      if (this.limit === 1) {
        this.fileList.splice(0, 1, data)
      } else {
        this.fileList.push(data)
      }
      this.fEmit()
    },
    beforeAvatarUpload(file) {
      if (this.limit > 1 && this.fileList.length >= this.limit) {
        this.$message.warning(`当前限制选择 ${this.limit} 个文件！删除了在上传`)
        return false
      }

      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)

      if (this.accept) {
        if (this.accept.indexOf(fileSuffix) === -1) {
          this.$message(`上传文件只能是${this.accept}格式`, 'error')
          return false
        }
      }
    },
    handleRemove(index) {
      this.fileList.splice(index, 1)
      this.fEmit()
    },
    handlePreview(file) {
      window.open(file.url, '_blank')
    },
    fEmit() {
      if (this.limit === 1) {
        this.$emit('fChangeFile', this.fileList[0] || {})
      } else {
        this.$emit('fChangeFile', {})
      }
      // this.$emit('fChangeFile', this.fileList)
    }
  }
}
</script>

<style lang="scss">
  .file-list{
    >li{
      margin-top: 5px;
      .el-icon-close{
        opacity: 0;
        transition: opacity .3s;
      }
      p:hover{
        cursor: pointer;
        text-decoration: underline;
        .el-icon-close{
          opacity: 1;
        }
      }

    }
  }
</style>
