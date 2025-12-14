# 리팩토링 가이드

> 프로젝트 전반적인 리팩토링 시 주의사항 및 가이드라인

## 📌 프로젝트 환경 요약

- **프레임워크**: Next.js 15 (App Router) + React 19
- **언어**: TypeScript (strict mode)
- **스타일링**: CSS Modules + CSS 변수
- **상태 관리**: Jotai (클라이언트) + TanStack React Query (서버)
- **HTTP**: Axios (instance, tokenInstance)
- **도구**: Storybook, Vitest, Playwright, ESLint

---

## 🚨 1. Next.js 15 & React 19 관련 주의사항

### Server/Client Component 구분

```typescript
// ❌ 잘못된 예: Client Component에서 불필요하게 "use client" 사용
"use client"; // 서버에서 렌더링 가능한데도 클라이언트 컴포넌트로 만듦

// ✅ 올바른 예: 필요한 곳에만 "use client"
// - useState, useEffect 등 훅 사용
// - 이벤트 핸들러 (onClick, onChange 등)
// - 브라우저 API 사용 (localStorage, window 등)
// - Jotai atoms 사용
```

**주의점**:

- 기존에 "use client"가 있는 컴포넌트를 서버 컴포넌트로 변경할 때, 의존하는 부모/자식 컴포넌트도 확인
- `src/components/login/LoginContent/index.tsx:2` - "use client" 사용 중
- 리팩토링 시 상태 관리 로직이 없다면 서버 컴포넌트로 변경 고려

### App Router 구조

```typescript
// src/app 구조 유지
// - page.tsx (페이지)
// - layout.tsx (레이아웃)
// - error.tsx (에러 페이지)
// - not-found.tsx (404 페이지)
```

**주의점**:

- 페이지 간 라우팅 변경 시 `src/app` 디렉토리 구조 유지
- 동적 라우팅: `[id]` 폴더 명명 규칙 준수
- 메타데이터는 `layout.tsx`에서 관리 (src/app/layout.tsx:5-11)

---

## 🔒 2. TypeScript strict mode 주의사항

### 타입 안정성

```typescript
// tsconfig.json:7 - strict: true

// ❌ 잘못된 예
const data: any = fetchData(); // any 사용 금지

// ✅ 올바른 예
interface UserData {
  name: string;
  email: string;
}
const data: UserData = fetchData();
```

**주의점**:

- `any` 타입 사용 최소화 (정말 필요한 경우만)
- 기존 타입 정의 재사용: `src/types/` 디렉토리 활용
  - `src/types/user.ts` - 유저 관련 타입
  - `src/types/event.ts` - 이벤트 관련 타입
  - `src/types/article.ts` - 아티클 관련 타입
- Props 인터페이스는 컴포넌트 파일 내부에 정의 (현재 패턴 유지)
- 공통 유틸 타입은 별도 파일로 분리 고려

### null/undefined 처리

```typescript
// ❌ 잘못된 예
const token = localStorage.getItem("token");
config.headers.Authorization = `Bearer ${token}`; // null일 수 있음

// ✅ 올바른 예
const token = localStorage.getItem("token");
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

---

## 🗂️ 3. 상태 관리 주의사항

### Jotai Atoms 관리 (src/store/authAtoms.ts)

```typescript
// 현재 사용 중인 atoms:
// - tokenAtom (localStorage 연동)
// - userNameAtom (localStorage 연동)
// - userEmailAtom (localStorage 연동)
// - isAuthenticatedAtom (파생 상태)
```

**주의점**:

- **localStorage 연동 atoms**: `atomWithStorage` 사용 시 SSR 이슈 주의
  - Next.js 15에서는 서버에서 localStorage 접근 불가
  - 클라이언트 컴포넌트에서만 사용
- **Atom 분리 원칙**:
  - 인증 관련: `src/store/authAtoms.ts`
  - 필터 관련: `src/components/events/filters/atoms/`
  - 도메인별로 파일 분리
- **파생 atoms**: 계산 로직이 복잡해지면 별도 파일로 분리

### React Query (TanStack Query)

```typescript
// package.json:14 - @tanstack/react-query: ^5.90.9

