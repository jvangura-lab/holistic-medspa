'use client';

import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={cn(
          'flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-2xl p-10 origin-top'
        )}
      >
        <h2 className='text-2xl text-center font-semibold'>{title}</h2>
        <div className={cn('flex h-full mt-5 gap-10')}>
          <div className={cn('w-[40%] relative top-[10%]')}>
            <p className='text-sm'>{description}</p>
            <span className='flex items-center gap-2 pt-2'>
              <a
                href={'#'}
                target='_blank'
                className='text-sm underline cursor-pointer'
              >
                See more
              </a>
            </span>
          </div>

          <div
            className={cn(
              'relative w-[60%] h-full rounded-lg overflow-hidden'
            )}
          >
            <motion.div
              className={cn('w-full h-full')}
              style={{ scale: imageScale }}
            >
              <img src={url} alt='image' className='object-cover w-full h-full' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface ComponentProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentProps>(({ projects }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-black' ref={container}>
        <section className='text-white  w-full bg-slate-950  '>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'StackingCards';

export default Component;
