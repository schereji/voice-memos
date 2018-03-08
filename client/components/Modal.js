import React, {Component} from 'react';
import querystring from 'query-string';
import axios from 'axios';

class Modal extends Component {
	handleSave = (e) => {
		e.preventDefault();
		
		axios.post('/add',
			querystring.stringify({
				description: $('.description').val(),
				audioUrl: this.props.currentUrl,
				date: this.getDate()
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).catch((error) => {
			
			if (error.response) {
					console.log(error.response);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
			});
		
		$('#voiceMemoModal').modal('hide');
		$('#voiceMemoModal').on('hidden.bs.modal', () => {
			this.props.updateAudioLink('');
			this.props.getData();
		});
		
	};
	
	getDate() {
		const today = new Date();
		let day = today.getDate();
		let month = today.getMonth() + 1;
		const year = today.getFullYear();
		
		if(day < 10) {
			day = `0${day}`;
		}
		
		if(month < 10) {
			month = `0${month}`;
		}
		
		return `${month}/${day}/${year}`;
	}
	
	render() {
		
		return (
			<section className="modal fade" id="voiceMemoModal" tabIndex="-1" role="dialog" aria-labelledby="voiceMemoModal" >
				<section className="modal-dialog modal-dialog-centered" role="document">
					<section className="modal-content">
						<section className="modal-header">
							<p className="modal-title" id="exampleModalLabel">Your Cart</p>
						</section>
						<section className="modal-body">
							<input className="description" type="text" name="description"/>
							<button onClick={this.handleSave} className="save">Save</button>
						</section>
						<section className="modal-footer d-flex justify-content-center">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Back</button>
						</section>
					</section>
				</section>
			</section>
		)
	}
}

export default Modal;
