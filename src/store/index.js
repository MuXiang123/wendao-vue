import { createStore } from 'vuex'

const store = createStore({
  state: {
    userInfo:{
      userId: JSON.parse(localStorage.getItem('userId')) ? JSON.parse(localStorage.getItem('userId')) : '',
      nickname: JSON.parse(localStorage.getItem('nickname')) ? JSON.parse(localStorage.getItem('nickname')) : '',
      avatar: JSON.parse(localStorage.getItem('avatar')) ? JSON.parse(localStorage.getItem('avatar')) : '',
      school: '',
      sex: '',
      signature: '',
    },
    showMuen: false,
    dialogVisible: false,
    searchFlag: false,
    inputSearch: ''
  },
  getters: {
    //这些代码还没用上
    formCol(state) {
      if (state.width >= 500) {
        return { label: 6, wrapper: 16 };
      }
      return { label: 8, wrapper: 16 };
    },
    // 自动计算屏幕的内容区域（减取padding、margin和菜单栏的宽度）
    contentWidth(state) {
      if (state.collapsed) {
        return state.width - 120;
      }
      return state.width - 314;
    },
    isPc(state) {
      // 根据用户屏幕宽度判断是pc访问还是移动设备访问
      if (state.width > 750) {
        return true;
      }
      return false;
    },
    // 状态枚举，项目中多出用到，所以存到store里面使用
    stateList(state) {
      return [
        { title: state.translate("common.enabled"), value: 1 },
        { title: state.translate("common.disabled"), value: 0 }
      ];
    }
  },
  mutations: {
    setId(state, userId) {
      state.userInfo.userId = userId
      localStorage.setItem('userId', JSON.stringify(state.userInfo.userId));
    },
    setDia(state, dialogVisible) {
      state.dialogVisible = dialogVisible
    },
    setUserInfo(state, userInfo){
      state.userInfo.avatar = userInfo.avatar
      localStorage.setItem('avatar', JSON.stringify(state.userInfo.avatar));
      
      state.userInfo.nickname = userInfo.nickname
      localStorage.setItem('nickname', JSON.stringify(state.userInfo.nickname));

      state.userInfo.school = userInfo.school
      state.userInfo.sex = userInfo.sex
      state.userInfo.signature = userInfo.signature
      state.showMuen = true
    }
  },
  actions: {

  },
  modules: {}
})

export default store