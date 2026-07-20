import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

// Your Firebase config - Replace with your own from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: 'google'
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

// Sign in with GitHub
export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    return {
      id: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'GitHub User',
      email: user.email,
      photoURL: user.photoURL,
      provider: 'github'
    };
  } catch (error) {
    console.error('GitHub Sign-In Error:', error);
    throw error;
  }
};

export { auth };
