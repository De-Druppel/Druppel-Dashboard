import * as types from './mutation-types'

export const createItem = ({commit}, newitem) => {
        commit(types.CREATE_ITEM, newitem)
}

export const updateItem = ({commit}, newUpdate) => {
  commit(types.UPDATE_ITEM, newUpdate)
}
