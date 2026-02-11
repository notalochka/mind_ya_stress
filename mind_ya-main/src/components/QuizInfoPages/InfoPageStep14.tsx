import React, { useState } from 'react';
import Image from 'next/image';
import styles from './InfoPageStep14.module.css';

interface Review {
  title: string;
  rating: number;
  userName: string;
  text: string;
}

interface InfoPageStep14Props {
  title?: string;
  subtitle?: string;
  chartImage?: string;
  reviews?: Review[];
}

const InfoPageStep14: React.FC<InfoPageStep14Props> = ({
  title = 'На основі ваших відповідей ви можете',
  subtitle = 'Знизити рівень стресу та тривоги',
  chartImage = '/step-14.jpg',
  reviews,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Обчислюємо дату +14 днів
  const getTargetDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
  };

  const defaultReviews: Review[] = [
    {
      title: 'Перестала кричати на дітей',
      rating: 5,
      userName: 'Оленка_Київ',
      text: 'День 5. Вчора не було світла 12 годин, діти капризували — і я не зірвалась. Вперше за півроку.',
    },
    {
      title: 'Чоловік питає що зі мною сталось',
      rating: 5,
      userName: 'Марина_Харків',
      text: 'Тиждень роблю вправи. Вчора він запитав: "Ти якась інша стала". Не повірите — я і сама це відчуваю.',
    },
    {
      title: 'Засинаю без тривоги',
      rating: 5,
      userName: 'Іра_Дніпро',
      text: 'Раніше лежала і гортала новини до 2 ночі. Зараз — 10 хвилин вправ і засинаю. На 4-й день вже відчула різницю.',
    },
    {
      title: 'Роблю при свічках — працює',
      rating: 5,
      userName: 'Таня_Одеса',
      text: 'Немає світла? Неважливо. Сідаю, закриваю очі, 10 хвилин — і ніби перезавантажилась. Це тепер мій ритуал.',
    },
    {
      title: 'Думала це неможливо змінити',
      rating: 5,
      userName: 'Юля_Львів',
      text: 'Втратила роботу, чоловік на фронті, постійно плакала. На 10-й день зловила себе на думці — я посміхаюсь. Просто так.',
    },
  ];

  const reviewsToShow = reviews || defaultReviews;
  const visibleReviews = showAllReviews ? reviewsToShow : reviewsToShow.slice(0, 3);
  const hasMoreReviews = reviewsToShow.length > 3;

  return (
    <div className={styles.infoPage}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>Знизити <span>рівень стресу </span>та <span>тривоги </span></h2>
      <p className={styles.date}>до {getTargetDate()}</p>
      
      <div className={styles.chartContainer}>
        <Image
          src={chartImage}
          alt="Progress chart"
          width={700}
          height={300}
          className={styles.chart}
        />
      </div>
      <p className={styles.disclaimer}>*лише для ілюстрації</p>

      <div className={styles.reviewsSection}>
        <h3 className={styles.reviewsTitle}>Відгуки</h3>
        <div className={styles.reviewsList}>
          {visibleReviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <div className={styles.reviewHeader}>
                <h4 className={styles.reviewTitle}>{review.title}</h4>
                <div className={styles.reviewRating}>
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i} className={styles.star}>⭐</span>
                  ))}
                </div>
              </div>
              <div className={styles.reviewContent}>
                <p className={styles.reviewText}>{review.text}</p>
                <span className={styles.reviewAuthor}>{review.userName}</span>
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreReviews && !showAllReviews && (
          <button
            className={styles.showMoreButton}
            onClick={() => setShowAllReviews(true)}
          >
            Показати більше
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoPageStep14;

