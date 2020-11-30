import { shallowMount } from '@vue/test-utils'
import Panel from '@/components/Panel.vue'
import { createLocalVue } from '@vue/test-utils'
import { LayoutPlugin } from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(LayoutPlugin);

describe('Panel.vue Test', () => {
    it('renders the panel as offline.', () => {
        var wrapper = shallowMount(Panel, {
            localVue,
            propsData: {
                status: false,
                espId: 12321,
                moisture: "00.00"
            }
        });
        expect(wrapper.findAll('div').at(0).classes()).toContain('panel-offline');
        expect(wrapper.findAll('h1').at(0).text()).toMatch('12321');
        expect(wrapper.findAll('p').at(0).text()).toMatch('Last known moisture percentage: 00.00%.');
    });

    it('renders the panel as online.', () => {
        var wrapper = shallowMount(Panel, {
            localVue,
            propsData: {
                status: true,
                espId: 11111,
                moisture: "50.22"
            }
        });

        // check that the title is rendered
        expect(wrapper.findAll('div').at(0).classes()).toContain('panel-online');
        expect(wrapper.findAll('h1').at(0).text()).toMatch('11111');
        expect(wrapper.findAll('p').at(0).text()).toMatch('Current moisture percentage: 50.22%.');
    });
})