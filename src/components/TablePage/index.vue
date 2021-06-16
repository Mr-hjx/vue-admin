<template>
  <div>
    <div class="filter-container">
      <slot :search="fSearchDataList" :clear="fClearDataList" />
    </div>

    <div class="filter-container">
      <div class="filter-item fr">
        <slot name="btn" />
      </div>
    </div>

    <el-table
      :data="oData.list"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
        width="80"
        align="center"
      />
      <slot name="main" />
    </el-table>

    <el-pagination
      :current-page.sync="oPageData.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="oPageData.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="oData.count"
      background
      @size-change="fGetDataList"
      @current-change="fGetDataList"
    />
  </div>
</template>

<script>

export default {
  props: {
    queryData: {
      type: Object,
      default: null
    },
    getFunction: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      oData: {
        list: [],
        count: 0
      },
      oPageData: {
        page: 1,
        limit: 10
      },
      oQueryData: null
    }
  },
  watch: {
    queryData(val) {
      this.oQueryData = val
    }
  },
  created() {
    this.oQueryData = this.queryData
    this.fGetDataList()
  },
  methods: {
    indexMethod(index) {
      return (this.oPageData.page - 1) * this.oPageData.limit + index + 1
    },
    fGetDataList() {
      const obj = {
        ...this.oPageData,
        ...this.oQueryData
      }
      if (!this.getFunction) {
        return
      }
      console.log(obj)
      this.getFunction(obj).then(res => {
        this.oData.list = res.data
        this.oData.count = parseInt(res.count)
      })
    },
    fSearchDataList() {
      this.oPageData.page = 1
      this.fGetDataList()
    },
    fClearDataList() {
      this.oPageData = {
        page: 1,
        limit: 10
      }
      this.oQueryData = {}
      this.$emit('update:queryData', {})

      this.fGetDataList(true)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
