import { useParams, Link } from 'react-router-dom';
import { developers } from '../layout/BigDevelopers/developers';
import styles from '../layout/BigDevelopers/Developer.module.css';
import { HeaderLayout } from '../layout/Header/Header';
import Footer from '../layout/Footer/Footer';

export default function DeveloperPage() {
    const { id } = useParams<{ id: string }>();
    const developer = developers.find(dev => dev.id === id);

    if (!developer) {
        return (
        <div className={styles['developer-page']}>
            <div className="container">
            <h1>Разработчик не найден</h1>
            <Link to="/developers">Вернуться к списку разработчиков</Link>
            </div>
        </div>
        );
    }

    return (
        <div>
            <HeaderLayout />
            <div className={styles['developer-page']}>
                <div className='container'>
                    <Link to="/developers" className={styles['back-button']}>
                    ← Назад к разработчикам
                    </Link>
                    
                    <div className={styles['developer-header']}>
                    <div className={styles['developer-ellipse']}>
                        <img 
                        src={developer.photo} 
                        alt={developer.firstName}
                        className={styles['developer-photo-large']}
                    />
                    </div>
                    <div className={styles['developer-info']}>
                        <h1 className={styles['developer-title']}>{developer.firstName} {developer.lastName}</h1>
                        <p className={styles['position']}>{developer.position}</p>
                    </div>
                    </div>

                    <div className={styles['portfolio-section']}>
                    <p className={styles['portfolio-title']}>портфолио работ</p>
                    <div className={styles['portfolio-box']}>
                        {developer.portfolio.map((image, index) => (
                        <div key={index} className={styles['portfolio-card']}>
                            <div className={styles['portfolio-image-container']}>
                                <img 
                                src={image} 
                                alt={`Работа ${index + 1}`}
                                className={styles['portfolio-image']}
                                />
                            </div>
                            <p className={styles['portfolio-name']}>Работа {index + 1}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}