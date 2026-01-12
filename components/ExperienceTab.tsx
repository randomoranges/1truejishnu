import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  type CarouselApi
} from './Carousel';
import { SimpleExperienceCard } from './SimpleExperienceCard';
import { ScrollReveal } from './ScrollReveal';
import styles from './ExperienceTab.module.css';

export const ExperienceTab = () => {
  const { t } = useTranslation();
  const experiences = ['tcs', 'ohm', 'smit', 'hal'];
  
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);
  
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);

  return (
    <div className={styles.container}>
      <ScrollReveal variant="fadeUp">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{t('work.headline')}</h2>
        </div>
      </ScrollReveal>
      
      <div className={styles.carouselWrapper}>
        <ScrollReveal variant="fadeIn" delay={200}>
          <div className={styles.viewportWrapper}>
            <Carousel 
              setApi={setApi} 
              className={styles.carousel}
              opts={{
                loop: true,
                align: 'start',
              }}
            >
              <CarouselContent className={styles.carouselContent}>
                {experiences.map((key) => (
                  <CarouselItem key={key} className={styles.carouselItem}>
                    <div className={styles.cardWrapper}>
                      <SimpleExperienceCard
                        companyName={t(`work.${key}.companyName`)}
                        role={t(`work.${key}.role`)}
                        duration={t(`work.${key}.duration`)}
                        about={t(`work.${key}.about`)}
                        keyAchievement={t(`work.${key}.keyAchievement`)}
                        narrative={t(`work.${key}.narrative`)}
                        location={t(`work.${key}.location`, { defaultValue: '' })}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeIn" delay={400}>
          <div className={styles.navigation}>
            <button 
              className={styles.navButton} 
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ChevronRight size={16} className={styles.prevIcon} />
            </button>

            <div className={styles.dots}>
            {experiences.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === current ? styles.activeDot : ''}`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            </div>

            <button 
              className={styles.navButton} 
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};