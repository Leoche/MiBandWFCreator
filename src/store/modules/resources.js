// initial state
const state = {
  items: []
}

// getters
const getters = {
  getFileByName: (state) => (id) => {
    return state.items.find(item => item.name === name)
  },
  getRessources: (state) => {
    return state.items
  },
}

// actions
const actions = {
  addRessource ({ commit }, ressource) {
   commit('addRessource', ressource)
  }
}

// mutations
const mutations = {
  setRessources (state, ressources) {
    state.items = ressources
  },
  addRessource (state, ressource) {
    let name = new Array(3).join('0').slice((3 || 2) * -1) + (state.items.length + 1);
    console.log({
      file: ressource.file,
      name:name
    });
    state.items.push({
      file: ressource.file,
      name:name
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}