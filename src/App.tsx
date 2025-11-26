import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const soccerRef = useRef<HTMLDivElement>(null);

  const horizontalPanels = [
    { 
      
      text: "But hey, have you ever stopped to think about what it really takes for these athletes to reach the top?It's not just about skill and talent; it's about perseverance. And you know what? That perseverance they show on the field is kinda like what we're called to have in our faith journey.",
      className: "panel-img-1"
    },
    { 
      img: "./public/2.png", 
      text: "Remember what James said in the Bible? Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life that the Lord has promised to those who love him. (James 1:12).",
      className: "panel-img-2"
    },
    { 
     
      text: "It's like Ephesians 4:3 says, we gotta make every effort to keep the unity of the Spirit through the bond of peace. Ever been in a situation where keeping the peace with someone was tough?",
      className: "panel-img-3"
    },
    { 
      img: "./public/3.png", 
      text: "And you know what's really cool? Just like athletes train hard no matter what, even in the worst weather conditions, we've gotta push through our own challenges. We've got Romans 8:37 on our side, telling us we're more than conquerors through God's love.",
      className: "panel-img-4"
    },
    { 
      
      text: "Proverbs 3:5-6 says, Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He will make your paths straight. It's a reminder that even when things seem uncertain, God is always in control.",
      className: "panel-img-5"
    },
    { 
      img: "./public/4.png", 
      text: "So, let us keep shouting for our teams to go for the gold! But let's also remember that while athletes train for a temporary prize, we are aiming for something eternal.",
      className: "panel-img-6"
    },
    { 
      img: "", 
      text: "In this Olympic season and beyond, let's embrace unity, perseverance, and trust in God's plan, both in the arena and in our everyday lives. Amen to that, right?",
      className: "panel-img-7"
    },
  ];
  
  

  useEffect(() => {
    /** -----------------------------
     *  PARTICLE SHAPE GENERATOR
     * -----------------------------*/
    const wrap = particleRef.current;
    if (wrap) {
      const total = 10; // max particles allowed
      const existing = wrap.children.length;
    
      // Only add particles if there are fewer than total
      for (let i = existing; i < total; i++) {
        const shapes = ["square", "circle", "triangle", "rect"];
        const el = document.createElement("div");
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        el.className = `floating-shape ${shape}`;
        const left = Math.random() * 100;
    
        const layer = Math.random();
        let size, blur, duration;
    
        if (layer < 0.33) {
          size = Math.floor(Math.random() * 25) + 10;
          blur = Math.random() * 6 + 4;
          duration = Math.random() * 80 + 80;
          el.style.zIndex = "1";
        } else if (layer < 0.66) {
          size = Math.floor(Math.random() * 40) + 20;
          blur = Math.random() * 3 + 2;
          duration = Math.random() * 70 + 70;
          el.style.zIndex = "2";
        } else {
          size = Math.floor(Math.random() * 55) + 30;
          blur = Math.random() * 3+1;
          duration = Math.random() * 60 + 60;
          el.style.zIndex = "3";
        }
    
        const delay = Math.random() * -duration;
        el.style.width = size + "px";
        el.style.height = size + "px";
        el.style.left = left + "%";
        el.style.top = "-15vh";
        el.style.filter = `blur(${blur}px)`;
    
        el.style.setProperty("--dur", duration + "s");
        el.style.setProperty("--delay", delay + "s");
    
        wrap.appendChild(el);
      }
    }
    

    /* -----------------------------------------
     * HORIZONTAL PANELS
     * ----------------------------------------- */
    const panelsContainer = panelsContainerRef.current;
    if (!panelsContainer) return;

    const panels = gsap.utils.toArray<HTMLElement>("#panels-container .panel");

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        end: () => "+=" + (panelsContainer.scrollWidth - window.innerWidth),
      },
    });

    // Horizontal progress bar
    gsap.to("#horizontal-progress-bar", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#panels-container",
        start: "top top",
        end: () => "+=" + (panelsContainer.scrollWidth - window.innerWidth),
        scrub: 1,
      },
    });

  
    
   
   

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(panels);
      gsap.killTweensOf(soccerRef.current);
    };
  }, []);

  return (
    <div id="page" className="site">
      {/* FLOATING BACKGROUND SHAPES */}
      <div className="particle-layer" ref={particleRef}></div>

      <main id="content" className="site-content" role="main">
        {/* PANEL 1 */}
        <section id="panel-1" className="panel full-screen green content-panel">
          <h1 className="panel-title">
            <span className="honk-text underline-only">
              <span style={{ color: "#4E070A" }}>CAN YOU</span> FEEL IT?
            </span>
            <br />
            <span className="sub-rise">The excitement is rising.</span>
          </h1>

          <div className="bottom-orange">
            <p className="work-sans">
                </p>
          </div>

          <div className="bottom-orange-pattern"></div>
          <div className="panel-img-wrapper">
            <img src="./public/1.png" className="panel-img" />
          </div>

          <div className="scroll-caret">&#x25BC;</div>
        </section>

        {/* HORIZONTAL PANELS */}
        <section id="panels" style={{ position: "relative" }}>
          {/* Progress Bar */}
          <div
            id="horizontal-progress-bar"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "30px",
              background: "orange",
              width: "0%",
              zIndex: 99999,
            }}
          ></div>
 

          <div id="panels-container" ref={panelsContainerRef}>
          {horizontalPanels.map((panel, i) => (
  <article
    key={i}
    className="panel full-screen content-panel"
    style={{ position: "relative" }}
  >
    {/* H1 for panels 1,3,5,7 */}
    {[0, 2, 4, 6].includes(i) && (
      <h3 className="desktop-panel-title">
      {i === 0 && " Can you feel the thrill building up as countries everywhere gear up to cheer on their teams at the Olympics? "}
      {i === 2 && "We all want our teams to not just win but to win with integrity and unity, right?"}
      {i === 4 && "As we're cheering on our teams, let us not forget to trust in God's plan too."}
      {i === 6 && "As 1 Corinthians 9:26 puts it, All athletes are disciplined in their training. They do it to win a prize that will fade away, but we do it for an eternal prize."}
    </h3>
    
    )}

    <div
      className="bottom-orange-pattern2"
      style={{
        position: "absolute",
        bottom: "80px",
        left: "290px",
        width: "40vw",
        height: "40vh",
        background: `url("public/patterns.png")`,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        opacity: 0.7,
        zIndex: 2,
        borderRadius: "22px",
      }}
    ></div>

    <div
      className="bottom-orange2"
      style={{
        position: "absolute",
        bottom: "50%",
        left: "30%",
        transform: "translateY(50%)",
        width: "30vw",
        height: "50vh",
        background:
          "linear-gradient(180deg, rgba(255,176,105,0.92) 0%, rgba(255,158,72,0.9) 60%, rgba(255,140,52,0.95) 100%)",
        borderRadius: "16px",
        padding: "1.5rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "left",
        backdropFilter: "blur(8px) saturate(160%)",
        WebkitBackdropFilter: "blur(8px) saturate(160%)",
        boxShadow:
          "inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.15), 0 6px 15px rgba(255,168,97,0.35), 0 4px 10px rgba(255,140,60,0.28)",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      <p
        style={{
          maxWidth: "90%",
          fontSize: "1.4rem",
          lineHeight: "1.2",
          fontFamily: '"Work Sans", sans-serif',
        }}
      >
        {panel.text}
      </p>

      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.05), transparent)",
          borderRadius: "16px",
        }}
      />
    </div>

    <img
      src={panel.img}
      className={`horizontal-panel-img ${panel.className}`}
      alt=""
    />
  </article>
))}

          </div>
        </section>

        {/* FINAL VERTICAL PANEL WITH CHAT BUTTON */}
       {/* FINAL VERTICAL PANEL WITH CHAT BUTTON */}
<section
  id="panel-9"
  className="panel full-screen content-panel final-panel"
>
  <img src="5.png" className="final-panel-img" />
  <div className="final-panel-text">
    How are you feeling about what you have read? Would you like to talk to
    one of our trained online counselors?
  </div>
  <button className="final-panel-button" onClick={() => window.open("", "_blank")}>
    Chat with us
  </button>
</section>

      </main>
    </div>
  );
};

export default App;
