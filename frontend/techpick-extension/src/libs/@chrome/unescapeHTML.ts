export const unescapeHTML = (string: string): string => {
  const htmlEntities: { [key: string]: string } = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&yen;': '¥',
    '&cent;': '¢',
    '&mdash;': '—',
    '&ndash;': '–',
    '&plusmn;': '±',
    '&times;': '×',
    '&divide;': '÷',
    '&deg;': '°',
    '&frac12;': '½',
    '&frac14;': '¼',
    '&frac34;': '¾',
    '&sup2;': '²',
    '&sup3;': '³',
    '&micro;': 'µ',
  };

  /**
   * @description HTML 엔티티를 매칭하기 위한 정규 표현식 패턴
   *
   * 이 정규식은 두 가지 유형의 HTML 엔티티를 매칭합니다:
   * 1. 이름 엔티티: &로 시작하고 ;로 끝나는 문자열 (예: &lt;, &amp;)
   * 2. 숫자 엔티티: &#로 시작하고 ;로 끝나는 숫자 시퀀스 (예: &#39;)
   *
   * 패턴 설명:
   * - &[a-z0-9]+; : 이름 엔티티 매칭
   *   - & : 엔티티 시작
   *   - [a-z0-9]+ : 하나 이상의 소문자 또는 숫자
   *   - ; : 엔티티 종료
   *
   * - &#[0-9]+; : 숫자 엔티티 매칭
   *   - &# : 숫자 엔티티 시작
   *   - [0-9]+ : 하나 이상의 숫자
   *   - ; : 엔티티 종료
   *
   * 플래그:
   * - g : 전역 검색 (모든 매칭을 찾음)
   * - i : 대소문자 구분 없음
   */
  const entityPattern = /&[a-z0-9]+;|&#[0-9]+;/gi;

  return string.replace(entityPattern, (match: string): string => {
    if (match in htmlEntities) {
      return htmlEntities[match];
    } else if (match.startsWith('&#')) {
      // 숫자 엔티티 처리
      const numericCode = match.slice(2, -1);
      return String.fromCharCode(parseInt(numericCode, 10));
    }
    return match; // 알 수 없는 엔티티는 그대로 반환
  });
};
