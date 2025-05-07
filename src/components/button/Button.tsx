// Button.tsx

import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { Text } from 'components/text';

type ButtonProps = {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	variant?: 'apply' | 'reset'; // 'apply' для кнопки "Применить", 'reset' для "Сбросить"
};

export const Button = ({ title, onClick, type, variant }: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={clsx(styles.button, variant && styles[variant])}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};

export default Button;
