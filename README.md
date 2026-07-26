# 과제 6. React 쇼핑몰 앱 만들기

## 1. 과제 소개

| 항목 | 내용 |
|---|---|
| 과정명 | AI SW 장기교육 |
| 선수 강의 | 따라하며 배우는 리액트 A-Z |
| 핵심 기술 | React, 전역 상태관리(Redux Toolkit), Firebase Authentication |
| 상품 데이터 | Fake Store API (실패 시 mock 대체) |
| 선택 기술 | TypeScript |
| 결과 예시 | https://drive.google.com/file/d/1fUeCYpSu0H_BU154iN7t1IHM37cDo6mz/view?usp=sharing |

### 한 줄 소개

> 이 프로젝트는 **Google 계정을 가진** 사용자가 상품을 조회하고 Firebase로 로그인하며, 원하는 상품을 전역 장바구니에 담아 예상 총액을 확인할 수 있는 React 쇼핑몰입니다.

### 결과 예시와 다른 점

- 참고한 기능 흐름: _(작성 필요 — 위 Drive 링크 시청 후 비교해서 채워주세요)_
- 다르게 설계한 UI·기능: _(작성 필요)_
- 복제하지 않은 이미지·브랜드·문구: _(작성 필요)_

## 2. 실행 화면

| 화면 | 파일·링크 | 설명 |
|---|---|---|
| 상품 목록·로딩 | `./screenshots/products.png` _(작성 필요)_ | |
| 로그인·인증 상태 | `./screenshots/auth.png` _(작성 필요)_ | |
| 장바구니·총액 | `./screenshots/cart.png` _(작성 필요)_ | |
| 오류·빈 상태·선택 기능 | _(작성 필요)_ | |

```md
![상품 목록](./screenshots/products.png)
![로그인 상태](./screenshots/auth.png)
![장바구니](./screenshots/cart.png)
```

> `screenshots/` 폴더가 아직 없습니다. 직접 실행해서 캡처한 뒤 추가해 주세요.

### 실시간 응시와 최종 보완 비교

커밋 히스토리 기준으로 정리했습니다.

| 항목 | 스캐폴딩 직후(`e2a4198`) | 최종(현재) | 보완 내용 |
|---|---|---|---|
| 데이터·상태·인증 설계 | store/라우팅 골격만, auth·cart는 상태 shape만 정의 | 전부 구현 | auth를 `status/user/error` 3필드로, cart를 `productId/quantity`만 저장하도록 확정 |
| 전역 장바구니 | 리듀서 없음(빈 슬라이스) | `addItem`/`updateQuantity`/`removeItem` + selector로 총액·조인 계산 (`c0f049c`) | 중복 상품 재추가 시 수량 병합, 최소 수량 1 정책 반영 |
| Firebase 인증 | config 파일 자리만(값 없음) | Google 로그인/로그아웃, `onAuthStateChanged` 리스너로 세션 동기화 (`db2e29a`) | 로그인 실패 안내, 초기 로딩 상태 구분 |
| 상품 API·대체 경로 | Fake Store API 직접 연동만 | 실패 시 mock 자동 대체 + 배너, 이미지 깨짐 시 placeholder | API 응답을 내부 `Product` 타입으로 매핑하는 계층 분리 |
| README·테스트 | 체크리스트 수준 메모 | 이 문서 + 통합 검토(섹션 12) | 코드 리뷰로 상태 소유권 중복 여부 점검 |

## 3. 구현 기능

### 필수 기능

