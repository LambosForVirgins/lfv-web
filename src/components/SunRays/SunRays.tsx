export const SunRays = () => {
  const numRays = 20; // Number of rays
  const radius = 200; // Radius of the circle (sun)
  const rayWidth = Math.PI / numRays; // Width of each ray in radians

  // Create an array of rays
  const rays = Array.from({ length: numRays }, (_, i) => {
    const startAngle = i * 2 * rayWidth;
    const endAngle = startAngle + rayWidth;

    // Convert polar coordinates to cartesian for SVG paths
    const x1 = radius + radius * Math.cos(startAngle);
    const y1 = radius - radius * Math.sin(startAngle);
    const x2 = radius + radius * Math.cos(endAngle);
    const y2 = radius - radius * Math.sin(endAngle);

    return (
      <path
        key={i}
        d={`M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
        fill={i % 2 === 0 ? "red" : "white"}
      />
    );
  });

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <circle cx={radius} cy={radius} r={radius} fill="red" />
      {rays}
    </svg>
  );
};
