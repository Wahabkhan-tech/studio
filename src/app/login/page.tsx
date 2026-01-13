
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
import { teachers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login and role setting
    setTimeout(() => {
        if (email.toLowerCase() === 'admin@protracks.com') {
            localStorage.setItem('userRole', 'admin');
            router.push('/admin/dashboard');
        } else if (teachers.some(t => t.email.toLowerCase() === email.toLowerCase())) {
            localStorage.setItem('userRole', 'teacher');
            router.push('/teacher/dashboard');
        } else {
            // Assume student login for any other email for demo purposes
            // In a real app, you'd find the student in the DB.
            localStorage.setItem('userRole', 'student');
            router.push('/student/dashboard');
        }
    }, 1500)
  };
  
  const handleForgotPassword = () => {
    toast({
        title: "Forgot Password (Demo)",
        description: "A password reset link would be sent to your email address."
    })
  }

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
          <CardTitle className="text-2xl">Login</CardTitle>
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" type="button" onClick={handleForgotPassword} className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Button>
              </div>
              <Input id="password" type="password" required disabled={isLoading} defaultValue="password" />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
      
       <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/login/student" className="underline">
              Activate your Student Account
          </Link>
        </div>

      <Alert className="mt-6 max-w-sm">
        <Info className="h-4 w-4" />
        <AlertTitle>Testing Credentials</AlertTitle>
        <AlertDescription>
          <ul className="text-xs space-y-1 mt-2">
            <li><strong>Admin:</strong> <code>admin@protracks.com</code></li>
            <li><strong>Teacher:</strong> Use any email from the teacher list, e.g., <code>mukesh@protracks.com</code></li>
            <li><strong>Student:</strong> Any other email, or use the activation page.</li>
            <li>Any password will work for this demo.</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