| 기능 | 상태 | 확인 방법 | 비고 |
|---|---|---|---|
| 상품 데이터 조회 또는 mock 대체 | ☑ 완료 | `/` 접속 → 상품 목록 렌더 확인 | `productsApi.ts` + `mockProducts.ts` |
| loading·error·empty | ☑ 완료 | 느린 네트워크 재현, API 요청 차단 재현 | `ProductListPage.tsx` |
| 상품 목록·카드 | ☑ 완료 (단, 카드가 별도 컴포넌트로 분리되어 있지 않음) | `/` 화면 확인 | `ProductListPage.tsx` 내 `<li>`로 인라인 구현 (의도적으로 유지) |
| 전역 상태관리 라이브러리 | ☑ 완료 | `src/app/store.ts` 확인 | Redux Toolkit |
| 장바구니 담기·목록 | ☑ 완료 | 상품 목록에서 "담기" → `/cart` 확인 | `cartSlice.ts`, `CartPage.tsx` |
| 총액 계산 | ☑ 완료 | 여러 상품 담고 총액 비교 | `selectCartTotal` |
| Firebase 로그인 | ☑ 완료 | `/login`에서 Google 로그인 | `googleAuth.ts` |
| 인증 초기·사용자 상태 | ☑ 완료 (초기 로딩 시 화면 표시는 미흡, 아래 한계 참고) | 새로고침 시 헤더 상태 변화 관찰 | `authSlice.ts`, `authListener.ts` |
| 로그인 오류·로그아웃 | ☑ 완료 | 로그인 팝업 닫아서 에러 확인, 로그아웃 클릭 | `LoginPage.tsx`, `App.tsx` |

### 권장 기능

| 기능 | 상태 | 설명 |
|---|---|---|
| 수량 변경 | ☑ 완료 | `CartPage.tsx`의 수량 입력, 0 이하 입력 시 1로 유지 |
| 항목 삭제 | ☑ 완료 | `CartPage.tsx` 삭제 버튼, 다른 항목은 유지 |
| 빈 장바구니 안내 | ☑ 완료 | 빈 상태에서 "장바구니가 비어 있습니다" + 총액 0원 표시 |
| API 다시 시도 | ☐ 미구현 | 실패 시 자동으로 mock 대체는 되지만, 사용자가 누르는 "재시도" 버튼은 없음 |
| 인증 로딩 UX | ☐ 미구현 | `status==='loading'`일 때 헤더가 완전히 빈 상태로 렌더됨(스피너/텍스트 없음) |
| 로그인 전후 UI | ☑ 완료 | 헤더가 "로그인" 링크 ↔ 사용자 이름+로그아웃 버튼으로 전환 |

### 도전 기능

| 기능 | 상태 | 적용 범위·효과 |
|---|---|---|
| TypeScript | ☑ 적용 | 프로젝트 전체 (`.ts`/`.tsx`), `any` 미사용 |
| 검색 | ☐ 미적용 | |
| 카테고리 필터 | ☐ 미적용 | Fake Store API 카테고리 값은 매핑되어 있으나 필터 UI는 없음 |
| LocalStorage | ☐ 미적용 | 장바구니는 메모리(Redux)에만 있어 새로고침하면 초기화됨 |
| 수량 배지 | ☐ 미적용 | `selectCartItemCount` selector는 이미 구현돼 있지만 헤더 등 어디에도 연결 안 함 |
| 반응형·접근성 | ☐ 미적용 (부분) | 이미지 `alt`, 에러 `role="alert"/"status"`는 있으나 반응형 CSS/미디어 쿼리는 없음 |

## 4. 상품 데이터 구조

- 표준 endpoint: `https://fakestoreapi.com/products`
- 실제 사용 경로: **API 우선, 실패 시 mock 대체** (`isError`일 때만 mock으로 전환)
- mock을 사용한 경우 이유: API 호출 실패(네트워크 오류, 응답 형식 이상 등) 시 화면이 완전히 막히지 않도록 하기 위한 fallback. 평소에는 실제 API 데이터를 사용함
- 사용한 응답 필드: `id`, `title`, `price`, `description`, `category`, `image` (`rating`은 화면에 안 쓰여서 매핑에서 제외)
- 내부 product 변환 위치: `src/features/products/mapToProduct.ts` (`mapToProduct`/`mapToProducts`), `productsApi.ts`의 `transformResponse`에서 호출

### `product`

| 필드 | 자료형 | 원본 필드 | 사용 위치 | 검증 |
|---|---|---|---|---|
| id | number | id | 목록 key, 라우팅(`/product/:id`), cart 조인 | 없음(그대로 통과) |
| name | string | title | 목록/상세 표시 | 없음 |
| price | number | price | 목록 가격, 장바구니 총액 계산 | `Number()` 캐스팅 후 `NaN`이면 해당 상품 목록에서 제외 |
| imageUrl | string | image | `<img src>` | `onError`로 깨진 이미지 → `placeholder-product.svg` 대체 |
| category | string | category | 목록 표시 | 없음 |
| description | string | description | 상세 표시 예정(현재 상세 페이지 미구현, 아래 한계 참고) | 없음 |

