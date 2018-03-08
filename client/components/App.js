import React, { Component } from 'react';
import '../css/App.css';
import VoiceMemoList from './VoiceMemoList';
import Recorder from './Recorder';
import Modal from './Modal';
import axios from "axios/index";

class App extends Component {
	state = {
		memos: [],
		currentUrl: '',
	};
	
	componentDidMount() {
		this.getData();
	};
	
	getData = () => {
		axios.get('/getAll')
			.then((response) => {
				this.setState({memos: response.data});
			});
		// fetch('/getAll')
		// 	.then(res => res.json())
		// 	.then((res) => {
		// 		this.setState({memos: res})
		// 	});
	};

	
	updateAudioLink = (audioUrl) => {
		this.setState({currentUrl: audioUrl});
	};
	
	handlePlayback = (e) => {
		const audio = new Audio(e.target.src);
		audio.play();
	};
	
	render() {
	    const HomePage = (props) => (
		    <section className="home container">
			    <h1>Voice Memos Application</h1>
			    <Recorder updateAudioLink={this.updateAudioLink}/>
			    <VoiceMemoList {...props} />
			    <Modal {...props} updateAudioLink={this.updateAudioLink}/>
		    </section>
	    );
	    
        return (
        	<main className="voice-memos-app container">
		        <HomePage
			        memos={this.state.memos}
			        currentUrl={this.state.currentUrl}
			        handlePlayback={this.handlePlayback}
			        getData={this.getData}/>
	        </main>
        );
    }
}

export default App;