// 현재 사용 패턴:
// src/hooks/useLogin.ts - mutation
// src/hooks/useUser.ts - query
// src/hooks/useEventList.ts - query
```

**주의점**:

- **Query Key 관리**:
  - 일관된 네이밍 규칙 유지
  - 도메인별로 Query Key 팩토리 함수 만들기 권장
  ```typescript
  // 추천 패턴
  const eventKeys = {
    all: ["events"] as const,
    lists: () => [...eventKeys.all, "list"] as const,
    list: (filters: Filters) => [...eventKeys.lists(), filters] as const,
    details: () => [...eventKeys.all, "detail"] as const,
    detail: (id: string) => [...eventKeys.details(), id] as const,
  };
  ```
- **캐시 무효화**: 데이터 변경 시 관련 쿼리 무효화 필수
- **에러 처리**: 일관된 에러 핸들링 패턴 유지

---

## 🎨 4. CSS 관련 주의사항

### CSS Modules 패턴

```css
/* 현재 네이밍 규칙 (카멜케이스) */
.loginModal {
}
.loginModalLeft {
}
.loginModalRight {
}
```

**주의점**:

- **네이밍 컨벤션**: 카멜케이스 유지 (현재 패턴)
- **파일명**: `styles.module.css` 또는 `style.module.css` (혼재 중 → 통일 고려)
  - 대부분: `styles.module.css`
  - 일부: `style.module.css`
- **클래스 결합**:

  ```typescript
  // ❌ 피해야 할 패턴 (Button 컴포넌트에서 발견)
  className={`${styles.button} ${className || ""} ${
    variant === "secondary" ? styles.secondary : ""
  } ${variant === "tertiary" ? styles.tertiary : ""} ...`}

  // ✅ 추천 패턴 (clsx 또는 classnames 라이브러리 사용 고려)
  import clsx from 'clsx';
  className={clsx(
    styles.button,
    className,
    variant && styles[variant],
    size && styles[size],
    disabled && styles.disabled,
    block && styles.block
  )}
  ```

### CSS 변수 (src/styles/global.css:4-33)

```css
/* 정의된 CSS 변수들 */
--Common-black, --Common-white
--Neutral-5 ~ --Neutral-99
--Primary-light, --Primary-strong, etc.
```

**주의점**:

- **변수명 일관성**: 기존 변수 사용 우선
- **새 색상 추가 시**: `global.css`에 먼저 정의 후 사용
- **하드코딩 금지**: `#fff`, `#000` 대신 `var(--Common-white)` 사용
- **Text 컴포넌트 색상**: `src/components/common/Text/index.tsx:27-53`에 정의된 색상만 사용

---

## 🧩 5. 컴포넌트 구조 주의사항

### 공통 컴포넌트 활용 (src/components/common/)

```
현재 공통 컴포넌트:
- Flex (레이아웃)
- Text (타이포그래피)
- Button (버튼)
- Input, InputField (입력)
- Modal, Alert (오버레이)
- Dropdown, Tab, TabBar (선택)
- EventCard, Badge (카드)
- Skeleton (로딩)
- 등등...
```

**주의점**:

- **기존 컴포넌트 우선 사용**: 새로운 컴포넌트 만들기 전에 기존 것 재사용 가능한지 확인
- **Flex 컴포넌트 활용**: CSS flexbox 스타일링 시 우선 고려
  - 최근 리팩토링으로 ProfileModal, LoginContent, TermsAgreementContent에서 CSS 30-50% 감소
- **Props 확장 시**:
  - 기존 Props 패턴 유지
  - 타입 안정성 확보
  - 하위 호환성 고려

### 컴포넌트 파일 구조

```
ComponentName/
  ├── index.tsx
  ├── styles.module.css (또는 style.module.css)
  └── ComponentName.stories.tsx (선택)
```

**주의점**:

