<template>
  <b-col cols="12" md="6" xl="4" v-if="status">
    <div class="panel panel-online">
      <h1>{{ espId }}</h1>
      <p>Current moisture percentage: {{ moisture }}%.</p>
      <b-btn target="blank" :href="publicPath + 'historie.html?espId=' + espId">
        Historie
      </b-btn>
    </div>
  </b-col>
  <b-col cols="12" md="6" xl="4" v-else>
    <div class="panel panel-offline">
      <h1>{{ espId }}</h1>
      <p>Last known moisture percentage: {{ moisture }}%.</p>
      <b-btn target="blank" :href="publicPath + 'historie.html?espId=' + espId">
        Historie
      </b-btn>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "Panel",
  props: {
    espId: Number,
    status: Boolean,
    moisture: String,
  },
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  border-radius: 10px;
  border: 1px solid gray;
  margin: 2px 0px 0px 0px;
  padding: 0px 0px 5px 0px;
  text-align: center;
}
.panel-online {
  background-color: #4a9775;
  color: white;
}
.panel-offline {
  background-color: #863532;
  color: white;
}
</style>
