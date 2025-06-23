import { useEffect } from 'react';

type UseCloseParams = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useClose = ({ isOpen, onClose, rootRef }: UseCloseParams) => {
	useEffect(() => {
		if (!isOpen) return; // не открыто — не вешаем обработчики

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)
			) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose, rootRef]);
};
