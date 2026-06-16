"use client";

import { useEffect, useId, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./page.module.scss";

/* ------------------------------------------------------------------ config */
/* Edit these values — only the names stay in Latin. */
const WEDDING = {
  partnerOne: "Emma",
  partnerTwo: "James",
  date: new Date(2026, 7, 15, 14, 0, 0), // 15 серпня 2026, 14:00 (month is 0-indexed)
  dateLabel: "15 серпня 2026",
  subtitle: "Приєднуйтесь до нашого особливого дня",
  location: "Лавандові сади",
};

const SCHEDULE = [
  { time: "14:00", title: "Весільна церемонія", desc: "Дві долі стають однією під аркою з квітів." },
  { time: "16:00", title: "Коктейльний прийом", desc: "Ігристі тости та золота година в саду." },
  { time: "18:00", title: "Святкова вечеря", desc: "Довгий стіл, світло свічок і найрідніші люди." },
  { time: "20:00", title: "Перший танець", desc: "Наші перші кроки разом як чоловік і дружина." },
  { time: "22:00", title: "Святкування", desc: "Танці під зорями, доки не засне останній метелик." },
];

const MONTHS_UA = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
];
const WEEKDAYS_UA = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]; // Monday-first

/* ------------------------------------------------------- small UI helpers */
function Butterfly({ className, from = "#FFD6E8", to = "#E9D5FF" }: {
  className?: string; from?: string; to?: string;
}) {
  const gid = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="метелик" fill="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path d="M31 32C24 16 8 12 6 22c-2 9 6 14 13 13 5-1 9-2 12-3z" fill={`url(#${gid})`} opacity="0.95" />
      <path d="M31 33C24 46 12 52 8 44c-3-6 3-11 10-12 6-1 10 0 13 1z" fill={`url(#${gid})`} opacity="0.8" />
      <path d="M33 32C40 16 56 12 58 22c2 9-6 14-13 13-5-1-9-2-12-3z" fill={`url(#${gid})`} opacity="0.95" />
      <path d="M33 33C40 46 52 52 56 44c3-6-3-11-10-12-6-1-10 0-13 1z" fill={`url(#${gid})`} opacity="0.8" />
      <ellipse cx="32" cy="33" rx="1.7" ry="9" fill="#6b5170" />
      <path d="M32 24c-1-4-4-6-7-7M32 24c1-4 4-6 7-7" stroke="#6b5170" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Adds an `in` class when the element scrolls into view (respects reduced motion). */
function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.setTimeout(() => setInView(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return { ref, inView };
}

/* ----------------------------------------------------- WebGL butterfly scene */
const VERT = /* glsl */ `
  precision highp float;
  attribute float aEdge;
  attribute vec4 aSeed;
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aFlap;
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uReduced;
  varying vec3 vColor;
  varying float vEdge;
  varying float vShade;
  varying vec2 vUv;
  void main() {
    vColor = aColor; vEdge = aEdge; vUv = uv;
    float spd = (0.18 + aSeed.w * 0.22) * (1.0 - uReduced * 0.92);
    float t = uTime * spd + aSeed.x * 40.0;
    float spanX = 1.4 + aSeed.z * 2.2;
    float spanY = 1.0 + aSeed.w * 1.4;
    float spanZ = 1.2 + aSeed.z * 1.6;
    vec3 center;
    center.x = (aSeed.x * 2.0 - 1.0) * 6.5 + cos(t * 0.7 + aSeed.y * 6.28) * spanX;
    center.y = (aSeed.y * 2.0 - 1.0) * 3.6 + sin(t * 0.9 + aSeed.x * 6.28) * spanY + sin(t * 0.37) * 0.5;
    center.z = mix(-6.0, 3.0, aSeed.z) + sin(t * 0.5 + aSeed.w * 6.28) * spanZ;
    float dx = -sin(t * 0.7 + aSeed.y * 6.28) * spanX;
    float dy =  cos(t * 0.9 + aSeed.x * 6.28) * spanY;
    float heading = atan(dy, dx);
    float depth = smoothstep(-6.0, 3.0, center.z);
    vec2 toMouse = center.xy - uMouse.xy;
    float md = length(toMouse);
    center.xy += normalize(toMouse + 0.0001) * smoothstep(2.6, 0.0, md) * (0.9 + depth);
    center.xy += uMouse.xy * (0.04 + depth * 0.12);
    vec3 p = position;
    float flap = sin(uTime * aFlap + aSeed.w * 6.28) * (1.0 - uReduced * 0.85);
    float ang = -sign(p.x) * (abs(flap) * 1.15 + 0.12);
    float ca = cos(ang), sa = sin(ang);
    p = vec3(p.x * ca + p.z * sa, p.y, -p.x * sa + p.z * ca);
    p *= aScale * (0.7 + depth * 0.6);
    vShade = 0.75 + 0.25 * flap;
    float bank = heading * 0.12 + sin(uTime * 0.5 + aSeed.x * 6.28) * 0.22;
    float cb = cos(bank), sb = sin(bank);
    p.xy = vec2(p.x * cb - p.y * sb, p.x * sb + p.y * cb);
    gl_Position = projectionMatrix * viewMatrix * vec4(center + p, 1.0);
  }
`;
const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec3 vColor;
  varying float vEdge;
  varying float vShade;
  varying vec2 vUv;
  void main() {
    vec3 light = mix(vColor, vec3(1.0), 0.65);
    vec3 col = mix(light, vColor, vEdge);
    col += (0.5 + 0.5 * sin(uTime * 1.5 + vUv.x * 9.0 + vUv.y * 6.0)) * 0.1 * vec3(0.6, 0.4, 0.8);
    col *= vShade;
    float alpha = 0.92 - smoothstep(0.82, 1.0, vEdge) * 0.35;
    col += smoothstep(0.45, 1.0, vEdge) * 0.4 * vec3(1.0, 0.95, 1.0);
    gl_FragColor = vec4(col, alpha);
  }
`;
const SPARK_VERT = /* glsl */ `
  precision highp float;
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uReduced;
  varying float vTw;
  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.3 + aPhase) * (1.0 - uReduced) * 0.6;
    pos.x += cos(uTime * 0.2 + aPhase) * (1.0 - uReduced) * 0.4;
    vec4 mv = viewMatrix * vec4(pos, 1.0);
    vTw = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * 2.0 + aPhase));
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const SPARK_FRAG = /* glsl */ `
  precision highp float;
  varying float vTw;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.18, 0.0, d);
    float a = (smoothstep(0.5, 0.0, d) * 0.5 + core) * vTw;
    gl_FragColor = vec4(mix(vec3(1.0, 0.95, 0.85), vec3(1.0), core), a);
  }
`;

