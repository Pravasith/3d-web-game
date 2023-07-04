import "./style.css"

// const material = new THREE.ShaderMaterial({
//     vertexShader: `
//         varying vec2 vUv;
//
//         void main()
//         {
//            
//             gl_Position =  projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         varying vec2 vUv;
//
//         void main()
//         {
//             vec2 st = vUv;
//
//             vec3 color = vec3(
//                 st.x, st.y, 0.0 
//             );
//
//             gl_FragColor = vec4(color, 1.0);
//         }
//     `
// })


