import {createLocalVue, shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import Vuex from 'vuex'
import Home from './Home.vue'
import HomeLooksPreview from './HomeLooksPreview.vue'
import HomeDatumsPreview from './HomeDatumsPreview.vue'
import module from '../../store/home/module'
import mockLooks from '../../../static/__mocks__/looks.json'
import mockDatums from '../../../static/__mocks__/datums.json'

const localVue = createLocalVue()
const homeModule = module({namespaced: true})

localVue.use(Vuex)

describe('Home.vue', () => {
  let store
  let state
  let propsData

  beforeEach(() => {
    state = {
      ...homeModule.state,
      looks: mockLooks,
      datums: mockDatums
    }

    propsData = {
      looksPreview: false,
      datumsPreview: false
    }

    store = new Vuex.Store({
      state: {},
      modules: {
        home: {
          ...homeModule,
          state
        }
      }
    })
  })

  it('shows proper amount of looks', () => {
    propsData.looksPreview = true
    const homeWrapper = shallow(Home, {
      store,
      localVue,
      propsData
    })
    const homeLooksPreviewWrappers = homeWrapper.findAll(HomeLooksPreview)

    expect(homeLooksPreviewWrappers.length).toEqual(5)
  })

  it('shows proper amount of datums', () => {
    propsData.datumsPreview = true
    const homeWrapper = shallow(Home, {
      store,
      localVue,
      propsData
    })
    const homeDatumsPreviewWrappers = homeWrapper.findAll(HomeDatumsPreview)

    expect(homeDatumsPreviewWrappers.length).toEqual(2)
  })

  it('redirects to look', () => {
    propsData.looksPreview = true
    const lookInfo = {path: 'bazzz'}
    const $router = {
      push: jest.fn()
    }
    const homeWrapper = shallow(Home, {
      store,
      localVue,
      propsData,
      mocks: {
        $router
      }
    })
    const homeLooksPreviewWrapper = homeWrapper.find(HomeLooksPreview)

    homeLooksPreviewWrapper.vm.$emit('openLook', lookInfo)

    expect($router.push).toHaveBeenCalledWith(lookInfo.path)
  })

  it('redirects to datum', () => {
    propsData.datumsPreview = true
    const datumInfo = {name: 'bazzz'}
    const $router = {
      push: jest.fn()
    }
    const homeWrapper = shallow(Home, {
      store,
      localVue,
      propsData,
      mocks: {
        $router
      }
    })
    const homeDatumsPreviewWrapper = homeWrapper.find(HomeDatumsPreview)

    homeDatumsPreviewWrapper.vm.$emit('openDatum', datumInfo)

    expect($router.push).toHaveBeenCalledWith('/datums/bazzz')
  })

  it('has same HTML for looks preview', () => {
    propsData.looksPreview = true
    const renderer = createRenderer()
    const homeWrapper = shallow(Home, {
      store,
      localVue,
      propsData
    })

    renderer.renderToString(homeWrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('has same HTML for datums preview', () => {
    propsData.datumsPreview = true
    const renderer = createRenderer()
    const homeWrapper = shallow(Home, {
      store,
      localVue,
      propsData
    })

    renderer.renderToString(homeWrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
