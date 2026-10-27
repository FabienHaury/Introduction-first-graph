import "flag-icons/css/flag-icons.min.css";
import Barplot from "./Barplot";

const chartWidth = 1000;

const data = [
  { country: "United States", students: 68, region: "North America" },
  { country: "France", students: 21, region: "Europe" },
  { country: "United Kingdom", students: 21, region: "Europe" },
  { country: "Germany", students: 20, region: "Europe" },
  { country: "Switzerland", students: 13, region: "Europe" },
  { country: "Spain", students: 10, region: "Europe" },
  { country: "Netherlands", students: 9, region: "Europe" },
  { country: "India", students: 9, region: "Asia" },
  { country: "Singapore", students: 8, region: "Asia" },
  { country: "Ireland", students: 8, region: "Europe" },
  { country: "Sweden", students: 7, region: "Europe" },
  { country: "Australia", students: 7, region: "Oceania" },
  { country: "Canada", students: 6, region: "North America" },
  { country: "Finland", students: 5, region: "Europe" },
  { country: "Mexico", students: 4, region: "North America" },
  { country: "Brazil", students: 4, region: "South America" },
  { country: "Saudi Arabia", students: 3, region: "Asia" },
  { country: "Romania", students: 3, region: "Europe" },
  { country: "Philippines", students: 3, region: "Asia" },
  { country: "New Zealand", students: 3, region: "Oceania" },
];

const chartLeftMargin = Math.max(
  20,
  ...data.map((d) => d.country.length * 11 + 40)
);

export default function App() {
  return (
    <div
      className="chart-container"
      style={{
        "--chart-width": `${chartWidth}px`,
        "--chart-left-margin": `${chartLeftMargin}px`,
      }}
    >
      <header className="chart-header">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          IN TODAY'S LESSON
        </div>

        <h1>Where our students come from</h1>

        <p className="chart-subtitle">
          Student enrollment by country in the first cohort of the{" "}
          <a
            href="https://www.react-graph-gallery.com/react-d3-dataviz-course"
            target="_blank"
            rel="noopener noreferrer"
          >
            React &amp; D3.js course ↗
          </a>
        </p>
      </header>

      <Barplot
        data={data}
        width={chartWidth}
        leftMargin={chartLeftMargin}
      />

      <footer className="site-footer">
        <span>
          Fabien Haury 2026 for{" "}
          <a
            href="https://www.react-graph-gallery.com/react-d3-dataviz-course"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-d3-dataviz-course
          </a>
        </span>
      </footer>
    </div>
  );
}