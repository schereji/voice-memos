import React, { Component } from 'react';

const VoiceMemo = (props) => console.log(props) || (
	<li className="row">
		<div className="row">
			<div className="col-3">{props.description}</div>
			<div className="col-9">
				<audio controls src={props.audioUrl} onPlay={props.handlePlayback} />
			</div>
		</div>
		<div className="row">
			<div className="col-12">{props.date}</div>
		</div>
	</li>
);

class VoiceMemoList extends Component {
	render() {
		if(this.props.memos) {
			return (
				this.props.memos.map((memo, index) => (<VoiceMemo {...memo} key={index} />))
			)
		} else {
			return (
				<div>...Loading</div>
			)
		}
	}
}

export default VoiceMemoList;
