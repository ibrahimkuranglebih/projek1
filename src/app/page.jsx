import FormTodo from "../../components/FormTodo";

export default async function Home() {

  return (
    <main className="p-4">
      <h1 className="text-slate-100 text-center text-xl">Form Todo</h1>
      <FormTodo/>
    </main>
  )
}