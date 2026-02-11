import React from 'react';
import Image from 'next/image';
import styles from './InfoPageStep5.module.css';

interface InfoPageStep5Props {
  title?: string;
  text?: string;
  gifPath?: string;
}

const InfoPageStep5: React.FC<InfoPageStep5Props> = ({
  title = 'Навіть без загрози тіло залишається напруженим',
  text = 'Тіло звикає жити в готовності і не перемикається в спокій одразу.',
  gifPath = '/step-5.gif',
}) => {
  return (
    <div className={styles.infoPage}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.imageContainer}>
        <Image
          src={gifPath}
          alt="Step 5 illustration"
          width={600}
          height={400}
          className={styles.gif}
          unoptimized
        />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default InfoPageStep5;

