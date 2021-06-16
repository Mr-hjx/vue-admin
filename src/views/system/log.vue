<template>
  <table-page ref="tablePage" :query-data.sync="oQueryData" :get-function="getFunction" @clearQueryDate="aDate=[]">
    <template v-slot="slotProps">
      <div class="filter-item">
        <el-date-picker
          v-model="aDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="fChangeDate(slotProps.search)"
        />
      </div>
      <div class="filter-item">
        <span>账号：</span>
        <el-select v-model="oQueryData.accountId" filterable placeholder="请选择账号">
          <el-option label="不限" value="" />
          <el-option
            v-for="item in aRoleList"
            :key="item.accountId"
            :label="item.realname"
            :value="item.accountId"
          />
        </el-select>
      </div>
      <div class="filter-item">
        <el-button type="primary" size="small" @click="slotProps.search">查询</el-button>
        <el-button size="small" @click="slotProps.clear">重置</el-button>
      </div>
    </template>

    <template v-slot:main>
      <el-table-column prop="gmtCreate" label="时间" width="250" align="center" />
      <el-table-column prop="creatorRealname" label="账户" align="center" />
      <el-table-column prop="description" label="内容" align="center" />
    </template>
  </table-page>
</template>

<script>
import TablePage from '@/components/TablePage'
import { fAccountList, fLogList } from '@/api/system'
export default {
  name: 'SystemLog',
  components: {
    TablePage
  },
  data() {
    return {
      oQueryData: {},
      aDate: [],
      getFunction: fLogList,
      aRoleList: []
    }
  },
  created() {
    fAccountList().then(res => {
      this.aRoleList = res.data
    })
  },
  methods: {
    fChangeDate(fun) {
      if (this.aDate && this.aDate.length === 2) {
        this.oQueryData.beginDate = this.aDate[0]
        this.oQueryData.endDate = this.aDate[1]
      } else {
        this.oQueryData.beginDate = ''
        this.oQueryData.endDate = ''
      }
      // fun()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
