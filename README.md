# 📝 공간하우징

건축 회사 공간하우징의 웹사이트입니다. 아버지 회사의 웹 사이트를 만들어드리고자 만들어 본 웹사이트입니다. supabase cloudinary 등을 사용하여 풀스택으로 구현 되었습니다. 현재 기능은 완성된 상태이며, 디자인 수정 및 코드 최적화 작업을 진행중입니다.

---

## 🔗 배포 링크

- [링크](https://gongganhousing.vercel.app/)

---

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인 가능합니다.

### 빌드

```bash
npm run build
npm run start
```

---

## ✨ 주요 기능

- 📖 Next.js 15 App Router 기반 풀스택 개발 (CRUD)
- 🔍 Supabase + RLS로 안전한 데이터 관리
- 📱 NextAuth 인증 및 관리자 권한 시스템
- 🌙 Cloudinary 클라우드 서버 용량 비용 감소소를 위한 이미지 압축
- 📜 Nodemailer SMTP 이메일 전송 기능
- 🛡️ Rate Limiting + Turnstile로 메일 스팸 방지

---

## 🛠️ 기술 스택

| Category  | Tech                                     |
| --------- | ---------------------------------------- |
| Frontend  | Next.js, React, TypeScript, Tailwind CSS |
| Backend   | Supabase, Cloudinary                     |
| Libraries | kakao-map, framer-motion, zod 등         |

---

## 📝 구현 기능

### 📖 관리자 인증 시스템

- NextAuth.js Google OAuth 인증
- 관리자만 포트폴리오 + 등록/수정/삭제 가능
- 서버사이드 세션 검증

### 🔍 시공 사례 등록 및 수정

- 최대 10개 이미지 업로드
- zod 스키마로 입력 검증

### 📝 시공 사례 관리 (CRUD)

**이미지 최적화**

- browser-image-compression으로 클라이언트에서 이미지 압축 작업
- 자동 압축: 최대 0.7MB, JPEG 포맷 변환
- Cloudinary 용량 비용 절감 효과

**데이터 캐싱**

- `unstable_cache` 함수를 사용한 시공 사례 목록 캐싱
- `cache` 함수를 활용한 중복 호출 제거

### 📧 상담 문의 시스템

**보안기능**

- Cloudflare Turnstile을 활용하여 봇 이메일 전송 차단
- IP기반 Rate Limiting : 10분 내 같은 IP 3회 제출 차단
- zod 스키마 검증으로 입력 데이터 검증증

**이메일 발송**

- `Nodemailer SMTP`를 이용한 이메일 발송 기능
- 첨부파일 포함
- 발송 성공 및 실패 DB 기록록

### 🗺️ 위치 안내

**카카오맵 연동**

- React Kakao Maps SDK 사용
- 회사 위치 표시 및 반응형 지도

---

## 📚 문제 해결

### **이미지 업로드 최적화** :

초기에는 시공 사례 이미지 업로드 시 원본 이미지를 그대로 업로드하면서 Cloudinary 저장 용량이 빠르게 증가하는 문제가 있었습니다.

이를 해결하기 위해 **browser-image-compression** 라이브러리를 도입하여
클라이언트 측에서 이미지를 0.7MB 이하로 사전 압축하도록 구현했습니다.

그 결과, Next.js 서버로 전송되는 요청 크기가 **60%** 감소했고,
Cloudinary 저장 용량 또한 크게 절감할 수 있었습니다.
이를 통해 클라우드 비용 최적화와 빠른 업로드 속도를 동시에 달성했습니다.

### **이메일 스팸 방지 시스템**

상담 및 문의 폼은 스팸 타겟이 될 수도 있다고 생각했습니다.

이를 방지하기 위해 **Cloudflare Turnstile**로 1차 필터링하고, **Rate Limiting**을 통해 동일한 IP의 과도한 요청 차단 작업을 진행하였습니다.

### **인증 시스템 개선**

초기에는 **supabase Auth**를 사용했으나, 빌드 시 모든 라우트가 다이나믹 라우트로 변환되고 , 매번 Supabase 클라이언트를 생성해야 하는 등
**반복적인 코드가 증가**하는 문제가 있었습니다.

이를 해결하기 위해 **NextAuth** 세션 기반 인증으로 전환했습니다.
서버와 클라이언트 양쪽에서 더 간결하고 통일된 방식으로
인증 상태를 관리할 수 있게 되었습니다.

동시에 Supabase RLS는 그대로 유지하여 데이터베이스 레벨에서의
추가 권한 검증을 보장했습니다.

#### 메타데이터 중복 요청 최적화

시공 사례 상세 페이지에서 메타데이터 생성을 위해 동일한 데이터를 2번 가져와야 하는 문제가 있었습니다. **React**의 **cache** 함수를 도입하여 요청을 1회로 줄이고 불필요한 중복을 제거했습니다.

### **메타데이터 중복 요청 최적화**

시공 사례 상세 페이지에서 메타데이터 생성을 위해 동일한 데이터를 2번 가져와야 하는 문제가 있었습니다. React의 cache 함수를 도입하여 요청을 1회로 줄이고 불필요한 중복을 제거했습니다.

### **데이터 캐싱을 통한 성능 개선**

초기에는 시공 사례 조회 시 매번 데이터베이스에 직접 요청하여 서버 부하와 느린 응답 속도 문제가 있었습니다. **Next.js**의 **unstable_cache**를 활용해 자주 조회되는 데이터를 캐싱한 결과, 시공 사례 목록 및 상세 페이지의 로딩 속도를 약 **25%** 개선했습니다.

![스크린샷 2025-10-17 171744](https://res.cloudinary.com/dtodrrwy8/image/upload/v1760690004/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-10-17_171744_bx46pz.png)
![스크린샷 2025-10-17 171758](https://res.cloudinary.com/dtodrrwy8/image/upload/v1760690004/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-10-17_171758_job0r3.png)

## 성능 지표

![스크린샷 2025-10-17 172412](https://res.cloudinary.com/dtodrrwy8/image/upload/v1760690004/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2025-10-17_172412_zc1zv1.png)

---

## 🚧 개발 중

### 시공 사례 업로드 로직 개선

- 가독성이 떨어지는 로직 개선
- 에러 처리 추가 작업

---
