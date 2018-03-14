import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateCurrentUrl} from "../reducers/memos";

class Recorder extends Component {
	mediaRecorder;
	
	componentWillUnmount () {
		this.mediaRecorder.removeEventListener()
	}
	
	handleRecording = () => {
		if (!MediaRecorder.isTypeSupported('audio/webm')) {
			alert('This browser does not support recording');
			return;
		}
		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(mediaStream => {
				const audioChunks = [];
				const options = {mimeType: 'audio/webm'};
				this.mediaRecorder = this.mediaRecorder || new MediaRecorder(mediaStream, options);
				
				if(this.mediaRecorder.state === 'inactive'){
					$('.record-button').addClass('recording');
					this.mediaRecorder.start();
				} else {
					this.mediaRecorder.stop();
					$('.record-button').removeClass('recording');
					$('#voiceMemoModal').modal('show');
				}
				
				this.mediaRecorder.addEventListener("dataavailable", (event) => {
					audioChunks.push(event.data);
					const audioBlob  = new Blob(audioChunks, { type: 'audio/webm' });
					
					const audioUrl = URL.createObjectURL(audioBlob);
					this.props.updateCurrentUrl(audioUrl);
					
					$('.current-audio').attr('src', audioUrl);
				});

			});
	};
	
	render() {
		return (
			<section className="recording-console row">
				<div className="col-12">
					<button type="button" className="record-button" onClick={this.handleRecording}>
						<span className='pulse-button'></span>
					</button>
				</div>
			</section>
		)
	}
}

export default connect(
	null,
	{updateCurrentUrl}
)(Recorder);
