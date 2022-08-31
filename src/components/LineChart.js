import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useComponentSize from '@rehooks/component-size'
import moment from 'moment';
import * as echarts from 'echarts';

const chartTypes = ['line', 'bar'];

export default function LineChart(props) {
    const [type, setType] = useState('line');
    const [data, setData] = useState();
    const chartRef = useRef();
    const size = useComponentSize(chartRef);

    useEffect(() => {
        if (props.data) {
            let newData = [...props.data].map(e => { return { ...e, date: moment(e.createdAt).format('MMMM') } });
            const groupedData = groupBy(newData, 'date');
            setData(groupedData);
        }
    }, [props.data]);

    useEffect(() => {
        const chart = chartRef.current && echarts.getInstanceByDom(chartRef.current);
        if (chart) {
            chart.resize();
        }
    }, [size]);


    const options = {
        xAxis: {
            type: 'category',
            data: data ? Object.keys(data).map(e => e) : [],
            splitLine: {
                show: true
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true
            },
        },
        series: [
            {
                data: data ? Object.keys(data).map(key => data[key].length) : [],
                type: type,
                smooth: true,
            },
        ],
        toolbox: {
            show: true,
            right: 20,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'Select area to Zoom', back: 'Previous Zoom' }
                },
                restore: { title: 'Restore' },
                saveAsImage: {
                    type: 'JPG',
                    pixelRatio: 1,
                }
            }
        },
        tooltip: {
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(0,0,0,0.8)",
            fontWeight: 800,
            fontFamily: "Avenir",
            textStyle: {
                color: "#fff",
            },
            padding: [8, 12, 8, 12],
            extraCssText: "border-radius:7px",
            borderColor: "rgba(0,0,0,0.8)",
            formatter: (props) => props[0].value + ' clients'
        }
    };

    const changeType = (event) => {
        setType(event.target.value);
    }

    return (
        <div ref={chartRef} style={{ position: 'relative' }}>
            <ReactECharts
                key={type}
                option={options}
                lazyUpdate={true}
            />
            <FormControl style={{ position: 'absolute', top: 50, right: 25 }}>
                <InputLabel>Chart type</InputLabel>
                <Select
                    value={type}
                    label="Chart type"
                    onChange={changeType}
                    style={{ width: 100 }}
                >
                    {chartTypes.map(ct => (
                        <MenuItem value={ct}>{ct}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};