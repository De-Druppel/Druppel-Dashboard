import { shallowMount } from '@vue/test-utils'
import Panel from '@/components/Panel.vue'

describe('Panel.vue Test', () => {
    let wrapper = null

    // SETUP - run before to each unit test
    beforeEach(() => {
        // render the component
        wrapper = shallowMount(Panel, {
            propsData: {
                status: 0,
                espId: 12321,
                moisture: "00.00"
            }
        })
    })

    // TEARDOWN - run after to each unit test
    afterEach(() => {
        wrapper.destroy()
    })

    it('renders the panel with default props.', () => {
        // check the name of the component
        expect(wrapper.name()).toMatch('Panel')

        // check that the title is rendered
        expect(wrapper.findAll('div').at(0).classes()).toContain('panel-offline');
        expect(wrapper.findAll('h1').at(0).text()).toMatch('12321');
        expect(wrapper.findAll('p').at(0).text()).toMatch('Last known moisture percentage: 00.00%.');
    })

    it('renders the panel with non-default props.', () => {
        wrapper.setProps({
            status: 1,
            espId: 11111,
            moisture: "50.22"
        });
        // check the name of the component
        expect(wrapper.name()).toMatch('Panel')

        // check that the title is rendered
        expect(wrapper.findAll('div').at(0).classes()).toContain('panel-online');
        expect(wrapper.findAll('h1').at(0).text()).toMatch('11111');
        expect(wrapper.findAll('p').at(0).text()).toMatch('Current moisture percentage: 50.22%.');
    })
})