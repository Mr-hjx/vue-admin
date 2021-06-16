<template>
  <div class="area-div">
    <el-select v-for="(arr, index) in aAreaList" :key="index" v-model="aAreaName[index].value" :disabled="aAreaDisabled[index]" :placeholder="'请选择' + aAreaName[index].name" @change="fChangeArea(index)">
      <el-option v-for="item in arr" :key="item.regionId" :label="item.name" :value="item.regionId" />
    </el-select>
  </div>
</template>

<script>
import { fRegionList, fRegionGet } from '@/api/system'

export default {
  props: {
    select: { // 返回的数据类型 alone: 当前选中的类型 all: 选中的全部数据
      type: String,
      default: 'all'
    },
    selectData: {
      type: Object,
      default: null
    },
    max: {
      type: Number,
      default: 2
    },
    getCenter: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      aAreaName: [
        // { name: '省', key: 'provinceId', value: '', center: '' },
        // { name: '市', key: 'cityId', value: '', center: '' },
        { name: '区', key: 'districtId', value: '56093', center: '120.551085,30.629065' },
        { name: '街道', key: 'streetId', value: '', center: '' },
        { name: '社区', key: 'communityId', value: '', center: '' }
      ],
      aChangeArea: [
        '', '', '', '', ''
      ],
      aAreaList: [
        // [{ regionId: '', name: '不限' }],
        // [{ regionId: '', name: '不限' }],
        [{ regionId: '', name: '不限' }],
        [{ regionId: '', name: '不限' }],
        [{ regionId: '', name: '不限' }]
      ],
      aAreaDisabled: [
        false, false, false, false, false
      ]
    }
  },
  computed: {
  },
  watch: {
    selectData(val) {
      if (val) {
        this.fSelectData()
      }
    }
  },
  created() {
    this.aAreaList.length = this.max + 1
    this.fRegionList()
    if (this.selectData) {
      this.fSelectData()
    }
  },
  methods: {
    fRegionList(pid = '54125', type = 0) {
      fRegionList({ pid }).then(res => {
        let arr = res.data
        if (pid === '54125') {
          this.fRegionList('56093', type + 1)
        } else {
          arr = [{ regionId: '', name: '不限' }].concat(res.data)
        }
        this.$set(this.aAreaList, type, arr)
      })
    },
    fRegionGet(regionId, isEmit) {
      fRegionGet(regionId).then(({ data }) => {
        const { pid, level } = data
        const index = level - 1
        this.$set(this.aAreaName[index], 'value', regionId)
        this.$set(this.aAreaDisabled, index, true)
        this.fRegionList(regionId, level)
        if (isEmit === true && this.select === 'alone') {
          this.fEmitData(index)
        }
        if (index > 0) {
          this.fRegionGet(pid)
        } else {
          if (this.select === 'all') {
            this.fEmitData()
          }

          if (this.selectData) {
            this.fSelectData()
          }
        }
      })
    },
    fSelectData() {
      this.aAreaName.forEach((row, index) => {
        let pid = ''
        if (index === 0) {
          pid = '56093'
        } else {
          pid = this.selectData[row.key] || ''
        }
        row.value = pid

        const type = index + 1
        if (pid && type <= this.max) {
          this.fRegionList(pid, index + 1)
        }
      })
    },
    fChangeArea(index) {
      if (index < this.max) {
        for (let i = index + 1; i <= this.max; i++) {
          this.aAreaList[i] = []
          this.aAreaName[i].value = ''
        }
        const pid = this.aAreaName[index].value
        if (pid) {
          this.fRegionList(pid, index + 1)
        }
      }
      this.fEmitData(index)
    },
    fEmitData(index) {
      if (this.select === 'all') {
        const obj = {}
        for (let i = 0; i < this.aAreaName.length; i++) {
          const data = this.aAreaName[i]
          if (data.value) {
            obj[data.key] = data.value
          }
        }
        this.$emit('fChangeArea', obj)
      } else {
        const obj = {}
        obj[this.aAreaName[index].key] = this.aAreaName[index].value
        this.$emit('fChangeArea', obj)
      }
      if (this.getCenter && index !== undefined) {
        for (let i = 0; i < this.aAreaList[index].length; i++) {
          const data = this.aAreaList[index][i]
          if (this.aAreaName[index].value === data.regionId) {
            this.getCenter(data.center)
            break
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .area-div{
    .el-select{
      width: 150px;
      &+.el-select{
        margin-left: 15px;
      }
    }
  }
</style>
