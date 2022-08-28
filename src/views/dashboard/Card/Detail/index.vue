<template>
  <div>
    <div class="card-header">
      {{ title }}
      <svg
        t="1659679309279"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1015"
        width="16"
        height="16"
      >
        <path
          d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m0 947.2a435.2 435.2 0 1 1 435.2-435.2 435.712 435.712 0 0 1-435.2 435.2z"
          p-id="1016"
        ></path>
        <path
          d="M510.464 259.584m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z"
          p-id="1017"
        ></path>
        <path
          d="M512 413.696a38.4 38.4 0 0 0-38.4 38.4v332.288a38.4 38.4 0 1 0 76.8 0V452.096a38.4 38.4 0 0 0-38.4-38.4z"
          p-id="1018"
        ></path>
      </svg>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script >
export default {
  name: "",
  data() {
    return {};
  },
  props: ["title", "count"],
  components: {},
  methods: {},
};
</script>

<style scope>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}
.card-content {
  font-size: 30px;
  padding: 10px 0px;
}
.card-charts {
  height: 50px;
}
.card-footer {
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>
