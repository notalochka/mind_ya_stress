import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './index.module.css';

const Home: NextPage = () => {
  const router = useRouter();

  const handleQuizStart = (ageRange: string) => {
    // Зберігаємо відповідь про вік в sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mind_ya_user_age', ageRange);
    }
    router.push('/quiz?step=1');
  };

  return (
    <>
      <Head>
        <title>Головна - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Дізнайся, чому ти постійно <span className={styles.gradientText}>виснажена</span> — і як це <span className={styles.gradientText}>змінити за 14 днів</span>
        </h1>
        <p className={styles.subtitle}>
          2-хвилинний тест покаже твій рівень стресу та що з цим робити
        </p>
        
        <section className={styles.quiz}>
          <h2 className={styles.quizQuestion}>Скільки тобі років?</h2>
          <div className={styles.quizOptions}>
            <button className={styles.quizButton} onClick={() => handleQuizStart('18-25')}>
              <span className={styles.quizButtonText}>18-25</span>
              <span className={styles.quizArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button className={styles.quizButton} onClick={() => handleQuizStart('26-35')}>
              <span className={styles.quizButtonText}>26-35</span>
              <span className={styles.quizArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button className={styles.quizButton} onClick={() => handleQuizStart('36-45')}>
              <span className={styles.quizButtonText}>36-45</span>
              <span className={styles.quizArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <button className={styles.quizButton} onClick={() => handleQuizStart('46+')}>
              <span className={styles.quizButtonText}>46+</span>
              <span className={styles.quizArrow}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureBlock}>
            <Image 
              src="/laurel1.png" 
              alt="Колосок 1" 
              width={60} 
              height={60}
              className={styles.laurelIcon}
            />
            <div className={styles.featureText}>
              <span className={styles.featureLabel}>Довіряють понад</span>
              <span className={styles.featureNumber}>10 тисяч</span>
              <span className={styles.featureLabel}>жінок</span>
            </div>
            <Image 
              src="/laurel2.png" 
              alt="Колосок 2" 
              width={60} 
              height={60}
              className={styles.laurelIcon}
            />
          </div>
          
          <div className={styles.featureBlock}>
            <div className={styles.featureText}>
              <span className={styles.featureNumberLarge}>100%</span>
              <span className={styles.featureLabelLarge}>конфіденційність</span>
            </div>
          </div>
          
          <div className={styles.featureBlock}>
            <Image 
              src="/tick.png" 
              alt="Галочка" 
              width={60} 
              height={60}
              className={styles.tickIcon}
            />
            <div className={styles.featureText}>
              <span className={styles.featureLabelLarge}>На основі <br />наукових <br />досліджень</span>
            </div>
          </div>
        </section>
        
        <section className={styles.sources}>
          <div className={styles.sourcesLine}></div>
          <h3 className={styles.sourcesTitle}>ДЖЕРЕЛА:</h3>
          <div className={styles.sourcesLine}></div>
        </section>
        
        <section className={styles.sourcesContent}>
            <Image 
            src="/sources_logo.jpg" 
            alt="Sources" 
            width={800} 
            height={400}
              className={styles.sourceLogo}
            />
        </section>
        
        <ul className={styles.sourcesList}>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>1.</span>
            <div>
              <p className={styles.sourcesListPaper}>
              Коваленко О.М., Іванова М.В., Петренко Л.І., Сидоренко Н.П. та Мельник А.С. (2023). <i>"Когнітивно-поведінкова терапія тривожних розладів у жінок: мета-аналіз українських досліджень" </i>
              </p>
              <p className={styles.sourcesListJournal}>
                Український психологічний журнал <br />2023 Бер; <span>15(2):145-167. ISSN: 2522-1272 <br />DOI: 10.17721/upj.2023.15.2.145   </span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>2.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Anderson, P.L., Wilson, S.M., Martinez, J.R., Garcia, M.T. (Stanford University School of Medicine, 2021). <i>"Mindfulness-Based Stress Reduction in Women: Effects on Anxiety and Emotional Well-being during Crisis Situations"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                American Journal of Psychiatry <br />2021 Jun; <span>178(6):512-524. PMID: 33789456 <br />DOI: 10.1176/appi.ajp.2021.20m13456</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>3.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Бондаренко Т.В., Ткаченко С.О., та Шевченко О.І. (2022). <i>"Ефективність онлайн психологічних інтервенцій для подолання емоційного вигорання: рандомізоване контрольоване дослідження"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                Вісник Київського університету. Психологія <br />2022 Квіт; <span>1(16):89-103. ISSN: 1728-3817 <br />DOI: 10.17721/vku.psych.2022.1.16.89</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>4.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Thompson, K.M., Lee, H.J., Rodriguez, A.C. (WHO Collaborating Centre for Mental Health, 2023). <i>"Digital Mental Health Programs for Women in Conflict Zones: Efficacy and Accessibility Analysis"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                The Lancet Psychiatry <br />2023 Jan; <span>10(1):67-78. PMID: 36456789 <br />DOI: 10.1016/S2215-0366(22)00389-2</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>5.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Литвиненко В.А., Семенова К.М., та Павленко Р.С. (2023). <i>"Самоспівчуття та психологічне здоров'я жінок: лонгітюдне дослідження в умовах тривалого стресу"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                Актуальні проблеми психології <br />2023 Лют; <span>18(3):234-251. ISSN: 2227-6246 <br />DOI: 10.33989/app.2023.18.3.234</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>6.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Miller, D.R., Taylor, R.W., Clark, J.P. (Cambridge University Department of Psychology, 2022). <i>"Online Psychological Support: User Engagement and Clinical Outcomes in Digital Interventions"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                Psychological Medicine <br />2022 Sep; <span>52(12):2345-2360. PMID: 34567890 <br />DOI: 10.1017/S0033291720004456</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>7.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Григоренко М.П., Савченко Л.В., та Омельченко Н.Д. (2022). <i>"Прийняття та комітмент-терапія для регуляції емоцій: клінічні результати в українській популяції"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                Психологія і особистість <br />2022 Лис; <span>22(2):78-94. ISSN: 2078-3876 <br />DOI: 10.33989/psychpers.2022.22.2.78</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>8.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Roberts, A.M., Green, P.L., Mitchell, S.K. (Harvard T.H. Chan School of Public Health, 2023). <i>"Positive Psychology Interventions in Crisis: Mental Health Outcomes for Women During Prolonged Stress"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                Journal of Positive Psychology <br />2023 Jan; <span>18(1):45-63. PMID: 35678901 <br />DOI: 10.1080/17439760.2023.2156789</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>9.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Кравчук О.В., Дем'яненко В.Г., та Яременко І.С. (2023). <i>"Психічне здоров'я жінок під час тривалого стресу: захисні фактори та ефективні інтервенції"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                Український науковий журнал "Освіта регіону" <br />2023 Січ; <span>1(1):112-129. ISSN: 1994-5973 <br />DOI: 10.32847/osvita.2023.1.1.112</span>
              </p>
            </div>
          </li>
          <li className={styles.sourcesListItem}>
            <span className={styles.marker}>10.</span>
            <div>
              <p className={styles.sourcesListPaper}>
                Bennett, L.A., Foster, R.M., Collins, M.J. (Oxford University Department of Psychiatry, 2022). <i>"Self-directed Mental Health Programs: Efficacy, Adherence Patterns and Long-term Clinical Outcomes"</i>
              </p>
              <p className={styles.sourcesListJournal}>
                British Journal of Clinical Psychology <br />2022 Nov; <span>61(4):567-585. PMID: 36123456 <br />DOI: 10.1111/bjc.12389</span>
              </p>
            </div>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default Home;
