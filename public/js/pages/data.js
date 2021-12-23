$(document).ready(function () {
  var tankSide = {
    series: [
      {
        data: [[Date.now(), Math.floor(0.0)]],
      },
      {
        data: [[Date.now(), Math.floor(0.0)]],
      },
    ],
    chart: {
      id: "realtime",
      height: 310,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 5,
        left: -7,
        top: 22,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    // text: "Tank Side A & B",
    // align: "right",
    // },
    markers: {
      size: 0,
    },

    xaxis: {
      type: "datetime",
      range: 120000,
    },
    yaxis: {
      floating: false,
      decimalsInFloat: false,
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: "left",
      onItemClick: {
        toggleDataSeries: false,
      },
      position: "top",
      offsetY: -28,
      offsetX: 60,
    },
  }
  // var meter = {
  //   series: [0],
  //   chart: {
  //     height: 300,
  //     type: "radialBar",
  //     offsetY: -10,
  //   },
  //   plotOptions: {
  //     radialBar: {
  //       startAngle: -135,
  //       endAngle: 135,
  //       dataLabels: {
  //         name: {
  //           fontSize: "16px",
  //           color: undefined,
  //           offsetY: 120,
  //         },
  //         value: {
  //           offsetY: 76,
  //           fontSize: "22px",
  //           color: undefined,
  //           formatter: function (val) {
  //             return val + "%"
  //           },
  //         },
  //       },
  //     },
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shade: "dark",
  //       shadeIntensity: 0.15,
  //       inverseColors: false,
  //       opacityFrom: 1,
  //       opacityTo: 1,
  //       stops: [0, 50, 65, 91],
  //     },
  //   },
  //   stroke: {
  //     dashArray: 4,
  //   },
  //   labels: ["Roration"],
  // }

  tankSide.title = {
    text: "Tank Side A & B",
    align: "right",
  }
  tankSide.series[0].name = "Tank Side A"
  tankSide.series[1].name = "Tank Side B"

  var tankSideChart = new ApexCharts(document.querySelector("#graph"), tankSide)
  tankSideChart.render()

  tankSide.title = {
    text: "Leach Tank Side A & B",
    align: "right",
  }
  tankSide.series[0].name = "Leach Tank Side A"
  tankSide.series[1].name = "Leach Tank Side B"

  var leachTankChart = new ApexCharts(
    document.querySelector("#graph1"),
    tankSide
  )
  leachTankChart.render()

  tankSide.title = {
    text: "Letch & Wet Oven",
    align: "right",
  }
  tankSide.series[0].name = "Leach Oven"
  tankSide.series[1].name = "Wet Oven"

  var ovenChart = new ApexCharts(document.querySelector("#graph2"), tankSide)
  ovenChart.render()

  // var meterChart = new ApexCharts(document.querySelector("#meter"), meter)
  // meterChart.render()
  // var meterChart1 = new ApexCharts(document.querySelector("#meter1"), meter)
  // meterChart1.render()
  // var meterChart2 = new ApexCharts(document.querySelector("#meter2"), meter)
  // meterChart2.render()
  // var meterChart3 = new ApexCharts(document.querySelector("#meter3"), meter)
  // meterChart3.render()

  function webSocketInvoke() {
    // var socket = io("http://127.0.0.1:3000")
    var socket = io("http://150.230.181.106:3000")
    socket.on("event", (value) => {
      tankSideChart.updateSeries([
        {
          data: [
            ...tankSideChart.w.config.series[0].data,
            [tankSideChart.w.globals.maxX + 5000, value.LATEX_TANK_1_SIDE_A],
          ],
        },
        {
          data: [
            ...tankSideChart.w.config.series[1].data,
            [tankSideChart.w.globals.maxX + 5000, value.COAGULANT_TANK_SIDE_B],
          ],
        },
      ])
      leachTankChart.updateSeries([
        {
          data: [
            ...leachTankChart.w.config.series[0].data,
            [leachTankChart.w.globals.maxX + 5000, value.PRE_LEACH_TANK_07],
          ],
        },
        {
          data: [
            ...leachTankChart.w.config.series[1].data,
            [leachTankChart.w.globals.maxX + 5000, value.PRE_LEACH_TANK_09],
          ],
        },
      ])
      ovenChart.updateSeries([
        {
          data: [
            ...ovenChart.w.config.series[0].data,
            [ovenChart.w.globals.maxX + 5000, value.PRE_LEACH_OVEN],
          ],
        },
        {
          data: [
            ...ovenChart.w.config.series[1].data,
            [ovenChart.w.globals.maxX + 5000, value.WET_OVEN_1],
          ],
        },
      ])
      // meterChart.updateSeries([value.Meter_1])
      // meterChart1.updateSeries([value.Meter_2])
      // meterChart2.updateSeries([value.Meter_3])
      // meterChart3.updateSeries([value.Meter_4])
      // // document.getElementById("rotation").innerHTML = value.Meter_1
      // $("#rotationCSS")
      //   .css("width", value.Meter_1 + "%")
      //   .attr("aria-valuenow", value.Meter_1)
      // // document.getElementById("pressure").innerHTML = value.Meter_2
      // $("#pressureCSS")
      //   .css("width", value.Meter_2 + "%")
      //   .attr("aria-valuenow", value.Meter_2)
      // // document.getElementById("vibration").innerHTML = value.Meter_3
      // $("#vibrationCSS")
      //   .css("width", value.Meter_3 + "%")
      //   .attr("aria-valuenow", value.Meter_3)
      // // document.getElementById("voltage").innerHTML = value.Meter_4
      // $("#voltageCSS")
      //   .css("width", value.Meter_4 + "%")
      //   .attr("aria-valuenow", value.Meter_4)
    })
  }
  webSocketInvoke()

  // $(".chartGroup").hide()
  // $("#graph").show()
  // $("#selectMe").change(function () {
  //   $(".chartGroup").hide()
  //   $("#" + $(this).val()).show()
  // })
})
