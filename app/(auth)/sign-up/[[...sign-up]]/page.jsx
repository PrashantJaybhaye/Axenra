import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
      <div className="flex items-center justify-center h-screen -ml-6 w-full">
        <SignUp />
      </div>
    );
}