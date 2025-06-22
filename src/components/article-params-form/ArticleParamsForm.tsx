import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useState, FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isSidebarOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				const arrowButton = document.querySelector(`.${styles.arrow}`);
				if (arrowButton && !arrowButton.contains(event.target as Node)) {
					setIsSidebarOpen(false);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='шрифт'
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={handleFontSizeChange}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='цвет шрифта'
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='цвет фона'
						onChange={handleBackgroundColorChange}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='ширина контента'
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
