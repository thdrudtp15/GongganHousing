'use client';

/**
 * Hero 컴포넌트 내부에 있는 Scroll Down 컴포넌트
 */
const ScrollDown = () => {
  return (
    <button
      onClick={() => console.log('스크롤 다운')}
      type="button"
      className="absolute bottom-[2rem] font-medium text-[#ffffff] cursor-pointer animate-bounce"
    >
      Scroll Down
    </button>
  );
};

export default ScrollDown;
