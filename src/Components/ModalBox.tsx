import React from "react";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "../scss/component/_modal.scss";

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
					<CloseIcon className="close-icon" onClick={onClose} />
				</div>
				<div className="check-img">이미지</div>
				<div className="setting-content">
					{text.split("\n").map((txt) => (
						<>
							{txt}
							<br />
						</>
					))}
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