### API 상태

| 상태 | 화면 처리 |
|---|---|
| loading | "상품을 불러오는 중..." 텍스트 |
| success | 상품 목록 렌더 |
| error | mock 데이터로 자동 대체 + "일시적으로 예시 데이터를 표시하고 있습니다" 배너 |
| empty | "표시할 상품이 없습니다" (Fake Store API가 항상 배열을 주기 때문에 실제로는 거의 발생하지 않음) |
| mock fallback | API와 동일한 UI(같은 `<ul>` 렌더 로직) 재사용, mock 상품 `id`는 음수(-1~-4)로 실제 상품과 구분 |

## 5. 전역 상태관리 구조

- 사용 라이브러리: **Redux Toolkit** (`@reduxjs/toolkit`) + `react-redux`, API 데이터는 RTK Query(`createApi`)
- Redux Toolkit을 사용하지 않은 경우 선택 이유: 해당 없음(Redux Toolkit 사용)
- store 위치: `src/app/store.ts`
- cart slice 또는 상태 모듈: `src/features/cart/cartSlice.ts` (상태), `src/features/cart/cartSelectors.ts` (파생값)
- Provider 연결 위치: `src/main.tsx`
- 총액 계산 위치: `cartSelectors.ts`의 `selectCartTotal` (state에 총액 필드를 따로 저장하지 않음)

### `cartItem`

| 필드 | 자료형 | 값의 출처 | 변경 규칙 |
|---|---|---|---|
| productId | number | 담기 버튼 클릭 시 `product.id` | 값 자체는 불변, 이 필드로 기존 항목 존재 여부 판단 |
| quantity | number | 최초 담기 시 1(또는 지정값), 이후 수량 변경 입력 | `updateQuantity`는 1 미만 입력을 1로 clamp, `addItem`은 기존 항목이 있으면 가산 |

### action·selector

| 구분 | 이름 | 역할 | 테스트 |
|---|---|---|---|
| action | `addItem` | 상품 담기. 같은 `productId`면 수량 가산, 없으면 새 라인 추가 | 같은 상품 2번 담기 → 라인 1개, quantity 2 확인 |
| action | `updateQuantity` | 특정 상품 수량을 지정값으로 교체(가산 아님), 0 이하는 1로 clamp | 수량 입력에 0 넣기 → 1로 유지되는지 확인 |
| action | `removeItem` | 특정 상품을 장바구니에서 제거 | 2개 담은 상태에서 1개 삭제 → 나머지 1개 유지 확인 |
| selector | `selectCartLineItems` | `cart.items` + 상품 카탈로그(RTK Query 캐시)를 조인해 이름/가격/소계 붙임 | 상품 목록을 한 번 본 뒤 담기 → `/cart`에서 이름/가격 표시 확인 |
| selector | `selectCartTotal` | `selectCartLineItems`의 소계 합산 | 여러 상품 담고 화면 총액과 직접 계산한 값 비교 |

> `selectCartItemCount`(전체 수량 합)도 구현돼 있으나 UI에는 아직 연결하지 않았습니다(수량 배지 도전 기능 미적용과 연결).

### 장바구니 정책

| 항목 | 선택 |
|---|---|
| 같은 상품 재추가 | 새 라인을 만들지 않고 기존 라인의 `quantity`만 가산 |
| 최소 수량 | 1 |
| 수량 0 처리 | 삭제하지 않고 1로 유지(clamp). 삭제는 반드시 별도의 `removeItem`으로만 수행 |
| 로그아웃 시 cart | 유지됨 — `cartSlice`가 `auth` state를 참조하지 않아 로그아웃 로직이 cart를 건드리지 않음 |
| 저장 방식 | 메모리 (Redux state, 새로고침하면 초기화 — LocalStorage 미사용) |

## 6. Firebase Authentication

