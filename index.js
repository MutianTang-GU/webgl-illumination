import vertexShaderSrc from "./vertex.glsl";
import fragmentShaderSrc from "./fragment.glsl";
import { cube } from "./simpleObjectLibrary.js";
import { mat4 } from "gl-matrix";

class WebGLApp {
  constructor() {
    this.light_x = -20;
    this.light_y = 10;
    this.light_z = 0;
  }

  init() {
    const canvas = document.getElementById("glcanvas");
    /** @type {WebGLRenderingContext} */
    this.gl = canvas.getContext("webgl2");
    if (!this.gl) {
      window.alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      throw new Error("Unable to initialize WebGL");
    }
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);

    this.shaderProgram = this.initShaderProgram(
      this.gl,
      vertexShaderSrc.sourceCode,
      fragmentShaderSrc.sourceCode
    );

    this.initBuffers();
    this.initUniforms();
  }

  /**
   *
   * @param {WebGLRenderingContext} gl
   * @param {string} vsSource vertex shader source
   * @param {string} fsSource fragment shader source
   * @returns {WebGLProgram} shader program
   */
  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      window.alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(vertexShader)
      );
      gl.deleteShader(vertexShader);
      throw new Error("An error occurred compiling the shaders");
    }
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      window.alert(
        "An error occurred compiling the shaders: " +
          gl.getShaderInfoLog(fragmentShader)
      );
      gl.deleteShader(fragmentShader);
      throw new Error("An error occurred compiling the shaders");
    }
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      window.alert(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(program)
      );
      throw new Error("Unable to initialize the shader program");
    }
    gl.useProgram(program);
    return program;
  }

  initBuffers() {
    const gl = this.gl;
    const {
      vertexPositions: positions,
      vertexNormals: normals,
      indices: indices,
    } = cube();

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(
      this.shaderProgram,
      "vertPosition"
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    {
      const size = 3;
      const type = gl.FLOAT;
      const normalized = false;
      const stride = 0;
      const offset = 0;
      gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalized,
        stride,
        offset
      );
    }

    const normalAttributeLocation = gl.getAttribLocation(
      this.shaderProgram,
      "vertNormal"
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    {
      const size = 3;
      const type = gl.FLOAT;
      const normalized = false;
      const stride = 0;
      const offset = 0;
      gl.vertexAttribPointer(
        normalAttributeLocation,
        size,
        type,
        normalized,
        stride,
        offset
      );
    }

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(normalAttributeLocation);
  }

  initUniforms(uniforms) {
    const gl = this.gl;
    let projMatrix = mat4.create();
    {
      const fieldOfView = (45 * Math.PI) / 180;
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100.0;
      mat4.perspective(projMatrix, fieldOfView, aspect, zNear, zFar);
    }
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.shaderProgram, "projMatrix"),
      false,
      projMatrix
    );

    let modelToWorldMatrix = mat4.create();
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.shaderProgram, "modelToWorldMatrix"),
      false,
      modelToWorldMatrix
    );

    let viewMatrix = mat4.create();
    mat4.translate(viewMatrix, viewMatrix, [0, 0, -6]);
    mat4.rotateX(viewMatrix, viewMatrix, (30 / 180) * Math.PI);
    mat4.rotateY(viewMatrix, viewMatrix, (30 / 180) * Math.PI);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.shaderProgram, "viewMatrix"),
      false,
      viewMatrix
    );

    let ambientLightColor = [0.6, 0.6, 0.6];
    gl.uniform3fv(
      gl.getUniformLocation(this.shaderProgram, "ambientLightColor"),
      ambientLightColor
    );

    let materialColor = [0.8, 0.2, 0.1];
    gl.uniform3fv(
      gl.getUniformLocation(this.shaderProgram, "materialColor"),
      materialColor
    );

    let lightDirection = [this.light_x, this.light_y, this.light_z];
    gl.uniform3fv(
      gl.getUniformLocation(this.shaderProgram, "lightDirection"),
      lightDirection
    );

    let diffuseLightColor = [0.8, 0.8, 0.8];
    gl.uniform3fv(
      gl.getUniformLocation(this.shaderProgram, "diffuseLightColor"),
      diffuseLightColor
    );
  }

  updateLightDirection() {
    const gl = this.gl;
    let lightDirection = [this.light_x, this.light_y, this.light_z];
    gl.uniform3fv(
      gl.getUniformLocation(this.shaderProgram, "lightDirection"),
      lightDirection
    );
  }

  draw() {
    const gl = this.gl;
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    {
      const count = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, count, type, offset);
    }
  }
}

function main() {
  const app = new WebGLApp();
  app.init();
  app.draw();

  for (const controller of ["light_x", "light_y", "light_z"]) {
    document.getElementById(controller).addEventListener("input", e => {
      app[controller] = Number(e.target.value);
      app.updateLightDirection();
      app.draw();
    });
  }
}

if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
