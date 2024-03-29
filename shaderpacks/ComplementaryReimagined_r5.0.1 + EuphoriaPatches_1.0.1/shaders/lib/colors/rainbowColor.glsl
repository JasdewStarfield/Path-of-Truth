// Inspired by Inigo Quilez
// https://iquilezles.org/articles/palettes/
vec3 getRainbowColor(in vec2 coord, in float speed) {
    const vec3 rainbowColor = vec3(0.0, pi * 0.67, pi * 1.33);

    float t = frameTimeCounter * speed;
    t += sin(t) * (coord.x) + cos(t) * coord.y;

    return vec3(0.5) + vec3(0.5) * sin(rainbowColor + t);
}