- **index.tsx로 export**: 다른 파일에서 `import Component from '@/components/.../ComponentName'`로 사용
- **Storybook 파일**: 공통 컴포넌트는 `.stories.tsx` 파일 유지/추가 권장
- **관심사 분리**: 비즈니스 로직은 hooks로 분리 (src/hooks/)

---

## 🔌 6. API 통신 주의사항

### Instance 구분 (src/api/)

```typescript
// instance.ts - 인증 불필요 API
import instance from "@/api/instance";

// tokenInstance.ts - 인증 필요 API (Bearer Token)
import tokenInstance from "@/api/tokenInstance";
```

**주의점**:

- **올바른 instance 선택**:
  - 로그인, 회원가입: `instance`
  - 마이페이지, 북마크 등: `tokenInstance`
- **401 에러 처리**: `tokenInstance`에서 자동 처리 (src/api/tokenInstance.ts:38-45)
  - 토큰 만료 시 자동 로그아웃 및 메인 페이지 리다이렉트
  - 이 로직 변경 시 전체 인증 플로우 영향 주의
- **API 함수 위치**: `src/api/` 디렉토리에 도메인별로 분리
  - `auth.ts` - 인증 관련
  - `user.ts` - 유저 관련
  - `events.ts` - 이벤트 관련

### 환경 변수

```typescript
// next.config.ts는 비어있음 (기본 설정 사용)
// .env 파일 사용 패턴:
// - NEXT_PUBLIC_BASE_URL (API 베이스 URL)
```

**주의점**:

- 환경 변수 추가 시 `.env.local` 및 `.env.example` 업데이트
- 클라이언트에서 사용: `NEXT_PUBLIC_` 접두사 필수

---

## 🧪 7. 테스팅 주의사항

### Storybook (package.json:10-11)

```typescript
// 스토리가 있는 컴포넌트:
// - Button, Text, Dropdown, IconButton
```

**주의점**:

- **공통 컴포넌트 수정 시**: 해당 스토리 파일도 업데이트
- **새 공통 컴포넌트**: 스토리 파일 작성 권장
- **스토리 실행**: `npm run storybook` (포트 6006)

### Vitest + Playwright (package.json:37-46)

**주의점**:

- 테스트가 깨지지 않도록 API 변경 시 확인
- 현재 테스트 파일 확인 후 리팩토링

---

## 📝 8. Git & 협업 주의사항

### 커밋 컨벤션 (최근 커밋 기준)

```bash
# 패턴: <type>: <description> #<issue-number>
feat: ChevronDownIcon 컴포넌트 추가 및 Dropdown 적용 #35
fix: ProfileModal Alert 상태 관리 개선 #35
refactor: LoginContent Flex 컴포넌트 리팩토링 #35
style: Header 및 공통 컴포넌트 스타일 개선 #35
```

**Type 구분**:

- `feat`: 새 기능 추가
- `fix`: 버그 수정
- `refactor`: 리팩토링 (기능 변경 없음)
- `style`: 코드 스타일/포맷 변경

**주의점**:

- **이슈 번호 필수**: `#<number>` 형식
- **한글 사용**: 설명은 한글로
- **작업 단위로 커밋**: 하나의 커밋 = 하나의 작업
- **Attribution 제외**: "Claude Code wrote this" 같은 내용 X

### 브랜치 전략

```bash
# 현재 브랜치: feat/#31-myPage
# 메인 브랜치: master
```

**주의점**:

- 브랜치명 패턴: `feat/#<issue-number>-<feature-name>`
- PR은 `master`로

---

## ⚡ 9. 성능 최적화 주의사항

### React 19 최적화

```typescript
// React 19의 자동 최적화 활용
// - Automatic batching
// - Transitions
// - Suspense
```

**주의점**:

- **불필요한 리렌더링 방지**:
  - `useMemo`, `useCallback` 신중히 사용 (React 19에서는 덜 필요)
  - Props drilling 최소화 (Jotai atoms 활용)
- **동적 import**: 큰 컴포넌트는 `dynamic` import 고려
  ```typescript
  import dynamic from "next/dynamic";
  const HeavyComponent = dynamic(() => import("./HeavyComponent"));
  ```

