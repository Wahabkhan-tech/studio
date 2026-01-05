
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Loader2 } from 'lucide-react';
import { students } from '@/lib/data';
import Link from 'next/link';

export default function StudentLoginPage() {
  const [seatNumber, setSeatNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleActivation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate system verification logic
    setTimeout(() => {
      const studentRecord = students.find(
        (s) => s.id === `s${seatNumber.slice(-1)}` && s.email.toLowerCase() === email.toLowerCase()
      );
      
      // In a real app, you would check against a "NOT_ACTIVATED" status
      if (studentRecord) {
        toast({
          title: 'Account Activated!',
          description: 'A temporary password has been sent to your email. Please login to continue.',
        });
        // Redirect to the onboarding/dashboard after successful "activation"
        router.push('/student/onboarding');
      } else {
        toast({
          variant: 'destructive',
          title: 'Activation Failed',
          description:
            'Seat number or email not found in registry. Please contact your administrator.',
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex flex-col items-center text-center mb-8">
         <Link href="/" className="flex items-center gap-4 mb-4">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tighter text-primary">CapstoneFlow</h1>
        </Link>
        <p className="max-w-lg text-md text-muted-foreground">
          Your journey to a successful final year project starts here.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Student Login & Activation</CardTitle>
          <CardDescription>
            Enter your seat number and official email to activate your account or log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleActivation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seat-number">Seat / Registration Number</Label>
              <Input
                id="seat-number"
                placeholder="e.g., EB12345"
                required
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Official Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Verifying...' : 'Login / Activate'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <footer className="mt-8 text-sm text-muted-foreground">
        Having trouble? <Link href="#" className="underline">Contact Administrator</Link>
      </footer>
    </div>
  );
}
