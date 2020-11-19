import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    Plants: [
        {espId: 12321, status:true, moisture:"00.00"},
        {espId: 12322, status:false, moisture:"00.00"},
        {espId: 12323, status:true, moisture:"00.00"},
        {espId: 12324, status:false, moisture:"00.00"}
    ]
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})