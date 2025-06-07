# Modak Technical Challenge

A React Native application built with Expo, featuring product listings, filtering capabilities, and push notifications integration.

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router v5
- **UI Library**: Tamagui v1.126
- **State Management**: TanStack React Query v5
- **Language**: TypeScript
- **Build System**: EAS Build
- **Push Notifications**: Expo Notifications + Firebase Cloud Messaging (FCM V1)
- **HTTP Client**: Axios
- **Code Quality**: Biome (ESLint + Prettier alternative)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/eas-cli`)
- iOS Simulator (macOS) or Android Studio (for emulators)
- Physical device for testing push notifications

## Installation

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

## Configuration

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

> ⚠️ **SECURITY WARNING**: Never commit Firebase configuration files (`google-services.json`, `GoogleService-Info.plist`, `credentials.json`) to version control. These files contain sensitive API keys and should remain local only. Use `firebase-config.example.json` as a reference for the required structure.

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

## Environment Variables

Create a `.env` file in the root directory (if needed for additional configurations):

```env
# Add any environment-specific variables here
API_BASE_URL=https://dummyjson.com
```

## Development

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

### Push Notifications Testing

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

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Home redirect
│   └── products/          # Product-related screens
├── common/                # Shared utilities and components
│   ├── components/        # Reusable UI components
│   ├── config/           # App configuration
│   └── utils/            # Utility functions
├── modules/              # Feature modules
│   └── products/         # Product module
│       ├── models/       # Data layer (API calls)
│       ├── screens/      # Screen components
│       └── types/        # TypeScript interfaces
├── assets/               # Static assets
├── app.config.ts         # Expo configuration
├── eas.json             # EAS Build configuration
└── tamagui.config.ts    # UI library configuration
```

## Available Scripts

```bash
# Development
yarn start              # Start Expo development server
yarn android           # Run on Android
yarn ios               # Run on iOS
yarn web               # Run on web

# Code Quality
npx biome check        # Lint and format check
npx biome check --fix  # Auto-fix issues

# Building
eas build --platform android  # Build Android APK/AAB
eas build --platform ios      # Build iOS IPA
eas build --platform all      # Build for all platforms

# Testing
yarn test              # Run tests (if configured)
```

## Building for Production

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

## Deployment

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

## API Integration

The app integrates with DummyJSON API for product data:

- **Base URL**: `https://dummyjson.com`
- **Endpoints**:
  - `GET /products` - List products
  - `GET /products/categories` - Get categories
  - `GET /products/category/{category}` - Products by category
  - `GET /products/{id}` - Product details

## Push Notification Features

- **FCM V1 Integration** with service account authentication
- **Deep linking** to specific screens/products
- **Background notification** handling
- **Local notification** testing utilities
- **Automatic token generation** and logging

## Security

### ⚠️ Sensitive Files

The following files contain sensitive information and should **NEVER** be committed to version control:

- `google-services.json` - Contains Firebase API keys
- `GoogleService-Info.plist` - Contains iOS Firebase configuration
- `credentials.json` - Contains Firebase service account private key
- `.env` files - May contain environment secrets

### ✅ Security Best Practices

1. **Use `.gitignore`** - All sensitive files are already in `.gitignore`
2. **Use example files** - Reference `firebase-config.example.json` for structure
3. **Environment variables** - Use `.env` files for secrets (never commit them)
4. **EAS Secrets** - Store production secrets in EAS for builds

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

## Troubleshooting

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

### Debug Commands

```bash
# Check EAS project status
eas project:info

# View build logs
eas build:list

# Check credentials
eas credentials --platform android
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
