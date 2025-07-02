import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GameTutorial.css';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const GameTutorial = () => {
  const imageRef = useRef(null);
  const label1Ref = useRef(null);
  const label2Ref = useRef(null);
  const label3Ref = useRef(null);
  const label4Ref = useRef(null);
  const label5Ref = useRef(null);
  const containerRef = useRef(null);

  const navigate = useNavigate();
  

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    tl.to(imageRef.current, {
      scale: 2,
      xPercent: 0,
      yPercent: 80,
      duration: 0.1,
    }, 0)
      .to(label1Ref.current, {
        opacity: 1,
        duration: 0.5,
      }, 0.2)
      .to(label1Ref.current, {
        opacity: 0,
      }, 0.5)

      .to(imageRef.current, {
        xPercent: -100,
        yPercent: 40,
        duration: 0.1,
      }, 0.6)
      .to(label2Ref.current, {
        opacity: 1,
        duration: 0.5,
      }, 0.8)
      .to(label2Ref.current, {
        opacity: 0,
      }, 1.1)

      .to(imageRef.current, {
        scale:1.5,
        xPercent: -95,
        yPercent: -50,
        duration: 0.1,
      }, 1.2)
      .to(label3Ref.current, {
        opacity: 1,
      }, 1.5)
      .to(label3Ref.current, {
        opacity: 0,
      }, 1.8)

      .to(imageRef.current, {
        scale:1.2,
        xPercent: 0,
        yPercent: -60,
        duration: 0.1,
      }, 1.8)
      .to(label4Ref.current, {
        opacity: 1,
      }, 2.1)
      .to(label4Ref.current, {
        opacity: 0,
      }, 2.4)
      .to(imageRef.current, {
        scale:1,
        xPercent: 0,
        yPercent: 0,
        duration: 0.1,
      }, 2.8)
      .to(label5Ref.current, {
        opacity: 1,
      }, 3.2);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
  {/* fixed header/UI chrome */}
  <button className="back-button" onClick={() => navigate('/')}>
    Go Back To Menu
  </button>
  <p className="scroll-indicator">Scroll to View</p>

  {/* only this gets pinned */}
  <section className="walkthrough">
    <div className="ui-container" ref={containerRef}>
      <img
        ref={imageRef}
        src="/GUI.png"
        alt="Game UI"
        className="ui-image"
      />
      {/* … your labels … */}
    </div>
  </section>

  {/* call to action below */}
  <div className="play-button-container">
    <button className="play-button" onClick={() => navigate('/levels')}>
      Click here to play
    </button>
  </div>
</>

  );
};

export default GameTutorial;
