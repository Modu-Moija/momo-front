import React from "react";
import { Modal } from "@material-ui/core";
import { Close, CheckCircle } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../scss/component/_modal.scss";
import { NewLine } from "../utils";

type Props = {
  text: string;
  open: boolean;
  onClose: () => void;
  buttonLink: () => void;
  button: string;
  url: string;
};

export const ModalBox = ({
	open,
	onClose,
	buttonLink,
	text,
	button,
	url,
}: Props) => {
	const myURL = window.location.href + `result/${url}`;

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
					<CopyToClipboard text={myURL}>
						<button onClick={buttonLink} className="copy-link">
							{button}
						</button>
					</CopyToClipboard>
				</div>
			</div>
		</Modal>
	);
};
