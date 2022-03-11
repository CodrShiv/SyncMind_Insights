let chartReference;
const displayChart = (title, labels, data) => {
  let canvas = document.querySelector(`#${title}_chart`),
    ctx = canvas.getContext("2d");
  if (chartReference)
    if (chartReference[title]) chartReference[title].destroy();
  let delayed,
    gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "#d8f3fe");
  gradient.addColorStop(1, "#e1a1ff");
  chartReference = { ...chartReference } || {};
  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: canvas.parentElement.parentElement["title"],
          data: data,
          fill: true,
          backgroundColor: gradient,
          borderColor: gradient,
          pointBackgroundColor: gradient,
          pointBorderWidth: 2,
          pointBorderColor: "#fff",
          radius: 7,
          hoverRadius: 12,
          hitRadius: 200,
        },
      ],
    },
    options: {
      animation: {
        onComplete: () => (delayed = true),
        delay: (ctx) => {
          let delay = 0;
          if (ctx.type === "data" && ctx.mode === "default" && !delayed)
            delay = ctx.dataIndex * 40 + ctx.datasetIndex * 20;
          return delay;
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => (title === "day_time" ? `${value}s` : value),
          },
        },
      },
    },
  };
  chartReference[title] = new Chart(canvas, config);
};

export default displayChart;
