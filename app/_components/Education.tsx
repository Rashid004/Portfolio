'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EDUCATION } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { GraduationCap, School } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LEVEL_ICON = {
    degree: GraduationCap,
    school: School,
};

const Education = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.education-item', {
                x: -50,
                opacity: 0,
                stagger: 0.3,
            });

            tl.from(
                '.education-line',
                {
                    scaleY: 0,
                    transformOrigin: 'top',
                },
                0,
            );
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="pb-section" id="education">
            <div className="container" ref={containerRef}>
                <SectionTitle title="Education" />

                <div className="relative">
                    <div className="education-line absolute left-[23px] top-2 bottom-2 w-px bg-background-active" />

                    <div className="grid gap-14">
                        {MY_EDUCATION.map((item) => {
                            const Icon = LEVEL_ICON[item.level];

                            return (
                                <div
                                    key={item.degree}
                                    className="education-item relative flex gap-6 pl-0"
                                >
                                    <div className="relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-background-light text-primary ring-1 ring-background-active">
                                        <Icon size={22} />
                                    </div>

                                    <div className="pt-1">
                                        <p className="text-xl text-muted-foreground">
                                            {item.institute}
                                        </p>
                                        <p className="text-3xl sm:text-4xl font-anton leading-none mt-3 mb-2.5">
                                            {item.degree}
                                        </p>
                                        <p className="text-lg text-muted-foreground">
                                            {item.duration}
                                        </p>
                                        {item.grade && (
                                            <p className="text-lg text-primary mt-1">
                                                {item.grade}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
