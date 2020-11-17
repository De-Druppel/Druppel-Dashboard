<template>
  <div v-if="status" class="panel-online">
    <h1>{{ espId }}</h1>
    <p>
      current moisture percentage: {{ moisture }}%.
    </p>
  </div>
  <div v-else class="panel-offline">
    <h1>{{ espId }}</h1>
    <p>
      last known moisture percentage: {{ moisture }}%.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    espId: String,
    status: Boolean,
    moisture: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-online {
background-color: #115838;
color: white;
}
.panel-offline {
background-color: #581311;
color: white;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
