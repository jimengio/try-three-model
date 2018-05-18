import React from "react";
import ModelViewer from "./model-viewer";

interface IProps {}

interface IState {}

export default class Container extends React.Component<IProps, IState> {
	render() {
		return (
			<div>
				<ModelViewer />
				Container
			</div>
		);
	}
}
