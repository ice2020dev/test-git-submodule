import type { IntResponse } from "./type";


export function useFormatterOptions() {
  function getChartOption<T extends { date: string }>(
    data: IntResponse<T>[],
    tabType: string
  ) {
    const options:any = {
      color: [
        "rgba(251, 139, 47, 1)",
        "rgba(250, 206, 28, 1)",
        "rgba(54, 206, 148, 1)",
        "rgba(95, 157, 252, 1)",
        "rgba(123, 125, 252, 1)",
        "rgba(161, 104, 214, 1)",
        "rgba(66, 181, 181, 1)",
        "rgba(113, 201, 246, 1)",
        "rgba(250, 145, 191, 1)",
        "rgba(238, 89, 89, 1)",
      ],
      legend: {
        show: true,
        icon: "roundRect",
        // icon: 'path://M17.051 8.683a1 1 0 1 1 1.898.634C17.93 12.364 16.022 14 13.332 14c-1.702 0-2.61-.608-3.895-2.154l-.208-.254C8.217 10.342 7.75 10 6.803 10c-1.712 0-2.973 1.05-3.87 3.362a1 1 0 1 1-1.865-.724C2.24 9.616 4.182 8 6.803 8c1.656 0 2.54.596 3.805 2.12l.205.25c1.033 1.276 1.519 1.63 2.52 1.63 1.753 0 2.955-1.03 3.718-3.317Z',
        left: 13,
        top: 0,
        itemWidth: 12,
        itemHeight: 2,
        textStyle: {
          fontSize: 12,
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#FFF",
        textStyle: { color: "#666" },
        axisPointer: { 
          type: "line" ,
          lineStyle:{
            color:'#828993',
            type:'solid'
          }
        },
        extraCssText: "box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.15)",
      },
      grid: { left: 20, top: 40, bottom: 13, right: 20, containLabel: true },
      xAxis: {
        type: "category",
        axisLine: { lineStyle: { color: "#DDDDDD" }, onZero: false },
        axisTick: { show: false },
        splitLine: false,
        axisLabel: {
          color: "rgba(0, 0, 0, 0.24)",
          showMinLabel: true,
          showMaxLabel: true,
        },
      },
      yAxis: [
        {
          splitLine: { lineStyle: { color: "#DDDDDD", type: "dashed" } },
          axisLabel: { show: true, margin: 12, color: "rgba(0, 0, 0, 0.24)" },
          type: "value",
        },
      ],
      dataset: {
        source : [[]] ,
      },
      series: [
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            shadowColor: "rgba(251, 139, 47, 0.16)",
            shadowOffsetY: 6,
            shadowBlur: 5,
          },
        },
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            shadowColor: "rgba(250, 206, 28, 0.16)",
            shadowOffsetY: 6,
            shadowBlur: 5,
          },
        },
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            shadowColor: "rgba(54, 206, 148, 0.16)",
            shadowOffsetY: 6,
            shadowBlur: 5,
          },
        },
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            shadowColor: "rgba(95, 157, 252, 0.16)",
            shadowOffsetY: 6,
            shadowBlur: 5,
          },
        },
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            shadowColor: "rgba(123, 125, 252, 0.16)",
            shadowOffsetY: 6,
            shadowBlur: 5,
          },
        },
      ],
    };
     // @ts-ignore
   options.dataset.source = [["date"]] ;
    const tmpMap = {};
    data.map((item) => {
      // @ts-ignore
      options.dataset.source[0].push(item.source_name);
      item.list.map((rawData: T) => {
        if (!tmpMap[rawData.date]) {
          tmpMap[rawData.date] = [];
        }
        tmpMap[rawData.date].push(rawData[tabType]);
      });
    });
    for (const key in tmpMap) {
      if (tmpMap.hasOwnProperty.call(tmpMap, key)) {
        tmpMap[key].unshift(key);
        //@ts-ignore 
        options.dataset.source.push(tmpMap[key]);
      }
    }
    return options;
  }

  return {
    getChartOption,
  };
}
