import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { useRef, useState } from 'react';

import { Spacing } from 'components/spacing';
import { Text } from 'components/text';
import type { OptionType } from 'src/constants/articleProps';
import arrowDown from 'src/images/arrow-down.svg';

import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Option } from './Option';
import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};

export const Select = (props: SelectProps) => {
	const { options, placeholder, selected, onChange, onClose, title } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const placeholderRef = useRef<HTMLDivElement>(null);

	const optionsRef = useOutsideClickClose<HTMLUListElement>({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	const handleOptionClick = (option: OptionType) => {
		onChange?.(option);
		setIsOpen(false);
	};
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div>
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
					<Spacing size={4} />
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				<img
					src={arrowDown}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
				<div
					className={clsx(
						styles.placeholder,
						styles[selected?.optionClassName || '']
					)}
					data-status={status}
					data-selected={!!selected?.value}
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>
				{isOpen && (
					<ul
						className={styles.select}
						data-testid='selectDropdown'
						ref={optionsRef}>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
