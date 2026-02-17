import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './InfoPageStep2Feedback.module.css';

interface InfoPageStep2FeedbackProps {
  onContinue?: () => void;
}

const InfoPageStep2Feedback: React.FC<InfoPageStep2FeedbackProps> = ({ onContinue }) => {
  const router = useRouter();
  const { step } = router.query;
  const currentStepNumber = step ? parseInt(step as string, 10) : 1;

  // Прокручуємо сторінку вгору при монтуванні компонента
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleContinue = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onContinue) {
      onContinue();
    } else {
      // Переходимо на наступний крок
      router.push(`/quiz?step=${currentStepNumber + 1}`, undefined, { shallow: true });
    }
  };

  return (
    <div className={styles.infoPage}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.mainText}>
            💛<br />
            Ти щойно визнала те, що більшість тримає в собі.<br />
            Це вже великий крок.            
          </p>
          <p className={styles.detailText}>
            І це не слабкість — це твоя нервова система,<br />
            яка застрягла в режимі "бийся або тікай".<br /><br />
            Як комп'ютер з 47 відкритими вкладками —<br />
            він не "поганий". Він перевантажений.</p>
        </div>
        
        <div className={styles.gifContainer}>
          <Image
            src="/step-3_1.gif"
            alt="Breathing animation"
            width={400}
            height={300}
            className={styles.gif}
            unoptimized
          />
        </div>

        <div className={styles.details}>
          <p className={styles.detailText}>
            Тіло виробляє кортизол — навіть уві сні.
          </p>
          <p className={styles.detailText}>
            Тому ти прокидаєшся втомленою.
          </p>
          <p className={styles.detailText}>
            Тому зриваєшся на дрібниці.
          </p>
        </div>

        <div className={styles.emphasis}>
          <p className={styles.emphasisText}>
            Це не твій характер.
          </p>
          <p className={styles.emphasisText}>
            Це хронічний стрес.
          </p>
          <p className={styles.emphasisText}>І його можна перезавантажити.</p>
        </div>

        <div className={styles.research}>
          <div className={styles.researchBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.2032 1.69499C10.8137 1.31 10.1869 1.31 9.79736 1.69499L8.4388 3.03765C8.25306 3.22121 8.00289 3.32483 7.74176 3.32637L5.83171 3.33762C5.28403 3.34084 4.84084 3.78403 4.83762 4.33171L4.82637 6.24176C4.82483 6.50289 4.72121 6.75306 4.53765 6.9388L3.19499 8.29736C2.81 8.68691 2.81 9.31367 3.19499 9.70322L4.53765 11.0618C4.72121 11.2475 4.82483 11.4977 4.82637 11.7588L4.83762 13.6689C4.84084 14.2165 5.28403 14.6597 5.83171 14.663L7.74176 14.6742C8.00289 14.6757 8.25306 14.7794 8.4388 14.9629L9.79736 16.3056C10.1869 16.6906 10.8137 16.6906 11.2032 16.3056L12.5618 14.9629C12.7475 14.7794 12.9977 14.6757 13.2588 14.6742L15.1689 14.663C15.7165 14.6597 16.1597 14.2165 16.163 13.6689L16.1742 11.7588C16.1757 11.4977 16.2794 11.2475 16.4629 11.0618L17.8056 9.70322C18.1906 9.31367 18.1906 8.68691 17.8056 8.29736L16.4629 6.9388C16.2794 6.75306 16.1757 6.50289 16.1742 6.24176L16.163 4.33171C16.1597 3.78403 15.7165 3.34084 15.1689 3.33762L13.2588 3.32637C12.9977 3.32483 12.7475 3.22121 12.5618 3.03765L11.2032 1.69499ZM12.7661 6.56124C12.8682 6.5927 12.9162 6.63187 13.1682 6.88906C13.344 7.06843 13.472 7.21888 13.5 7.27887C13.5622 7.41222 13.563 7.60475 13.5019 7.73519C13.4687 7.806 12.9665 8.3408 11.7054 9.64839C10.0041 11.4124 9.95171 11.4643 9.83799 11.4986C9.69212 11.5426 9.65753 11.5426 9.512 11.4983C9.40026 11.4643 9.35561 11.4219 8.5167 10.5536C7.90623 9.92177 7.62452 9.61485 7.59294 9.54717C7.53998 9.43368 7.5321 9.26158 7.57386 9.13029C7.60824 9.02219 8.11864 8.47149 8.25351 8.39697C8.37662 8.32897 8.58588 8.33114 8.71657 8.40175C8.77474 8.43319 8.98812 8.63377 9.25016 8.90337L9.68684 9.3526L11.0055 7.9861C11.7308 7.23451 12.3484 6.60672 12.378 6.591C12.5075 6.52229 12.6134 6.51417 12.7661 6.56124Z" fill="#fff"></path>
            </svg>
            <span>ДОСЛІДЖЕННЯ</span>
          </div>
          <div className={styles.researchImageContainer}>
            <Image
              src="/step-3-1.jpg"
              alt="Research data"
              width={600}
              height={400}
              className={styles.researchImage}
            />
          </div>
        </div>

        <button className={styles.continueButton} onClick={handleContinue}>
          <span>Далі</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InfoPageStep2Feedback;

