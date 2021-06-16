<template>
  <div>
    <div
      v-for="(item, index) in fileList"
      :key="index"
      :class="`image-div ${size}`"
    >
      <el-image
        v-if="item.url"
        :src="item.url"
        fit="fill"
        :preview-src-list="[item.url]"
      />
      <i v-if="!noUpload" class="el-icon-close" @click="fClose(index)" />
    </div>
    <upload-img
      v-if="!noUpload"
      :accept="accept"
      :size="size"
      :show="false"
      @fChangeImg="fChangeImg"
    />
  </div>
</template>

<script>
import UploadImg from '../UploadImg'

export default {
  components: {
    UploadImg
  },
  props: {
    // file: {
    //   type: Array,
    //   default: null
    // },
    file: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    accept: {
      type: [String, Array],
      default: null
    },
    noUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  watch: {
    file: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          const arr = this.file.split(',')
          this.fileList = arr.map(res => {
            return { url: res }
          })
        } else {
          this.fileList = []
        }
      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    fChangeImg(data) {
      this.fileList.push(data)
      this.fEmit()
    },
    fClose(index) {
      this.fileList.splice(index, 1)
      this.fEmit()
    },
    fEmit() {
      const arr = this.fileList.map(res => {
        return res.url
      })
      this.$emit('fChangeImgs', arr.join(','))
    }
  }
}
</script>

<style lang="scss">
  .image-div{
    display: inline-block;
    vertical-align: top;
    width: 178px;
    height: 178px;
    margin-right: 6px;
    position: relative;
    &.small{
      width: 88px;
      height: 88px;
    }

    &.mini{
      width: 46px;
      height: 46px;
    }

    .el-icon-close{
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      color: red;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    &:hover{
      .el-icon-close{
        display: block;
      }
    }

    .el-image{
      width: 100%;
      height: 100%;
    }
  }
</style>
