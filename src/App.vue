<template>
  <div id="app">
    <h1>Druppel Dashboard</h1>
    <div v-for="plant in loadPlants" :key="plant.espId">
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
  },
  methods: {
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('createItem', {text: text})
      }
      e.target.value = ''
    },
    updatePlant(e) {
        const newValue = e.target.value.trim()
        this.$store.dispatch('updatePlant', {index: this.newIndex, text: newValue}).then(() => {
          this.editing = false
          this.newIndex = null
          this.loadPlants
        })
    },
    deletePlant(index) {
      this.$store.dispatch('deletePlant', index).then(() => {
        this.loadPlants
      })
    },
    enterEditing(index) {
      this.editing = true
      this.newIndex = index
    }
  }
}
</script>