<template>
  <b-container fluid id="app">
    <div class="header">
    <h1>Druppel Dashboard</h1>
    </div>
    <b-row>
      <Panel 
      v-for="plant in loadPlants" 
      :key="plant.espId" 
      :espId="plant.espId" 
      :moisture="plant.moisture" 
      :status="plant.status"
      >
      </Panel>
    </b-row>
  </b-container>
</template>

<script>
import Panel from './components/Panel.vue';

export default {
  name: 'App',
  components: {
    Panel
  },
  data () {
    return {
      editing: false,
      newIndex: null
    }
  },
  computed: {
    loadPlants () {
      return this.$store.state.Plants
    }
  }
}
</script>