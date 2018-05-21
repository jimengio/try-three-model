## 3D model viewer

Demo http://repo.mvc-works.org/3d-model-viewer/

### Plan

*   [ ] 加载 GLTF
*   [ ] Drag to rotate with quaternion.
*   [ ] Re-render on resize.
*   [ ] Zoom in/out on scroll event.

### Usage

Use in React:

```jsx
let gltfDemo = "http://localhost:8080/data/aircraft.gltf";

<ModelViewer url={gltfDemo} size={{ width: 1600, height: 800 }} positionShift={{ x: 0, y: -2, z: 0 }} />;
```

Default Props:

```ts
url: string;

size?: {
	width: number;
	height: number;
};
maxCamaraZ?: number; // defaults to 100
minCamaraZ?: number; // defaults to 10
positionShift?: { x: number; y: number; z: number };
```

> Notice: Model is initialized on mounting. If you want replace `url`, you need to replace whole component with `key` property.

### Develop

```bash
yarn
yarn dev
```

Server runs on http://localhost:8080/

### Resources

*   Use GLFTF in Webpack https://gist.github.com/cecilemuller/0be98dcbb0c7efff64762919ca486a59
*   GLTF of a plane https://github.com/mrdoob/three.js/issues/11990
*   GLTF Loader https://threejs.org/docs/#examples/loaders/GLTFLoader
*   Quaternion Rotation https://jsfiddle.net/MadLittleMods/n6u6asza/
