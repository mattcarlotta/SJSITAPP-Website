/* istanbul ignore file */
const Puck = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <defs xmlns="http://www.w3.org/2000/svg">
      <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="6" dy="6" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
          <feFuncR type="linear" slope="0.2" intercept="0" />
          <feFuncG type="linear" slope="0.2" intercept="0.1" />
          <feFuncB type="linear" slope="0.2" intercept="0.75" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g>
      <title>Puck</title>
      <ellipse
        fill="#131313"
        strokeWidth="3"
        cx="100"
        cy="100"
        id="svg_1"
        rx="90"
        ry="90"
        stroke="#888"
        filter="url(#dropshadow)"
      />
      <ellipse
        fill="none"
        strokeWidth="2"
        cx="100"
        cy="100"
        id="svg_8"
        rx="60"
        ry="60"
        stroke="#ffffff"
      />
      <ellipse
        fill="#ffffff"
        strokeWidth="3"
        cx="100"
        cy="100"
        id="svg_7"
        rx="38"
        ry="38"
        stroke="#dddddd"
      />
    </g>
  </svg>
);

export default Puck;
