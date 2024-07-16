import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

const Chart = () => {
  const { data, status } = useSelector((state) => state.crypto);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.time * 1000)))
      .range([margin.left, width - margin.right]);

    const maxY = d3.max(data, d => d.volume);

    const y = d3.scaleLinear()
      .domain([0, maxY || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yAxis = d3.axisLeft(y).tickFormat(d3.format(".2s"));

    const line = d3.line()
      .x(d => x(new Date(d.time * 1000)))
      .y(d => y(d.volume))
      .curve(d3.curveMonotoneX);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('text')
      .attr('x', width - margin.right)
      .attr('y', height - margin.bottom - 10)
      .attr('text-anchor', 'end')
      .style('font-size', '12px')
      .text('Values in thousands (e.g., 10k = 10,000)');

  }, [data, status]);

  return (
    <div>
      {status === 'loading' && <span>Loading...</span>}
      {status === 'failed' && <span>Error!</span>}
      {status === 'succeeded' && <svg ref={svgRef} width={800} height={400}></svg>}
    </div>
  );
};

export default Chart;