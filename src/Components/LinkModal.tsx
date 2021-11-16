import React from "react";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const LinkModal = ({ open, onClose }: Props) => {
	return (
		<Modal open={open} onClose={onClose} className="copy">
			<>
				<CloseIcon className="faq-close" onClick={onClose} />
				<div>링크가 복사되었습니다.</div>
				<button onClick={onClose}>확인</button>
			</>
		</Modal>
	);
};
