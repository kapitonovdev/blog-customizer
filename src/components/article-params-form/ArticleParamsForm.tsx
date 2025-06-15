import { useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleToggle = () => {
                setIsOpen((prev) => !prev);
        };

        return (
                <>
                        <ArrowButton isOpen={isOpen} onClick={handleToggle} />
                        <aside className={isOpen ? styles.container_open : styles.container}>
                                <form className={styles.form}>
                                        <div className={styles.bottomContainer}>
                                                <Button title='Сбросить' htmlType='reset' type='clear' />
                                                <Button title='Применить' htmlType='submit' type='apply' />
                                        </div>
                                </form>
                        </aside>
                </>
        );
};
