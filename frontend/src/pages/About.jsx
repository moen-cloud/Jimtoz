import Reveal from "../components/Reveal.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import CrimpDivider from "../components/CrimpDivider.jsx";
import fallbackContent from "../content/fallbackContent.js";

const { intro, story, stats, gallery } = fallbackContent.about;

const About = () => {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-mustard-100 min-h-[340px] md:min-h-[380px] flex items-center">
        <ImagePlaceholder
          src={intro.image}
          alt="Jimtoz bakery"
          label="Banner photo — bakery interior or kitchen scene (1920x600 recommended)"
          className="absolute inset-0 w-full h-full rounded-none opacity-100"
        />
        <Reveal className="container-page relative z-10 max-w-xl">
          <p className="uppercase tracking-[0.25em] text-cream text-xs font-semibold mb-4">
            {intro.eyebrow}
          </p>
          <h1 className="text-3xl md:text-5xl leading-[1.1] font-display text-mustard-300 italic">{intro.heading}</h1>
        </Reveal>
      </section>

      <section className="container-page py-20 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <ImagePlaceholder
            src={story.image}
            alt="Portrait of the baker"
            label="Portrait of the baker in the kitchen"
            className="w-full h-[420px] rounded-5xl shadow-soft"
          />
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="text-3xl mb-5">{story.heading}</h2>
          <p className="text-cocoa-500 leading-relaxed mb-4">{story.paragraph1}</p>
          <p className="text-cocoa-500 leading-relaxed">{story.paragraph2}</p>
        </Reveal>
      </section>

      <CrimpDivider color="#3E2723" bg="#FFF8ED" />

      <section className="bg-cocoa-700 py-20 text-cream">
        <div className="container-page grid sm:grid-cols-3 gap-10 text-center">
          {stats.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <p className="font-display text-5xl text-mustard-400 mb-2">{item.stat}</p>
              <p className="text-cream/70">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl">Behind the scenes</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <ImagePlaceholder
                src={item.image}
                alt="Kitchen process photo"
                label="Kitchen / process photo"
                className="w-full h-64 rounded-4xl shadow-card"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;