import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  //存储用户信息
  return {
    token: getToken(),
    name: '',
    avatar: '',
    //服务器返回的菜单信息[根据不同的角色,返回的标记信息,数组里面的元素的字符串]
    routes: [],
    //角色信息
    roles: [],
    //按钮的权限信息
    buttons: [],
    //对比之后[项目中已有的异步路由,与服务器返回的标记信息进行对比最终需要展示的路由]
    resultAsyncRoutes: [],
    //用户最终需要展示的全部路由
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户名
    state.name = userInfo.name
    //用户头像
    state.avatar = userInfo.avatar
    //菜单权限标记
    state.routes = userInfo.routes
    //按钮权限标记
    state.buttons = userInfo.buttons
    //角色
    state.roles = userInfo.roles
  },
  //最终计算出来的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    //vuex保存当前的异步路由
    state.resultAsyncRoutes = asyncRoutes
    //计算出当前用户需要展示的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    //给路由添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}
//定义一个函数 两个数组进行对比 对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  //过滤出当前用户[超级管理|普通员工]需要展示的路由
  return asyncRoutes.filter(item => {
    //数组当中没有这个元素返回索引值是-1 如果有则一定不是-1
    if (routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }

  })
}
const actions = {
  // user login  处理登陆业务
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token)
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        //vuex存储用户全部信息
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

