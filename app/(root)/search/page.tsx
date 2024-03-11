import UserCard from "@/components/cards/UserCard";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { use } from "react";

async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userid = user.id;
  
  const userInfo = await fetchUser(userid);
  console.log(userid)
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  const result = await fetchUsers({
    userId: userid,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
