# Agrotech & Fintech Dashboard - Design System

## Overview
Professional agricultural finance dashboard for Brazil nut (Castaña) trading in the Amazon region of Peru. The design emphasizes organic trust, high-end financial credibility, and agricultural authenticity.

---

## Color Palette

### Primary Colors
- **Deep Amazonian Green**: `#134E4A` (oklch: 0.32 0.12 155)
  - Primary action buttons, sidebar, navigation highlights
  - Represents trust, growth, and the Amazon ecosystem
  
- **Soft Sand/Off-white**: `#F9FAFB` to `#FFFBEF` (oklch: 0.975 0.005 70)
  - Main background color
  - Creates a warm, inviting interface

### Accent Colors
- **Golden-Bronze**: `#B45309` to `#D97706` (oklch: 0.52 0.18 40)
  - Call-to-action buttons, secondary elements
  - Resembles Brazil nut shell color
  - Highlights important metrics

### Chart-Specific Colors
- **Income (Ingresos)**: Deep Amazonian Green `#134E4A`
- **Expenses (Egresos)**: Terracotta/Brick Red `#B91C1C`
- **Warning**: Amber `#FBBF24`
- **Success**: Forest Green variations

### Semantic Colors
- **Destructive**: Brick Red `#B91C1C` (for alerts, pending loans)
- **Success**: Green `#059669` (for completed transactions)
- **Warning**: Amber `#FBBF24` (for low inventory)

---

## Layout Components

### 1. Sidebar (Desktop & Mobile)
- **Background**: Deep Amazonian Green (`#134E4A`)
- **Width**: 256px (w-64) on desktop, collapsible mobile menu
- **Logo Area**: 96px height with centered branding
- **Navigation Items**: 
  - Icons + Labels (desktop)
  - Icons only (mobile collapsed)
  - Active state: Golden-Bronze background with shadow
  - Hover state: Subtle accent background

### 2. Header/Top Bar
- **Background**: Off-white card with subtle border
- **Content**: 
  - Title: "Sistema de Gestión de Nuez de Brasil"
  - Current date display with icon
  - Welcome message
  - Clean typography hierarchy

### 3. KPI Cards (4-Column Grid)
Each card contains:
- **Icon**: Colored background (primary, secondary, or destructive)
- **Label**: Small, muted text
- **Value**: Large, bold number
- **Subtext**: Contextual information
- **Trend**: Positive/negative indicator
- **Styling**: Rounded corners (16px), subtle shadow, hover elevation

#### Card Types:
1. **Capital Disponible** (Primary)
   - Icon: Dollar sign
   - Value: S/. 45,230
   - Trend: +12.5% vs prior month

2. **Inventario Total** (Primary)
   - Icon: Package
   - Value: 850 latas
   - Info: Distribution across 3 locations

3. **Transacciones** (Secondary)
   - Icon: Trending up
   - Value: 12
   - Info: Operations this month

4. **Préstamos Pendientes** (Destructive)
   - Icon: Alert circle
   - Value: S/. 24,500
   - Background: Subtle red tint
   - Info: Amount owed to gatherers

### 4. Chart Sections

#### A. Income vs Expense (6-Month Bar Chart)
- **Layout**: 2/3 width on large screens
- **Data**: Monthly ingresos (green) vs egresos (red)
- **Styling**: Rounded bars, grid lines, tooltip on hover
- **Legend**: Color-coded, clear labels

#### B. Inventory Status (Donut Chart)
- **Layout**: 1/3 width on large screens
- **Data**: En Stock (green) / Stock Bajo (amber) / Agotado (red)
- **Type**: Donut/Ring pie chart
- **Legend**: Below chart with color indicators
- **Information**: Quantity breakdown

### 5. Recent Transactions Table
- **Full Width**: Spans entire content area
- **Columns**: Type | Origin/Destination | Quantity | Amount | Date | Status
- **Row Styling**: 
  - Hover: Subtle background highlight
  - Type badges: Color-coded (COMPRA = blue, VENTA = green)
  - Status badges: Green (completed) or amber (pending)
- **Responsive**: Horizontal scroll on mobile

---

## Typography

- **Font Family**: Inter, Lato (clean, professional)
- **Heading 1** (H1): 32-48px, bold, deep green text
- **Heading 2** (H2): 18-24px, bold, foreground color
- **Body Text**: 14-16px, regular, foreground with 60% opacity for secondary text
- **Small/Caption**: 12px, muted foreground, for labels and metadata

---

## Spacing & Sizing

- **Border Radius**: 16px (rounded-2xl) for major containers
- **Icon Sizes**: 20-24px for sidebar, 24-32px for card icons
- **Padding**: 24px (p-6) for card content, 32px (p-8) for main content
- **Gap**: 24px (gap-6) between card sections

---

## Interactive States

### Hover Effects
- Cards: Shadow elevation (sm → md)
- Links: Color opacity change (primary → primary/80)
- Buttons: Opacity + shadow transition

### Active States
- Menu items: Golden-Bronze background, white text, shadow
- Transactions: Subtle background highlight on row hover

### Focus States
- Interactive elements: Visible ring outline (primary color)

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column layout, full-width cards)
- **Tablet**: 768px-1024px (2-column KPI grid, stacked charts)
- **Desktop**: > 1024px (4-column KPI grid, side-by-side charts)

### Mobile Adjustments
- Sidebar: Collapsible hamburger menu overlay
- Charts: Adjusted heights for viewport
- Table: Horizontal scroll enabled
- Padding: Reduced to p-4 or p-6

---

## Brand Elements

- **Logo**: Leaf emoji (🌿) with "CASTAÑA" text + "Gestión Integral"
- **Currency**: Peruvian Sol (S/.)
- **Units**: Latas (standard containers), Barricas (barrels)
- **Language**: Spanish (es-PE for Peru locale)

---

## Accessibility

- Color contrast ratios meet WCAG AA standards
- Icon + text labels on all buttons
- Semantic HTML structure
- Keyboard navigation support on all interactive elements

---

## Performance

- Smooth transitions (200ms duration)
- Lazy-loaded charts (Recharts)
- Optimized images and icons (Lucide React)
- CSS variables for theme consistency
