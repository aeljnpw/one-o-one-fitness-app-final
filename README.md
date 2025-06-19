# One O One Fitness

A beautiful fitness tracking app inspired by Apple Fitness, built with React Native CLI.

## Features

- **Activity Rings**: Beautiful animated rings showing daily move, exercise, and stand goals
- **Workout Tracking**: Comprehensive workout logging with various exercise types
- **Social Sharing**: Share achievements and compete with friends
- **Trends & Analytics**: Detailed progress tracking and insights
- **Profile Management**: Personal stats, achievements, and settings

## Tech Stack

- React Native CLI
- React Navigation 6
- React Native Reanimated 3
- React Native SVG
- React Native Linear Gradient
- Lucide React Native (Icons)
- Supabase (Backend & Authentication)

## Getting Started

### Prerequisites

- Node.js (>= 16)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. For iOS, install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Building for Production

#### Android
```bash
npm run build:android
```

#### iOS
```bash
npm run build:ios
```

## Project Structure

```
OneOOneFitness/
├── app/                # App screens (using Expo Router structure)
│   ├── (tabs)/         # Tab navigation layout and screens
│   │   ├── index.tsx   # Activity/Home screen
│   │   ├── workouts.tsx # Workouts screen
│   │   ├── trends.tsx  # Trends/Analytics screen
│   │   └── profile.tsx # Profile screen
│   ├── auth/           # Authentication screens
│   │   ├── login.tsx   # Login screen
│   │   └── signup.tsx  # Sign up screen
│   └── _layout.tsx     # Root layout with auth protection
├── components/         # Reusable UI components
│   ├── ActivityCard.tsx
│   ├── ActivityRings.tsx
│   ├── EquipmentCard.tsx
│   ├── ExerciseCard.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
│   └── useFrameworkReady.ts
├── lib/                # Libraries and clients
│   └── supabase.ts     # Supabase client configuration
├── types/              # TypeScript type definitions
│   └── database.ts     # Database schema types
├── android/            # Android-specific files
├── ios/                # iOS-specific files
└── ...
```

## Design Features

- Modern gradient-based design system
- Smooth animations using React Native Reanimated
- Apple-inspired UI/UX patterns
- Responsive design for all device sizes
- Dark theme optimized for fitness tracking

## Database Schema

The app uses Supabase as the backend with the following main tables:
- `profiles` - User profile information
- `daily_activities` - Daily fitness tracking data
- `exercises` - Exercise library
- `equipment` - Gym equipment catalog
- `workouts` - User workout sessions
- `members` - Gym membership management

## License

MIT License