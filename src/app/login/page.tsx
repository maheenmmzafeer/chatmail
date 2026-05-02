import LoginClient from './login-client';

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const errorParam = resolvedSearchParams?.error;
  const error = Array.isArray(errorParam) ? errorParam[0] : errorParam;

  return <LoginClient error={error} />;
}