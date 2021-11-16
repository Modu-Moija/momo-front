import React from "react";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  open: boolean;
  onClose: () => void;
  copyLink: (event: any) => void;
};

export const SettingModal = ({ open, onClose, copyLink }: Props) => {
	return (
		<Modal open={open} onClose={onClose} className="copy">
			<>
				<CloseIcon className="faq-close" onClick={onClose} />
				<div>일정이 생성되었습니다.</div>
				<div>친구에게 공유해 일정을 공유해보세요</div>
				<button onClick={copyLink}>링크 복사하기</button>
			</>
		</Modal>
	);
};