const PALETTE = [
  [1.0, 0.84, 0.91], [0.91, 0.84, 1.0], [0.84, 0.96, 1.0],
  [0.85, 1.0, 0.88], [1.0, 0.96, 0.84], [1.0, 0.89, 0.84],
];

function buildButterflyGeometry(seg = 18) {
  const shape = (a: number) =>
    0.18 + 0.95 * Math.exp(-(((a - 0.72) / 0.46) ** 2)) + 0.72 * Math.exp(-(((a + 0.42) / 0.5) ** 2));
  const start = -1.35, end = 1.55;
  const pos: number[] = [], uv: number[] = [], edge: number[] = [];
  const push = (x: number, y: number, e: number) => {
    pos.push(x, y, 0); uv.push((x + 1.5) / 3, (y + 1.5) / 3); edge.push(e);
  };
  for (const side of [1, -1]) {
    for (let i = 0; i < seg; i++) {
      const t0 = start + ((end - start) * i) / seg;
      const t1 = start + ((end - start) * (i + 1)) / seg;
      const r0 = shape(t0), r1 = shape(t1);
      push(0, 0, 0);
      push(side * Math.cos(t0) * r0, Math.sin(t0) * r0, 1);
      push(side * Math.cos(t1) * r1, Math.sin(t1) * r1, 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute("aEdge", new THREE.Float32BufferAttribute(edge, 1));
  return g;
}

function useButterflies(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = window.innerWidth;
    const COUNT = reduced ? 36 : w < 640 ? 80 : w < 1100 ? 150 : 230;
    const SPARKLES = reduced ? 50 : w < 640 ? 180 : 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, w / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 14);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const geo = buildButterflyGeometry(18);
    const seeds = new Float32Array(COUNT * 4);
    const colors = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const flaps = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      for (let s = 0; s < 4; s++) seeds[i * 4 + s] = Math.random();
      const c = PALETTE[(Math.random() * PALETTE.length) | 0];
      colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
      scales[i] = 0.13 + Math.random() * 0.22;
      flaps[i] = 6 + Math.random() * 7;
    }
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 4));
    geo.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
    geo.setAttribute("aScale", new THREE.InstancedBufferAttribute(scales, 1));
    geo.setAttribute("aFlap", new THREE.InstancedBufferAttribute(flaps, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3() },
      uReduced: { value: reduced ? 1 : 0 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms,
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    const mesh = new THREE.InstancedMesh(geo, material, COUNT);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(SPARKLES * 3);
    const sSize = new Float32Array(SPARKLES);
    const sPhase = new Float32Array(SPARKLES);
    for (let i = 0; i < SPARKLES; i++) {
      sPos[i * 3] = (Math.random() - 0.5) * 22;
      sPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      sSize[i] = 0.4 + Math.random() * 1.4;
      sPhase[i] = Math.random() * 6.28;
    }
    sGeo.setAttribute("position", new THREE.Float32BufferAttribute(sPos, 3));
    sGeo.setAttribute("aSize", new THREE.Float32BufferAttribute(sSize, 1));
    sGeo.setAttribute("aPhase", new THREE.Float32BufferAttribute(sPhase, 1));
    const sMat = new THREE.ShaderMaterial({
      vertexShader: SPARK_VERT, fragmentShader: SPARK_FRAG,
      uniforms: { uTime: uniforms.uTime, uReduced: uniforms.uReduced },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sGeo, sMat);
    sparkles.frustumCulled = false;
    scene.add(sparkles);

    const targetMouse = new THREE.Vector2();
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const onPointer = (e: PointerEvent) => {
      targetMouse.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    const mw = uniforms.uMouse.value;
    let raf = 0;
    const loop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      mw.x += (targetMouse.x * camera.aspect * halfH - mw.x) * 0.06;
      mw.y += (targetMouse.y * halfH - mw.y) * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    if (reduced) {
      uniforms.uTime.value = 8;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geo.dispose(); material.dispose(); sGeo.dispose(); sMat.dispose(); renderer.dispose();
    };
  }, [canvasRef]);
}

/* ------------------------------------------------------------------ countdown */
function useCountdown(target: Date) {
  const [t, setT] = useState<null | { d: number; h: number; m: number; s: number; past: boolean }>(null);
  useEffect(() => {
    const ms = target.getTime();
    const calc = () => {
      const delta = Math.max(0, ms - Date.now());
      setT({
        d: Math.floor(delta / 86400000),
        h: Math.floor((delta / 3600000) % 24),
        m: Math.floor((delta / 60000) % 60),
        s: Math.floor((delta / 1000) % 60),
        past: ms - Date.now() <= 0,
      });
    };
    calc();
    const id = window.setInterval(calc, 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return t;
}

const pad = (n: number) => n.toString().padStart(2, "0");

function Unit({ value, label }: { value: number | null; label: string }) {
  const shown = value === null ? "--" : pad(value);
  return (
    <div className={styles.unit}>
      <div className={`${styles.card} ${styles.glass}`}>
        <div className={styles.digitBox}>
          <span key={shown} className={styles.digit}>{shown}</span>
        </div>
        <span className={styles.sheen} />
      </div>
      <span className={`${styles.eyebrow} ${styles.unitLabel}`}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------- sections */
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${styles.heading} ${styles.reveal} ${inView ? styles.in : ""}`}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={`${styles.headingTitle} ${styles.rainbow}`}>{title}</h2>
    </div>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const r = (i: number) => `${styles.reveal} ${mounted ? styles.in : ""}`;
  const delay = (i: number) => ({ transitionDelay: `${0.2 + i * 0.18}s` });
  return (
    <section className={`${styles.section} ${styles.hero}`} aria-label="Запрошення на весілля">
      <div className={r(0)} style={delay(0)}>
        <div className={styles.heroEyebrow}>
          <span />
          <span className={styles.eyebrow}>Ми одружуємось</span>
          <span />
        </div>
      </div>
      <h1 className={`${styles.names} ${styles.rainbow} ${r(1)}`} style={delay(1)}>
        <span>{WEDDING.partnerOne}</span>
        <span className={styles.amp}>&amp;</span>
        <span>{WEDDING.partnerTwo}</span>
      </h1>
      <div className={`${styles.heroDate} ${r(2)}`} style={delay(2)}>
        <Butterfly className={styles.bfly} from="#FFD6E8" to="#FFF4D6" />
        <p>{WEDDING.dateLabel.toUpperCase()}</p>
        <Butterfly className={styles.bfly} from="#D6F5FF" to="#E9D5FF" />
      </div>
      <p className={`${styles.heroSub} ${r(3)}`} style={delay(3)}>{WEDDING.subtitle}</p>

      <a href="#countdown" className={`${styles.scrollCue} ${r(4)}`} style={delay(4)} aria-label="Прокрутити вниз">
        <span className={`${styles.eyebrow}`} style={{ fontSize: "0.6rem" }}>Гортайте</span>
        <span className={`${styles.chev} ${styles.glass}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </a>
    </section>
  );
}

function Countdown() {
  const t = useCountdown(WEDDING.date);
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <section id="countdown" className={styles.section} aria-label="Зворотний відлік до весілля">
      <SectionHeading eyebrow="Момент наближається" title="Зворотний відлік" />
      <div ref={ref} className={`${styles.timer} ${styles.reveal} ${inView ? styles.in : ""}`}>
        <Unit value={t?.d ?? null} label="Дні" />
        <span className={styles.sep}>:</span>
        <Unit value={t?.h ?? null} label="Години" />
        <span className={styles.sep}>:</span>
        <Unit value={t?.m ?? null} label="Хвилини" />
        <span className={styles.sep}>:</span>
        <Unit value={t?.s ?? null} label="Секунди" />
      </div>
      {t?.past && <p className={styles.passed}>Сьогодні той самий день. Дякуємо, що святкуєте разом із нами.</p>}
    </section>
  );
}

function Calendar() {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const d = WEDDING.date;
  const year = d.getFullYear();
  const month = d.getMonth();
  const weddingDay = d.getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  return (
    <section id="calendar" className={styles.section} aria-label="Збережіть дату">
      <SectionHeading eyebrow="Запишіть у календар" title="Збережіть дату" />
      <div ref={ref} className={`${styles.calCard} ${styles.glass} ${styles.reveal} ${inView ? styles.in : ""}`}>
        <Butterfly className={`${styles.calCorner} ${styles.c1}`} from="#FFD6E8" to="#FFE4D6" />
        <Butterfly className={`${styles.calCorner} ${styles.c2}`} from="#D6F5FF" to="#D8FFE1" />
        <Butterfly className={`${styles.calCorner} ${styles.c3}`} from="#E9D5FF" to="#FFD6E8" />
        <p className={styles.calMonth}>{MONTHS_UA[month]} {year}</p>
        <div className={styles.calWeekdays}>
          {WEEKDAYS_UA.map((wd) => <span key={wd} className={`${styles.eyebrow} ${styles.unitLabel}`}>{wd}</span>)}
        </div>
        <div className={styles.calGrid}>
          {cells.map((day, i) =>
            day === null ? (
              <span key={`b-${i}`} />
            ) : day === weddingDay ? (
              <div key={day} className={styles.calWedding}>
                {day}
                <Butterfly className={styles.wedBfly} from="#fff" to="#FFF4D6" />
              </div>
            ) : (
              <div key={day} className={styles.calCell}>{day}</div>
            )
          )}
        </div>
        <p className={styles.calNote}>День весілля — {WEDDING.dateLabel}</p>
      </div>
    </section>
  );
}

const MARK_COLORS = [
  ["#FFD6E8", "#FFE4D6"], ["#E9D5FF", "#FFD6E8"], ["#D6F5FF", "#E9D5FF"],
  ["#D8FFE1", "#D6F5FF"], ["#FFF4D6", "#FFE4D6"],
];

function TimelineItem({ stop, i }: { stop: typeof SCHEDULE[number]; i: number }) {
  const even = i % 2 === 0;
  const [from, to] = MARK_COLORS[i % MARK_COLORS.length];
  const marker = useReveal<HTMLDivElement>();
  const card = useReveal<HTMLDivElement>(120);
  return (
    <li className={`${styles.item} ${even ? styles.even : styles.odd}`}>
      <div ref={marker.ref} className={`${styles.marker} ${styles.glass} ${styles.reveal} ${marker.inView ? styles.in : ""}`}>
        <Butterfly from={from} to={to} />
      </div>
      <div ref={card.ref} className={`${styles.tlCard} ${styles.glass} ${styles.reveal} ${card.inView ? styles.in : ""}`}>
        <p className={`${styles.tlTime} ${styles.rainbow}`}>{stop.time}</p>
        <h3 className={styles.tlTitle}>{stop.title}</h3>
        <p className={styles.tlDesc}>{stop.desc}</p>
      </div>
    </li>
  );
}

function Timeline() {
  const line = useReveal<HTMLDivElement>();
  return (
    <section id="timeline" className={styles.section} aria-label="Розклад весільного дня">
      <SectionHeading eyebrow="Маршрут дня" title="Наш день" />
      <div className={styles.timeline}>
        <div className={styles.lineTrack}>
          <div ref={line.ref} className={`${styles.lineFill} ${line.inView ? styles.in : ""}`} />
        </div>
        <ol className={styles.items}>
          {SCHEDULE.map((stop, i) => <TimelineItem key={stop.title} stop={stop} i={i} />)}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */
export default function WeddingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useButterflies(canvasRef);

  return (
    <main className={styles.root}>
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.mesh} />
        <div className={`${styles.blob} ${styles.b1}`} />
        <div className={`${styles.blob} ${styles.b2}`} />
        <div className={`${styles.blob} ${styles.b3}`} />
        <div className={`${styles.blob} ${styles.b4}`} />
        <div className={styles.rays} />
        <div className={styles.vignette} />
      </div>

      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <Hero />
      <Countdown />
      <Calendar />
      <Timeline />

      <footer className={styles.footer}>
        <p className={`${styles.footerNames} ${styles.rainbow}`}>
          {WEDDING.partnerOne} &amp; {WEDDING.partnerTwo}
        </p>
        <p className={`${styles.eyebrow} ${styles.footerMeta}`}>
          {WEDDING.dateLabel} · {WEDDING.location}
        </p>
        <p className={styles.footerWish}>Ми з нетерпінням чекаємо святкувати разом із вами.</p>
      </footer>
    </main>
  );
}
