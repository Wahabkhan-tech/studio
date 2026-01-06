'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, you'd have different logic based on role
    // For now, we'll just simulate a delay and redirect.
    setTimeout(() => {
        if (email.toLowerCase() === 'admin@protracks.com') {
            router.push('/admin/dashboard');
        } else if (email.toLowerCase() === 'alan.grant@example.com' || email.toLowerCase() === 'ellie.sattler@example.com') {
            router.push('/teacher/dashboard');
        } else {
            // In a real app, show an error toast
            router.push('/admin/dashboard'); // Default redirect for demo
        }
    }, 1500)
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="flex items-center gap-4 mb-4">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter text-primary">Protracks</h1>
            </Link>
            <p className="max-w-lg text-md text-muted-foreground">
            Welcome back. Please sign in to your account.
            </p>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin & Teacher Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required disabled={isLoading} />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
            <div className="text-center text-sm">
                Are you a student?{' '}
                <Link href="/login/student" className="underline">
                    Activate Your Account
                </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      <Alert className="mt-6 max-w-sm">
        <Info className="h-4 w-4" />
        <AlertTitle>Testing Credentials</AlertTitle>
        <AlertDescription>
          <ul className="text-xs space-y-1 mt-2">
            <li><strong>Admin:</strong> <code>admin@protracks.com</code></li>
            <li><strong>Teacher:</strong> <code>alan.grant@example.com</code></li>
            <li>Any password will work for this demo.</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
