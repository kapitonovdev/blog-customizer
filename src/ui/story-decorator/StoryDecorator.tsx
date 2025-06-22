// eslint-disable-next-line import/no-unresolved -- пакет @storybook/react доступен транзитивно через @storybook/react-webpack5
import { Decorator } from '@storybook/react';
import styles from './StoryDecorator.module.scss';

export const StoryDecorator: Decorator = (Story) => (
	<div className={styles.storybookContainer}>
		<Story />
	</div>
);
