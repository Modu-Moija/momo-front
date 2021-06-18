import React from 'react';
import { Modal } from '@material-ui/core';
import "../scss/component/_faq.scss";
import CloseIcon from '@material-ui/icons/Close';

type Props = {
	open : boolean,
	onClose : () => void
}
const FAQmodal = ({open, onClose} : Props) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			className="faq"
		>
			<div className="faq-container">
				<div className="faq-content">
					<CloseIcon className="faq-close" onClick={onClose}/>
				</div>
				<img src="img/faq.png" alt="faq"/>
			</div>
		</Modal>
	);
}

export default FAQmodal;