### 이미지 최적화

```typescript
// Next.js Image 컴포넌트 사용 (이미 사용 중)
import Image from "next/image";
```

**주의점**:

- `<img>` 대신 `<Image>` 사용
- `width`, `height` 속성 필수
- `priority` 속성: LCP 이미지에 사용

### 번들 크기

```json
// package.json에서 큰 라이브러리:
// - react-icons (5.5.0)
// - lucide-react (0.546.0)
```

**주의점**:

- **아이콘 트리 shaking**: 개별 import 권장

  ```typescript
  // ❌ 전체 import
  import * as Icons from "react-icons/fa";

  // ✅ 개별 import
  import { FaUser } from "react-icons/fa";
  ```

- **코드 스플리팅**: 라우트별로 자동 분할 (App Router)

---

## ♿ 10. 접근성 & UX 주의사항

### 접근성 (a11y)

```typescript
// Storybook a11y addon 설치됨 (package.json:28)
// Flex 컴포넌트: aria-label 지원 (src/components/common/Flex/index.tsx:25)
```

**주의점**:

- **시맨틱 HTML**: `<div>` 남용 지양
  - `<button>` vs `<div onClick>`
  - `<nav>`, `<header>`, `<main>`, `<footer>` 활용
- **aria-label**: 아이콘 버튼, 이미지에 필수
- **키보드 접근성**: Tab, Enter, Esc 키 지원
- **색상 대비**: WCAG 기준 준수 (CSS 변수 사용 시 확인)

### UX 패턴

```typescript
// 현재 UX 패턴:
// - Modal: 외부 클릭 시 닫힘
// - Alert: Portal로 구현
// - Skeleton: 로딩 상태
```

**주의점**:

- **로딩 상태**: Skeleton 컴포넌트 활용
- **에러 상태**: Error 컴포넌트 활용 (src/components/common/Error/)
- **빈 상태**: Empty 컴포넌트들 활용 (EventEmpty, BookmarkEmpty)
- **피드백**: 버튼 클릭, API 호출 시 즉각적인 피드백 제공

---

## 🔄 11. 리팩토링 우선순위 추천

### 우선순위 1 (즉시 개선 가능)

1. **CSS 파일명 통일**: `styles.module.css`로 통일
2. **className 결합 개선**: `clsx` 라이브러리 도입
3. **타입 안정성**: `any` 타입 제거, 타입 정의 보완

### 우선순위 2 (중기 개선)

1. **Query Key 팩토리**: React Query 키 관리 체계화
2. **공통 유틸 함수**: 중복 로직 utils로 분리
3. **에러 처리**: 일관된 에러 바운더리 패턴

### 우선순위 3 (장기 개선)

1. **E2E 테스트**: Playwright 테스트 작성
2. **성능 모니터링**: Core Web Vitals 측정 및 개선
3. **문서화**: 공통 컴포넌트 Storybook 보완

---

## 📋 리팩토링 체크리스트

### 리팩토링 전 확인

- [ ] 변경할 파일이 Server Component인지 Client Component인지 확인
- [ ] TypeScript 에러 없는지 확인 (`npm run build`)
- [ ] 의존하는 컴포넌트/hooks 파악
- [ ] 기존 테스트/스토리 확인

### 리팩토링 중

- [ ] 타입 안정성 유지
- [ ] 기존 Props 패턴 준수
- [ ] CSS 변수 사용
- [ ] 공통 컴포넌트 재사용

### 리팩토링 후

- [ ] 빌드 성공 확인
- [ ] Storybook 동작 확인 (있다면)
- [ ] 브라우저에서 동작 테스트
- [ ] 커밋 컨벤션 준수하여 커밋

---

## 📚 참고 자료

- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [React 19 릴리즈 노트](https://react.dev/blog/2024/12/05/react-19)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TanStack Query 가이드](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Jotai 공식 문서](https://jotai.org/)
- [CSS Modules 가이드](https://github.com/css-modules/css-modules)

---

**최종 업데이트**: 2025-12-14
