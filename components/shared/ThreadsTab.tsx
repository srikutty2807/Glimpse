import { fetchUserPosts } from "@/lib/actions/user.actions";
import React from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import { redirect } from "next/navigation";

interface ThreadsProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadsProps) {
  let result = await fetchUserPosts(accountId);
  //console.log(result);
  if (!result) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => {
        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        )
      })}
    </section>
  );
}

export default ThreadsTab;
