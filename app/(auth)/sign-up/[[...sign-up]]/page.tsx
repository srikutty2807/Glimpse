import Topbar from "@/components/shared/Topbar";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col mt-10 justify-center items-center">
      <Topbar />

      <SignUp />
    </div>
  );
}
