'use client'

import { ResetPasswordForm } from "@/components/form/reset-password-form";

export default function Page() {
  return (
    <div className="flex justify-center mt-20 min-h-screen">
      <div className="space-y-6 mx-auto w-full max-w-md">
        <div className="space-y-2">
          <h1 className="font-black text-3xl">Reset password anda</h1>
          <p className="text-muted-foreground">Masukan password baru anda</p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
