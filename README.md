
# Phido Waste Management

A modern, responsive web application for skip hire services built with React, TypeScript, and Tailwind CSS.

## Features

- **Dark Theme UI**: Sleek, modern interface with a dark color scheme
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Form Flow**: Step-by-step process with visual progress tracking
- **API Integration**: Dynamic skip data fetching from external API
- **Mobile-First Approach**: Touch-friendly interactions and responsive layouts
- **Skip Selection with Visual Feedback**: Selected skips display badges and disabled state

## Technical Approach

### Architecture

The application follows a component-based architecture with the following key principles:

1. **Component Separation**: Each UI section is broken into focused, reusable components
2. **State Management**: React hooks for local state management with clear data flow
3. **Conditional Rendering**: Progressive disclosure of form sections based on completion
4. **Responsive Design**: Mobile-first CSS with Tailwind utility classes

### Key Components

- `HeroSection`: Postcode input and main heading
- `WasteTypeSelector`: Checkbox selection for waste types
- `SkipSelection`: Dynamic skip options with API integration
- `SelectedSkipInfo`: Display selected skip details under "Ready to Proceed"
- `NavigationTabs`: Progress tracking with visual indicators
- `SkipCard`: Individual skip cards with selection state management

### Data Flow

1. **Postcode Entry**: User enters postcode → validates → marks as complete
2. **Waste Type Selection**: User selects waste types → shows skip selection
3. **Skip Selection**: Fetches available skips → user selects → displays info
4. **Progress Tracking**: Navigation tabs update based on completion status

### Skip Selection UX Features

- **Visual Selection State**: Selected skips show a blue "Selected" badge
- **Button State Management**: "Select This Skip" changes to "Unselect" and deselect the skip on click.
- **Back to Waste Types**: Deselect the skip chosen
- **Selected Skip Display**: Chosen skip information appears under "Ready to Proceed" text
- **Price Calculation**: Shows price before VAT, VAT amount, and total price
- **Skip Details**: Displays hire period, size, road placement, and heavy waste acceptance

### API Integration

The application integrates with the WeWantWaste API:
- **Endpoint**: `https://app.wewantwaste.co.uk/api/skips/by-location`
- **Parameters**: `postcode=NR32&area=Lowestoft`
- **Fallback**: Default skip data if API is unavailable
- **Error Handling**: Graceful degradation with local data

### Skip Data Structure

The API returns skip objects with the following structure:
```typescript
{
  id: number,
  size: number,
  price_before_vat: number,
  vat: number,
  hire_period_days: number,
  allowed_on_road: boolean,
  allows_heavy_waste: boolean,
  forbidden: boolean,
  area: string,
  postcode: string,
  created_at: string,
  updated_at: string,
  per_tonne_cost: number | null,
  transport_cost: number | null
}
```

### Responsive Strategy

- **Mobile First**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Touch Targets**: Minimum 48px tap targets for mobile accessibility
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts

### State Management

```typescript
const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
const [postcode, setPostcode] = useState('');
const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
const [isPostcodeCompleted, setIsPostcodeCompleted] = useState(false);
```

### Conditional Display Logic

- Skip selection only appears after waste types are selected
- Navigation tabs show progress with checkmarks
- Continue button enables only when all steps complete
- Selected skip information displays under "Ready to Proceed" text
- Skip cards show visual selection state with badges and button changes

## Recent Updates

### Skip Selection Enhancement
- Added visual feedback for selected skips with blue "Selected" badge
- Button state changes from "Select This Skip" to "unSelect" when chosen
- Selected skip information now displays under "Ready to Proceed" text
- Improved mobile responsiveness for skip selection interface
- Enhanced price display with VAT breakdown

### UI/UX Improvements
- Better visual hierarchy with selected skip information placement
- Consistent button states across different screen sizes
- Improved accessibility with proper disabled states
- Enhanced visual feedback for user interactions

## Getting Started

1. Clone the repository
2. checkout to the file if using vscode.
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Copy and Open http://localhost:8080 in your browser

## Technologies Used

- **React 18**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool and dev server
- **Lucide React**: Icon components

## Mobile Optimization

- Responsive grid layouts (1 column on mobile, 2-3 on desktop)
- Touch-friendly button sizes (minimum 48px)
- Optimized text sizes for readability
- Stacked navigation for smaller screens
- Efficient use of screen real estate
- Adaptive skip card layouts for different screen sizes
