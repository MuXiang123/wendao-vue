import { createStore } from 'vuex'

const store = createStore({
  state: {
    id : '1',
    dialogVisible: false
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },
    setDia(state, dialogVisible){
      state.dialogVisible = dialogVisible
    }
  }
})

export default store