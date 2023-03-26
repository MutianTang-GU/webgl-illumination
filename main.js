(()=>{"use strict";var r="undefined"!=typeof Float32Array?Float32Array:Array;function t(){var t=new r(16);return r!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var r=0,t=arguments.length;t--;)r+=arguments[t]*arguments[t];return Math.sqrt(r)});class e{constructor(){this.light_x=-20,this.light_y=10,this.light_z=0}init(){const r=document.getElementById("glcanvas");if(this.gl=r.getContext("webgl2"),!this.gl)throw window.alert("Unable to initialize WebGL. Your browser or machine may not support it."),new Error("Unable to initialize WebGL");this.gl.clearColor(1,1,1,1),this.shaderProgram=this.initShaderProgram(this.gl,"#version 300 es\nprecision highp float;in vec3 vertPosition;in vec3 vertNormal;uniform mat4 projMatrix;uniform mat4 modelToWorldMatrix;uniform mat4 viewMatrix;uniform vec3 ambientLightColor;uniform vec3 materialColor;uniform vec3 lightDirection;uniform vec3 diffuseLightColor;out vec4 passToFragColor;void main(){gl_Position=projMatrix*viewMatrix*modelToWorldMatrix*vec4(vertPosition,1.);vec3 A=ambientLightColor*materialColor;mat4 B=transpose(inverse(viewMatrix*modelToWorldMatrix));vec3 C=normalize(vec3(B*vec4(vertNormal,0.)));vec3 D=vec3(modelToWorldMatrix*vec4(vertPosition,1.));vec3 E=normalize(lightDirection-D);float F=max(0.,dot(C,E));passToFragColor=vec4(diffuseLightColor.xyz*materialColor*F+A,1.);}","#version 300 es\nprecision highp float;in vec4 passToFragColor;out vec4 outColor;void main(){outColor=passToFragColor;}"),this.initBuffers(),this.initUniforms()}initShaderProgram(r,t,e){const o=r.createShader(r.VERTEX_SHADER);if(r.shaderSource(o,t),r.compileShader(o),!r.getShaderParameter(o,r.COMPILE_STATUS))throw window.alert("An error occurred compiling the shaders: "+r.getShaderInfoLog(o)),r.deleteShader(o),new Error("An error occurred compiling the shaders");const i=r.createShader(r.FRAGMENT_SHADER);if(r.shaderSource(i,e),r.compileShader(i),!r.getShaderParameter(i,r.COMPILE_STATUS))throw window.alert("An error occurred compiling the shaders: "+r.getShaderInfoLog(i)),r.deleteShader(i),new Error("An error occurred compiling the shaders");const a=r.createProgram();if(r.attachShader(a,o),r.attachShader(a,i),r.linkProgram(a),!r.getProgramParameter(a,r.LINK_STATUS))throw window.alert("Unable to initialize the shader program: "+r.getProgramInfoLog(a)),new Error("Unable to initialize the shader program");return r.useProgram(a),a}initBuffers(){const r=this.gl,{vertexPositions:t,vertexNormals:e,indices:o}=function(r){var t=.5,e=[],o=[],i=[],a=[];function n(r,t){var n,s=e.length/3;for(n=0;n<12;n++)e.push(r[n]);for(n=0;n<4;n++)o.push(t[0],t[1],t[2]);i.push(0,0,1,0,1,1,0,1),a.push(s,s+1,s+2,s,s+2,s+3)}return n([-t,-t,t,t,-t,t,t,t,t,-t,t,t],[0,0,1]),n([-t,-t,-t,-t,t,-t,t,t,-t,t,-t,-t],[0,0,-1]),n([-t,t,-t,-t,t,t,t,t,t,t,t,-t],[0,1,0]),n([-t,-t,-t,t,-t,-t,t,-t,t,-t,-t,t],[0,-1,0]),n([t,-t,-t,t,t,-t,t,t,t,t,-t,t],[1,0,0]),n([-t,-t,-t,-t,-t,t,-t,t,t,-t,t,-t],[-1,0,0]),{vertexPositions:new Float32Array(e),vertexNormals:new Float32Array(o),vertexTextureCoords:new Float32Array(i),indices:new Uint16Array(a)}}(),i=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,i),r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW);const a=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,a),r.bufferData(r.ARRAY_BUFFER,e,r.STATIC_DRAW);const n=r.createBuffer();r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n),r.bufferData(r.ELEMENT_ARRAY_BUFFER,o,r.STATIC_DRAW);const s=r.getAttribLocation(this.shaderProgram,"vertPosition");r.bindBuffer(r.ARRAY_BUFFER,i);{const t=3,e=r.FLOAT,o=!1,i=0,a=0;r.vertexAttribPointer(s,t,e,o,i,a)}const h=r.getAttribLocation(this.shaderProgram,"vertNormal");r.bindBuffer(r.ARRAY_BUFFER,a);{const t=3,e=r.FLOAT,o=!1,i=0,a=0;r.vertexAttribPointer(h,t,e,o,i,a)}r.enableVertexAttribArray(s),r.enableVertexAttribArray(h)}initUniforms(r){const e=this.gl;let o=t();!function(r,t,e,o,i){var a,n=1/Math.tan(t/2);r[0]=n/e,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=n,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=-1,r[12]=0,r[13]=0,r[15]=0,null!=i&&i!==1/0?(a=1/(o-i),r[10]=(i+o)*a,r[14]=2*i*o*a):(r[10]=-1,r[14]=-2*o)}(o,45*Math.PI/180,e.canvas.clientWidth/e.canvas.clientHeight,.1,100);e.uniformMatrix4fv(e.getUniformLocation(this.shaderProgram,"projMatrix"),!1,o);let i=t();e.uniformMatrix4fv(e.getUniformLocation(this.shaderProgram,"modelToWorldMatrix"),!1,i);let a=t();var n,s,h,l,c,d,g,m,f,u,v,A,E,P,L,_,F,R;_=(h=[0,0,-6])[0],F=h[1],R=h[2],(s=a)===(n=a)?(n[12]=s[0]*_+s[4]*F+s[8]*R+s[12],n[13]=s[1]*_+s[5]*F+s[9]*R+s[13],n[14]=s[2]*_+s[6]*F+s[10]*R+s[14],n[15]=s[3]*_+s[7]*F+s[11]*R+s[15]):(l=s[0],c=s[1],d=s[2],g=s[3],m=s[4],f=s[5],u=s[6],v=s[7],A=s[8],E=s[9],P=s[10],L=s[11],n[0]=l,n[1]=c,n[2]=d,n[3]=g,n[4]=m,n[5]=f,n[6]=u,n[7]=v,n[8]=A,n[9]=E,n[10]=P,n[11]=L,n[12]=l*_+m*F+A*R+s[12],n[13]=c*_+f*F+E*R+s[13],n[14]=d*_+u*F+P*R+s[14],n[15]=g*_+v*F+L*R+s[15]),function(r,t,e){var o=Math.sin(e),i=Math.cos(e),a=t[4],n=t[5],s=t[6],h=t[7],l=t[8],c=t[9],d=t[10],g=t[11];t!==r&&(r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15]),r[4]=a*i+l*o,r[5]=n*i+c*o,r[6]=s*i+d*o,r[7]=h*i+g*o,r[8]=l*i-a*o,r[9]=c*i-n*o,r[10]=d*i-s*o,r[11]=g*i-h*o}(a,a,30/180*Math.PI),function(r,t,e){var o=Math.sin(e),i=Math.cos(e),a=t[0],n=t[1],s=t[2],h=t[3],l=t[8],c=t[9],d=t[10],g=t[11];t!==r&&(r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15]),r[0]=a*i-l*o,r[1]=n*i-c*o,r[2]=s*i-d*o,r[3]=h*i-g*o,r[8]=a*o+l*i,r[9]=n*o+c*i,r[10]=s*o+d*i,r[11]=h*o+g*i}(a,a,30/180*Math.PI),e.uniformMatrix4fv(e.getUniformLocation(this.shaderProgram,"viewMatrix"),!1,a),e.uniform3fv(e.getUniformLocation(this.shaderProgram,"ambientLightColor"),[.6,.6,.6]),e.uniform3fv(e.getUniformLocation(this.shaderProgram,"materialColor"),[.8,.2,.1]);let T=[this.light_x,this.light_y,this.light_z];e.uniform3fv(e.getUniformLocation(this.shaderProgram,"lightDirection"),T),e.uniform3fv(e.getUniformLocation(this.shaderProgram,"diffuseLightColor"),[.8,.8,.8])}updateLightDirection(){const r=this.gl;let t=[this.light_x,this.light_y,this.light_z];r.uniform3fv(r.getUniformLocation(this.shaderProgram,"lightDirection"),t)}draw(){const r=this.gl;r.clearDepth(1),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT);{const t=36,e=r.UNSIGNED_SHORT,o=0;r.drawElements(r.TRIANGLES,t,e,o)}}}function o(){const r=new e;r.init(),r.draw();for(const t of["light_x","light_y","light_z"])document.getElementById(t).addEventListener("input",(e=>{r[t]=Number(e.target.value),r.updateLightDirection(),r.draw()}))}"loading"!==document.readyState?o():document.addEventListener("DOMContentLoaded",o)})();