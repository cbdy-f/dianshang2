<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./Card";
import Sale from "./Sale";
import Observe from "./Observe";

export default {
  name: "Dashboard",
  components: { Card, Sale, Observe },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
