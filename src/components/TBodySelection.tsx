import React, {MouseEventHandler} from "react";
import ReactDOM from "react-dom";

interface ITBodySelectionProps {
}

interface ITBodySelectionState {
	mouseDown: boolean;
	mousePos: null | {
		x: number;
		y: number;
	}
}

export class TBodySelection extends React.Component<ITBodySelectionProps, ITBodySelectionState> {

	state = {
		mouseDown: false,
		mousePos: null,
	};

	cellRefs: any[] = [];

	appendRef(ref: any) {
		this.cellRefs.push(ref);
	}

	render() {
		return (
			<tbody
				onMouseDown={this._onMouseDown.bind(this) as unknown as MouseEventHandler}
				onMouseMove={this._onMouseMove.bind(this) as unknown as MouseEventHandler}
				onMouseUp={this._onMouseUp.bind(this) as unknown as MouseEventHandler}
			>
			{this.props.children}
			</tbody>
		)
	}

	_onMouseDown(e: MouseEvent) {
		e.preventDefault();
		this.setState(state => ({
			...state,
			mouseDown: true,
		}));
	}

	/**
	 * On document element mouse up
	 */
	_onMouseUp(e: MouseEvent) {
		e.preventDefault();
		this.setState(state => ({
			...state,
			mouseDown: false,
		}));
	}

	/**
	 * On document element mouse move
	 */
	_onMouseMove(e: MouseEvent) {
		e.preventDefault();
		if (e.buttons !== 1) {
			return;
		}
		for (const ref of this.cellRefs) {
			const tmpNode = ReactDOM.findDOMNode(ref.myRef.current) as HTMLElement;
			if (!tmpNode) {
				continue;
			}
			const tmpBox = {
				top: tmpNode.offsetTop,
				left: tmpNode.offsetLeft,
				width: tmpNode.clientWidth,
				height: tmpNode.clientHeight
			};
			let mousePos = {x: e.pageX, y: e.pageY};
			if (this._pointInBox(mousePos, tmpBox)) {
				console.log(ref, mousePos, tmpBox);
				ref.setState((state) => ({
					...this.state,
					isSelected: true,
				}))
			}
		}
	}

	_pointInBox(point: any, box: any) {
		return point.x >= box.left
		&& point.x <= box.left + box.width
		&& point.y >= box.top
		&& point.y <= box.top + box.height;
	}

	/**
	 * Detect 2D box intersection
	 */
	_boxIntersects(boxA, boxB) {
		if (boxA.left <= boxB.left + boxB.width &&
			boxA.left + boxA.width >= boxB.left &&
			boxA.top <= boxB.top + boxB.height &&
			boxA.top + boxA.height >= boxB.top) {
			return true;
		}
		return false;
	}

}
