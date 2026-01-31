import { useState, useEffect } from 'react';

export interface PerformanceProfile {
    isLowEnd: boolean;
    hardwareConcurrency: number;
    deviceMemory?: number;
    isMobile: boolean;
    reducedMotion: boolean;
}

export function usePerformance(): PerformanceProfile {
    const [profile, setProfile] = useState<PerformanceProfile>({
        isLowEnd: false,
        hardwareConcurrency: 4,
        isMobile: false,
        reducedMotion: false,
    });

    useEffect(() => {
        const checkPerformance = () => {
            // 1. Check Hardware
            const concurrency = navigator.hardwareConcurrency || 4;
            // Note: deviceMemory is only available in Chrome/Edge/Opera
            const memory = (navigator as any).deviceMemory || 8;

            // 2. Check Mobile
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

            // 3. Check Reduced Motion preference
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // 4. Determine if Low End
            // Criteria: 
            // - Few CPU cores (<= 4) AND Low memory (<= 4GB)
            // - OR explicitly prefers reduced motion
            const isLowEnd = (concurrency <= 4 && memory <= 4) || reducedMotion || (isMobile && concurrency <= 4);

            setProfile({
                isLowEnd,
                hardwareConcurrency: concurrency,
                deviceMemory: memory,
                isMobile,
                reducedMotion,
            });
        };

        checkPerformance();

        // Optional: Re-check on resize if mobile status changes
        window.addEventListener('resize', checkPerformance, { passive: true });
        return () => window.removeEventListener('resize', checkPerformance);
    }, []);

    return profile;
}
