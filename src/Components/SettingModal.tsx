import React from "react";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "../scss/component/_modal.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  copyLink: () => void;
};

export const SettingModal = ({ open, onClose, copyLink }: Props) => {
	return (
		<Modal open={open} onClose={onClose} className="setting">
			<div className="setting-container">
				<div className="setting-close">
					<CloseIcon className="close-icon" onClick={onClose} />
				</div>
				<div className="check-img">이미지</div>
				<div className="setting-content">
					일정이 생성되었습니다.
					<br />
					친구에게 공유해 일정을 공유해보세요
				</div>
				<div className="setting-button">
					<button onClick={copyLink} className="copy-link">
						링크 복사하기
					</button>
				</div>
			</div>
		</Modal>
	);
};
