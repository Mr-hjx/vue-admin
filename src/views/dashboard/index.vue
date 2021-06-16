<template>
  <div>
    <el-button @click="fCeShi">ceshi</el-button>
  </div>
</template>

<script>
import { fCeShi } from '@/api/user'

export default {
  name: 'DashboardIndex',
  data() {
    return {
    }
  },
  methods: {
    fCeShi() {
      fCeShi()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
