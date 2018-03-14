import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMemos} from '../reducers/memos';

class VoiceMemoList extends Component {
	componentDidMount() {
		this.props.fetchMemos();
	}
	handlePlaybackState = (event) => {
		const audioFile = $(event.target)
			.parent()
			.parent()
			.next()[0];
		if (audioFile) {
			$(event.target).parent().addClass('playing');
			audioFile.play();
		}
	};
	
	handleEndedState = (event) => {
		$(event.target).parent().find('.playing').removeClass('playing')
	};
	
	render() {
		if(this.props.memos) {
			return (
				this.props.memos.map((memo, index) => (
					<VoiceMemo {...memo}
					           key={index}
					           id={index}
					           handlePlaybackState={this.handlePlaybackState}
					           handleEndedState={this.handleEndedState}
					/>))
			)
		} else {
			return (
				<div>...Loading</div>
			)
		}
	}
}

const VoiceMemo = (props) => (
	<li className="row list-item">
		<div className="col-6 information">
			<span className="description">{props.description}</span>
			<span className="date">{props.date}</span>
		</div>
		<div className="col-5 audio-url">
			<span className="play-button-container" onClick={props.handlePlaybackState}>
				<i className="far fa-play-circle"></i>
			</span>
			<audio src={props.audioUrl} onEnded={props.handleEndedState}/>
		</div>
	</li>
);

export default connect(
	(state) => ({memos: state.memos, currentUrl: state.currentUrl}),
	{fetchMemos}
)(VoiceMemoList);
