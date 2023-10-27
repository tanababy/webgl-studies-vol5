varying vec2 vUv;
varying vec3 vWorldPosition;
uniform vec4 u_HitPointColorA;
uniform vec4 u_HitPointColorB;
uniform vec3 u_HitPosition;
uniform sampler2D t_Noise;
uniform float u_Time;
uniform float u_Size;
uniform float u_Thickness;


void main() {

  vec4 noise = texture2D(t_Noise, vUv * 3. + u_Time * vec2(0.1, 0.5));

  float circle = distance(u_HitPosition, vWorldPosition);
  float size = u_Size;
  float thickness = u_Thickness;//こいつをアニメーションさせると波紋っぽいのつくれる
  circle = smoothstep(size, size + thickness, circle);
  circle = 1.0 - circle;

  float circle2 = distance(u_HitPosition, vWorldPosition);
  circle2 = smoothstep(size - thickness, size, circle2);

  float newCircle = circle * circle2;

  vec4 color = mix(u_HitPointColorA, u_HitPointColorB, newCircle * smoothstep(0.3, 0.6, noise.r));
  gl_FragColor = color;
}
