import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { GitFork, Star } from 'lucide-react';
import Link from 'next/link';
import {
    GithubIcon,
    LinkedinIcon,
    XIcon,
} from '@/components/icons/SocialIcons';

const SOCIAL_ICONS: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    x: XIcon,
};

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

const Footer = async () => {
    const repoStats = await fetch(
        'https://api.github.com/repos/Rashid004/Portfolio',
        {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        },
    );
    return (
        <footer className="text-center" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <Link
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-8 hover:underline"
                >
                    {GENERAL_INFO.email}
                </Link>

                <ul className="flex items-center justify-center gap-3 mb-10">
                    {SOCIAL_LINKS.map((link) => {
                        const Icon = SOCIAL_ICONS[link.name];
                        return (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={link.name}
                                    className="group flex size-11 items-center justify-center rounded-full border border-white/10 text-foreground/70 transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-1"
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
        </footer>
    );
};

export default Footer;
