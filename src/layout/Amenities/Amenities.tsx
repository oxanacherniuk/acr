import { NavigationButton } from '../../components/NavigationButton/NavigationButton';
import styles from './Amenities.module.css';

export function AmenitiesLayout() {
    return (
        <div className={styles['amenities']}>
            <div className='container'>
                <p className={styles['amenities-title']}>Мы создаем сайты под любые цели</p>
                <div className={styles['amenities-box']}>
                    <div className={styles['amenities-card']}>
                        <p className={styles['card-title']}>Продающие <br />лендинги</p>
                        <p className={styles['card-text']}>Функциональный одностраничный сайт - идеальное решение для эффективного продвижения и демонстрации сильных сторон продукта.</p>
                        <div className={styles['amenities-bottom']}>
                            <p className={styles['card-price']}>от <span className={styles['text-bold']}>25 000 </span>₽</p>
                            <NavigationButton size='small' to={'/'} children={"Связаться"} />
                        </div>
                    </div>
                    <div className={styles['amenities-card']}>
                        <p className={styles['card-title']}>Интернет - магазины</p>
                        <p className={styles['card-text']}>Откройте для себя новый канал продаж с помощью создания современного и функционального интернет-магазина с корзиной, оформлением заказов, оповещениями и админ-панелью.</p>
                        <div className={styles['amenities-bottom']}>
                            <p className={styles['card-price']}>от <span className={styles['text-bold']}>25 000 </span>₽</p>
                            <NavigationButton size='small' to={'/'} children={"Связаться"} />
                        </div>
                    </div>
                    <div className={styles['amenities-card']}>
                        <p className={styles['card-title']}>корпоративные <br />сайты</p>
                        <p className={styles['card-text']}>Откройте представительство своей компании в интернете с помощью создания современного и функционального корпоративного сайта.</p>
                        <div className={styles['amenities-bottom']}>
                            <p className={styles['card-price']}>от <span className={styles['text-bold']}>25 000 </span>₽</p>
                            <NavigationButton size='small' to={'/'} children={"Связаться"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}