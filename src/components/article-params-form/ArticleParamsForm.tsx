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
import { useState, FormEvent, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { useClose } from 'src/hooks/useClose';

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

	// закрываем по ESC или клику вне области
	useClose({
		isOpen: isSidebarOpen,
		onClose: () => setIsSidebarOpen(false),
		rootRef: sidebarRef,
	});

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
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
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
