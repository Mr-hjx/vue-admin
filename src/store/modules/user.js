// import { login, logout } from '@/api/user'
// import { login } from '@/api/user'
import { getToken, setToken, removeToken, getUserData, setUserData, removeUserData } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const permissionData = [
  {
    id: 'home',
    label: '工作台'
  },
  {
    id: 'daily',
    label: '安全风险管控',
    children: [
      {
        id: 'risk',
        label: '四色分布图及风险'
      },
      {
        id: 'commitment',
        label: '企业安全风险管控承诺'
      },
    ]
  },
  {
    id: 'system',
    label: '系统管理',
    children: [
      {
        id: 'personnel',
        label: '人员管理'
      },
      {
        id: 'log',
        label: '日志管理'
      }
    ]
  }
]

const permissionList = []

function fGetPermission(arr) {
  arr.forEach(row => {
    permissionList.push(row.id)
    if (row.children) {
      fGetPermission(row.children)
    }
  })
}

fGetPermission(permissionData)

const state = {
  token: getToken(),
  name: '',
  roles: [],
  permissionData,
  permissionList
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const data = {
        account: {
          url: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: 'Super Admin',
          token: '123456'
        },
        roles: ['admin']
      }
      setUserData(data)
      commit('SET_TOKEN', data.account.token)
      setToken(data.account.token)
      resolve()
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { account } = response
      //   response.roles = ['admin']
      //   setUserData(response)
      //
      //   // videoPort 端口
      //   commit('SET_TOKEN', account.token)
      //   setToken(account.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const oUserData = getUserData()
      const { roles, account } = oUserData
      commit('SET_ROLES', roles)
      commit('SET_NAME', account.name)
      resolve(oUserData)
      //--------
      // getInfo().then(response => {
      //   const { data } = response
      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }
      //   permissionList = []
      //   fGetPermission(permissionData)
      //   if (!data.auth || data.auth === 'all') {
      //     data.roles = permissionList
      //   } else {
      //     data.roles = data.auth.split(',')
      //   }
      //   const { roles, realname, streetId, sysRoleId, accountType } = data
      //   // const { roles, realname, isMain, companyAccountId } = data
      //   // roles must be a non-empty array
      //   // if (!roles || roles.length <= 0) {
      //   //   reject('getInfo: roles must be a non-null array!')
      //   // }

      //   commit('SET_ROLES', roles)
      //   commit('SET_NAME', realname)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })

    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserData()
      resetRouter()

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()

      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()
      //
      //   // reset visited views and cached views
      //   dispatch('tagsView/delAllViews', null, { root: true })
      //
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserData()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
