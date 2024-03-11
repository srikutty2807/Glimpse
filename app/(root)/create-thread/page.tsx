import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userid = user.id
  const userInfo = await fetchUser(userid)
  if (!userInfo?.onboarded) {
    redirect('/onboarding')
  }
  const userInfoId =String(userInfo._id)
  return( <><h1 className="head-text">Create a Glimpse</h1>
    <PostThread userId={userInfoId} />
  </>)
}

export default Page;
