<template>
    <div class="charts" ref="domRef"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, FunnelChart, PieChart, LineChart, ScatterChart, GraphChart } from 'echarts/charts'
import {
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    TransformComponent,
    MarkLineComponent,
    ToolboxComponent,
    MarkAreaComponent,
    DataZoomComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
echarts.use([
    CanvasRenderer,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    BarChart,
    FunnelChart,
    PieChart,
    GraphChart,
    MarkLineComponent,
    ToolboxComponent,
    LineChart,
    MarkAreaComponent,
    DataZoomComponent,
    ScatterChart
])

// import { on, off } from '@donson/shared';
import { defineComponent, nextTick, onMounted, onUnmounted, ref, watch, onActivated } from 'vue'
const CHART_THEME = {
    color: ['#397CFF', '#24CCB8', '#FFC400', '#69B7FF', '#BD90FF', '#8FE8F0', '#7B8EED']
}

export default defineComponent({
    name: 'm-chart',
    emits: [
        'chartClick',
        'chartDatazoom',
        'chartLegendSelectchanged',
        'getClickLocation',
        'chartInstance',
        'chartMouseMove'
    ],
    props: {
        option: {
            type: Object,
            require: true
        },
        isHot: {
            type: Boolean,
            require: false
        }
    },
    setup(props, context) {
        
        const domRef = ref<HTMLElement | null>(null)
        let dom: echarts.ECharts | null
        const init = () => {
            const { option } = props
            
            if (option) {
                echarts.registerTheme('chartsTheme', CHART_THEME)
                dom = echarts.init(domRef.value as HTMLElement, 'chartsTheme')
                
                dom.setOption(option)
                dom.on('click', function (params) {
                    context.emit('chartClick', params)
                })
                dom.getZr().on('click', (params) => {
                    context.emit('chartClick', params)
                    if (!params.target) return
                    const pointInPixel = [params.offsetX, params.offsetY]
                    if (dom && dom.containPixel('grid', pointInPixel)) {
                        let location = dom?.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])
                        context.emit('getClickLocation', location, dom)
                    }
                })
                dom.getZr().on('mousemove', (params: any) => {
                    if (props.isHot && params?.topTarget?.style?.text?.indexOf('-') > -1) {
                        dom?.getZr().setCursorStyle('pointer')
                    }
                })
                dom.on('datazoom', function (params) {
                    context.emit('chartDatazoom', params)
                })
                dom.on('legendSelectchanged', function (params) {
                    context.emit('chartLegendSelectchanged', params)
                })
                context.emit('chartInstance', dom)
            }
        }

        const render = () => {
            const { option } = props
            if (option?.series) {
                nextTick(() => {
                    echarts.registerTheme('chartsTheme', CHART_THEME)
                    if (!dom) {
                        dom = echarts.init(domRef.value as HTMLElement, 'chartsTheme')
                    }
                    dom.clear() //不清除的话，如果是空数据则还显示上一个数据的图表
                    dom.setOption(option)

                    context.emit('chartInstance', dom)
                })
            }
        }

        const resize = () => {
            dom?.resize()
        }

        onActivated(resize)

        watch(
            () => props.option,
            () => {
                render()
            },
            { deep: true }
        )

        onMounted(() => {
            init()
            // on(window, 'resize', resize)
        })
        onActivated(() => {
            resize()
        })
        onUnmounted(() => {
            dom = null
            // off(window, 'resize', resize)
        })
        return {
            domRef,
            resize
        }
    }
})
</script>

<style lang="less" scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>
