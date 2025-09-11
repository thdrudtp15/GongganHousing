'use client';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';

const ScrollDownButton = () => {
  const arrows = [0, 1, 2]; // 화살표 3개

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth',
          });
        }}
        type="button"
        className="flex flex-col items-center font-medium text-white cursor-pointer"
      >
        {/* 텍스트 깜빡이기 */}
        <motion.span
          className="mb-2 text-sm"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Scroll Down
        </motion.span>

        {/* 화살표 애니메이션 */}
        <div className="flex flex-col items-center gap-[2px]">
          {arrows.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -4 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-4, 0, -4],
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              <IoIosArrowDown fontSize={10} />
            </motion.div>
          ))}
        </div>
      </button>
    </div>
  );
};

export default ScrollDownButton;
