import { AiOutlinePlus } from "react-icons/ai";
import TodoList from "./TodoList";

const AddTask = () => {
    return <div>
        <button className="btn btn-primary w-full bg-cyan-700 hover:bg-cyan-400 text-slate-50  border-none text-base" >Add New Task <AiOutlinePlus className="ml-2" size={18}/></button>
        <TodoList/>
    </div>;
}


export default AddTask;