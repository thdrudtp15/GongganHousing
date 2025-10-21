import Image from 'next/image';

import logoImg from '@/public/svgs/logo_b.svg';

const Footer = async () => {
  return (
    <footer className="bg-[#202020]  text-white px-[2rem] py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-4">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                className="mb-4 filter brightness-0 invert"
                src={logoImg}
                width={120}
                alt="공간하우징 로고"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">주소</h3>
                <address className="not-italic text-gray-300 text-sm leading-relaxed">
                  충남 계룡시 엄사면 번영로 10, 303호
                </address>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">연락처</h3>
                <div className="space-y-2">
                  <div className="text-gray-300 text-sm">
                    <a href="tel:042-840-8522" className="hover:text-white transition-colors">
                      042-840-8522~3
                    </a>
                  </div>
                  <div className="text-gray-400 text-xs">평일 09:00 - 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">© 2025 공간하우징. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
