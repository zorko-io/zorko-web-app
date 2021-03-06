import {mount, shallow} from 'vue-test-utils'
import {createRenderer} from 'vue-server-renderer'
import ZBaseDatumsItem from './ZBaseDatumsItem.vue'

describe('HomeDatumsPreview.vue', () => {
  let defaultProps

  beforeEach(() => {
    defaultProps = {
      name: 'car',
      title: 'Cars',
      connection: 'https://vega.github.io/vega-datasets/data/cars.json',
      description: 'Common repository for example datasets used by vega related projects',
      info: {
        name: 'vega-datasets',
        site: 'https://github.com/vega/vega-datasets'
      },
      looksCount: 5
    }
  })

  it('can initialize', () => {
    const wrapper = mount(ZBaseDatumsItem, {
      propsData: defaultProps
    })

    expect(wrapper.vm).toBeTruthy()
  })

  it('should emmit `openDatum` when click on title', () => {
    const wrapper = mount(ZBaseDatumsItem, {
      propsData: defaultProps
    })

    wrapper.find('.js-ZBaseDatumsItem-title').trigger('click')

    expect(wrapper.emitted('datumActivated')[0][0]).toEqual({
      name: defaultProps.name
    })
  })

  it('has same HTML structure', () => {
    const renderer = createRenderer()
    const wrapper = shallow(ZBaseDatumsItem, {
      propsData: defaultProps
    })

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
