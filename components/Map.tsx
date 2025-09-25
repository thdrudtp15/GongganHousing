'use client';

import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';

const Map = () => {
  useKakaoLoader();

  return (
    <KakaoMap // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표https://apis.map.kakao.com/web/wizard
        lat: 36.209002905591674,
        lng: 127.22366076877016,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '100%',
      }}
      level={4} // 지도의 확대 레벨
    />
  );
};

export default Map;
