'use client';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

const appKey = process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY;

const useKakaoLoader = () => {
    useKakaoLoaderOrigin({
        appkey: appKey as string,
        libraries: ['clusterer', 'drawing', 'services'],
    });
};

export default useKakaoLoader;
