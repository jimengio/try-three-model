import React from "react";
import { css, cx } from "emotion";

import * as Three from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let glrfLoader = new GLTFLoader();

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

interface IProps {
  url: string;

  size?: {
    width: number;
    height: number;
  };
  maxCamaraZ?: number; // defaults to 100
  minCamaraZ?: number; // defaults to 10
  positionShift?: { x: number; y: number; z: number };
}

interface IState {}

export default class ModelViewer extends React.Component<IProps, IState> {
  containerElement: Element;
  object: Three.Object3D;
  camera: any;
  renderer: Three.Renderer;

  isDragging: boolean;
  previousPosition: {
    x: number;
    y: number;
  };

  rerenderScene: () => void;

  constructor(props) {
    super(props);

    this.previousPosition = {
      x: 0,
      y: 0,
    };
  }

  render() {
    return (
      <div
        className={styleContainer}
        style={{ width: "100%", height: "100%" }}
        ref={(el) => {
          this.containerElement = el;
        }}
        onWheel={this.onWheel}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      />
    );
  }

  componentDidMount() {
    this.draw();

    if (this.props.size == null) {
      window.addEventListener("resize", this.onContainerResize, false);
    }
  }

  componentWillUnmount() {
    if (this.props.size == null) {
      window.removeEventListener("resize", this.onContainerResize, false);
    }
  }

  onContainerResize = () => {
    let { width, height } = this.getSize();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    this.rerenderScene();
  };

  getSize() {
    if (this.props.size != null) {
      return {
        width: this.props.size.width,
        height: this.props.size.height,
      };
    } else {
      let rect = this.containerElement.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
  }

  draw() {
    let scene = new Three.Scene();
    let renderer = new Three.WebGLRenderer({ antialias: true });
    this.renderer = renderer;

    let { width, height } = this.getSize();

    renderer.setSize(width, height);
    this.containerElement.appendChild(renderer.domElement);

    let camera = new Three.PerspectiveCamera(45, width / height, 0.1, 20000);
    this.camera = camera;
    camera.position.set(0, 0, 40);
    scene.add(camera);

    renderer.setClearColor(0x444444, 1);
    var light = new Three.AmbientLight(0xeeeeee);
    light.position.set(-20, 10, 10);
    scene.add(light);

    // let geometry = new Three.BoxGeometry(0.4, 0.4, 0.4);
    // let material = new Three.MeshLambertMaterial({ color: 0x00ff00 });
    // let cube = new Three.Mesh(geometry, material);
    // scene.add(cube);

    renderer.render(scene, camera);

    glrfLoader.load(this.props.url, (gltf) => {
      this.object = new Three.Object3D();

      if (this.props.positionShift != null) {
        gltf.scene.position.x += this.props.positionShift.x;
        gltf.scene.position.y += this.props.positionShift.y;
        gltf.scene.position.z += this.props.positionShift.z;
      }

      this.object.add(gltf.scene);

      scene.add(this.object);

      renderer.render(scene, camera);
    });

    this.rerenderScene = () => {
      renderer.render(scene, camera);
    };
  }

  onWheel = (event) => {
    let move = event.deltaY / 10;
    if (move > 0) {
      if (this.camera.position.z > (this.props.minCamaraZ || 10)) {
        this.camera.position.z -= Math.abs(move);
        this.rerenderScene();
      }
    } else {
      if (this.camera.position.z < (this.props.maxCamaraZ || 100)) {
        this.camera.position.z += Math.abs(move);
        this.rerenderScene();
      }
    }
    event.preventDefault();
  };

  onMouseDown = (event) => {
    this.isDragging = true;
  };

  onMouseUp = () => {
    this.isDragging = false;
  };

  onMouseMove = (event) => {
    let deltaMove: { x: number; y: number } = {
      x: event.clientX - this.previousPosition.x,
      y: event.clientY - this.previousPosition.y,
    };

    if (this.isDragging) {
      var deltaRotationQuaternion = new Three.Quaternion().setFromEuler(new Three.Euler(toRadians(deltaMove.y * 0.5), toRadians(deltaMove.x * 0.5), 0, "XYZ"));

      if (this.object != null) {
        this.object.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.object.quaternion);
        this.rerenderScene();
      }
    }
    this.previousPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  };
}

const styleContainer = css`
  border: 1px solid #ddd;
`;
