import Image from 'next/image';

import logoImg from '@/public/svgs/logo_b.svg';

const Footer = async () => {
  return (
    <footer className="bg-(--color-background)  text-white px-[2rem] py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* 로고 및 회사 소개 */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                className="mb-4 filter brightness-0 invert"
                src={logoImg}
                width={120}
                height={48}
                alt="공간하우징 로고"
              />
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  주소
                </h3>
                <address className="not-italic text-gray-300 text-sm leading-relaxed">
                  충남 계룡시 엄사면 번영로 10,
                  303호
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  연락처
                </h3>
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">
                    <a
                      href="tel:042-840-8522"
                      className="hover:text-white transition-colors"
                    >
                      042-840-8522~3
                    </a>
                  </div>
                  <div className="text-gray-400 text-xs">
                    평일 09:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 구분선 및 저작권 */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © 2025 공간하우징. All rights
              reserved.
            </p>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                사업자정보확인
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
