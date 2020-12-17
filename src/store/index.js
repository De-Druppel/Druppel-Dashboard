import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    Plants: [
        {espId:13813784, status:true, moisture:"100"}
    ]
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})