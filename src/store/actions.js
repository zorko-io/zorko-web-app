import zorkoApi from '@/api/zorkoApi'

export const gatherAccountInfo = ({commit, state, getters}) => {
  const ANONYM_ACCOUNT = {name: '', login: ''}

  if (!getters.doesAnyAccountInfoAvailable) {
    zorkoApi
      .fetchAccountInfo()
      .then((account) => {
        console.log('Account', account)
        commit('setAccount', account)
        commit('stopLoading')
      })
      .catch((error) => {
        console.error(error)
        commit('setAccount', Object.assign({}, ANONYM_ACCOUNT))
        commit('stopLoading')
      })
  } else {
    commit('stopLoading')
  }
}

export const setInitialData = ({commit, state, getters}) => {
  commit('initializeData')
}

export const addFilterToStore = ({commit, state, getters}, filter) => {
  commit('addFilter', filter)
}
