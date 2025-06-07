# Modak Technical Challenge

[![Tests](https://img.shields.io/badge/tests-18%20passing-brightgreen)](#testing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](#tech-stack)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-53-black)](#tech-stack)

A React Native application built with Expo, featuring product listings, infinite scroll, filtering capabilities, push notifications integration, and comprehensive error handling.

## 🎯 Features

- **Product Catalog**: Browse products with infinite scroll pagination
- **Advanced Filtering**: Filter by category and sort by price/rating
- **Product Details**: Detailed product information with Error Boundaries
- **Push Notifications**: FCM V1 integration with deep linking
- **Error Handling**: Global and route-specific Error Boundaries
- **Responsive UI**: Beautiful design with Tamagui components
- **Testing**: Comprehensive test suite with 18 passing tests

## 🚀 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router v5 with deep linking
- **UI Library**: Tamagui v1.126 (design system)
- **State Management**: TanStack React Query v5 (infinite queries)
- **Language**: TypeScript with strict type checking
- **Build System**: EAS Build
- **Push Notifications**: Expo Notifications + Firebase Cloud Messaging (FCM V1)
- **HTTP Client**: Axios with interceptors
- **Code Quality**: Biome (ESLint + Prettier alternative)
- **Testing**: Jest + React Native Testing Library
- **Architecture**: MVVM pattern with Repository pattern

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/eas-cli`)
- iOS Simulator (macOS) or Android Studio (for emulators)
- Physical device for testing push notifications

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modak-technical-challenge
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Install EAS CLI** (if not already installed)
   ```bash
   npm install -g @expo/eas-cli
   ```

## ⚙️ Configuration

### Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com)

2. **Add Android/iOS apps** to your Firebase project with package name: `com.modak.technicalchallenge`

3. **Download configuration files**:
   - `google-services.json` for Android (place in project root)
   - `GoogleService-Info.plist` for iOS (place in project root)

4. **Add SHA fingerprints** to Firebase project:
   ```
   SHA1: DB:FF:22:C1:2C:EA:8E:02:37:2A:B4:67:4F:CB:DB:B3:40:31:EF:A1
   SHA256: DC:59:C8:EA:8F:8E:A2:8D:F3:D4:D2:67:D7:22:25:30:19:49:45:96:55:3E:46:62:59:EC:85:65:2D:2B:D3:BD
   ```

5. **Generate service account key**:
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Save as `credentials.json` in project root

> ⚠️ **SECURITY WARNING**: Never commit Firebase configuration files (`google-services.json`, `GoogleService-Info.plist`, `credentials.json`) to version control. These files contain sensitive API keys and should remain local only.

### EAS Configuration

1. **Login to EAS**
   ```bash
   eas login
   ```

2. **Configure EAS project** (if not already configured)
   ```bash
   eas build:configure
   ```

3. **Set up credentials**
   ```bash
   eas credentials --platform android
   ```
   - Choose "Set up a new keystore" for Android signing
   - Configure FCM V1 with your service account key

## 🏃‍♂️ Development

### Running the Application

1. **Start the development server**
   ```bash
   yarn start
   # or
   npm start
   ```

2. **Run on specific platforms**
   ```bash
   # iOS Simulator
   yarn ios
   
   # Android Emulator/Device
   yarn android
   
   # Web Browser
   yarn web
   ```

### 🔔 Push Notifications Testing

1. **Get your Expo Push Token** from the console logs when the app starts

2. **Test via Expo Push Tool**:
   - Visit: https://expo.dev/notifications
   - Enter your push token
   - Send test notifications

3. **Test with custom data for deep linking**:
   ```json
   {
     "title": "Product Alert",
     "body": "Check out this amazing product!",
     "data": {
       "screen": "/products/list"
     }
   }
   ```

   Or for specific product navigation:
   ```json
   {
     "title": "Product Details",
     "body": "Product on sale!",
     "data": {
       "productId": "123"
     }
   }
   ```

### 🔗 Deep Linking Testing

Test Error Boundaries and navigation with these commands:

```bash
# Test product details Error Boundary with invalid ID
npx expo start --scheme modakchallenge --url "/products/999999"

# Test normal product details
npx expo start --scheme modakchallenge --url "/products/1"

# Test products list with filters
npx expo start --scheme modakchallenge --url "/products/list?category=smartphones&sortBy=price"
```

## 🧪 Testing

The project includes a comprehensive test suite with 18 passing tests across 4 test suites:

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test --coverage

# Run specific test file
yarn test --no-coverage currency.test.ts

# Update snapshots
yarn test -u
```

### Test Coverage Areas

- **Component Testing**: UI components (Button, Chip, ProductCard)
- **Utility Testing**: Currency formatting, error handling
- **Hook Testing**: ViewModels and custom hooks
- **Integration Testing**: API interactions and data flow

## 📁 Project Structure

```
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with providers & Error Boundary
│   ├── index.tsx          # Home redirect
│   └── products/          # Product-related screens
├── common/                # Shared utilities and components
│   ├── components/        # Reusable UI components (Page, Button, Chip)
│   ├── config/           # App configuration (notifications, axios)
│   └── utils/            # Utility functions (currency, test-utils)
├── modules/              # Feature modules
│   └── products/         # Product module
│       ├── models/       # Data layer (API calls, Repository pattern)
│       ├── screens/      # Screen components (MVVM architecture)
│       └── types/        # TypeScript interfaces
├── assets/               # Static assets
├── app.config.ts         # Expo configuration
├── eas.json             # EAS Build configuration
└── tamagui.config.ts    # UI library configuration
```

## 📜 Available Scripts

```bash
# Development
yarn start              # Start Expo development server
yarn android           # Run on Android
yarn ios               # Run on iOS
yarn web               # Run on web

# Code Quality
npx biome check        # Lint and format check
npx biome check --write  # Auto-fix issues

# Testing
yarn test              # Run test suite (18 tests)
yarn test --coverage   # Run tests with coverage report

# Building
eas build --platform android  # Build Android APK/AAB
eas build --platform ios      # Build iOS IPA
eas build --platform all      # Build for all platforms
```

## 🏗 Building for Production

### Android

1. **Build APK for testing**
   ```bash
   eas build --platform android --profile preview
   ```

2. **Build AAB for Play Store**
   ```bash
   eas build --platform android --profile production
   ```

### iOS

1. **Build for TestFlight**
   ```bash
   eas build --platform ios --profile preview
   ```

2. **Build for App Store**
   ```bash
   eas build --platform ios --profile production
   ```

## 🚀 Deployment

### Android Play Store

1. **Upload AAB** to Google Play Console
2. **Configure app signing** with upload certificate
3. **Submit for review**

### iOS App Store

1. **Upload to TestFlight** via EAS Submit:
   ```bash
   eas submit --platform ios
   ```
2. **Submit to App Store** from App Store Connect

## 🌐 API Integration

The app integrates with DummyJSON API for product data:

- **Base URL**: `https://dummyjson.com`
- **Endpoints**:
  - `GET /products` - List products with pagination (`limit`, `skip`)
  - `GET /products/categories` - Get categories
  - `GET /products/category/{category}` - Products by category
  - `GET /products/{id}` - Product details

### API Features

- **Infinite Scroll**: Automatic pagination with TanStack Query
- **Filtering**: Category and sort by price/rating
- **Error Handling**: Graceful error states with retry functionality

## 🔔 Push Notification Features

- **FCM V1 Integration** with service account authentication
- **Deep linking** to specific screens/products
- **Background notification** handling
- **Local notification** testing utilities
- **Automatic token generation** and logging

## 🛡️ Error Handling

The app implements comprehensive error handling:

- **Global Error Boundary**: Catches unhandled errors app-wide
- **Route-specific Error Boundaries**: Custom error UI for specific screens
- **API Error Handling**: Graceful error states with retry options
- **React Query Integration**: Automatic error retry and caching

## 🔒 Security

### ⚠️ Sensitive Files

The following files contain sensitive information and should **NEVER** be committed to version control:

- `google-services.json` - Contains Firebase API keys
- `GoogleService-Info.plist` - Contains iOS Firebase configuration
- `credentials.json` - Contains Firebase service account private key

### ✅ Security Best Practices

1. **Use `.gitignore`** - All sensitive files are already in `.gitignore`
2. **Use example files** - Reference `firebase-config.example.json` for structure
3. **EAS Secrets** - Store production secrets in EAS for builds

### 🚨 If You Accidentally Committed Secrets

1. **Remove from git history**:
   ```bash
   git rm --cached google-services.json GoogleService-Info.plist credentials.json
   git commit -m "Remove sensitive files"
   ```

2. **Regenerate compromised keys**:
   - Create new Firebase service account
   - Rotate API keys in Firebase Console
   - Update EAS credentials

## 🐛 Troubleshooting

### Common Issues

1. **"No projectId found" error**
   - Ensure EAS project is properly configured
   - Check `app.config.ts` has correct EAS project ID

2. **Push notifications not working**
   - Verify Firebase configuration files are in place
   - Check SHA fingerprints are added to Firebase project
   - Ensure FCM V1 credentials are configured in EAS

3. **Build failures**
   - Clear cache: `npx expo start --clear`
   - Clean install: `rm -rf node_modules && yarn install`

4. **Test failures**
   - Update snapshots: `yarn test -u`
   - Clear Jest cache: `yarn test --clearCache`

### Debug Commands

```bash
# Check EAS project status
eas project:info

# View build logs
eas build:list

# Check credentials
eas credentials --platform android

# Check test status
yarn test --verbose
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
