"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

type MenuItem = {
    label: string;
    href: string;
};

interface MenuVerticalProps {
    menuItems: MenuItem[];
    color?: string;
    skew?: number;
    onItemClick?: (href: string) => void;
}

export const MenuVertical = ({
    menuItems = [],
    color = "#ff6900",
    skew = 0,
    onItemClick,
}: MenuVerticalProps) => {
    return (
        <div className="flex w-fit flex-col gap-6 px-10">
            {menuItems.map((item, index) => (
                <motion.div
                    key={`${item.href}-${index}`}
                    className="group/nav flex items-center gap-4 cursor-pointer text-cyan-400"
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap={{ scale: 0.95, opacity: 0.8 }}
                    onClick={() => onItemClick?.(item.href)}
                >
                    <motion.div
                        variants={{
                            initial: { x: -20, opacity: 0 },
                            animate: {
                                x: 0,
                                opacity: 1,
                                transition: { delay: 0.1 * index + 0.3, duration: 0.5 }
                            },
                            hover: { x: 0, color: "#22d3ee", opacity: 1 },
                        }}
                        className="z-0 hidden xs:block"
                    >
                        <ArrowRight strokeWidth={4} className="size-10" />
                    </motion.div>

                    <motion.button
                        variants={{
                            initial: { x: -40, opacity: 0 },
                            animate: {
                                x: 0,
                                opacity: 1,
                                transition: { delay: 0.1 * index + 0.2, duration: 0.6 }
                            },
                            hover: { x: 0, color: "#22d3ee", skewX: skew },
                        }}
                        className="font-[950] text-5xl xs:text-6xl md:text-8xl no-underline tracking-[-0.05em] uppercase italic text-left"
                    >
                        {item.label}
                    </motion.button>
                </motion.div>
            ))}
        </div>
    );
};
