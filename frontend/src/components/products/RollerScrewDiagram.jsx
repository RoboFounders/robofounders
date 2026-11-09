const rollers = [[140, 56], [178, 78], [178, 122], [140, 144], [102, 122], [102, 78]];
const callouts = [[140, 100], [178, 78], [198, 130]];

export default function RollerScrewDiagram({ content }) {
  return (
    <figure className="roller-diagram">
      <svg viewBox="0 0 280 200" role="img" aria-label={content.diagram}>
        <circle cx="140" cy="100" r="70" fill="#d9e2fc" stroke="#8d9cc5" strokeWidth="2" />
        <circle cx="140" cy="100" r="55" fill="#f5f7ff" stroke="#8d9cc5" strokeWidth="2" />
        <circle cx="140" cy="100" r="33" fill="#a8b8f1" stroke="#6077c6" strokeWidth="2" />
        {rollers.map(([x, y]) => (
          <circle key={`${x},${y}`} cx={x} cy={y} r="11" fill="#b9cbf8" stroke="#6077c6" strokeWidth="2" />
        ))}
        {callouts.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#263b9a" />
            <text x={x} y={y} fill="white" fontSize="10" textAnchor="middle" dominantBaseline="central">{i + 1}</text>
          </g>
        ))}
      </svg>
      <figcaption>
        <ol>
          {content.parts.map((part) => <li key={part}>{part}</li>)}
        </ol>
        <p>{content.diagramNote}</p>
      </figcaption>
    </figure>
  );
}
