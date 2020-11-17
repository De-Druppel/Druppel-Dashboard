import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    Plants: [
        {espId: 12321, status:1, moisture:"00.00"},
        {espId: 12322, status:1, moisture:"00.00"},
        {espId: 12323, status:0, moisture:"00.00"},
        {espId: 12324, status:1, moisture:"00.00"}
    ]
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})