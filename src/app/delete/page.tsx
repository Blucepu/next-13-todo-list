import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { RedirectType } from "next/dist/client/components/redirect";

async function deleteTodo(data: FormData) {
  "use server";
  //   console.log(data.get("title")?.valueOf());

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  //   await prisma.todo.create({ data: { title, complete: false } });/
  await prisma.todo.delete({
    where: {
      id: title,
    },
  });
  redirect("/", RedirectType.replace);
}

export default function Delete(props: any) {
  //   console.log(props);

  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl">是否删除?</h1>
      </header>
      <form action={deleteTodo} className="flex items-center gap-20">
        <input
          type="text"
          name="title"
          value={props.searchParams.id}
          className="bg-transparent overflow-hidden text-ellipsis"
        />
        <button
          type="submit"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          是
        </button>
        <Link
          href=".."
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          否
        </Link>
      </form>

      {/* <form action={deleteTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form> */}
    </>
  );
}
