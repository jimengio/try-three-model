import React from "react";
import { css, cx } from "emotion";

import * as Three from "three";

const width = 1200;
const height = 600;

interface IProps {}

interface IState {}

export default class ModelViewer extends React.Component<IProps, IState> {
	containerElement: Element;

	render() {
		return (
			<div
				className={styleContainer}
				ref={el => {
					this.containerElement = el;
				}}
			/>
		);
	}

	componentDidMount() {
		this.draw();
	}

	draw() {
		let scene = new Three.Scene();
		let renderer = new Three.WebGLRenderer({ antialias: true });
		renderer.setSize(width, height);
		this.containerElement.appendChild(renderer.domElement);

		let camera = new Three.PerspectiveCamera(45, width / height, 0.1, 20000);
		camera.position.set(0, 2, 40);
		scene.add(camera);

		renderer.setClearColor(0x000000, 1);
		let light = new Three.PointLight(0xffffff);
		light.position.set(-20, 10, 10);
		scene.add(light);

		let geometry = new Three.BoxGeometry(10, 10, 10);
		let material = new Three.MeshLambertMaterial({ color: 0x00ff00 });
		let cube = new Three.Mesh(geometry, material);

		cube.rotation.x = 0.3;
		cube.rotation.y = 0.7;
		scene.add(cube);

		renderer.render(scene, camera);
	}
}

const styleContainer = css`
	width: ${width}px;
	height: ${height}px;
	border: 1px solid #ddd;
`;
