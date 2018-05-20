import React from "react";
import ModelViewer from "./model-viewer";

let gltfDemo = "http://localhost:8080/data/aircraft.gltf";

interface IProps {}

interface IState {}

export default class Container extends React.Component<IProps, IState> {
	render() {
		return (
			<div style={{ height: 800 }}>
				Demo
				<ModelViewer url={gltfDemo} positionShift={{ x: 0, y: -2, z: 0 }} />
			</div>
		);
	}
}