- 로그인 방식: Google (`signInWithPopup` + `GoogleAuthProvider`)
- 인증 상태 관리 위치: `src/features/auth/authSlice.ts`(상태) + `src/features/auth/authListener.ts`(Firebase→Redux 동기화)
- 로그인 성공 화면: 헤더가 "로그인" 링크에서 `표시 이름(또는 이메일) + 로그아웃 버튼`으로 전환 (`App.tsx`)
- 로그인 실패 안내: `/login`에 "Google 로그인에 실패했습니다. 다시 시도해 주세요." 문구 표시 (`role="alert"`)
- 인증 초기 로딩: `status: 'loading'` 상태로 시작, `onAuthStateChanged` 최초 콜백 전까지 유지 (다만 화면에는 별도 로딩 표시가 없어 헤더가 잠깐 비어 보임 — 알려진 한계)
- 로그아웃 처리: `signOutUser()` → `onAuthStateChanged`가 `null` 콜백 → `status: 'unauthenticated'`로 갱신

### `authUser`

| 필드 | 사용 | 화면 표시 | 개인정보 보호 |
|---|:---:|:---:|---|
| uid | ✅ | ❌ | Redux state 내부 식별용으로만 사용, 화면·로그에 노출 안 함 |
| displayName | ✅ | ✅ | 헤더에 표시(로그인한 본인에게만 보임) |
| email | ✅ | ✅ (`displayName`이 없을 때만 대체 표시) | 헤더에 표시(로그인한 본인에게만 보임), 저장소에 영속화 안 함(메모리만) |
| photoURL | ❌ | ❌ | 아예 매핑하지 않음(`authListener.ts`의 `toAuthUser`가 uid/displayName/email만 추출) |

### 인증 흐름

```text
앱 시작
→ authListener가 onAuthStateChanged 구독 (status: loading)
→ Firebase가 세션 유무 판별 → authenticated 또는 unauthenticated
→ 로그인(Google 팝업) 성공 시 리스너가 다시 authenticated로 갱신
   실패 시 error 필드만 별도로 채움(세션 상태는 그대로 유지)
→ 헤더에 사용자 상태 표시
→ 로그아웃 → signOut → 리스너가 unauthenticated로 갱신
```

## 7. 사용 기술

| 구분 | 기술 | 버전 | 사용 이유 |
|---|---|---|---|
| UI | React | 19.2.7 | 과제 필수 요구사항 |
| 전역 상태 | Redux Toolkit / react-redux | 2.12.0 / 9.3.0 | 과제 필수 요구사항(전역 상태관리), RTK Query로 API 캐싱까지 함께 처리 |
| 인증 | Firebase Authentication | firebase 12.16.0 | 과제 필수 요구사항, Google 로그인만 사용 |
| 상품 데이터 | Fake Store API / mock | — | 과제 권장 데이터 소스 |
| 스타일 | 기본 브라우저 스타일(커스텀 CSS 거의 없음) | — | 기능 구현 우선, 스타일링은 아직 다듬지 않음(한계 참고) |
| 언어 | TypeScript | ~6.0.2 | 선택 기술로 채택, 전체 코드에 적용 |
| AI 도구 | Claude Code (Sonnet 5) | — | 설계 상담, 코드 구현, 코드 리뷰 전 과정에 사용 |

## 8. 설치·환경 변수·실행

### 요구 환경

- Node.js: v22.16.0 (개발 환경 기준, `.nvmrc` 등 버전 고정 파일은 없음)
- 패키지 관리자: npm 10.9.2
- 브라우저: 개발 중 별도 브라우저 호환성 테스트는 하지 않음 _(작성 필요 — 실제 테스트한 브라우저 기재)_
- Firebase 인증 제공자: Google
- Firebase Authorized Domain 확인: 배포할 도메인을 Firebase 콘솔 Authentication → Settings → 승인된 도메인에 반드시 추가해야 함(로컬은 보통 `localhost` 기본 포함)

### 설치와 실행

```bash
npm install
cp .env.example .env.local   # Firebase 콘솔 값 채우기
npm run dev
```

### `.env.example`

실제 값 대신 자리표시자만 작성합니다.

```env
VITE_FIREBASE_API_KEY=replace_with_your_value
VITE_FIREBASE_AUTH_DOMAIN=replace_with_your_value
VITE_FIREBASE_PROJECT_ID=replace_with_your_value
VITE_FIREBASE_STORAGE_BUCKET=replace_with_your_value
VITE_FIREBASE_MESSAGING_SENDER_ID=replace_with_your_value
VITE_FIREBASE_APP_ID=replace_with_your_value
```

