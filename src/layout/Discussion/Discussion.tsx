import styles from './Discussion.module.css';
import discussionBg from '../../assets/images/bg discussion.png';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import telegramImg from '../../assets/images/telegram.png';

export function DiscussionLayout() {
    return (
        <div className={styles['discussion']} style={{ backgroundImage: `url(${discussionBg})` }}>
            <div className={styles['discussion-box']}>
                <div className='container'>
                    <div className={styles['discussion-inner']}>
                        <p className={styles['discussion-title']}>Обсудим ваш проект?</p>
                        <LinkButton to={'/'} icon={telegramImg} children={"Связаться"} />
                    </div>
                </div>
            </div>
        </div>
    );
}