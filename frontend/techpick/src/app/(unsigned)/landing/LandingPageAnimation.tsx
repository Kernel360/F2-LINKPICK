'use client';

import { PropsWithChildren } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP을 이용한 애니메이션이 포함되어있습니다.
 *
 * 랜딩페이지와 강하게 결합되어있으므로, 랜딩페이지를 수정하실 때는 같이 수정해야합니다.
 */
export function LandingPageAnimation({ children }: PropsWithChildren) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.section') as HTMLElement[];

    sections.forEach((section) => {
      const sectionContent = section.querySelector(
        '.section-content'
      ) as HTMLElement;

      gsap.fromTo(
        sectionContent,
        { autoAlpha: 0, y: 50 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'center 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  return children;
}
