'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_CERTIFICATIONS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Certifications = () => {
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

   tl.from('.certification-item', {
    y: 50,
    opacity: 0,
    stagger: 0.2,
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
  <section className="py-section" id="certifications">
   <div className="container" ref={containerRef}>
    <SectionTitle title="Certifications" />

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
     {MY_CERTIFICATIONS.map((item) => (
      <div
       key={`${item.issuer}-${item.title}`}
       className="certification-item group relative flex flex-col gap-4 rounded-2xl border border-background-active bg-background-light/40 p-6 transition-colors hover:border-primary/60"
      >
       <div className="flex items-center justify-between">
        <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-background-light text-primary ring-1 ring-background-active">
         {item.issuerLogo ? (
          <Image
           src={item.issuerLogo}
           alt={item.issuer}
           width={24}
           height={24}
           className="object-contain"
          />
         ) : (
          <Award size={22} />
         )}
        </div>

        {item.credentialUrl && (
         <a
          href={item.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View credential for ${item.title}`}
          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
         >
          <ExternalLink size={18} />
         </a>
        )}
       </div>

       <div>
        <p className="text-xl font-anton leading-snug">{item.title}</p>
        <p className="text-base text-muted-foreground mt-2">{item.issuer}</p>
        <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
       </div>

       {item.credentialUrl && (
        <a
         href={item.credentialUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="mt-auto inline-flex items-center gap-1.5 text-sm text-primary"
        >
         View Credential
         <ExternalLink size={14} />
        </a>
       )}
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default Certifications;
