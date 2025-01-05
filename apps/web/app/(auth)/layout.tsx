import { NavBar } from '@ultra-reporter/ui/home/nav-bar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar hideAuth={true} />
      {children}
    </>
  );
}
