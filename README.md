# PetShare - Social Media App for Pet Lovers

![PetShare Logo](https://via.placeholder.com/150x50?text=PetShare) <!-- Replace with actual logo if available -->

PetShare is a modern social media platform built specifically for pet enthusiasts. Share adorable photos of your furry friends, connect with fellow pet lovers, and create a vibrant community around pets. This client-side application is built with React and powered by Firebase for seamless authentication and real-time data management.

## 🚀 Features

- **User Authentication**: Secure sign-in and sign-up using Firebase Authentication
- **Real-time Feed**: View posts from all users in real-time using Firebase Realtime Database
- **Post Creation**: Easily create and share posts with images and captions
- **Responsive Design**: Optimized for desktop and mobile devices using TailwindCSS
- **Protected Routes**: Private routes ensure only authenticated users can access the main feed
- **Modern UI**: Clean, intuitive interface with smooth animations and hover effects

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS
- **Backend**: Firebase (Authentication, Realtime Database, Firestore)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Linting**: ESLint

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Firebase Account** - [Create one here](https://firebase.google.com/)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/petshare-client.git
   cd petshare-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment variables file:**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

## 🔥 Firebase Setup

1. **Create a Firebase Project:**
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" and follow the setup wizard

2. **Enable Authentication:**
   - In your Firebase project, go to Authentication > Sign-in method
   - Enable Email/Password authentication

3. **Set up Realtime Database:**
   - Go to Realtime Database in the Firebase Console
   - Click "Create database" and choose "Start in test mode" or set up security rules
   - Copy the database URL for your `.env` file

4. **Configure Security Rules:**
   - In Realtime Database > Rules, paste the following rules:
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null",
         "posts": {
           ".indexOn": ["timestamp"],
           ".read": "auth != null",
           ".write": "auth != null"
         }
       }
     }
     ```

5. **Get Firebase Config:**
   - Go to Project Settings > General > Your apps
   - Click "Add app" and select Web (</>) icon
   - Copy the config object values to your `.env` file

## 🚀 Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

3. **Sign up or sign in:**
   - Create a new account or sign in with existing credentials
   - Start creating posts and exploring the feed!

## 📦 Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## 🧪 Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainers.

---

**Happy Pet Sharing! 🐾**
