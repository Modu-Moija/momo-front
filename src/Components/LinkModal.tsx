import React from "react";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "../scss/component/_modal.scss";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const LinkModal = ({ open, onClose }: Props) => {
	return (
		<Modal open={open} onClose={onClose} className="copy">
			<div className="setting-container">
				<div className="setting-close">
					<CloseIcon className="faq-close" onClick={onClose} />
				</div>
				<div>링크가 복사되었습니다.</div>
				<button onClick={onClose}>확인</button>
			</div>
		</Modal>
	);
};
