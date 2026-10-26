
import * as d3 from "d3";

const regionColors = {
    "North America": "#C45B60",
    "South America": "#D9A441",
    Europe: "#5286B4",
    Asia: "#8E79B8",
    Oceania: "#639B78",
};

const countryCodes = {
    "United States": "us",
    France: "fr",
    "United Kingdom": "gb",
    Germany: "de",
    Switzerland: "ch",
    Spain: "es",
    Netherlands: "nl",
    India: "in",
    Singapore: "sg",
    Ireland: "ie",
    Sweden: "se",
    Australia: "au",
    Canada: "ca",
    Finland: "fi",
    Mexico: "mx",
    Brazil: "br",
    "Saudi Arabia": "sa",
    Romania: "ro",
    Philippines: "ph",
    "New Zealand": "nz",
};

export default function Barplot({ data, width = 600 }) {
    const height = 800;

    const margin = {
        top: 20,
        right: 35,
        bottom: 40,
        left: 50,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, innerHeight])
        .padding(0.2);

    const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.students) || 0])
        .nice()
        .range([0, innerWidth]);

    const regions = Object.keys(regionColors);

    return (
        <div className="barplot-wrapper">
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{
                    display: "block",
                    background: "white",
                    width: "100%",
                    height: "auto",
                    overflow: "visible",
                }}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {/* Bars */}
                    {data.map((d) => (
                        <g key={d.country}>
                            <rect
                                x={0}
                                y={yScale(d.country)}
                                width={xScale(d.students)}
                                height={yScale.bandwidth()}
                                rx={4}
                                fill={regionColors[d.region] || "#999"}
                                stroke="black"
                                strokeWidth={0.75}
                            />

                            {/* Student count */}
                            <text
                                x={xScale(d.students) + 6}
                                y={yScale(d.country) + yScale.bandwidth() / 2}
                                dominantBaseline="middle"
                                fontSize={12}
                                fontWeight="bold"
                                fill="#213547"
                            >
                                {d.students}
                            </text>
                        </g>
                    ))}

                    {/* Country labels and flags */}
                    {data.map((d) => {
                        const centerY =
                            yScale(d.country) + yScale.bandwidth() / 2;

                        return (
                            <g key={d.country}>
                                <image
                                    href={`https://flagcdn.com/w40/${countryCodes[d.country]}.png`}
                                    x={-25}
                                    y={centerY - 12}
                                    width={20}
                                    height={20}
                                    preserveAspectRatio="xMidYMid meet"
                                />

                                <text
                                    x={-30}
                                    y={centerY}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fontSize={16}
                                    fontWeight="bold"
                                    fill="#213547"
                                >
                                    {d.country}
                                </text>
                            </g>
                        );
                    })}
                </g>

                {/* Legend */}
                <g
                    transform={`translate(${width - margin.right - 155}, ${height - margin.bottom - 140
                        })`}
                >
                    <rect
                        width={155}
                        height={120}
                        rx={8}
                        fill="white"
                        fillOpacity={0.95}
                        stroke="#e5e7eb"
                    />

                    <text
                        x={10}
                        y={18}
                        fontSize={12}
                        fontWeight="bold"
                        fill="#213547"
                    >
                        World regions
                    </text>

                    {regions.map((region, i) => (
                        <g
                            key={region}
                            transform={`translate(10, ${28 + i * 18})`}
                        >
                            <rect
                                width={12}
                                height={12}
                                rx={3}
                                fill={regionColors[region]}
                            />

                            <text
                                x={20}
                                y={10}
                                fontSize={11}
                                fill="#374151"
                            >
                                {region}
                            </text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}
