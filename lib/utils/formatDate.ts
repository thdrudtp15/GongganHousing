// 더 안전한 버전 (에러 처리 포함)
export const formatDate = (
  isoString: string,
): string => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn('날짜 파싱 실패:', error);
    return isoString; // 원본 반환
  }
};
