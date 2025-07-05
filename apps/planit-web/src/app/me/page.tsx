'use client';

import { logoutUser } from '@/actions/auth/logout';
import { Button } from '@/shared/components';

export default function Index() {
  return (
    <div>
      Your PlanIt view
      <Button
        type="button"
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
