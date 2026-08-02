'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import {
    GithubIcon,
    LinkedinIcon,
    XIcon,
} from '@/components/icons/SocialIcons';

const DOT_COLORS = [
    'bg-yellow-500',
    'bg-blue-500',
    'bg-teal-500',
    'bg-indigo-500',
];

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Me',
        url: '/#about-me',
    },
    {
        name: 'Experience',
        url: '/#my-experience',
    },
    {
        name: 'Projects',
        url: '/#selected-projects',
    },
];

const SOCIAL_ICONS: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    x: XIcon,
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="sticky top-0 z-[4]">
                <button
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    className={cn(
                        'group size-12 absolute top-5 right-5 md:right-10 z-[5] rounded-full',
                        'transition-all duration-300',
                        isMenuOpen
                            ? 'bg-white/[0.06] ring-1 ring-white/10'
                            : 'hover:bg-white/[0.04]',
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ',
                            {
                                'rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ',
                            {
                                '-rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:-rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                </button>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/60 backdrop-blur-md transition-all duration-500',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[560px] max-w-[calc(100vw-2.5rem)] transform translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-[3] overflow-hidden',
                    'flex flex-col py-8 sm:py-10',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                <div
                    className={cn(
                        'absolute inset-0 -z-10 bg-background-light/95 backdrop-blur-2xl border-l border-white/[0.06]',
                    )}
                ></div>
                <div
                    className={cn(
                        'pointer-events-none absolute -top-40 -right-40 -z-10 size-[420px] rounded-full bg-primary/10 blur-[120px] transition-opacity duration-1000',
                        isMenuOpen ? 'opacity-100 delay-300' : 'opacity-0',
                    )}
                ></div>

                <div className="flex flex-col h-full w-full max-w-[380px] mx-8 sm:mx-auto px-1">
                    <div className="grow flex flex-col justify-center gap-12 sm:gap-14">
                        <nav>
                            <p className="text-[11px] font-medium text-muted-foreground tracking-[0.3em] mb-6">
                                MENU
                            </p>
                            <ul className="flex flex-col">
                                {MENU_LINKS.map((link, idx) => (
                                    <li
                                        key={link.name}
                                        className="border-b border-white/[0.06] last:border-none"
                                    >
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? `${150 + idx * 60}ms`
                                                    : '0ms',
                                            }}
                                            className={cn(
                                                'group w-full flex items-center gap-4 py-3.5 sm:py-4 text-left transition-all duration-500 ease-out',
                                                isMenuOpen
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 translate-x-4',
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'size-2 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150',
                                                    DOT_COLORS[
                                                        idx % DOT_COLORS.length
                                                    ],
                                                )}
                                            />
                                            <span className="flex-1 text-2xl sm:text-3xl font-anton uppercase tracking-tight text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
                                                {link.name}
                                            </span>
                                            <ArrowUpRight
                                                size={20}
                                                className="text-muted-foreground opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary"
                                            />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div>
                            <p className="text-[11px] font-medium text-muted-foreground tracking-[0.3em] mb-5">
                                SOCIAL
                            </p>
                            <ul className="flex items-center gap-3">
                                {SOCIAL_LINKS.map((link, idx) => {
                                    const Icon = SOCIAL_ICONS[link.name];
                                    return (
                                        <li key={link.name}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={link.name}
                                                style={{
                                                    transitionDelay: isMenuOpen
                                                        ? `${380 + idx * 60}ms`
                                                        : '0ms',
                                                }}
                                                className={cn(
                                                    'group relative flex size-11 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-all duration-500 ease-out hover:border-primary/40 hover:text-primary hover:-translate-y-1',
                                                    isMenuOpen
                                                        ? 'opacity-100 translate-y-0'
                                                        : 'opacity-0 translate-y-3',
                                                )}
                                            >
                                                {Icon && (
                                                    <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
                                                )}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/[0.06]">
                        <p className="text-[11px] font-medium text-muted-foreground tracking-[0.3em] mb-3">
                            GET IN TOUCH
                        </p>
                        <a
                            href={`mailto:${GENERAL_INFO.email}`}
                            className="group inline-flex items-center gap-2 text-base sm:text-lg text-foreground/90 transition-colors duration-300 hover:text-primary"
                        >
                            <span className="relative">
                                {GENERAL_INFO.email}
                                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                            </span>
                            <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
