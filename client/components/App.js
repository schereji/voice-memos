import React, { Component } from 'react';
import '../css/App.css';
import VoiceMemoList from './VoiceMemoList';
import Recorder from './Recorder';
import MemoForm from './MemoForm';

class App extends Component {
	
	render() {
        return  (
        	<main className="voice-memos-app container">
		        <section className="home container">
			        <h1>Record Your Memo!</h1>
			        <Recorder />
			        <VoiceMemoList />
			        <MemoForm />
		        </section>
	        </main>
        );
    }
}

export default App;
