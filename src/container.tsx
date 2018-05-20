import React from "react";
import ModelViewer from "./model-viewer";

let gltfDemo = "http://localhost:8080/data/aircraft.gltf";

interface IProps {}

interface IState {}

export default class Container extends React.Component<IProps, IState> {
	render() {
		return (
			<div>
				Demo
				<ModelViewer url={gltfDemo} width={1600} height={800} positionShift={{ x: 0, y: -2, z: 0 }} />
			</div>
		);
	}
}
