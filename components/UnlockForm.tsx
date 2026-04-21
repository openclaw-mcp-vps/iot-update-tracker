"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Enter the same email used during Stripe checkout")
});

type FormValues = z.infer<typeof schema>;

export function UnlockForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const submit = form.handleSubmit(async (values) => {
    setError(null);

    const response = await fetch("/api/subscription/unlock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const body = (await response.json()) as { error?: string };
      setError(body.error ?? "Unable to verify subscription.");
      return;
    }

    window.location.href = "/dashboard";
  });

  return (
    <form onSubmit={submit} className="space-y-3">
      <label htmlFor="email" className="block text-sm text-zinc-300">
        Purchase email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        {...form.register("email")}
      />
      {form.formState.errors.email ? (
        <p className="text-xs text-red-300">{form.formState.errors.email.message}</p>
      ) : null}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
      <Button type="submit" className="w-full">
        Unlock Access
      </Button>
    </form>
  );
}
