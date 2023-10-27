varying vec2 vUv;
uniform vec4 u_HitPointColorA;
uniform vec4 u_HitPointColorB;


void main() {
  vec2 uv = fract(vUv * 50.);
  float color = step(uv.x, 0.02) + step(uv.y, 0.02);
  color *= 0.15;
  gl_FragColor = vec4(vec3(color), 1.);
}
