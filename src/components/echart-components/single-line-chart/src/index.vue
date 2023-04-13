<template>
  <div class="line-chart__wrap">
    <!-- <div class="card-title">
      <span>热度趋势</span>
      <a-radio-group v-model:value="chooseType">
        <a-radio-button value="voice_cnt">声量</a-radio-button>
        <a-radio-button value="interact_cnt">互动量</a-radio-button>
      </a-radio-group>
    </div> -->
    <a-spin :delay="300" :spinning="loading">
      <Chart :option="trendOption" class="chart" ref="chart"
    /></a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Chart from "../../chart/index.vue";
import { useFormatterOptions } from "../hooks";
import type { IntDataItem } from "../type";
export default defineComponent({
  name: "ds-line",
  components: {
    Chart,
  },
  setup() {
    let loading = ref(false);
    let mockData = []
    let trendOption = ref({});
    const chooseType = ref("voice_cnt");
    const { getChartOption } = useFormatterOptions();
    fetch('https://mockapi.eolink.com/CBrQY7v81154d04797b9c7ea5a8ceedc23bc09941957f0c/line-chart_1').then(response=>{
       return response.json()
    }).then((res)=>{
        mockData=res.data.list;
        trendOption.value = getChartOption<IntDataItem>(mockData, "voice_cnt");
    })
    watch(
      () => chooseType.value,
      (newV) => {
        trendOption.value = getChartOption<IntDataItem>(mockData, newV);
      }
    );
    return {
      loading,
      chooseType,
      trendOption,
    };
  },
});
</script>

<style lang="less" scoped>
.line-chart__wrap {
  width: 707px;
  height: 334px;
    .chart {
    width: 100%;
    height: 270px;
  }
}

.card-title {
  display: flex;
  justify-content: space-between;
  padding:0 16px;
}
:deep(.ant-radio-button-wrapper) {
  height: 24px;
  line-height: 22px;
  padding: 0 18px;
  background: transparent;
  span {
    font-size: 14px;
  }
}
</style>
