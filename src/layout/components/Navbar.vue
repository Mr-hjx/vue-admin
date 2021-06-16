<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <!--<error-log class="errLog-container right-menu-item hover-effect" />-->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!--<el-tooltip content="字体切换" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->

      </template>

      <!--<div class="avatar-container right-menu-item hover-effect">
        <el-button type="text" @click.native="logout">
          <span style="display:block;">退出</span>
        </el-button>
      </div>-->

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--<img :src="'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          {{ name }}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--<router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>-->
          <!--<router-link to="/">
            <el-dropdown-item>概览</el-dropdown-item>
          </router-link>-->
          <el-dropdown-item divided @click.native="fOpenPwd">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="bTopUserVisibility" width="500px">
      <el-form ref="oUserForm" :model="oTopUser" :rules="aUserRules" label-width="120px">
        <el-form-item label="旧密码" prop="password">
          <el-input :key="passwordType" ref="password" v-model="oTopUser.password" :type="passwordType">
            <svg-icon slot="append" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPwd('password')" />
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input :key="passwordType" ref="newPwd" v-model="oTopUser.newPwd" :type="passwordType">
            <svg-icon slot="append" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPwd('newPwd')" />
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass">
          <el-input :key="passwordType" ref="pass" v-model="oTopUser.pass" :type="passwordType">
            <svg-icon slot="append" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPwd('pass')" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="bTopSubmitUserLoading" @click="fSubmitUser()">确 定</el-button>
          <el-button @click="bTopUserVisibility = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { fModifyPwd } from '@/api/user'
import md5 from 'md5'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    Screenfull,
    // SizeSelect,
    Search
  },
  data() {
    const checkPass = (rule, value, callback) => {
      if (value !== this.oTopUser.newPwd) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    const checkNewPwd = (rule, value, callback) => {
      if (value === this.oTopUser.password) {
        callback(new Error('新密码和旧密码一致'))
      } else {
        callback()
      }
    }
    return {
      passwordType: 'password',
      bTopUserVisibility: false,
      bTopSubmitUserLoading: false,
      oTopUser: {},
      aUserRules: {
        password: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' }
        ],
        newPwd: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度在 6 个以上', trigger: 'blur' },
          { validator: checkNewPwd, trigger: 'blur' }
        ],
        pass: [
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'accountId',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$confirm('此操作将退出账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    showPwd(ref) {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs[ref || 'password'].focus()
      })
    },
    fOpenPwd() {
      this.bTopUserVisibility = true
      this.oTopUser = {}
    },
    fSubmitUser() {
      this.$refs.oUserForm.validate((valid) => {
        if (valid) {
          const { newPwd, password } = this.oTopUser
          const obj = {
            password: md5(password),
            newPwd: md5(newPwd),
            accountId: this.accountId
          }
          this.bTopSubmitUserLoading = true
          fModifyPwd(obj).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.bTopSubmitUserLoading = false
            this.bTopUserVisibility = false
          }).catch(() => {
            this.bTopSubmitUserLoading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .avatar-wrapper {
        /*margin-top: 5px;*/
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 16px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
