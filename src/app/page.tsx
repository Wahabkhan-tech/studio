import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Shield, User, UserCog } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-4 mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-bold tracking-tighter text-primary">Protracks</h1>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Streamline your final year project management. Connect students, guide teachers, and empower administrators.
        </p>
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Select Your Role</CardTitle>
          <CardDescription className="text-center">
            Choose your dashboard to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/admin/dashboard">
                <Shield className="mr-2 h-5 w-5" /> Login as Admin
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full" variant="secondary">
              <Link href="/teacher/dashboard">
                <UserCog className="mr-2 h-5 w-5" /> Login as Teacher
              </Link>
            </Button>
            <Button asChild size="lg" className="w-full" variant="outline">
              <Link href="/login/student">
                <User className="mr-2 h-5 w-5" /> Student Login / Activation
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Protracks. All rights reserved.
      </footer>
    </div>
  );
}
