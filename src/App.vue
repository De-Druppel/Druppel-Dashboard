<template>
  <div id="app">
    <h1>Druppel Dashboard</h1>
    <div v-for="plant in plants" :key="plant.espId">
      <Panel :espId="plant.espId" :moisture="plant.moisture" :status="plant.status"></Panel>
    </div>
  </div>
</template>

<script>
import Panel from './components/Panel.vue';

export default {
  name: 'App',
  components: {
    Panel
  }
}
</script>