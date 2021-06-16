import { mapGetters } from 'vuex'

export const pageMixin = {
  data() {
    return {
      pageObj: {
        page: 1,
        limit: 10
      },
      total: null,
      loading: false,
      mixinDisabled: false
    }
  },
  created() {
    if (this.selectData) {
      this.selectData.streetId = this.streetId
    }
    if (!this.mixinDisabled) {
      this.getDataList()
    }
  },
  computed: {
    ...mapGetters(['streetId'])
  },
  methods: {
    getDataList() {
      // console.log('MIXINS-getDataList')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    indexMethod(index) {
      return (index + 1) + (this.pageObj.page - 1) * this.pageObj.limit
    },
    fMixinDelRow(name, id, delFunction, getFunction) {
      this.$confirm('此操作将永久删除 ' + name + ' , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        delFunction(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          getFunction()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
export const tabsMixin = {
  data() {
    return {
      vendorClass: {
        active: -1,
        active2: -1,
        flip: false,
        flip2: false,
        isMore: true,
        isMore2: true
      },
      deviceFactoryIdList: [],
      deviceTagIdList: [],
      aTags: [],
      aTagsAll: [],
      tab: '杭州'

    }
  },
  created() {
  },

  methods: {
    getDataList() {},
    fClickTagAddress(index, provinceCode = '') {
      this.vendorClass.active = index
      if (index === -1) {
        this.queryObj.provinceCode = ''
        this.queryObj.cityCode = ''
        this.vendorClass.active2 = -1
        this.aVendorTages = []
        this.aVendorTagesAll = []
        this.getDataList()
        return
      }
      if (this.queryObj.provinceCode === this.aTagsAll[index].adcode) {
        return
      }
      this.queryObj.provinceCode = provinceCode
      // console.log(this.aTagsAll[index].adcode)
      // console.log(this.queryObj.provinceCode)

      if (this.aTagsAll && this.aTagsAll[index].regionId) {
        // console.log(this.aTagsAll[index].regionId)
        this.fCityTagsList(this.aTagsAll[index].regionId)
      }

      this.getDataList()
    },
    fClickCityTag(index, cityCode = '') {
      this.vendorClass.active2 = index
      this.queryObj.cityCode = cityCode
      this.getDataList()
    },
    fClickTagVendor(index) {
      if (index === -1) {
        this.vendorClass.active2 = -1
        this.deviceFactoryIdList = []
      } else {
        if (this.deviceFactoryIdList.includes(this.aVendorTages[index].deviceFactoryId)) {
          const i = this.deviceFactoryIdList.indexOf(this.aVendorTages[index].deviceFactoryId)
          this.deviceFactoryIdList.splice(i, 1)
        } else {
          this.deviceFactoryIdList.push(this.aVendorTages[index].deviceFactoryId)
        }
      }
      // const arr=this.this.deviceFactoryIdList.map(item => {
      //   if(item.)
      // })
      this.getDataList()
    },

    fClickTag(index) {
      if (index === -1) {
        this.vendorClass.active = -1
        this.deviceTagIdList = []
      } else {
        if (this.deviceTagIdList.includes(this.aTags[index].deviceTagId)) {
          const i = this.deviceTagIdList.indexOf(this.aTags[index].deviceTagId)
          this.deviceTagIdList.splice(i, 1)
        } else {
          this.deviceTagIdList.push(this.aTags[index].deviceTagId)
        }
      }
      this.getDataList()
    },
    // 厂商更多
    fClickVendorArrow(AsOf) {
      this.vendorClass.isMore2 = !this.vendorClass.isMore2
      this.vendorClass.flip2 = !this.vendorClass.flip2
      if (this.vendorClass.isMore2) {
        this.aVendorTages = this.aVendorTagesAll.slice(0, AsOf)
      } else {
        this.aVendorTages = this.aVendorTagesAll
      }
    },
    // 标签更多
    fClickArrow(AsOf) {
      this.vendorClass.isMore = !this.vendorClass.isMore
      this.vendorClass.flip = !this.vendorClass.flip
      if (this.vendorClass.isMore) {
        this.aTags = this.aTagsAll.slice(0, AsOf)
      } else {
        this.aTags = this.aTagsAll
      }
    }

  }
}
