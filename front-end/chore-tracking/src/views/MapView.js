import React, { Component }
from 'react';
import * as d3
from 'd3';


export class MapView extends Component {
    constructor(props) {
        super(props);
        console.log('props ', props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        this.generateData(this.props.nodes);
        this.graphNodes();
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.generateData(nextProps.nodes);
        this.graphNodes();
        return true;
    }

    render() {
        return (
            <svg style={{width: '100%', height: '100%'}} id="map-graph-svg" className="full-view">
            </svg>
        );
    }


    generateData = (nodes) => {
        let range = nodes;
            let data = {
                nodes: d3.range(0, range).map(function(d){ return {label: "l" + d ,r:~~d3.randomUniform(8, 28)()}}),
                links: d3.range(0, range).map(function(){ return {source:~~d3.randomUniform(range)(), target:~~d3.randomUniform(range)()} })
            };
        this.setState({data: data});
    }


    graphNodes = () => {
        let svg = d3.select("#map-graph-svg");
        let chartLayer = svg.append("g").classed("chartLayer", true);

        let { chartWidth, chartHeight } = this.setSize(chartLayer, svg);
        this.drawChart(this.state.data, svg, chartWidth, chartHeight);
    };

     setSize = (chartLayer, svg) => {
        let width, height;
        let chartWidth, chartHeight;
        let margin;
        width = document.querySelector("#map-graph-svg").clientWidth;
        height = 500;

        margin = {top:0, left:0, bottom:0, right:0 };


        chartWidth = width - (margin.left + margin.right);
        chartHeight = height - (margin.top + margin.bottom);

        svg.attr("width", width).attr("height", height);


        chartLayer
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform", "translate(" + [margin.left, margin.top] + ")")
         return {chartWidth: chartWidth, chartHeight: chartHeight};
    };

    drawChart = (data, svg, chartWidth, chartHeight) => {
        let simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) {
                return d.index
            }))
            .force("collide", d3.forceCollide(function (d) {
                return d.r + 8
            }).iterations(16))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0));

        let link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .attr("stroke", "skyblue");

        let node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data.nodes)
            .enter().append("circle")
            .attr("r", function (d) {
                return d.r
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        let ticked = function () {
            link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        };

        simulation
            .nodes(data.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(data.links);


        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = d.x;
            d.fy = d.y;
        }
    }
}