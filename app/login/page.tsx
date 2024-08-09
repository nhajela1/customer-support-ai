'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/chat');
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        default:
          errorMessage = 'Failed to sign in. Please check your credentials and try again.';
      }
      setError(errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/chat');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <main className="h-screen w-screen bg-black text-white">
      <nav className="bg-black p-4">
        <h1 className="text-2xl font-bold">Customer Support AI</h1>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSignIn} className="w-full max-w-xs space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <Button type="submit" className="w-full font-semibold">
              Login
            </Button>
            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full text-black hover:brightness-75">
              Sign In with Google
            </Button>
          </div>
        </form>
        <div className="mt-4">
          <Link href="/signup" className="text-white/70 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;