> service account JSON, Admin SDK private key, 비밀번호, access token은 포함하지 않습니다. (실제 `.env.local`은 `.gitignore`로 커밋에서 제외되어 있음을 확인했습니다.)

### 실행 확인

1. 개발 서버가 실행됩니다. — 확인됨(`npm run dev`, 빌드 통과)
2. 인증 초기 상태가 표시됩니다. — 코드상 확인됨(헤더가 로딩 중엔 비어있음, 시각적 표시는 미흡)
3. 로그인·실패 안내·로그아웃이 동작합니다. — 로그인/로그아웃 실제 동작 확인됨(직접 테스트 완료), 실패 안내는 코드 확인
4. API 또는 mock 상품이 표시됩니다. — 코드 확인됨
5. 장바구니와 총액이 전역 상태로 동작합니다. — 코드 확인됨
6. console에 치명적 오류가 없습니다. — `tsc --noEmit`/`npm run build` 기준 확인됨, 전체 시나리오 수동 클릭 테스트는 섹션 13 참고

## 9. 폴더·파일 구조

```text
project/
├─ README.md
├─ package.json
├─ .env.example
├─ src/
│  ├─ app/
│  │  ├─ store.ts
│  │  └─ hooks.ts
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ authSlice.ts
│  │  │  ├─ authListener.ts
│  │  │  └─ LoginPage.tsx
│  │  ├─ cart/
│  │  │  ├─ cartSlice.ts
│  │  │  └─ cartSelectors.ts
│  │  └─ products/
│  │     ├─ types.ts
│  │     ├─ mapToProduct.ts
│  │     ├─ mockProducts.ts
│  │     ├─ productsApi.ts
│  │     └─ ProductListPage.tsx
│  ├─ firebase/
│  │  ├─ config.ts
│  │  └─ googleAuth.ts
│  ├─ routes/
│  │  ├─ router.tsx
│  │  ├─ ProductDetailPage.tsx
│  │  └─ CartPage.tsx
│  ├─ App.tsx
│  └─ main.tsx
└─ public/
   └─ placeholder-product.svg
```

| 파일·폴더 | 역할 | 내가 수정한 내용 |
|---|---|---|
| `src/app/store.ts` | Redux store 구성(`auth`/`cart`/`productsApi` 등록) | _(작성 필요)_ |
| `src/features/products/` | 상품 API 연동, 내부 타입 변환, mock, 목록 화면 | _(작성 필요)_ |
| `src/features/cart/` | 장바구니 상태(reducer)와 파생값(selector) | _(작성 필요)_ |
| `src/features/auth/` + `src/firebase/` | Firebase Google 로그인/로그아웃, 인증 상태 동기화 | _(작성 필요)_ |
| `src/routes/` | 라우트별 페이지(장바구니, 상품 상세는 아직 placeholder) | _(작성 필요)_ |

## 10. 데이터·상태 흐름

```text
Fake Store API 또는 mock
→ mapToProduct(s)로 내부 Product 변환
→ ProductListPage
→ dispatch(addItem({ productId }))
→ 전역 cart state (cartSlice)
→ selectCartLineItems / selectCartTotal
→ CartPage

Firebase Authentication (Google)
→ onAuthStateChanged 리스너 (authListener)
→ authSlice(status/user/error)
→ 초기(loading)·로그인(authenticated)·비로그인(unauthenticated)·오류 UI
```

## 11. AI 활용 기록

