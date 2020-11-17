<template>
  <b-col cols="12" md="6" xl="4" v-if="status">
    <div class="panel panel-online">
      <h1>{{ espId }}</h1>
      <p>Current moisture percentage: {{ moisture }}%.</p>
    </div>
  </b-col>
  <b-col cols="12" md="6" xl="4" v-else>
    <div class="panel panel-offline">
      <h1>{{ espId }}</h1>
      <p>Last known moisture percentage: {{ moisture }}%.</p>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    espId: String,
    status: Boolean,
    moisture: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  border-radius: 10px;
  border: 1px solid gray;
  margin: 2px 0px 0px 0px;
}
.panel-online {
  background-color: #4a9775;
  color: white;
}
.panel-offline {
  background-color: #863532;
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
