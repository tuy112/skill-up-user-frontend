# Skill Up Platform (Front-End)

Next.js 기반 웹 프론트엔드 프로젝트 🚀

## 📌 기술 스택
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Linting: ESLint

## 📂 프로젝트 구조
```
📦public
 ┗ 📜favicon.ico

📦src
 ┣ 📂app
 ┃ ┣ 📂bootcamp
 ┃ ┃ ┣ 📜BootcampPageLayout.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜styles.module.css
 ┃ ┣ 📂conference
 ┃ ┃ ┣ 📜ConferencePageLayout.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜styles.module.css
 ┃ ┣ 📂hackathon
 ┃ ┃ ┣ 📜HackathonPageLayout.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜styles.module.css
 ┃ ┣ 📂mentoring
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┣ 📜MentoringPageLayout.tsx
 ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┗ 📜styles.module.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂assets
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜ChevronLeftIcon.tsx
 ┃ ┃ ┣ 📜ChevronRightIcon.tsx
 ┃ ┃ ┣ 📜icon_article.png
 ┃ ┃ ┣ 📜icon_Education.png
 ┃ ┃ ┣ 📜icon_hackathon.png
 ┃ ┃ ┣ 📜icon_networking.png
 ┃ ┃ ┗ 📜icon_seminar.png
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜loginImg.png
 ┃ ┃ ┗ 📜main_banner.jpg
 ┃ ┗ 📂svg
 ┃ ┃ ┣ 📜calendarIcon.svg
 ┃ ┃ ┣ 📜cautionIcon.svg
 ┃ ┃ ┣ 📜chevronDownIcon.svg
 ┃ ┃ ┣ 📜closeIcon.svg
 ┃ ┃ ┣ 📜ellipsisIcon.svg
 ┃ ┃ ┣ 📜filterIcon.svg
 ┃ ┃ ┣ 📜googleIcon.svg
 ┃ ┃ ┣ 📜kakaoIcon.svg
 ┃ ┃ ┣ 📜locationIcon.svg
 ┃ ┃ ┣ 📜naverIcon.svg
 ┃ ┃ ┣ 📜resetIcon.svg
 ┃ ┃ ┣ 📜skillUp_black.svg
 ┃ ┃ ┣ 📜skillUp_symbol_black.svg
 ┃ ┃ ┣ 📜skillUp_symbol_white.svg
 ┃ ┃ ┗ 📜skillUp_white.svg
 ┣ 📂components
 ┃ ┣ 📂club
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂Badge
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📂BookmarkBtn
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂CalendarDatePicker
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📂Dropdown
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┗ 📂Pagination
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┣ 📂events
 ┃ ┃ ┣ 📂EventCard
 ┃ ┃ ┃ ┣ 📜icons.tsx
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂EventEmpty
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂EventHeader
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┣ 📂filters
 ┃ ┃ ┃ ┣ 📂atoms
 ┃ ┃ ┃ ┃ ┣ 📜filterAtoms.ts
 ┃ ┃ ┃ ┃ ┗ 📜pageFilterAtoms.ts
 ┃ ┃ ┃ ┣ 📂FilterBadges
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┣ 📂FilterButton
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┣ 📂filterElements
 ┃ ┃ ┃ ┃ ┣ 📂DateRangeFilter
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┃ ┣ 📂FreeFilter
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┃ ┗ 📂OnOfflineFilter
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┣ 📂FilterModal
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┗ 📜usePageFilters.ts
 ┃ ┃ ┃ ┣ 📂RoleSelector
 ┃ ┃ ┃ ┃ ┣ 📜icons.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┃ ┗ 📜role.ts
 ┃ ┃ ┃ ┗ 📂views
 ┃ ┃ ┃ ┃ ┣ 📜BootcampFilterView.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ConferenceFilterView.tsx
 ┃ ┃ ┃ ┃ ┣ 📜HackathonFilterView.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MentoringFilterView.tsx
 ┃ ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┃ ┗ 📂sorting
 ┃ ┃ ┃ ┗ 📂SortDropdown
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂interest
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.module.css
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂LoginContent
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┗ 📂SocialLoginButton
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┣ 📂mainVisual
 ┃ ┃ ┣ 📂IconMenu
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.module.css
 ┃ ┣ 📂nav
 ┃ ┃ ┗ 📂EventCategoryTabs
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜styles.module.css
 ┃ ┣ 📂recommend-contents
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂recommend-event
 ┃ ┃ ┣ 📂recommend-deadline
 ┃ ┃ ┃ ┣ 📜dummyData.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📂recommend-interest
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📂recommend-now
 ┃ ┃ ┃ ┣ 📜dummyData.ts
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.module.css
 ┣ 📂lib
 ┣ 📂mocks
 ┃ ┗ 📜eventListMock.ts
 ┗ 📂styles
 ┃ ┗ 📜global.css
 
 ```