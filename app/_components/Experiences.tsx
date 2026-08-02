'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
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

            tl.from('.experience-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
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
        <section className="py-section" id="my-experience">
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="grid gap-14">
                    {MY_EXPERIENCE.map((item) => (
                        <div
                            key={`${item.company}-${item.title}`}
                            className="experience-item"
                        >
                            <div className="flex items-center gap-3">
                                {item.logo && (
                                    <Image
                                        src={item.logo}
                                        alt={item.company}
                                        width={28}
                                        height={28}
                                        className="rounded-md"
                                    />
                                )}
                                <p className="text-xl text-muted-foreground">
                                    {item.company}
                                </p>
                            </div>
                            <p className="text-5xl font-anton leading-none mt-3.5 mb-2.5">
                                {item.title}
                            </p>
                            <p className="text-lg text-muted-foreground">
                                {item.duration}
                            </p>

                            {item.description && (
                                <ul className="mt-6 space-y-2.5 max-w-[720px] list-disc list-inside text-muted-foreground">
                                    {item.description.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            )}

                            {item.skills && (
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {item.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-sm px-3 py-1 rounded-full border border-background-active text-muted-foreground"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
