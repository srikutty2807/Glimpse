import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userid = user.id;

  const userInfo = await fetchUser(userid);
  console.log(userid);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const activity = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-1 flex-col gap-5">
        {activity.length >0 ?(
          <>
          {activity.map((activity)=>(
            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
              <article className="activity-card">
                <Image src={activity.author.image} alt="profile-picture" width={20} height={20} className="rounded-full object-cover" />
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {activity.author.name}
                  </span>{" "}
                  replied to your Glimpse
                </p>
              </article>
            </Link>
          ))}
          </>
        ): <p className="!text-base-regular text-light-3">No Activity yet</p> }
      </section>
    </section>
  );
}

export default Page;
