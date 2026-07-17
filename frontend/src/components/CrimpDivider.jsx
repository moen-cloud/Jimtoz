/**
 * A crimped-pastry-edge divider — the site's signature visual motif,
 * echoing the pinched edge of a pie or empanada crust between sections.
 * `color` should match the background color of the section ABOVE this divider.
 * `flip` mirrors it vertically for use at the top vs. bottom of a section.
 */
const CrimpDivider = ({ color = "#FFF8ED", flip = false, bg = "transparent" }) => {
  return (
    <div style={{ background: bg }} className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10"
        style={{ transform: flip ? "rotate(180deg)" : "none" }}
      >
        <path
          d="M0,40 
             C 20,0 40,0 60,40 
             C 80,0 100,0 120,40 
             C 140,0 160,0 180,40 
             C 200,0 220,0 240,40 
             C 260,0 280,0 300,40 
             C 320,0 340,0 360,40 
             C 380,0 400,0 420,40 
             C 440,0 460,0 480,40 
             C 500,0 520,0 540,40 
             C 560,0 580,0 600,40 
             C 620,0 640,0 660,40 
             C 680,0 700,0 720,40 
             C 740,0 760,0 780,40 
             C 800,0 820,0 840,40 
             C 860,0 880,0 900,40 
             C 920,0 940,0 960,40 
             C 980,0 1000,0 1020,40 
             C 1040,0 1060,0 1080,40 
             C 1100,0 1120,0 1140,40 
             C 1160,0 1180,0 1200,40 
             L1200,40 L0,40 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CrimpDivider;
