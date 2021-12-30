import React from "react";
import { Modal } from "@material-ui/core";
import { Close, CheckCircle } from "@material-ui/icons";
import "../scss/component/_modal.scss";
import { NewLine } from "../utils";

type Props = {
  text: string;
  open: boolean;
  onClose: () => void;
  buttonLink: () => void;
  button: string;
};

export const ModalBox = ({
	open,
	onClose,
	buttonLink,
	text,
	button,
}: Props) => {
	return (
		<Modal open={open} onClose={onClose} className="setting">
			<div className="setting-container">
				<div className="setting-close">
					<Close className="close-icon" onClick={onClose} />
				</div>
				<div className="check-img">
					<CheckCircle className="check-icon" />
				</div>
				<div className="setting-content">
					<NewLine newLineString={text} />
				</div>
				<div className="setting-button">
					<button onClick={buttonLink} className="copy-link">
						{button}
					</button>
				</div>
			</div>
		</Modal>
	);
};
