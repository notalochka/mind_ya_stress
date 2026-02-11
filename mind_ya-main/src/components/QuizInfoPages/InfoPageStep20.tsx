import React from 'react';
import Image from 'next/image';
import styles from './InfoPageStep20.module.css';

interface InfoPageStep20Props {
  badgeText?: string;
  text?: string;
  imagePath?: string;
  rating?: number;
  userName?: string;
  testimonialTitle?: string;
  testimonialText?: string;
}

const InfoPageStep20: React.FC<InfoPageStep20Props> = ({
  badgeText = 'ОПИТУВАННЯ КОРИСТУВАЧІВ',
  text = '87% жінок відчули зниження тривоги вже після першого тижня з програмою Mind Я',
  imagePath = '/step-20.jpg',
  rating = 5,
  userName = 'Оксана_Одеса',
  testimonialTitle = 'Голова нарешті "замовкла"',
  testimonialText = 'Постійно крутились думки — що буде далі, як платити за квартиру, чи все буде добре. Не могла вимкнути цей потік. На 6-й день вперше за довго прокинулась без тривоги в грудях. Ніби хтось нарешті вимкнув цей шум у голові.',
}) => {
  return (
    <div className={styles.infoPage}>
      <div className={styles.badge}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2.75 14.125C2.75 11.2255 5.10051 8.875 8 8.875C10.8995 8.875 13.25 11.2255 13.25 14.125V15H2.75V14.125Z" fill="white"></path>
          <rect x="4.5" y="1" width="7" height="7" rx="3.5" fill="white"></rect>
        </svg>
        <span>{badgeText}</span>
      </div>
      <p className={styles.text}><span>87% жінок</span> відчули зниження тривоги вже після першого тижня з програмою <span>Mind Я</span></p>
      <div className={styles.imageContainer}>
        <Image
          src={imagePath}
          alt="Step 20 illustration"
          width={600}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.testimonial}>
        <div className={styles.testimonialHeader}>
          <div className={styles.stars}>
            {Array.from({ length: rating }, (_, index) => (
              <span key={index} className={styles.star}>⭐</span>
            ))}
          </div>
          <span className={styles.userName}>{userName}</span>
        </div>
        <h3 className={styles.testimonialTitle}>{testimonialTitle}</h3>
        <p className={styles.testimonialText}>{testimonialText}</p>
      </div>
    </div>
  );
};

export default InfoPageStep20;

