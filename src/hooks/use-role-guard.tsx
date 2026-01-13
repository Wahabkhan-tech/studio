
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserRole } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export function useRoleGuard(role: UserRole) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    
    if (!storedRole || storedRole !== role) {
      router.push('/login');
    } else {
      setIsVerifying(false);
    }
  }, [role, router, pathname]);

  if (isVerifying) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Verifying access...</p>
            </div>
        </div>
    )
  }

  return null;
}
