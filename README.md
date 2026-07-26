# React 쇼핑몰 과제

React + TypeScript + Redux Toolkit 기반 쇼핑몰. 상품 데이터는 [Fake Store API](https://fakestoreapi.com), 로그인은 Firebase Authentication을 사용한다.
제외 범위: 실제 결제, 주문 저장, 배송, 회원 등급, 실제 개인정보 수집.

## 실행 방법

```bash
npm install
cp .env.example .env.local   # Firebase 콘솔에서 발급받은 값 채우기
npm run dev
```

## 완료 항목

- [x] Vite + React + TypeScript 프로젝트 스캐폴딩
- [x] Redux Toolkit 스토어 구성 (`auth`, `cart`, `productsApi`)
- [x] react-router-dom 라우팅 골격 (`/`, `/product/:id`, `/login`, `/cart`)
- [x] Fake Store API 연동 — 상품 목록 페이지(로딩/에러/빈 상태 처리, 실패 시 mock 대체)
- [x] 장바구니 담기/수량변경/삭제 (Redux Toolkit, `src/features/cart`)
- [x] Firebase Authentication — Google 로그인/로그아웃, 인증 상태(`loading`/`authenticated`/`unauthenticated`) 반영, 실패 안내

## 다음 세션 TODO

- Firebase 콘솔에서 프로젝트 생성 + Authentication에서 Google 로그인 활성화 → `.env.local`에 실제 값 채우기 (현재는 값이 비어 있어 로그인 버튼을 눌러도 동작하지 않음)
- 상품 상세 페이지(`src/routes/ProductDetailPage.tsx`) 구현
- 장바구니/로그인 페이지 접근 제어(비로그인 시 리다이렉트) 여부 결정
