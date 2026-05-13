"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_res;
uniform vec2  u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8660, 0.5, -0.5, 0.8660);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = rot * p * 2.1 + vec2(17.3, 4.7);
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  // mouse: pull fluid toward cursor
  vec2 m = u_mouse / u_res;
  m.y = 1.0 - m.y;
  vec2 toMouse = m - uv;
  float md = length(toMouse);
  vec2 mouseWarp = toMouse * smoothstep(0.35, 0.0, md) * 0.5;

  float t = u_time * 0.18;

  // domain warp – two layers
  vec2 q = vec2(
    fbm(uv + t),
    fbm(uv + vec2(5.2, 1.3) + t * 0.9)
  );
  vec2 r = vec2(
    fbm(uv + q + vec2(1.7, 9.2) + t * 0.7 + mouseWarp),
    fbm(uv + q + vec2(8.3, 2.8) + t * 0.6 + mouseWarp)
  );

  float f = fbm(uv + r);

  // colour ramp: deep dark → mid purple → bright violet
  vec3 dark   = vec3(0.071, 0.063, 0.122); // #12101F
  vec3 mid    = vec3(0.310, 0.180, 0.780); // strong purple
  vec3 bright = vec3(0.700, 0.580, 1.000); // bright violet

  vec3 col = dark;
  col = mix(col, mid,    smoothstep(0.1, 0.45, f));
  col = mix(col, bright, smoothstep(0.4, 0.70, f));
  col = mix(col, dark,   smoothstep(0.72, 1.0,  f));

  // blend back just enough to keep text readable
  vec3 bg = vec3(0.071, 0.063, 0.122);
  col = mix(bg, col, 0.92);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function FluidShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mouse = { x: 0, y: 0 };
    let raf: number;
    let start = performance.now();

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function draw() {
      const t = (performance.now() - start) / 1000;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    const onMove = (e: MouseEvent) => {
      const r = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto" }}
    />
  );
}
