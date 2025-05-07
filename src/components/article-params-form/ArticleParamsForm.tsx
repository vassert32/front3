import React, { useState, FormEvent, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import styles from './ArticleParamsForm.module.scss';

export interface ArticleParamsFormProps {
	onSubmit?: () => void;
	onReset?: () => void;
}

export const ArticleParamsForm: React.FC<
	PropsWithChildren<ArticleParamsFormProps>
> = ({ children, onSubmit, onReset }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit?.();
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onReset?.();
	};

	const handleOutsideClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsOpen(false);
	};

	return (
		<>
			{isOpen && (
				<div className={styles.wrapper} onClick={handleOutsideClick}></div>
			)}
			<ArrowButton
				onClick={() => setIsOpen((prev) => !prev)}
				isOpened={isOpen}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.content}>{children}</div>
					<div className={styles.bottomContainer}>
						{/* Изменённые вызовы кнопок с prop variant */}
						<Button title='Сбросить' type='reset' variant='reset' />
						<Button title='Применить' type='submit' variant='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

export default ArticleParamsForm;
