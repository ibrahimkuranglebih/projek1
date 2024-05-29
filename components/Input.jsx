export default function Input({name, placeholder, type}){
    return (
        <input className="form-input bg-gray-600 border-none rounded-md inver-[1] px-1 py-3" 
        type={type}
        name={name} 
        placeholder={placeholder}/>
    )
}