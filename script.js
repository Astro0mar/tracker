const START_DATE = new Date("2024-08-01"); // start of chart
const END_DATE = new Date("2024-12-01");   // end of chart
const DAY_MS = 1000 * 60 * 60 * 24;

function daysBetween(a, b) {
  return Math.round((b - a) / DAY_MS);
}

function createTimeline() {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec"];
  const timeline = document.createElement("div");
  timeline.className = "timeline";
  months.forEach(month => {
    const label = document.createElement("div");
    label.textContent = month;
    timeline.appendChild(label);
  });
  document.getElementById("gantt-chart").appendChild(timeline);
}

function renderChart(cfps) {
  createTimeline();

  cfps.forEach(cfp => {
    const deadline = new Date(cfp.deadline);
    const offset = daysBetween(START_DATE, deadline);
    const totalDays = daysBetween(START_DATE, END_DATE);
    const leftPercent = (offset / totalDays) * 100;

    const row = document.createElement("div");
    row.className = "row";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = cfp.acronym;

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = "10%";
    bar.style.marginLeft = `${leftPercent}%`;
    bar.innerHTML = `<a href="${cfp.website}" target="_blank" style="color:white;text-decoration:none">${cfp.deadline}</a>`;

    row.appendChild(label);
    row.appendChild(bar);
    document.getElementById("gantt-chart").appendChild(row);
  });
}

fetch('cfps.json')
  .then(res => res.json())
  .then(renderChart);
