import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function editTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  const id: any = data.get("id")?.valueOf();
  console.log(id, title);

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.update({ where: { id }, data: { title } });
  redirect("/");
}

export default function Edit(props: any) {
  console.log(props);

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">编辑</h1>
      </header>
      <form action={editTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="id"
          value={props.params.id}
          className="bg-transparent overflow-hidden text-ellipsis"
        />
        <input
          type="text"
          name="title"
          placeholder={props.params.title}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            取消
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            修改
          </button>
        </div>
      </form>
    </>
  );
}
