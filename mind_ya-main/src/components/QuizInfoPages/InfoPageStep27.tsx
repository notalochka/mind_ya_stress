import React from 'react';
import Image from 'next/image';
import styles from './InfoPageStep27.module.css';

interface InfoPageStep27Props {
  title?: string;
  subtitle?: string;
  chartImage?: string;
  duration?: string;
  equipment?: string;
  note?: string;
}

const InfoPageStep27: React.FC<InfoPageStep27Props> = ({
  title = 'На основі ваших відповідей ви можете',
  subtitle = 'Знизити рівень стресу та тривоги',
  chartImage = '/step-27.jpg',
  duration = '10 хв/день',
  equipment = 'не потрібно',
  note = 'Всі вправи програми Mind Я можна виконувати будь-де — вдома, на роботі, навіть коли немає світла',
}) => {
  // Обчислюємо дату +14 днів
  const getTargetDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
  };

  return (
    <div className={styles.infoPage}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      <div className={styles.dateContainer}>
        <p className={styles.date}>до {getTargetDate()}</p>
        <div className={styles.badge}>
          <span>19% швидше</span>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        <Image
          src={chartImage}
          alt="Progress chart"
          width={800}
          height={500}
          className={styles.chart}
        />
      </div>
      <p className={styles.disclaimer}>*лише для ілюстрації</p>

      <div className={styles.detailsSection}>
        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.972 3.03906H10.4045C10.065 3.03906 9.78909 3.31493 9.78909 3.65443C9.78909 3.99394 10.065 4.2698 10.4045 4.2698H12.972C13.3115 4.2698 13.5874 3.99394 13.5874 3.65443C13.5874 3.31493 13.3115 3.03906 12.972 3.03906ZM19.826 7.09204L18.1497 5.4157C17.9162 5.18228 17.5343 5.18228 17.2797 5.4157C17.0462 5.64912 17.0462 6.03107 17.2797 6.28569L18.9348 7.94083C19.0621 8.06816 19.2107 8.1106 19.3592 8.1106C19.5077 8.1106 19.6775 8.04696 19.7836 7.94083C20.0594 7.70741 20.0594 7.32546 19.826 7.09204ZM11.6776 5.60663C7.4337 5.60663 3.99609 9.04424 3.99609 13.2882C3.99609 17.5321 7.4337 20.9697 11.6776 20.9697C15.9216 20.9697 19.3592 17.5321 19.3592 13.2882C19.3592 9.04424 15.9216 5.60663 11.6776 5.60663ZM14.8606 14.1157H11.6776C11.3381 14.1157 11.0623 13.8399 11.0623 13.5004V9.51108C11.0623 9.17157 11.3381 8.89571 11.6776 8.89571C12.0172 8.89571 12.293 9.17157 12.293 9.51108V12.9062H14.8606C15.2001 12.9062 15.476 13.1821 15.476 13.5216C15.476 13.8399 15.2001 14.1157 14.8606 14.1157Z" fill="#111113"></path>
              </svg>
            </div>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Тривалість:</span>
              <span className={styles.detailValue}>{duration}</span>
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12.0821 16.6411C12.5841 17.1437 12.581 17.9523 12.0821 18.4512L10.9532 19.5801C10.4585 20.0761 9.64528 20.0824 9.14303 19.5801L4.41974 14.8568C3.92089 14.3577 3.92089 13.5456 4.41974 13.0467L5.54865 11.9178C6.04753 11.4189 6.85617 11.4158 7.3588 11.9178L12.0821 16.6411ZM4.61004 16.087C4.49455 15.9715 4.30256 15.9927 4.21342 16.1296C3.85929 16.6731 3.9685 17.3283 4.3743 17.7342L6.26573 19.6256C6.66802 20.0279 7.32277 20.1436 7.87013 19.7867C8.00702 19.6974 8.02849 19.5055 7.91295 19.3899L4.61004 16.087ZM12.8584 9.39855C12.6584 9.19888 12.3342 9.19888 12.1342 9.39855L9.39838 12.1344C9.19839 12.3344 9.19839 12.6586 9.39838 12.8585L11.1413 14.6015C11.3407 14.8008 11.6648 14.8015 11.8655 14.6015L14.6013 11.8656C14.8013 11.6656 14.8013 11.3415 14.6013 11.1415L12.8584 9.39855ZM19.3903 7.91248C19.5059 8.02806 19.6979 8.00653 19.7871 7.86957C20.1438 7.32208 20.0266 6.66717 19.6254 6.26591L17.734 4.37448C17.3292 3.96996 16.6743 3.85847 16.1301 4.21292C15.9932 4.30207 15.9719 4.49409 16.0874 4.60961L19.3903 7.91248ZM14.8567 4.41992C14.3575 3.92106 13.5454 3.92074 13.0465 4.41992L11.9176 5.54882C11.4187 6.04768 11.4156 6.85631 11.9176 7.35897L16.6409 12.0823C17.144 12.5847 17.9527 12.5806 18.4511 12.0823L19.58 10.9534C20.0788 10.4545 20.0788 9.64238 19.58 9.14321L14.8567 4.41992Z" fill="#111113"></path>
              </svg>
            </div>
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Обладнання:</span>
              <span className={styles.detailValue}>{equipment}</span>
            </div>
          </div>
        </div>
        <div className={styles.note}>
          <div className={styles.noteLine}></div>
          <p className={styles.noteText}>{note}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPageStep27;

