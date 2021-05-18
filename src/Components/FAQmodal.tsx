import React from 'react';
import { Modal } from '@material-ui/core';
import "../scss/component/_faq.scss";

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
			<div>
				<p>faq</p>
			</div>
		</Modal>
	);
}

export default FAQmodal;