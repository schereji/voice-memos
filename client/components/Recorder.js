import React, { Component } from 'react';

class Recorder extends Component {
	mediaRecorder;
	audioUrl;
	
	handleRecording = () => {
		if (!MediaRecorder.isTypeSupported('audio/webm')) {
			alert('This browser does not support recording');
			return;
		}
		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(mediaStream => {
				const audioChunks = [];
				const options = {mimType: 'audio/webm'};
				this.mediaRecorder = this.mediaRecorder || new MediaRecorder(mediaStream, options);
				
				if(this.mediaRecorder.state === 'inactive'){
					$('.record-button').addClass('recording');
					this.mediaRecorder.start();
				} else {
					this.mediaRecorder.stop();
				}
				
				this.mediaRecorder.addEventListener("dataavailable", event => {
					audioChunks.push(event.data);
					const audioBlob  = new Blob(audioChunks);
					this.audioUrl = URL.createObjectURL(audioBlob);
					this.props.updateAudioLink(this.audioUrl);
					document.querySelector("audio").src = this.audioUrl;
				});
				
				this.mediaRecorder.addEventListener("stop", () => {
					$('.record-button').removeClass('recording');
					$('.done').removeClass('hidden');
				});
			});
	};
	
	render() {
		return (
			<section className="recording-console row">
				<button type="button" className="record-button" onClick={this.handleRecording}>
					Record Memo
				</button>
				<audio controls></audio>
				<button data-toggle="modal" data-target="#voiceMemoModal" className="done hidden">Done</button>
			</section>
		)
	}
}

export default Recorder;
