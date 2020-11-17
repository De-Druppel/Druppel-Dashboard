  
import * as types from './mutation-types'

export const mutations = {
  [types.CREATE_ITEM] (state, payload) {
    state.Plants.push(payload)
  },

  [types.UPDATE_ITEM] (state, payload) {
    Object.assign(state.Plants[payload.index], { espId:payload.espId, status:payload.status, moisture:payload.moisture });
  },

  [types.DELETE_ITEM] (state, payload) {
    state.Plants.splice(payload,1)
  }

}