| 번호 | 목적 | AI 도구 | 프롬프트 요약 | 결과 활용 | 내가 수정한 부분 |
|---:|---|---|---|---|---|
| 1 | 요구사항·설계 | Claude Code | 공식 요구사항을 필수/권장/선택으로 구분하고, 1시간 착수~10일 제출 일정과 데이터·상태·인증·API·UI 작업 순서 요청 | 그대로 채택, 이후 작업 순서의 기준으로 사용 | _(작성 필요)_ |
| 2 | Redux 상태 | Claude Code | cart state/CartItem 구조, action·상태변경 규칙, 원본값·selector 파생값 구분, 중복상품·최소수량 정책을 먼저 설계로 확인 후 구현 요청 | 설계안 그대로 구현 | _(작성 필요)_ |
| 3 | Firebase 인증 | Claude Code | Google 로그인 방식으로 설정·파일 역할, 인증 상태 흐름(loading/authenticated/unauthenticated/error 구분)을 먼저 설계로 확인 후 구현 요청 | 설계안 그대로 구현, 에러 처리는 `createAsyncThunk` 대신 컴포넌트 `try/catch` 방식 선택 | _(작성 필요)_ |
| 4 | 상품 API | Claude Code | Fake Store API 응답 → 내부 product 매핑표, price는 number 유지, loading/error/empty, mock 대체, 이미지 실패 처리 설계 후 구현 | 설계안 그대로 구현 | _(작성 필요)_ |
| 5 | 통합 검토·오류 | Claude Code | 상품 API·전역 장바구니·Firebase 인증을 통합 검토(상태 소유 위치, 중복 상태, action/reducer/selector 책임, 보안/개인정보, 과도한 파일·라이브러리) 요청 | 발견된 문제(죽은 파일 4개) 삭제 반영, 경미한 auth 이슈 3건은 보류 결정 | _(작성 필요)_ |

### 대표 프롬프트 1

```text
React 쇼핑몰 장바구니를 Redux Toolkit으로 관리하려고 합니다.
필수 동작: 상품 담기, 같은 상품 재추가, 장바구니 목록, 총액
최종 보완: 수량 변경, 삭제
요청:
1. cart state와 cartItem 구조
2. action과 상태 변경 규칙
3. 저장할 원본 값과 selector 파생값 구분
4. 중복 상품·최소 수량 정책
5. 정상·빈·중복·경계 테스트
6. 아직 코드 작성 금지
```

### 대표 프롬프트 2

```text
상품 API, 전역 장바구니, Firebase 인증을 통합 검토해줘.
검토: 상품·cart·auth 상태 소유 위치 / 중복 상태 / action·reducer·selector 책임 /
API loading·error·empty / auth loading·success·error·logout / 총액·수량 /
결제·주문·개인정보·비밀정보 없음 / 과도한 파일·라이브러리 없음
출력: 통과, 중요 문제, 수정 순서, 재테스트
```

## 12. AI 생성 결과 검토

| 항목 | 결과 | 수정 |
|---|---|---|
| 전역 상태 사용 | ☑ 통과 | — |
| action·reducer·selector | ☑ 통과 | cart 리듀서에 총액 계산 로직을 넣지 않고 selector로만 분리 |
| Firebase 실제 인증 | ☑ 통과 | 실제 Google 로그인으로 동작 확인 완료 |
| 인증 초기·오류·로그아웃 | ☐ 보완 (경미, 의도적 보류) | 로딩 인디케이터 없음, `/login` 재진입 시 이전 에러 안 지워짐, 로그아웃 실패 시 안내 없음 — 3건 모두 치명적이지 않아 보류 |
| API loading·error·empty | ☑ 통과 | — |
| 총액·수량 | ☑ 통과 | 빈 장바구니일 때 총액 줄이 아예 안 보이던 버그 발견 후 수정 |
| 비밀정보·개인정보 | ☑ 통과 | `.env.local` gitignore 확인, service account/Admin key 코드 없음, UID 미노출 확인 |
| 과도한 구현 | ☑ 통과(수정 후) | Vite 스캐폴딩 잔재 죽은 파일 4개(`App.css`, `hero.png`, `react.svg`, `vite.svg`) 삭제 |

## 13. 테스트 기록

| 번호 | 시나리오 | 기대 결과 | 실제 결과 | 통과 |
|---:|---|---|---|:---:|
| 1 | 최초 실행 | 인증·상품 loading | 코드 확인됨(수동 클릭 테스트 필요) | ☐ |
| 2 | 로그인 성공 | 사용자 상태 표시 | 실제 Google 로그인으로 확인 완료 | ☑ |
| 3 | 로그인 실패 | 오류 안내 | 코드 확인됨(팝업 강제로 닫아서 재확인 필요) | ☐ |
| 4 | 로그아웃 | 비로그인 상태 | 코드 확인됨(수동 클릭 테스트 필요) | ☐ |
| 5 | API 성공 | 상품 목록 | 코드 확인됨 | ☐ |
| 6 | API 실패·대체 | 오류·mock | 코드 확인됨(네트워크 차단 재현 필요) | ☐ |
| 7 | 상품 2개 담기 | cart·total 일치 | 코드 확인됨 | ☐ |
| 8 | 빈 cart | 0원·오류 없음 | 코드 확인됨(8-9 점검에서 버그 발견 후 수정) | ☐ |

