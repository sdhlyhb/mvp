import React, { useState, useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

class DataPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props.data,
      options: {
        colors:['#01579b', '#2e7d32', '#ef6c00', '#9e9e9e'],
        chart: {
          width: 600,
          type: "pie",
        },
        labels: [ "Interviewing", "Pending", "OFFER", "Rejected"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={600}
        />
      </div>
    );
  }
}

export default DataPieChart;
