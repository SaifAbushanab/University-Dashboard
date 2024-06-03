function fetchDataAndUpdateChart4() {
    fetch('/get-datachart4')
        .then(response => response.json())
        .then(data4 => {
            console.log(data4);
            updateChart4(data4);
        })
        .catch(error => console.error('Error:', error));
  }

  function updateChart4(data_df4) {
    console.log(data_df4);
    am5.ready(function() {


      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("chart4div");
      
      root.dateFormatter.setAll({
        dateFormat: "yyyy",
        dateFields: ["valueX"]
      });
      
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
      }));
      
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);

      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation:0.5,
        baseInterval: { timeUnit: "year", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {pan:"zoom", minorGridEnabled: true}),
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation:1,
        renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
      }));
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.StepLineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueX}: {valueY}"
        })
      }));
      
      series.strokes.template.setAll({
        strokeWidth: 3
      });
      
      
      // Set up data processor to parse string dates
      // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
      series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy",
        dateFields: ["year"]
      });
      
      series.data.setAll(data_df4);
      
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
      
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
      
      });

     } // end am5.ready()






  document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndUpdateChart4();
  });