> ☐ 표시된 항목은 로직상으로는 확인했지만 브라우저에서 직접 클릭해보며 통과 여부를 최종 체크해야 합니다.

## 14. 오류 해결 기록

| 번호 | 영역 | 오류 메시지 | 원인 | 수정 | 재실행 |
|---:|---|---|---|---|---|
| 1 | — | 현재까지 보고된 치명적 오류 없음 | — | — | — |

> 실행하다가 에러가 나면 이 표에 기록해 두세요.

## 15. 보안·개인정보·저작권

| 항목 | 확인 |
|---|:---:|
| `.env` 실제 값·service account를 커밋하지 않았습니다. | ☑ |
| 비밀번호·토큰·Admin private key가 없습니다. | ☑ |
| 실제 이메일·UID·주소·전화번호가 캡처에 없습니다. | ☐ (아직 스크린샷 없음 — 캡처 시 본인 계정 정보가 보이지 않게 확인 필요) |
| 실제 결제·주문·배송·회원 등급이 없습니다. | ☑ |
| 결과 예시를 그대로 복제하지 않았습니다. | ☐ (Drive 영상 시청 후 직접 확인 필요) |
| 이미지·브랜드·문구 사용 범위를 확인했습니다. | ☑ (Firebase 기본 Google 로그인 버튼 외 브랜드 자산 없음) |
| 레포·Drive·배포 링크 권한을 확인했습니다. | ☐ (배포 전) |

### 외부 자료

| 자료 | 출처 | 사용 범위 |
|---|---|---|
| Fake Store API | https://fakestoreapi.com/products | 상품 데이터 실습 |
| 결과 예시 | https://drive.google.com/file/d/1fUeCYpSu0H_BU154iN7t1IHM37cDo6mz/view?usp=sharing | 기능 흐름 참고 |

## 16. 배운 점·한계·다음 개선

1. _(작성 필요 — 본인의 학습 경험을 직접 정리해 주세요)_
2. _(작성 필요)_
3. _(작성 필요)_

### JavaScript 또는 TypeScript

- 사용 언어: TypeScript
- TypeScript 적용 범위: 프로젝트 전체(`src/**/*.ts(x)`)
- 정의한 타입: `Product`/`FakeStoreApiProduct`(products), `CartItem`(cart), `AuthUser`(auth), `RootState`/`AppDispatch`(store)
- 다음 보완: API 에러 응답에 대한 공통 타입 정의, `unknown` catch 값에 대한 타입 가드 추가

### 알려진 문제

- 미완료 기능: 상품 상세 페이지(`ProductDetailPage`)가 placeholder 상태, 검색/카테고리 필터/LocalStorage/수량 배지 미구현, 인증 로딩 UX·재로그인 시 에러 잔존·로그아웃 실패 처리(경미, 보류) 3건
- 다른 환경 문제: 다른 브라우저·모바일 환경에서는 테스트하지 않음
- Firebase 설정 주의: 배포 도메인을 Authorized Domain에 반드시 추가해야 하며, service account key는 발급받지 않음(클라이언트 Authentication만 사용)

| 한계 | 원인 | 다음 개선 | 우선순위 |
|---|---|---|---|
| 새로고침하면 장바구니가 비워짐 | LocalStorage 미연동, 메모리 상태만 사용 | cart slice에 persist 미들웨어 또는 수동 localStorage 동기화 추가 | 중 |
| 상품 상세 페이지 미구현 | 이번 범위에서 목록·장바구니·인증을 우선함 | `useGetProductByIdQuery`로 상세 데이터 연동 | 중 |
| 인증 로딩 중 헤더가 비어 보임 | 로딩 상태에 대한 UI를 별도로 만들지 않음 | 짧은 텍스트/스켈레톤 추가 | 낮음 |

## 17. 제출 정보

| 항목 | 링크·설명 |
|---|---|
| 결과물 레포 URL | https://github.com/seb0070/goorm-be-hw6 |
| 실행·배포 URL | _(작성 필요 — 배포 후 채워주세요, 아직 미배포)_ |
| 제출 폼 | https://goor.me/aiswwork1 |
