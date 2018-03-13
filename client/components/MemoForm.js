import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveMemo, updateCurrentUrl} from '../reducers/memos';

class MemoForm extends Component {
	
	handleSubmit = (event) => {
		event.preventDefault();
		const newMemo = {
			description: $('.input-description').val(),
			audioUrl: this.props.currentUrl,
			date: new Date().toLocaleDateString()
		};
		this.props.saveMemo(newMemo);
		$('.input-description').val('')
		this.handleModalClose();
	};
	
	handleModalClose = () => {
		$('#voiceMemoModal').modal('toggle');
		$('#voiceMemoModal').on('hidden.bs.modal', () => {
			this.props.updateCurrentUrl('');
			$('.current-audio').attr('src', '');
		});
	};
	
	render() {
		
		return (
			<section className="modal fade" id="voiceMemoModal" tabIndex="-1" role="dialog" aria-labelledby="voiceMemoModal" >
				<section className="modal-dialog modal-dialog-centered justify-content-center" role="document">
					<section className="modal-content">
						<section className="modal-header">
							<div className="modal-title" id="exampleModalLabel">
								<audio className="current-audio" src={this.props.currentUrl} controls></audio>
							</div>
						</section>
						<section className="modal-body">
							<div className="row">
								<input className="input-description" type="text" name="description"/>
							</div>
							<div className="row action-buttons">
								<div className="submit-button col-6">
									<button type="submit" value="submit" onClick={this.handleSubmit} className="save">Save</button>
								</div>
								<div className="cancel-button col-6">
									<button type="reset" value="reset" onClick={this.handleModalClose} className="cancel">Cancel</button>
								</div>
							</div>
						</section>
					</section>
				</section>
			</section>
		)
	}
}

export default connect(
	(state) => ({ memos: state.memos, currentUrl: state.currentUrl}),
	{saveMemo, updateCurrentUrl}
)(MemoForm);
