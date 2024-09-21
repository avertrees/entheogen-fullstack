import { SignIn } from '@clerk/nextjs'

export default function SigninPage() {
  return (
    <div className="h-screen w-screen relative">
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}
