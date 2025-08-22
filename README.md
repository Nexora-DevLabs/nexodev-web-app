# Nexora DevLabs Web App

A modern, animated web application showcasing Nexora DevLabs' services and capabilities.

## Features

### 🎭 Playful Dynamic Island
A delightful, animated face at the top of the page that brings personality to the interface:

- **Face Design**: Two cyan eyes with white highlights and a subtle mouth
- **Random Expressions**: Blink, wink, glance left/right, and smirk at random intervals
- **Bounce Invite**: Occasional playful bounce animation to draw attention
- **Cursor Tracking**: Eyes subtly follow your mouse movement
- **Hover Effects**: Gentle glow and scale on hover
- **Accessibility**: Respects `prefers-reduced-motion` preference
- **Performance**: Pauses animations when tab is hidden

#### Animation Details
- **Expressions**: Randomly triggered every 6-30 seconds with weighted randomness
- **Bounce**: Occurs every 15-45 seconds with spring physics
- **Timing**: All intervals include jitter for organic, non-looping feel
- **Reduced Motion**: Falls back to simple hover effects when motion is reduced

### 🎨 Modern UI Components
- Responsive design with Tailwind CSS
- Smooth animations using Framer Motion
- Dark/light theme support
- Glass morphism effects
- Interactive action buttons

### 🚀 Built With
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide Icons** - Beautiful icon set

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # UI components
│   │   └── dynamic-island.tsx  # Playful face component
│   ├── action-buttons.tsx      # Action buttons
│   └── theme-provider.tsx      # Theme management
├── lib/                  # Utilities and hooks
└── public/               # Static assets
```

## Dynamic Island Component

The `DynamicIsland` component (`components/ui/dynamic-island.tsx`) is a self-contained, animated face that:

- **Position**: Fixed at `top-2 left-1/2` with high z-index
- **Size**: 128px × 40px (w-32 h-10)
- **Styling**: Black pill with cyan accents and subtle borders
- **Animations**: GPU-optimized transforms (scale, rotate, translate)
- **State Management**: Internal state machine for expressions and timing

### Usage
```tsx
import { DynamicIsland } from "@/components/ui/dynamic-island"

export default function Layout() {
  return (
    <div>
      <DynamicIsland />
      {/* Your content */}
    </div>
  )
}
```

## Customization

The Dynamic Island can be easily customized by modifying:
- **Colors**: Update the cyan-400 classes for eyes and mouth
- **Timing**: Adjust the expression and bounce intervals in the `expressions` config
- **Animations**: Modify the Framer Motion variants for different effects
- **Size**: Change the `w-32 h-10` classes for different dimensions

## Performance

- Uses `useCallback` and `useRef` for optimal performance
- Animations pause when tab is hidden
- Respects user motion preferences
- GPU-accelerated transforms only

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Graceful fallback for reduced motion preferences
- Responsive design for all screen sizes
