var EchoTheme = (function (k) {
  "use strict";
  function $() {
    const t = document.getElementById("tbClock");
    if (!t) return;
    const e = new Date(),
      n = (o) => String(o).padStart(2, "0");
    t.textContent = `${n(e.getHours())}:${n(e.getMinutes())}:${n(e.getSeconds())}`;
  }
  function at() {
    ($(), window.setInterval($, 1e3));
  }
  function st() {
    const t = document.getElementById("tbVisitorIp");
    if (!t || t.dataset.loaded === "true") return;
    t.dataset.loaded = "true";
    const e = t.dataset.ipApi || "https://api.ipify.org?format=json";
    fetch(e, { cache: "no-store" })
      .then((n) => n.text())
      .then((n) => {
        let o = n.trim();
        try {
          const i = JSON.parse(n);
          o = i.ip || i.query || i.address || o;
        } catch {}
        t.textContent = o ? `ip ${o}` : "ip unavailable";
      })
      .catch(() => {
        t.textContent = "ip unavailable";
      });
  }
  function ct(t) {
    t || (t = {});
    function e(l) {
      t[l] && (t[l].disconnect(), (t[l] = null));
    }
    e("tocObserver");
    const n = document.getElementById("articleToc"),
      o = document.querySelector(".article-shell .content");
    if (!n || !o) return;
    n.textContent = "";
    const i = Array.from(o.querySelectorAll("h2, h3")).filter((l) =>
      l.textContent.trim(),
    );
    if (!i.length) {
      n.remove();
      return;
    }
    const r = document.createElement("div");
    ((r.className = "article-toc-rail"), n.appendChild(r));
    function a(l, u) {
      return `section-${u}-${
        l
          .trim()
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
          .replace(/^-|-$/g, "") || "part"
      }`;
    }
    i.forEach((l, u) => {
      l.id || (l.id = a(l.textContent, u + 1));
      const p = document.createElement("a");
      ((p.className = `article-toc-mark level-${l.tagName.toLowerCase()}`),
        (p.href = `#${l.id}`),
        (p.dataset.title = l.textContent.trim()),
        (p.dataset.index = String(u + 1).padStart(2, "0")),
        p.setAttribute("aria-label", p.dataset.title),
        (p.title = p.dataset.title),
        r.appendChild(p));
    });
    const c = Array.from(r.querySelectorAll(".article-toc-mark"));
    if (!("IntersectionObserver" in window)) {
      c[0] && c[0].classList.add("active");
      return;
    }
    ((t.tocObserver = new IntersectionObserver(
      (l) => {
        l.forEach((u) => {
          u.isIntersecting &&
            c.forEach((p) => {
              const v = p.getAttribute("href") === `#${u.target.id}`;
              p.classList.toggle("active", v);
            });
        });
      },
      { rootMargin: "-20% 0px -68% 0px", threshold: 0.01 },
    )),
      i.forEach((l) => t.tocObserver.observe(l)),
      c[0] && c[0].classList.add("active"));
  }
  const R = "http://www.w3.org/2000/svg";
  function s(t, e = {}, n = "") {
    const o = document.createElementNS(R, t);
    return (
      Object.entries(e).forEach(([i, r]) => {
        o.setAttribute(i, String(r));
      }),
      n && (o.textContent = n),
      o
    );
  }
  function h(t, e) {
    Object.entries(e).forEach(([n, o]) => {
      t.setAttribute(n, String(o));
    });
  }
  function f(t, e, n, o, i, r = {}) {
    return s(
      "text",
      { x: t, y: e, fill: o, "font-family": "monospace", "font-size": n, ...r },
      i,
    );
  }
  function lt(t = "#0a0a0a") {
    const e = s("svg", {
      viewBox: "0 0 400 300",
      width: "400",
      height: "300",
      preserveAspectRatio: "xMidYMid slice",
      xmlns: R,
    });
    return (e.appendChild(s("rect", { width: 400, height: 300, fill: t })), e);
  }
  function dt(t) {
    const e = s("line", {
      x1: 0,
      y1: 0,
      x2: 400,
      y2: 0,
      stroke: "var(--red)",
      "stroke-width": 1,
      opacity: 0.45,
    });
    (e.appendChild(
      s("animate", {
        attributeName: "y1",
        values: "0;300;0",
        dur: "5.5s",
        repeatCount: "indefinite",
      }),
    ),
      e.appendChild(
        s("animate", {
          attributeName: "y2",
          values: "0;300;0",
          dur: "5.5s",
          repeatCount: "indefinite",
        }),
      ),
      t.appendChild(e));
  }
  function m(t, e = "#0a0a0a") {
    t.textContent = "";
    const n = lt(e);
    return (dt(n), t.appendChild(n), n);
  }
  function L(t) {
    return t
      .map(
        (e, n) =>
          `${n === 0 ? "M" : "L"} ${e[0].toFixed(1)} ${e[1].toFixed(1)}`,
      )
      .join(" ");
  }
  function ut(t) {
    const e = (t / 1e3) * 0.9,
      n = [];
    for (let o = 0; o <= 240; o++) {
      const i = (o / 240) * Math.PI * 2,
        r = 200 + 160 * Math.sin(3 * i + Math.PI / 2 + e),
        a = 150 + 110 * Math.sin(2 * i - e * 0.75);
      n.push([r, a]);
    }
    return n;
  }
  function ft(t) {
    const e = t / 1600;
    return Array.from({ length: 220 }, (n, o) => {
      const i = o * 2.3999632297,
        r = Math.sqrt(o / 220) * (118 + Math.sin(e + o * 0.08) * 14),
        a = 200 + Math.cos(i + e * 0.4) * r * 0.78,
        c = 150 + Math.sin(i - e * 0.3) * r * 0.58,
        l = Math.hypot(a - 200, c - 150),
        u = Math.max(0.08, 1 - l / 180);
      return { x: a, y: c, r: 0.8 + u * 2.2, opacity: u };
    });
  }
  const T = {
      ai_sigmoid: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.4 });
          [
            [0, 150, 400, 150],
            [200, 40, 200, 260],
            [0, 40, 400, 40],
            [0, 260, 400, 260],
          ].forEach(([l, u, p, v]) =>
            n.appendChild(s("line", { x1: l, y1: u, x2: p, y2: v })),
          );
          const o = s("g", { stroke: "#1f1f1f", "stroke-width": 0.3 });
          ([95, 205].forEach((l) =>
            o.appendChild(s("line", { x1: 0, y1: l, x2: 400, y2: l })),
          ),
            e.append(n, o));
          const i = s("path", {
              fill: "none",
              stroke: "var(--red)",
              "stroke-width": 1.8,
            }),
            r = s("circle", { r: 5, fill: "var(--red)" }),
            a = f(20, 30, 10, "#6b6b6b", ""),
            c = f(20, 285, 9, "#6b6b6b", "activation · sigmoid");
          return (
            e.append(i, r, a, c),
            { svg: e, curve: i, dot: r, topText: a }
          );
        },
        update(t, e) {
          const n = (e / 1e3) % 6.28,
            o = 0.5 + Math.sin(n) * 0.4,
            i = [];
          for (let c = -6; c <= 6; c += 0.05) {
            const l = 1 / (1 + Math.exp(-c / o));
            i.push([200 + c * 28, 260 - l * 220]);
          }
          const r = Math.sin(n) * 3,
            a = 1 / (1 + Math.exp(-r / o));
          (h(t.curve, { d: L(i) }),
            h(t.dot, {
              cx: (200 + r * 28).toFixed(1),
              cy: (260 - a * 220).toFixed(1),
            }),
            (t.topText.textContent = `sigma(z, T=${o.toFixed(2)})`));
        },
      },
      ai_neuron: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.5 });
          ([60, 200, 340].forEach((l) =>
            n.appendChild(s("line", { x1: l, y1: 50, x2: l, y2: 250 })),
          ),
            e.appendChild(n));
          const o = s("g"),
            i = s("g");
          e.append(o, i);
          const r = [[180], [120, 240], [180]],
            a = [];
          for (let l = 0; l < r.length - 1; l++)
            for (let u = 0; u < r[l].length; u++) {
              const p = 60 + l * 140,
                v = r[l][u];
              for (let b = 0; b < r[l + 1].length; b++) {
                const ee = 60 + (l + 1) * 140,
                  ne = r[l + 1][b],
                  rt = s("line", {
                    x1: p + 12,
                    y1: v,
                    x2: ee - 12,
                    y2: ne,
                    stroke: "var(--red)",
                  });
                (o.appendChild(rt), a.push(rt));
              }
            }
          const c = [];
          return (
            r.forEach((l, u) => {
              l.forEach((p) => {
                const v = 60 + u * 140;
                e.appendChild(
                  s("circle", {
                    cx: v,
                    cy: p,
                    r: 12,
                    fill: "#0a0a0a",
                    stroke: "#ededed",
                    "stroke-width": 1.2,
                  }),
                );
                const b = s("circle", { cx: v, cy: p, fill: "var(--red)" });
                (i.appendChild(b), c.push(b));
              });
            }),
            e.append(
              f(20, 30, 10, "#6b6b6b", "y = sigma(W x + b)"),
              f(20, 285, 9, "#6b6b6b", "neural network · 3 layers"),
            ),
            { svg: e, edges: a, pulses: c, layers: r }
          );
        },
        update(t, e) {
          const n = (e / 500) % 12.56;
          let o = 0;
          for (let r = 0; r < t.layers.length - 1; r++)
            for (let a = 0; a < t.layers[r].length; a++)
              for (let c = 0; c < t.layers[r + 1].length; c++) {
                const l = 0.3 + 0.3 * Math.sin(n + r + a + c);
                (h(t.edges[o], {
                  "stroke-width": (0.6 + l).toFixed(2),
                  opacity: (0.3 + l * 0.7).toFixed(2),
                }),
                  (o += 1));
              }
          let i = 0;
          t.layers.forEach((r, a) => {
            r.forEach((c, l) => {
              const u = 0.5 + 0.5 * Math.sin(n + a + l);
              (h(t.pulses[i], {
                r: (4 + u * 4).toFixed(2),
                opacity: (0.5 + u * 0.5).toFixed(2),
              }),
                (i += 1));
            });
          });
        },
      },
      ai_loss: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.3 });
          for (let c = 0; c <= 10; c++)
            n.appendChild(
              s("line", {
                x1: 50,
                y1: 250 - c * 16,
                x2: 340,
                y2: 250 - c * 16,
              }),
            );
          (e.appendChild(n),
            e.appendChild(
              s("line", {
                x1: 50,
                y1: 250,
                x2: 340,
                y2: 250,
                stroke: "#1f1f1f",
                "stroke-width": 0.8,
              }),
            ),
            e.appendChild(
              s("line", {
                x1: 200,
                y1: 50,
                x2: 200,
                y2: 250,
                stroke: "#1f1f1f",
                "stroke-width": 0.8,
              }),
            ));
          const o = s("path", {
              fill: "none",
              stroke: "var(--red)",
              "stroke-width": 1.6,
            }),
            i = s("circle", { r: 6, fill: "var(--red)" }),
            r = s("circle", {
              fill: "none",
              stroke: "var(--red)",
              opacity: 0.5,
            }),
            a = f(20, 285, 9, "#6b6b6b", "");
          return (
            e.append(o, i, r, f(20, 30, 10, "#6b6b6b", "L(w) = (w - 0)^2"), a),
            { svg: e, loss: o, dot: i, ring: r, valueText: a }
          );
        },
        update(t, e) {
          const n = (e / 800) % 6.28,
            o = -1 + (0.5 + 0.5 * Math.sin(n)) * 2,
            i = [];
          for (let c = 0; c <= 100; c++) {
            const u = -1 + (c / 100) * 2;
            i.push([50 + c * 3, 250 - u * u * 80]);
          }
          const r = 50 + ((o + 1) / 2) * 300,
            a = 250 - o * o * 80;
          (h(t.loss, { d: L(i) }),
            h(t.dot, { cx: r.toFixed(1), cy: a.toFixed(1) }),
            h(t.ring, { cx: r.toFixed(1), cy: a.toFixed(1), r: 10 }),
            (t.valueText.textContent = `gradient descent · w=${o.toFixed(2)}`));
        },
      },
      ai_attention: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.4 });
          for (let i = 0; i < 9; i++)
            (n.appendChild(
              s("line", { x1: 60, y1: 60 + i * 25, x2: 340, y2: 60 + i * 25 }),
            ),
              n.appendChild(
                s("line", {
                  x1: 60 + i * 35,
                  y1: 60,
                  x2: 60 + i * 35,
                  y2: 260,
                }),
              ));
          e.appendChild(n);
          const o = [];
          for (let i = 0; i < 8; i++)
            for (let r = 0; r < 8; r++) {
              const a = s("rect", {
                x: 60 + i * 35,
                y: 60 + r * 25,
                width: 32,
                height: 22,
                fill: "var(--red)",
              });
              (e.appendChild(a), o.push(a));
            }
          return (
            e.append(
              f(20, 30, 10, "#6b6b6b", "A = softmax(Q K^T / sqrt(d_k))"),
              f(20, 285, 9, "#6b6b6b", "self-attention · 8x8"),
            ),
            { svg: e, cells: o }
          );
        },
        update(t, e) {
          const n = (e / 600) % 6.28;
          let o = 0;
          for (let i = 0; i < 8; i++)
            for (let r = 0; r < 8; r++) {
              const a = Math.abs(i - r),
                c = Math.sin(n + i + r) * 0.5,
                l = Math.max(0.08, 0.1 + 0.7 * Math.exp(-(a + c) / 2.5));
              (h(t.cells[o], { opacity: l.toFixed(2) }), (o += 1));
            }
        },
      },
      crypto_xor: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.5 });
          ([120, 180, 250].forEach((i) =>
            n.appendChild(s("line", { x1: i, y1: 60, x2: i, y2: 280 })),
          ),
            e.appendChild(n));
          const o = [];
          for (let i = 0; i < 32; i++) {
            const r = 80 + i * 6,
              a = f(50, r, 8, "#ededed", ""),
              c = f(200, r, 8, "#6b6b6b", "XOR"),
              l = f(150, r, 8, "var(--red)", ""),
              u = f(280, r, 8, "var(--red)", "");
            (e.append(a, l, c, u), o.push({ a, b: l, c: u }));
          }
          return (
            e.append(
              f(20, 30, 10, "#6b6b6b", "C = A XOR B"),
              f(20, 285, 9, "#6b6b6b", "stream cipher · 32-bit"),
            ),
            { svg: e, rows: o }
          );
        },
        update(t, e) {
          const n = Math.floor(e / 200);
          t.rows.forEach((o, i) => {
            const r = (n + i * 3) % 2,
              a = (n + i * 7 + 100) % 2,
              c = r ^ a;
            ((o.a.textContent = `A${String(i).padStart(2, "0")}=${r}`),
              (o.b.textContent = `B${String(i).padStart(2, "0")}=${a}`),
              (o.c.textContent = `C${String(i).padStart(2, "0")}=${c}`));
          });
        },
      },
      crypto_hash: {
        mount(t) {
          const e = m(t);
          (e.appendChild(
            s("rect", {
              x: 15,
              y: 55,
              width: 370,
              height: 190,
              fill: "none",
              stroke: "#1f1f1f",
              "stroke-width": 0.8,
            }),
          ),
            e.appendChild(
              s("rect", {
                x: 20,
                y: 60,
                width: 360,
                height: 180,
                fill: "none",
                stroke: "#1f1f1f",
                "stroke-width": 0.4,
              }),
            ));
          const n = [];
          for (let o = 0; o < 4; o++) {
            const i = f(20, 80 + o * 45, 10, "var(--red)", "");
            (e.appendChild(i), n.push(i));
          }
          return (
            e.append(
              f(20, 30, 10, "#6b6b6b", "H(m) -> 256-bit digest"),
              f(20, 285, 9, "#6b6b6b", "SHA-256 · cryptographic hash"),
            ),
            { svg: e, lines: n }
          );
        },
        update(t, e) {
          const n = Math.floor(e / 150),
            o = "0123456789abcdef";
          let i = "";
          for (let r = 0; r < 64; r++) i += o[(n + r * 13) % 16];
          t.lines.forEach((r, a) => {
            const c = a * 16;
            r.textContent = i.slice(c, c + 16);
          });
        },
      },
      crypto_round: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.4 });
          (n.appendChild(s("line", { x1: 200, y1: 60, x2: 200, y2: 200 })),
            n.appendChild(s("line", { x1: 80, y1: 120, x2: 200, y2: 120 })),
            e.appendChild(n));
          const o = [];
          for (let r = 0; r < 4; r++) {
            const a = s("rect", {
                x: 60 + r * 75,
                y: 100,
                width: 60,
                height: 40,
              }),
              c = f(
                90 + r * 75,
                125,
                9,
                r % 2 === 0 ? "#ededed" : "var(--red)",
                r % 2 === 0 ? "AddK" : "Sub",
                { "text-anchor": "middle" },
              );
            (e.append(a, c),
              o.push(a),
              r < 3 &&
                e.appendChild(
                  s("line", {
                    x1: 120 + r * 75,
                    y1: 120,
                    x2: 135 + r * 75,
                    y2: 120,
                    stroke: "#1f1f1f",
                    "stroke-width": 0.8,
                  }),
                ));
          }
          const i = f(20, 30, 10, "#6b6b6b", "");
          return (
            e.append(i, f(20, 285, 9, "#6b6b6b", "block cipher · 4 rounds")),
            { svg: e, boxes: o, title: i }
          );
        },
        update(t, e) {
          const n = Math.floor((e / 400) % 4);
          (t.boxes.forEach((o, i) => {
            const r = i === n;
            h(o, {
              fill: r ? "var(--red)" : "none",
              "fill-opacity": r ? 0.15 : 1,
              stroke: r ? "var(--red)" : "#ededed",
              "stroke-width": r ? 1.8 : 1.2,
            });
          }),
            (t.title.textContent = `Feistel network · round ${n + 1}`));
        },
      },
      wave: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.5 });
          for (let r = 0; r < 8; r++)
            n.appendChild(
              s("line", { x1: 0, y1: r * 40 + 20, x2: 400, y2: r * 40 + 20 }),
            );
          e.appendChild(n);
          const o = s("path", {
              fill: "none",
              stroke: "var(--red)",
              "stroke-width": 1.4,
              opacity: 0.95,
            }),
            i = s("path", {
              fill: "none",
              stroke: "#ededed",
              "stroke-width": 0.4,
              opacity: 0.25,
            });
          return (
            e.append(
              o,
              i,
              f(20, 34, 11, "#6b6b6b", "x=sin(3t+pi/2) y=sin(2t)"),
              f(20, 282, 10, "#6b6b6b", "Lissajous · a=3 · b=2"),
            ),
            { svg: e, red: o, white: i }
          );
        },
        update(t, e) {
          const n = L(ut(e));
          (h(t.red, { d: n }), h(t.white, { d: n }));
        },
      },
      circle: {
        mount(t) {
          const e = m(t);
          for (let i = 0; i < 8; i++)
            e.appendChild(
              s("circle", {
                cx: 200,
                cy: 150,
                r: 20 + i * 18,
                fill: "none",
                stroke: "#ededed",
                "stroke-width": 0.6,
                opacity: 0.15 + (7 - i) * 0.05,
              }),
            );
          (e.appendChild(
            s("line", { x1: 40, y1: 150, x2: 360, y2: 150, stroke: "#1f1f1f" }),
          ),
            e.appendChild(
              s("line", {
                x1: 200,
                y1: 20,
                x2: 200,
                y2: 280,
                stroke: "#1f1f1f",
              }),
            ));
          const n = s("line", {
            x1: 200,
            y1: 150,
            stroke: "var(--red)",
            "stroke-width": 1.2,
            opacity: 0.9,
          });
          e.appendChild(n);
          const o = Array.from({ length: 14 }, () => {
            const i = s("circle", { r: 1.5, fill: "var(--red)" });
            return (e.appendChild(i), i);
          });
          return (
            e.appendChild(f(20, 34, 11, "#6b6b6b", "scan.ports(0..65535)")),
            { svg: e, sweep: n, points: o }
          );
        },
        update(t, e) {
          const n = (e / 1e3) * 1.6;
          (h(t.sweep, {
            x2: (200 + Math.cos(n) * 160).toFixed(1),
            y2: (150 + Math.sin(n) * 160).toFixed(1),
          }),
            t.points.forEach((o, i) => {
              const r = (((i * 137.5) % 360) * Math.PI) / 180 + n * 0.3,
                a = 34 + ((i * 37) % 126) + Math.sin(n + i) * 4;
              h(o, {
                cx: (200 + Math.cos(r) * a).toFixed(1),
                cy: (150 + Math.sin(r) * a).toFixed(1),
                opacity: (0.45 + (i % 5) * 0.08).toFixed(2),
              });
            }));
        },
      },
      ring: {
        mount(t) {
          const e = m(t, "#ededed"),
            n = [
              s("circle", { cx: 200, cy: 150, fill: "#0a0a0a" }),
              s("circle", { cx: 200, cy: 150, fill: "#ededed" }),
              s("circle", { cx: 200, cy: 150, fill: "#0a0a0a" }),
              s("circle", { cx: 200, cy: 150, fill: "var(--red)" }),
              s("circle", { cx: 200, cy: 150, r: 6, fill: "#ededed" }),
            ];
          return (
            n.forEach((o) => e.appendChild(o)),
            e.appendChild(f(20, 34, 11, "#0a0a0a", "concentric.rings(n=5)")),
            { svg: e, rings: n }
          );
        },
        update(t, e) {
          const n = 1 + Math.sin(e / 900) * 0.08;
          [125, 90, 58, 28].forEach((o, i) => {
            h(t.rings[i], { r: (o * n).toFixed(1) });
          });
        },
      },
      triangle: {
        mount(t) {
          const e = m(t),
            n = Array.from({ length: 24 }, () => {
              const i = s("line", {
                x1: 200,
                y1: 150,
                stroke: "#1f1f1f",
                "stroke-width": 0.5,
              });
              return (e.appendChild(i), i);
            }),
            o = s("polygon", {
              fill: "none",
              stroke: "#ededed",
              "stroke-width": 1.6,
            });
          return (
            e.append(
              o,
              s("circle", { cx: 200, cy: 150, r: 4, fill: "var(--red)" }),
              f(20, 34, 11, "#6b6b6b", "r = 110 · k in [0, 23]"),
            ),
            { svg: e, radii: n, polygon: o }
          );
        },
        update(t, e) {
          const n = e / 1200;
          t.radii.forEach((i, r) => {
            const a = (r / 24) * Math.PI * 2 + n * 0.5,
              c = 94 + Math.sin(n * 2 + r * 0.4) * 22;
            h(i, {
              x2: (200 + Math.cos(a) * c).toFixed(1),
              y2: (150 + Math.sin(a) * c).toFixed(1),
            });
          });
          const o = Array.from({ length: 3 }, (i, r) => {
            const a = (r / 3) * Math.PI * 2 - Math.PI / 2 + Math.sin(n) * 0.04,
              c = 110 + Math.sin(n * 1.8 + r) * 10;
            return `${(200 + Math.cos(a) * c).toFixed(1)},${(150 + Math.sin(a) * c).toFixed(1)}`;
          }).join(" ");
          h(t.polygon, { points: o });
        },
      },
      grid: {
        mount(t) {
          const e = m(t),
            n = s("g", { stroke: "#1f1f1f", "stroke-width": 0.5 });
          for (let a = 0; a <= 20; a++)
            (n.appendChild(
              s("line", { x1: a * 20, y1: 0, x2: a * 20, y2: 300 }),
            ),
              n.appendChild(
                s("line", { x1: 0, y1: a * 15, x2: 400, y2: a * 15 }),
              ));
          e.appendChild(n);
          const o = s("line", {
              x1: 60,
              y1: 60,
              y2: 60,
              stroke: "var(--red)",
              "stroke-width": 1.4,
            }),
            i = s("line", {
              x1: 60,
              y1: 60,
              x2: 60,
              stroke: "var(--red)",
              "stroke-width": 1.4,
            }),
            r = s("circle", { r: 3.5, fill: "var(--red)" });
          return (
            e.append(
              o,
              i,
              s("line", {
                x1: 340,
                y1: 60,
                x2: 340,
                y2: 240,
                stroke: "#ededed",
                "stroke-width": 1.2,
              }),
              s("line", {
                x1: 60,
                y1: 240,
                x2: 340,
                y2: 240,
                stroke: "#ededed",
                "stroke-width": 1.2,
              }),
              r,
            ),
            { svg: e, xLine: o, yLine: i, dot: r }
          );
        },
        update(t, e) {
          const n = e / 1e3,
            o = 60 + (Math.sin(n) + 1) * 0.5 * 280,
            i = 60 + (Math.cos(n * 0.8) + 1) * 0.5 * 180;
          (h(t.xLine, { x2: o.toFixed(1) }),
            h(t.yLine, { y2: i.toFixed(1) }),
            h(t.dot, { cx: o.toFixed(1), cy: i.toFixed(1) }));
        },
      },
      dots: {
        mount(t) {
          const e = m(t),
            n = Array.from({ length: 220 }, () => {
              const o = s("circle", { fill: "#ededed" });
              return (e.appendChild(o), o);
            });
          return (
            e.append(
              s("circle", { cx: 200, cy: 150, r: 5, fill: "var(--red)" }),
              f(20, 34, 11, "#6b6b6b", "z = exp(-(x2 + y2) / 2sigma2)"),
            ),
            { svg: e, points: n }
          );
        },
        update(t, e) {
          const n = ft(e);
          t.points.forEach((o, i) => {
            const r = n[i];
            h(o, {
              cx: r.x.toFixed(1),
              cy: r.y.toFixed(1),
              r: r.r.toFixed(1),
              opacity: r.opacity.toFixed(2),
            });
          });
        },
      },
    },
    ht = Object.fromEntries(
      Object.entries(T).map(([t, e]) => [
        t,
        (n = 0) => {
          const o = document.createElement("div"),
            i = e.mount(o);
          return (e.update(i, n), o.innerHTML);
        },
      ]),
    ),
    y = {
      ai: ["ai_sigmoid", "ai_neuron", "ai_loss", "ai_attention"],
      crypto: ["crypto_xor", "crypto_hash", "crypto_round"],
      original: ["wave", "circle", "ring", "triangle", "grid", "dots"],
    },
    B = Object.keys(ht),
    g = new Map();
  let w = null,
    x = null,
    C = null,
    N = !1;
  function pt(t) {
    let e = 0;
    for (let n = 0; n < t.length; n++) e = ((e << 5) - e + t.charCodeAt(n)) | 0;
    return Math.abs(e);
  }
  function mt() {
    return document.documentElement.dataset.coverStyle || "random";
  }
  function gt() {
    const t = mt();
    return t === "ai"
      ? y.ai
      : t === "crypto"
        ? y.crypto
        : t === "original"
          ? y.original
          : [...y.ai, ...y.crypto, ...y.original];
  }
  function vt(t) {
    const e = String(t || "").toLowerCase(),
      n = gt(),
      i = [
        { re: /sin|cos|lissajous|动效|交互|曲线|三角|函数|数学/, name: "wave" },
        {
          re: /rag|红队|安全|攻击|attack|注入|prompt|scan|扫描|端口|漏洞|web|pwn|reverse|llm/,
          name: "circle",
        },
        { re: /设计|颜色|色彩|黑白|视觉|ui|界面|审美|圆|ring/, name: "ring" },
        { re: /risc|硬件|芯片|指令|板子|三角|triangle/, name: "triangle" },
        {
          re: /code|代码|vscode|markdown|工具|写作|工程|系统|grid|网格/,
          name: "grid",
        },
        {
          re: /雨|咖啡|照片|生活|城市|随机|分布|高斯|gaussian|dots/,
          name: "dots",
        },
        {
          re: /神经网络|神经|neuron|activation|sigmoid|relu|梯度|反向传播/,
          name: "ai_sigmoid",
        },
        { re: /attention|注意力|transformer|qkv|多头/, name: "ai_attention" },
        { re: /loss|损失|梯度下降|优化|optimizer/, name: "ai_loss" },
        { re: /密码学|加密|解密|hash|xor|feistel|cipher/, name: "crypto_hash" },
      ].find((r) => r.re.test(e) && n.includes(r.name));
    return i ? i.name : n[pt(e) % n.length];
  }
  function xt(t) {
    return T[t] || T.ai_sigmoid;
  }
  function yt(t) {
    ((t.definition = xt(t.shape)), (t.scene = t.definition.mount(t.element)));
  }
  function j(t, e) {
    ((!t.scene || !t.scene.svg || !t.scene.svg.isConnected) && yt(t),
      t.definition.update(t.scene, e),
      (t.element.dataset.coverLoaded = "true"));
  }
  function bt() {
    for (const [t] of g) t.isConnected || g.delete(t);
  }
  function F() {
    for (const t of g.values()) if (t.active) return !0;
    return !1;
  }
  function S() {
    (x !== null && (window.cancelAnimationFrame(x), (x = null)), (C = null));
  }
  function isFxEnabled() {
    const t = window.__echoState;
    return (!t || t.fxOn) && !qt();
  }
  function setCoverPlayback(t, e) {
    const n = t && t.scene && t.scene.svg;
    if (!n) return;
    if (e && typeof n.unpauseAnimations === "function") n.unpauseAnimations();
    if (!e && typeof n.pauseAnimations === "function") n.pauseAnimations();
  }
  function syncCoverPlayback(t) {
    for (const e of g.values()) setCoverPlayback(e, t && e.active);
  }
  function wt(t) {
    if (C === null) {
      C = t;
      return;
    }
    const e = t - C;
    if (((C = t), e <= 0)) return;
    const n = 1e3 / e,
      o = window.__echoState;
    o &&
      (o.coverRefreshRate = o.coverRefreshRate
        ? o.coverRefreshRate * 0.85 + n * 0.15
        : n);
  }
  function H(t) {
    if (((x = null), bt(), document.hidden || !isFxEnabled() || !F())) {
      S();
      return;
    }
    wt(t);
    for (const e of g.values())
      e.active &&
        (e.startTime === null && (e.startTime = t), j(e, t - e.startTime));
    x = window.requestAnimationFrame(H);
  }
  function W() {
    x === null &&
      !document.hidden &&
      isFxEnabled() &&
      F() &&
      (x = window.requestAnimationFrame(H));
  }
  function Ct() {
    if (document.hidden) {
      (S(), cancelMathAnimation());
      return;
    }
    for (const t of g.values()) t.active && (t.startTime = null);
    const t = window.__echoState;
    t ? _(t) : W();
  }
  function kt() {
    N || (document.addEventListener("visibilitychange", Ct), (N = !0));
  }
  function V(t, e) {
    if (!t) return null;
    const n = g.get(t);
    if (n) return n;
    const o = t.dataset.coverTitle || t.getAttribute("aria-label") || "",
      r = t.dataset.coverShape || (o ? vt(o) : B[e % B.length]),
      a = {
        element: t,
        shape: r,
        definition: null,
        scene: null,
        active: !1,
        startTime: null,
      };
    return (j(a, 0), setCoverPlayback(a, !1), g.set(t, a), a);
  }
  function U(t, e) {
    const n = V(t, e);
    n &&
      ((n.active = !0),
      (n.startTime = null),
      (n.element.dataset.animating = isFxEnabled() ? "true" : "false"),
      setCoverPlayback(n, isFxEnabled()),
      W());
  }
  function St(t) {
    const e = g.get(t);
    e &&
      ((e.active = !1),
      (e.element.dataset.animating = "false"),
      setCoverPlayback(e, !1),
      F() || S());
  }
  function Mt() {
    (w && (w.disconnect(), (w = null)), S(), g.clear());
  }
  function Et() {
    (Mt(), kt());
    const t = Array.from(
      document.querySelectorAll(
        ".post-cover-formula[data-cover-shape], .post-cover-formula[data-cover-index], .post-cover-formula[data-cover-title]",
      ),
    );
    (t.forEach((e, n) => {
      ((e.dataset.coverOrdinal = String(n)), V(e, n));
    }),
      t.length &&
        ("IntersectionObserver" in window
          ? ((w = new IntersectionObserver(
              (e) => {
                e.forEach((n) => {
                  const o = Number.parseInt(
                    n.target.dataset.coverOrdinal || "0",
                    10,
                  );
                  n.isIntersecting ? U(n.target, o) : St(n.target);
                });
              },
              { rootMargin: "360px 0px", threshold: 0.01 },
            )),
            t.forEach((e) => {
              w.observe(e);
            }))
          : t.forEach((e, n) => U(e, n))));
    syncCoverPlayback(isFxEnabled());
  }
  function initCoverImageLoading() {
    document.querySelectorAll("img[data-cover-image]").forEach((t) => {
      const e = t.closest(".cover-has-image");
      if (!e) return;
      const n = e.querySelector(".cover-loading-formula"),
        o = () => {
          (e.classList.add("is-cover-loaded"),
            e.classList.remove("is-cover-error"),
            e.setAttribute("aria-busy", "false"),
            n && St(n));
        },
        r = () => {
          (e.classList.remove("is-cover-loaded"),
            e.classList.add("is-cover-error"),
            e.setAttribute("aria-busy", "false"));
        };
      (t.dataset.coverImageBound !== "true" &&
        ((t.dataset.coverImageBound = "true"),
        t.addEventListener("load", o),
        t.addEventListener("error", r)),
        t.complete && (t.naturalWidth > 0 ? o() : r()));
    });
  }
  const X = [
      "sigmoid",
      "tanh",
      "ReLU",
      "softmax",
      "L = 1/2 * sum (y_hat - y)^2",
      "CE = -sum p log q",
      "KL(P||Q) = sum P_i log(P_i/Q_i)",
      "H(X) = -sum p(x) log p(x)",
      "BN(x)",
      "W",
      "b",
      "x^T",
      "Q",
      "K",
      "V",
      "attention",
      "h_t = tanh(W_h h_prev + b_h)",
      "h_t = sigma(W x_t + U h_{t-1} + b)",
      "gate",
      "sigma(z) = 1 / (1 + e^-z)",
      "tanh(z) = (e^z - e^-z) / (e^z + e^-z)",
      "ReLU(z) = max(0, z)",
      "z = exp(-(x2 + y2) / 2sigma2)",
      "layer_norm",
      "dropout",
      "embedding",
      "token",
      "seq_len",
      "d_model",
      "feed_forward",
      "residual",
      "concat",
      "skip_connection",
    ],
    D = [
      "L = 1/2 * sum (y_hat - y)^2",
      "y = sigmoid(W * x + b)",
      "y = ReLU(W * x + b)",
      "J(theta) = -1/m * sum [y log a + (1-y) log (1-a)]",
      "theta := theta - alpha * dJ/dtheta",
      "h = tanh(W_h h_prev + b_h)",
      "h_t = sigma(W x_t + U h_{t-1} + b)",
      "att = softmax(Q * K^T / sqrt(d_k)) * V",
      "sigma(z) = 1 / (1 + e^-z)",
      "tanh(z) = (e^z - e^-z) / (e^z + e^-z)",
      "ReLU(z) = max(0, z)",
      "BN(x) = gamma * (x - mu)/sqrt(sigma^2) + beta",
      "CE(p, q) = -sum p_i log q_i",
      "KL(P||Q) = sum P_i log(P_i/Q_i)",
      "H(X) = -sum p(x) log p(x)",
    ],
    d = {
      container: null,
      canvas: null,
      ctx: null,
      glyphs: [],
      rafId: null,
      startTime: null,
      resizeBound: !1,
    };
  function Lt(t) {
    if (!t) {
      ((d.container = null), (d.canvas = null), (d.ctx = null));
      return;
    }
    (d.container === t && d.canvas && d.ctx) ||
      ((d.container = t),
      (d.canvas = t.querySelector("canvas.math-bg-canvas")),
      d.canvas ||
        ((t.textContent = ""),
        (d.canvas = document.createElement("canvas")),
        (d.canvas.className = "math-bg-canvas"),
        t.appendChild(d.canvas)),
      (d.ctx = d.canvas.getContext("2d")));
  }
  function Y() {
    if (!d.container || !d.canvas || !d.ctx) return;
    const t = Math.max(
        window.innerWidth,
        document.documentElement.clientWidth || 0,
      ),
      e = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight || 0,
      ),
      n = Math.min(window.devicePixelRatio || 1, 2);
    ((d.canvas.width = Math.round(t * n)),
      (d.canvas.height = Math.round(e * n)),
      (d.canvas.style.width = `${t}px`),
      (d.canvas.style.height = `${e}px`),
      d.ctx.setTransform(n, 0, 0, n, 0, 0));
  }
  function Q() {
    if (!d.canvas) {
      d.glyphs = [];
      return;
    }
    const t = d.canvas.clientWidth || window.innerWidth,
      e = d.canvas.clientHeight || window.innerHeight,
      n = t < 720 ? 5 : 11;
    ((d.glyphs = Array.from({ length: n }, () => ({
      text: X[Math.floor(Math.random() * X.length)],
      x: Math.random() * t,
      y: Math.random() * e,
      speed: (6e-4 + Math.random() * 0.001) * 1e3,
      phase: Math.random() * Math.PI * 2,
      amp: 14 + Math.random() * 26,
      size: 38 + Math.random() * 56,
      alpha: 0.035,
    }))),
      (d.startTime = null));
  }
  function Tt(t) {
    d.resizeBound ||
      (window.addEventListener("resize", () => {
        (Y(), Q(), _(t));
      }),
      (d.resizeBound = !0));
  }
  function Ft(t) {
    if (!d.ctx || !d.canvas) return;
    const e = d.canvas.clientWidth || window.innerWidth,
      n = d.canvas.clientHeight || window.innerHeight,
      o = d.ctx,
      i =
        document.documentElement.dataset.theme === "light"
          ? "17, 17, 17"
          : "255, 255, 255";
    (o.clearRect(0, 0, e, n),
      (o.textBaseline = "top"),
      (o.textAlign = "left"),
      d.glyphs.forEach((r) => {
        const a = Math.cos(t * r.speed + r.phase) * r.amp,
          c = Math.sin(t * r.speed + r.phase) * r.amp;
        (o.save(),
          o.translate(r.x + a, r.y + c),
          (o.font = `${r.size}px JetBrains Mono, SF Mono, Menlo, Consolas, monospace`),
          (o.fillStyle = `rgba(${i}, ${r.alpha.toFixed(3)})`),
          o.fillText(r.text, 0, 0),
          o.restore());
      }));
  }
  function _(t) {
    const e = document.getElementById("mathBg"),
      n = document.querySelector("#bgToggle .state"),
      o = t.fxOn && !qt();
    ((document.documentElement.dataset.fx = o ? "on" : "off"),
      e && (e.style.display = t.fxOn ? "" : "none"),
      n && (n.textContent = t.fxOn ? "pause fx" : "resume fx"),
      syncCoverPlayback(o),
      o ? (W(), At(t)) : (S(), cancelMathAnimation(), It(), t.fxOn && Ft(0)));
  }
  function _t(t) {
    const e = document.getElementById("mathBg");
    (Lt(e), e && (Tt(t), Y(), Q()));
  }
  function At(t) {
    if (d.rafId !== null || !t.fxOn || qt()) return;
    const e = (n) => {
      if (
        document.hidden ||
        !t.fxOn ||
        qt() ||
        !d.canvas ||
        !d.ctx ||
        !d.glyphs.length
      ) {
        d.rafId = null;
        return;
      }
      (d.startTime === null && (d.startTime = n), Ft(n - d.startTime));
      d.rafId = window.requestAnimationFrame(e);
    };
    d.rafId = window.requestAnimationFrame(e);
  }
  function cancelMathAnimation() {
    d.rafId !== null && window.cancelAnimationFrame(d.rafId);
    d.rafId = null;
  }
  function It() {
    if (d.ctx && d.canvas) {
      const t = d.canvas.clientWidth || window.innerWidth,
        e = d.canvas.clientHeight || window.innerHeight;
      d.ctx.clearRect(0, 0, t, e);
    }
    d.startTime = null;
  }
  const J = "echo-page-transition",
    Ot = 0;
  const systemColorScheme = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;
  let systemColorSchemeBound = false;
  function syncSystemColorScheme() {
    const t = document.documentElement;
    if (t.dataset.colorScheme !== "auto") return;
    const e = systemColorScheme && systemColorScheme.matches ? "light" : "dark";
    (t.classList.remove(
      "dark",
      "light",
      "color-scheme-dark",
      "color-scheme-light",
    ),
      t.classList.add(e, "color-scheme-auto"),
      (t.dataset.theme = e),
      d.ctx && Ft(0));
  }
  function bindSystemColorScheme() {
    if (!systemColorScheme || systemColorSchemeBound) return;
    (typeof systemColorScheme.addEventListener === "function"
      ? systemColorScheme.addEventListener("change", syncSystemColorScheme)
      : typeof systemColorScheme.addListener === "function" &&
        systemColorScheme.addListener(syncSystemColorScheme),
      (systemColorSchemeBound = true),
      syncSystemColorScheme());
  }
  let K = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;
  let motionPreferenceBound = false;
  function qt() {
    return K ? K.matches : !1;
  }
  function Pt() {
    return document.documentElement.dataset.pageTransition !== "false";
  }
  function M() {
    const t = window.__echoState;
    return Pt() && !qt() && (!t || t.fxOn);
  }
  function zt() {
    return Array.from(
      document.querySelectorAll(
        ".hero, .site-main, .page-shell, .article-shell, .article-toc, footer",
      ),
    );
  }
  function A() {
    let t = document.querySelector(".page-transition");
    return (
      t ||
      ((t = document.createElement("div")),
      (t.className = "page-transition"),
      t.setAttribute("aria-hidden", "true"),
      (t.innerHTML = `
    <div class="page-transition-grid"></div>
    <div class="page-transition-formula" data-transition-formula></div>
    <div class="page-transition-scan"></div>`),
      document.body.appendChild(t),
      t)
    );
  }
  function G(t, e) {
    if (!t) return;
    const n = D[e.transitionFormulaIndex % D.length];
    ((t.textContent = n), (e.transitionFormulaIndex += 1));
  }
  function I(t, e) {
    const n = t ? t.querySelector("[data-transition-formula]") : null;
    n &&
      (window.clearInterval(e.transitionFormulaTimer),
      G(n, e),
      (e.transitionFormulaTimer = window.setInterval(() => {
        G(n, e);
      }, 180)));
  }
  function O(t) {
    (window.clearInterval(t.transitionFormulaTimer),
      (t.transitionFormulaTimer = null));
  }
  function $t(t, e) {
    const n = t.transitionStartedAt || 0,
      o = performance.now() - n,
      i = Math.max(0, Ot - o);
    window.setTimeout(e, i);
  }
  function q() {
    if (!M()) return;
    const t = zt();
    t.length &&
      (t.forEach((e) => {
        (e.classList.remove("page-enter", "page-enter-in"),
          e.style.setProperty("--page-enter-delay", "0ms"),
          e.classList.add("page-enter"));
      }),
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t.forEach((e) => e.classList.add("page-enter-in"));
        });
      }));
  }
  function Rt() {
    document.body.classList.remove("is-page-leaving", "is-page-entering");
    const t = document.querySelector(".page-transition");
    t &&
      (O(window.__echoState),
      t && t.classList.remove("is-active", "is-entering", "is-settled"));
  }
  function Bt(t) {
    if ((document.body.classList.add("is-page-leaving"), !M())) return;
    t.transitionStartedAt = performance.now();
    const e = A();
    (I(e, t),
      e.classList.remove("is-entering", "is-settled"),
      requestAnimationFrame(() => e.classList.add("is-active")));
  }
  function Nt(t) {
    if (!M()) {
      document.body.classList.remove("is-page-leaving", "is-page-entering");
      return;
    }
    const e = A();
    (I(e, t),
      $t(t, () => {
        (e.classList.add("is-active", "is-entering"),
          document.body.classList.remove("is-page-leaving"),
          document.body.classList.add("is-page-entering"),
          q(),
          requestAnimationFrame(() => e.classList.add("is-settled")),
          window.setTimeout(() => {
            (O(t),
              e.classList.remove("is-active", "is-entering", "is-settled"),
              document.body.classList.remove("is-page-entering"));
          }, 240));
      }));
  }
  function jt(t) {
    if (!M()) return;
    let e = null;
    try {
      e = JSON.parse(sessionStorage.getItem(J) || "null");
    } catch {
      e = null;
    }
    if (
      (sessionStorage.removeItem(J), !e || !e.href || Date.now() - e.at > 5e3)
    )
      return;
    const n = A();
    (I(n, t),
      n.classList.add("is-active", "is-entering"),
      document.body.classList.add("is-page-entering"),
      q(),
      requestAnimationFrame(() => n.classList.add("is-settled")),
      window.setTimeout(() => {
        (O(t),
          n.classList.remove("is-active", "is-entering", "is-settled"),
          document.body.classList.remove("is-page-entering"));
      }, 240));
  }
  function Ht() {
    return (
      typeof window.fetch == "function" &&
      typeof window.DOMParser == "function" &&
      !!(window.history && window.history.pushState)
    );
  }
  function Wt(t) {
    ((document.title = t.title || document.title),
      (document.documentElement.lang =
        t.documentElement.lang || document.documentElement.lang));
    const e = t.querySelector('meta[name="description"]');
    let n = document.querySelector('meta[name="description"]');
    e &&
      (n ||
        ((n = document.createElement("meta")),
        (n.name = "description"),
        document.head.appendChild(n)),
      n.setAttribute("content", e.getAttribute("content") || ""));
    const o = t.querySelector('link[rel="icon"]'),
      i = document.querySelector('link[rel="icon"]');
    (o && i && i.setAttribute("href", o.getAttribute("href") || ""),
      o && !i && document.head.appendChild(o.cloneNode(!0)),
      !o && i && i.remove());
  }
  function E(t, e) {
    const n = e.querySelector(t),
      o = document.querySelector(t);
    (n && o && o.replaceWith(n),
      n && !o && document.body.appendChild(n),
      !n && o && o.remove());
  }
  function ee() {
    const t =
      window.__echoLoadedScriptSrc || (window.__echoLoadedScriptSrc = {});
    document
      .querySelectorAll("footer script[src],[data-pjax-root] script[src]")
      .forEach((e) => {
        const n = e.getAttribute("src");
        n && (t[n] = !0);
      });
  }
  function ne() {
    const t =
      window.__echoLoadedScriptSrc || (window.__echoLoadedScriptSrc = {});
    document
      .querySelectorAll("footer script,[data-pjax-root] script")
      .forEach((e) => {
        const n = e.getAttribute("src");
        if (n && t[n]) {
          e.remove();
          return;
        }
        const o = document.createElement("script");
        (Array.from(e.attributes).forEach((i) =>
          o.setAttribute(i.name, i.value),
        ),
          (o.textContent = e.textContent || ""),
          n && (t[n] = !0),
          e.replaceWith(o));
      });
  }
  function Vt(t) {
    (Wt(t),
      E("header#topbar", t),
      E("[data-pjax-root]", t),
      E("footer", t),
      E("#mathBg", t),
      ne());
  }
  function Ut(t, e) {
    if (t.hash) {
      const n = decodeURIComponent(t.hash.slice(1)),
        o = document.getElementById(n) || document.querySelector(t.hash);
      if (o) {
        o.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    if (e && Number.isFinite(e.scrollY)) {
      window.scrollTo(e.scrollX || 0, e.scrollY || 0);
      return;
    }
    window.scrollTo(0, 0);
  }
  function Xt() {
    const t =
      history.state && typeof history.state == "object" ? history.state : {};
    history.replaceState(
      {
        ...t,
        url: location.href,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      },
      "",
      location.href,
    );
  }
  async function P(t, e = {}) {
    const n = window.__echoState,
      o = new URL(t, location.href);
    if (!Ht() || o.origin !== location.origin) {
      location.href = o.href;
      return;
    }
    n.currentVisit && n.currentVisit.abort();
    const i = new AbortController(),
      r = ++n.visitToken;
    ((n.currentVisit = i),
      (n.pjaxTransitioning = !0),
      e.push !== !1 && Xt(),
      Bt(n));
    try {
      const a = await fetch(o.href, {
        signal: i.signal,
        credentials: "same-origin",
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (!a.ok) throw new Error(`HTTP ${a.status}`);
      const c = await a.text();
      if (r !== n.visitToken) return;
      const l = new DOMParser().parseFromString(c, "text/html");
      if (!l.querySelector("[data-pjax-root]"))
        throw new Error("Missing PJAX root in response");
      (Vt(l),
        (n.renderedUrl = o.href),
        e.push !== !1 &&
          history.pushState(
            { url: o.href, scrollX: 0, scrollY: 0 },
            "",
            o.href,
          ),
        z(),
        requestAnimationFrame(() => {
          (Ut(o, e.savedState || null), Nt(n), (n.pjaxTransitioning = !1));
        }));
    } catch {
      n.pjaxTransitioning = !1;
      if (!i.signal.aborted) {
        try {
          sessionStorage.setItem(
            "echo-page-transition",
            JSON.stringify({ at: Date.now(), href: o.href }),
          );
        } catch {}
        location.href = o.href;
      }
    } finally {
      n.currentVisit === i && (n.currentVisit = null);
    }
  }
  function Dt(t, e) {
    var n;
    const o = t.getAttribute("target"),
      i = o != null && o !== "" && o.toLowerCase() !== "_self";
    return !(
      !t ||
      i ||
      t.hasAttribute("download") ||
      t.getAttribute("rel") === "noopener noreferrer" ||
      t.protocol !== location.protocol ||
      t.host !== location.host ||
      ((n = t.getAttribute("href")) != null && n.startsWith("#"))
    );
  }
  function Z(t) {
    const e = t.target.closest("a[href]");
    if (e)
      try {
        const n = new URL(e.getAttribute("href"), location.href);
        if (!Dt(e, n)) return;
        (t.preventDefault(), P(n.href, { push: !0 }));
      } catch {}
  }
  function Yt() {
    (document.removeEventListener("click", Z),
      document.addEventListener("click", Z),
      window.removeEventListener("popstate", tt),
      window.addEventListener("popstate", tt));
  }
  function tt(t) {
    !t.state ||
      !t.state.url ||
      P(t.state.url, { push: !1, savedState: t.state });
  }
  function readFxPreference() {
    if (new URLSearchParams(location.search).has("fast")) return !1;
    try {
      const t = sessionStorage.getItem("echo-fx-on");
      if (t !== null) return t === "true";
    } catch {}
    return !0;
  }
  function writeFxPreference(t) {
    try {
      sessionStorage.setItem("echo-fx-on", String(t));
    } catch {}
  }
  function bindMotionPreference() {
    if (!K || motionPreferenceBound) return;
    const t = () => {
      const e = window.__echoState;
      e && _(e);
    };
    typeof K.addEventListener === "function"
      ? K.addEventListener("change", t)
      : typeof K.addListener === "function" && K.addListener(t);
    motionPreferenceBound = true;
  }
  const et = {
    fxOn: readFxPreference(),
    heroH1: null,
    revealObserver: null,
    activeObserver: null,
    tocObserver: null,
    currentVisit: null,
    visitToken: 0,
    renderedUrl: location.href,
    transitionFormulaTimer: null,
    transitionFormulaIndex: 0,
    transitionStartedAt: 0,
    pjaxTransitioning: !1,
    coverRefreshRate: null,
  };
  window.__echoState = et;
  let nt = !1;
  function ot() {
    const t = document.getElementById("topbar");
    t && t.classList.toggle("scrolled", window.scrollY > 20);
  }
  function Qt() {
    document.querySelectorAll("[data-current-year]").forEach((t) => {
      t.textContent = String(new Date().getFullYear());
    });
  }
  function Jt() {
    document
      .querySelectorAll(".post-cover .coords[data-views]")
      .forEach((t) => {
        const e = Number.parseInt(t.dataset.views || "0", 10),
          n = Number.isFinite(e) && e > 0 ? e : 0;
        t.textContent = `views · 0x${n.toString(16).padStart(3, "0")}`;
      });
  }
  function it(t, e) {
    e[t] && (e[t].disconnect(), (e[t] = null));
  }
  function Kt(t) {
    it("revealObserver", t);
    const e = document.querySelectorAll(".post.reveal");
    if (!t.fxOn || qt() || !("IntersectionObserver" in window)) {
      e.forEach((n) => n.classList.add("in"));
      return;
    }
    ((t.revealObserver = new IntersectionObserver(
      (n) => {
        n.forEach((o) => {
          if (!o.isIntersecting) return;
          const i = o.target.parentNode,
            a = (
              i
                ? Array.from(i.children).filter(
                    (c) => c.classList && c.classList.contains("reveal"),
                  )
                : []
            ).indexOf(o.target);
          (setTimeout(() => o.target.classList.add("in"), Math.max(a, 0) * 50),
            t.revealObserver && t.revealObserver.unobserve(o.target));
        });
      },
      { threshold: 0.12 },
    )),
      e.forEach((n) => t.revealObserver.observe(n)));
  }
  function Gt(t) {
    it("activeObserver", t);
    const e = document.querySelectorAll(".post");
    !("IntersectionObserver" in window) ||
      !e.length ||
      ((t.activeObserver = new IntersectionObserver(
        (n) => {
          n.forEach((o) => {
            o.target.classList.toggle("active", o.isIntersecting);
          });
        },
        { threshold: [0.4, 0.6] },
      )),
      e.forEach((n) => t.activeObserver.observe(n)));
  }
  function Zt(t) {
    t.heroH1 = document.querySelector(".hero h1");
  }
  function te(t) {
    const e = document.getElementById("bgToggle");
    !e ||
      e.dataset.bound === "true" ||
      ((e.dataset.bound = "true"),
      e.addEventListener("click", (n) => {
        (n.preventDefault(),
          (t.fxOn = !t.fxOn),
          writeFxPreference(t.fxOn),
          _(t));
      }));
  }
  function re() {
    document.querySelectorAll("[data-search-trigger]").forEach((t) => {
      t.dataset.bound !== "true" &&
        ((t.dataset.bound = "true"),
        t.addEventListener("click", (e) => {
          (e.preventDefault(),
            window.EchoPluginWidgets &&
            typeof window.EchoPluginWidgets.openSearchWidget == "function"
              ? window.EchoPluginWidgets.openSearchWidget()
              : window.SearchWidget &&
                typeof window.SearchWidget.open == "function" &&
                window.SearchWidget.open());
        }));
    });
  }
  const linkProbeAttempts = 2,
    linkProbeWarnMs = 1800,
    linkProbeTimeoutMs = 5000,
    linkProbeConcurrency = 4;
  let linkProbeRun = 0;
  function setLinkStatus(t, e, n) {
    const o = t.querySelector("[data-link-status]"),
      i = o && o.querySelector("[data-link-status-label]");
    if (!o || !i) return;
    (o.classList.remove("checking", "online", "warn", "idle"),
      o.classList.add(e),
      (i.textContent = e),
      (o.title = n),
      o.setAttribute("aria-label", n));
  }
  function waitForLinkProbe(t) {
    return new Promise((e) => window.setTimeout(e, t));
  }
  async function probeLink(t) {
    const e = new AbortController(),
      n = window.setTimeout(() => e.abort(), linkProbeTimeoutMs),
      o = performance.now();
    try {
      return (
        await fetch(t, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store",
          credentials: "omit",
          redirect: "follow",
          referrerPolicy: "no-referrer",
          signal: e.signal,
        }),
        { ok: !0, duration: performance.now() - o }
      );
    } catch {
      return { ok: !1, duration: performance.now() - o };
    } finally {
      (window.clearTimeout(n), e.abort());
    }
  }
  async function checkLinkHealth(t, e) {
    let n;
    try {
      n = new URL(t.href, location.href);
    } catch {
      setLinkStatus(t, "idle", "idle · invalid URL");
      return;
    }
    if (n.protocol !== "http:" && n.protocol !== "https:") {
      setLinkStatus(t, "idle", "idle · unsupported protocol");
      return;
    }
    if (location.protocol === "https:" && n.protocol === "http:") {
      setLinkStatus(t, "warn", "warn · browser blocked insecure probe");
      return;
    }
    const o = [];
    for (let i = 0; i < linkProbeAttempts; i += 1) {
      if (e !== linkProbeRun || !t.isConnected) return;
      (o.push(await probeLink(n.href)),
        i + 1 < linkProbeAttempts && (await waitForLinkProbe(180)));
    }
    if (e !== linkProbeRun || !t.isConnected) return;
    const i = o.filter((r) => r.ok),
      a = i.length ? Math.round(Math.max(...i.map((r) => r.duration))) : 0;
    if (!i.length) {
      setLinkStatus(t, "idle", "idle · no response");
      return;
    }
    if (i.length < linkProbeAttempts || a >= linkProbeWarnMs) {
      setLinkStatus(
        t,
        "warn",
        i.length < linkProbeAttempts
          ? `warn · intermittent · ${i.length}/${linkProbeAttempts} replies`
          : `warn · slow · ${a}ms`,
      );
      return;
    }
    setLinkStatus(t, "online", `online · ${a}ms`);
  }
  function initLinkHealthChecks() {
    const t = Array.from(document.querySelectorAll(".linksindex-row[href]")),
      e = ++linkProbeRun;
    if (!t.length) return;
    const n = t.slice(),
      o = async () => {
        while (n.length && e === linkProbeRun) {
          const i = n.shift();
          i &&
            (setLinkStatus(i, "checking", "checking · probing target"),
            await checkLinkHealth(i, e));
        }
      };
    for (let i = 0; i < Math.min(linkProbeConcurrency, t.length); i += 1) o();
  }
  function initErrorRoute() {
    document.body.classList.toggle(
      "error-page-body",
      !!document.querySelector(".error-page-shell"),
    );
    let t = window.location.pathname || "/";
    try {
      t = decodeURI(t);
    } catch {}
    document.querySelectorAll("[data-error-path]").forEach((e) => {
      e.textContent = t;
    });
    const e = document.querySelector("[data-error-back]");
    !e ||
      e.dataset.bound === "true" ||
      ((e.dataset.bound = "true"),
      e.addEventListener("click", (n) => {
        if (window.history.length <= 1) return;
        (n.preventDefault(), n.stopPropagation(), window.history.back());
      }));
  }
  function z() {
    const t = window.__echoState;
    ((t.fxOn = readFxPreference()),
      t.pjaxTransitioning || Rt(),
      Qt(),
      Jt(),
      ot(),
      st(),
      nt || (window.addEventListener("scroll", ot), (nt = !0)),
      ee(),
      Et(),
      initCoverImageLoading(),
      Kt(t),
      Zt(t),
      ct(t),
      te(t),
      re(),
      initLinkHealthChecks(),
      initErrorRoute(),
      document.dispatchEvent(new CustomEvent("echo:page-ready")),
      _t(t),
      It(),
      _(t),
      q(),
      jt(t));
  }
  return (
    (function () {
      ((window.__echoState = { ...et }),
        bindSystemColorScheme(),
        bindMotionPreference(),
        at(),
        ee(),
        Yt(),
        z());
    })(),
    (k.initPage = z),
    (k.navigateWithPjax = P),
    Object.defineProperty(k, Symbol.toStringTag, { value: "Module" }),
    k
  );
})({});
