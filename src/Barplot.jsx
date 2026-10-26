
import * as d3 from "d3";
import { useLayoutEffect, useRef, useState } from "react";

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

export default function Barplot({ data, width = 1000, leftMargin }) {
    const height = 800;
    const marginRight = 35;
    const marginTop = 20;
    const marginBottom = 20;

    const textRefs = useRef([]);
    const [measuredLabelWidth, setMeasuredLabelWidth] = useState(0);

    // Measure the actual width of the country labels.
    useLayoutEffect(() => {
        const maxWidth = Math.max(
            0,
            ...textRefs.current
                .filter(Boolean)
                .map((node) => node.getBBox().width)
        );

        setMeasuredLabelWidth(maxWidth);
    }, [data]);

    // Reserve space for the labels, flags, and a small gap.
    const labelArea = Math.max(
        leftMargin || 0,
        measuredLabelWidth + 65,
        180
    );

    const margin = {
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: labelArea,
    };

    // Keep the requested plotting width, plus space for labels.
    const svgWidth = width + margin.left;
    const innerWidth = width - margin.right;
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
        <div
            className="barplot-wrapper"
            style={{
                width: "100%",
                maxWidth: `${svgWidth}px`,
                margin: "0 auto",
            }}
        >
            <svg
                width={svgWidth}
                height={height}
                viewBox={`0 0 ${svgWidth} ${height}`}
                style={{
                    display: "block",
                    background: "white",
                    width: "100%",
                    height: "auto",
                    overflow: "visible",
                }}
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {/* Bars and student counts */}
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

                            <text
                                x={xScale(d.students) + 6}
                                y={
                                    yScale(d.country) +
                                    yScale.bandwidth() / 2
                                }
                                dominantBaseline="middle"
                                fontSize={14}
                                fontWeight="bold"
                                fontFamily="Verdana, sans-serif"
                                fill="#213547"
                            >
                                {d.students}
                            </text>
                        </g>
                    ))}

                    {/* Country flags and labels */}
                    {data.map((d, i) => {
                        const centerY =
                            yScale(d.country) + yScale.bandwidth() / 2;

                        return (
                            <g key={d.country}>
                                <image
                                    href={`https://flagcdn.com/w40/${countryCodes[d.country]}.png`}
                                    x={-28}
                                    y={centerY - 10}
                                    width={20}
                                    height={20}
                                    preserveAspectRatio="xMidYMid meet"
                                />

                                <text
                                    ref={(node) => {
                                        textRefs.current[i] = node;
                                    }}
                                    x={-36}
                                    y={centerY}
                                    textAnchor="end"
                                    dominantBaseline="middle"
                                    fontSize={20}
                                    fontWeight="bold"
                                    fontFamily="Verdana, sans-serif"
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
                    transform={`translate(
                        ${svgWidth - marginRight - 155},
                        ${height - marginBottom - 140}
                    )`}
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
                        fontSize={16}
                        fontWeight="bold"
                        fontFamily="Verdana, sans-serif"
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
                                fontSize={14}
                                fontFamily="Verdana, sans-serif"
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
