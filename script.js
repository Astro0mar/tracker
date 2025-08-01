const ganttContainer = document.getElementById('gantt');
const timeline = document.getElementById('timeline');
const filter = document.getElementById('type-filter');

const year = 2024;
const startOfYear = new Date(`${year}-01-01`);
const endOfYear = new Date(`${year}-12-31`);
const totalDays = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);

function buildTimeline() {
  for (let m = 0; m < 12; m++) {
    const monthName = new Date(year, m, 1).toLocaleString('default', { month: 'short' });
    const label = document.createElement('div');
    label.textContent = monthName;
    label.style.flex = "1";
    timeline.appendChild(label);
  }
}

function createBar(cfp) {
  const row = document.createElement('div');
  row.className = 'row';

  const label = document.createElement('div');
  label.className = 'label';
  label.textContent = cfp.name;

  const bar = document.createElement('div');
  bar.className = 'bar';

  const start = new Date(cfp.start);
  const end = new Date(cfp.end);

  const offset = ((start - startOfYear) / (1000 * 60 * 60 * 24)) / totalDays * 100;
  const width = ((end - start) / (1000 * 60 * 60 * 24)) / totalDays * 100;

  bar.style.marginLeft = `${offset}%`;
  bar.style.width = `${width}%`;
  bar.innerHTML = `<a href="${cfp.url}" target="_blank">${cfp.type}</a>`;

  row.appendChild(label);
  row.appendChild(bar);
  return row;
}

function loadAndRender(data) {
  ganttContainer.innerHTML = '';
  const selected = filter.value;
  const filtered = selected === 'All' ? data : data.filter(cfp => cfp.type === selected);
  filtered.forEach(cfp => {
    ganttContainer.appendChild(createBar(cfp));
  });
}

fetch('cfps.json')
  .then(res => res.json())
  .then(data => {
    buildTimeline();
    loadAndRender(data);

    filter.addEventListener('change', () => loadAndRender(data));
  });
