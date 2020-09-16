const fragmentShader = /* glsl */ `
// A simple, if a little square, water caustic effect.
// David Hoskins.
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// Inspired by akohdr's "Fluid Fields"
// https://www.shadertoy.com/view/XsVSDm
// Tuned by LuisArmando-TestCoder
#define F length(0.5 - fract(gl_FragColor.xyw *= mat3(-2, -1, 2, 3, -2, 1, 1, 2, 2)*

void main() {
    float size = 5e2;
    float ripplingVelocity = 0.9;
    float shrinkingScale = 10.0;
    float slopedScale = 3.0;
    gl_FragColor.xy = gl_FragCoord * (sin(gl_FragColor=iDate * ripplingVelocity).w / shrinkingScale + slopedScale) / size;
    gl_FragColor = pow(min(min(F.5)), F.4))), F.3))), 7.0) * 25.0 + vec4(0, 0.35, 0.5, 1);
}
`;

console.log(fragmentShader);
