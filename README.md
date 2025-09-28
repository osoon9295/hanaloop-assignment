# Carbon Emissions Dashboard

탄소 배출 데이터를 빠르게 탐색할 수 있는 대시보드 MVP입니다. 회사별 월간 배출량을 조회하고 추이 그래프를 확인할 수 있습니다.

## 실행 방법

1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행 (기본 포트 3000)
   ```bash
   npm run dev
   ```
3. 브라우저에서 `http://localhost:3000` 접속 후 자동으로 `/dashboard` 페이지로 리다이렉트됩니다.

> 첫 진입 시 `lib/seed.ts`의 더미 데이터가 로드되며, API 호출에는 `200~800ms` 지연이 의도적으로 추가되어 있습니다.

## UI 설계 의도

- **좌측 고정 내비게이션**: `components/layout/Sidebar.tsx`에서 대시보드와 설정을 한눈에 이동할 수 있도록 고정 폭 사이드바를 둬, 주요 기능을 항상 노출합니다.
- **정보·그래프 분리 레이아웃**: `app/dashboard/DashboardClient.tsx`에서 화면을 3:7 비율로 나눠, 왼쪽에는 탐색 패널(`CompanyPanel`)을, 오른쪽에는 시각화 영역(`EmissionChart`)을 배치했습니다. 사용자는 회사를 클릭할 필요 없이 좌우 버튼으로 순차 탐색할 수 있습니다.
- **회사 선택 강조**: `components/Info/CompanyPanel.tsx`는 현재 선택된 회사를 상단 스텝 형태로 보여주고, 바로 아래에서 총 배출량 합계를 강조해 현재 상태 파악을 돕습니다.
- **상태에 따른 피드백**: `components/chart/EmissionChart.tsx`는 데이터 로딩/실패/데이터 없음 케이스마다 다른 뷰를 렌더링하여 사용자에게 명확한 피드백을 제공합니다.

## 파일 구조 및 분리 이유

- `app/` : Next.js App Router를 기반으로 라우트(`dashboard`, `settings`)와 글로벌 레이아웃을 선언합니다. 서버 컴포넌트에서 데이터를 선(先)패칭하여 초기 렌더 속도를 확보합니다.
- `components/layout/` : 레이아웃에 상시 포함되는 사이드바 등 공용 UI를 모아 재사용성과 가독성을 높였습니다.
- `components/Info/` : 회사 선택과 요약 정보를 다루는 UI 조각을 모듈화해 상태 관리와 뷰 로직을 분리했습니다.
- `components/chart/` : 차트 관련 로직을 묶어 Chart.js 설정과 데이터 변환을 한 파일에서 관리합니다.
- `lib/` : `api.ts`에서 실제 API 대신 프론트엔드 테스트용 in-memory 데이터를 제공하고, `seed.ts`에 초기 데이터를 분리해 의존성 없이 시연할 수 있게 했습니다.
- `types/` : 도메인 타입을 통일시켜 컴포넌트 간 데이터 계약을 명확히 했습니다.

이와 같이 책임을 기준으로 디렉터리를 나눠, 각 기능을 교체하거나 확장할 때 영향 범위를 최소화했습니다.

## 사용한 주요 라이브러리와 선택 이유

- **Next.js 15 & React 19 (`package.json`)**: App Router와 서버 컴포넌트를 활용해 초기 데이터 패칭(`app/dashboard/page.tsx`)과 클라이언트 상호작용을 자연스럽게 결합했습니다.
- **Chart.js + react-chartjs-2 (`components/chart/EmissionChart.tsx`)**: 라인 차트를 쉽게 렌더링하면서도 툴팁, 범례 등 기본 인터랙션을 즉시 제공해 빠르게 시각화를 구현했습니다.
- **lucide-react (`components/Info/CompanyOption.tsx`, `components/layout/Sidebar.tsx`)**: 가벼운 SVG 아이콘 세트를 사용해 내비게이션 및 회사 탐색 버튼의 직관성을 높였습니다.
- **Tailwind CSS (`app/globals.css`)**: 빠르게 일관된 스타일을 적용하고 반응형 레이아웃을 구성하기 위해 Utility-First 접근을 사용했습니다.

위 구성은 데모 목적에 맞춰 프론트엔드만으로도 사용자 흐름을 끝까지 체험할 수 있게 설계되었습니다.
