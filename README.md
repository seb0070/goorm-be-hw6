# React 쇼핑몰 과제

React + TypeScript + Redux Toolkit 기반 쇼핑몰. 상품 데이터는 [Fake Store API](https://fakestoreapi.com), 로그인은 Firebase Authentication을 사용한다.
제외 범위: 실제 결제, 주문 저장, 배송, 회원 등급, 실제 개인정보 수집.

## 실행 방법

```bash
npm install
cp .env.example .env.local   # Firebase 콘솔에서 발급받은 값 채우기
npm run dev
```

## 오늘(Day 1) 완료 항목

- [x] Vite + React + TypeScript 프로젝트 스캐폴딩
- [x] Redux Toolkit 스토어 구성 (`auth`, `cart`, `productsApi`)
- [x] react-router-dom 라우팅 골격 (`/`, `/product/:id`, `/login`, `/cart`)
- [x] Fake Store API 연동 — 상품 목록 페이지(로딩/에러/빈 상태 처리 포함)
- [x] Firebase 초기화 코드 자리 (`src/firebase/config.ts`) — 콘솔 세팅 전이라 값은 비어 있음
- [x] 로그인 폼 UI 스켈레톤 (제출 로직은 스텁)
- [x] 장바구니 슬라이스 상태 shape만 정의 (리듀서 로직은 Day 6 예정)

## 다음 세션 TODO

- Firebase 콘솔에서 프로젝트 생성 + Authentication(이메일/비밀번호) 활성화 → `.env.local`에 값 채우기
- `src/firebase/config.ts`를 이용해 `authSlice`/`LoginPage`에 실제 로그인 로직 연결
- 상품 상세 페이지(`src/routes/ProductDetailPage.tsx`) 구현
- 장바구니 담기/삭제/수량변경 리듀서 구현 (`src/features/cart/cartSlice.ts`)
