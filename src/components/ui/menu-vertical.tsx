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
                    className="group/nav flex items-center gap-4 cursor-pointer text-zinc-900 dark:text-zinc-50"
                    initial="initial"
                    whileHover="hover"
                    onClick={() => onItemClick?.(item.href)}
                >
                    <motion.div
                        variants={{
                            initial: { x: "-100%", color: "inherit", opacity: 0 },
                            hover: { x: 0, color, opacity: 1 },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="z-0"
                    >
                        <ArrowRight strokeWidth={3} className="size-10" />
                    </motion.div>

                    <motion.button
                        variants={{
                            initial: { x: -40, color: "inherit" },
                            hover: { x: 0, color, skewX: skew },
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="font-black text-5xl md:text-7xl no-underline tracking-tighter uppercase italic text-left"
                    >
                        {item.label}
                    </motion.button>
                </motion.div>
            ))}
        </div>
    );
};
