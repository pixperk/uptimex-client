import { IHeartbeat } from '@/interfaces/monitor.interface'
import { FC, ReactElement } from 'react'
import {
  BarController,
  BarElement,
  Chart as ChartJs,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  CategoryScale
} from 'chart.js'

import { format } from 'date-fns';


import { Chart } from 'react-chartjs-2'

ChartJs.register(
  LineController,
  BarController,
  LineElement,
  PointElement,
  TimeScale,
  BarElement,
  LinearScale,
  Tooltip,
  Filler,
  CategoryScale
)

interface ResponseChartProps {
  heartbeats : IHeartbeat[];
  showLabel?: boolean;
}

const ResponseChart: FC<ResponseChartProps> = ({heartbeats, showLabel=true}) : ReactElement=> {
  const labels = heartbeats.map((heartbeat : IHeartbeat)=> format(JSON.parse(`${heartbeat.timestamp}`) , 'HH:mm'));
  const data = heartbeats.map((heartbeat : IHeartbeat) => heartbeat.responseTime)

  const footer = (tooltipItems : any[]) => {
    return `Response Time : ${tooltipItems[0].raw} ms`
  }
  return (
    <div>
      <Chart
        type={'line'}
        data={{
          labels,
          datasets: [
            {
              data,
              borderColor: '#008FFB',
              backgroundColor: '#DDEFFE',
              yAxisID: 'y',
              fill: true,
              tension: 0.15
            }
          ]
        }}
        options={{
          responsive: true,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              position: 'top' as const
            },
            title: {
              display: true,
              text: 'API Response Time'
            },
            tooltip: {
              callbacks: {
                footer
              }
            }
          },
          layout: { padding: { left: 10, right: 30, top: 30, bottom: 10 } },
          elements: { point: { radius: 0, hitRadius: 100 } },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: false,
                text: 'Time'
              },
              grid: {
                display: false,
                drawOnChartArea: false,
                drawTicks: true
              },
              ticks: { maxRotation: 0, autoSkipPadding: 20 }
            },
            y: {
              title: {
                display: true,
                text: showLabel ? 'Response Time (ms)' : ''
              }
            }
          }
        }}
      />
    </div>
  )
}

export default ResponseChart
