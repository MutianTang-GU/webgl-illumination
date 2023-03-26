#version 300 es
precision highp float;

in vec4 passToFragColor;
out vec4 outColor;

void main() {
    outColor = passToFragColor;
}
