export default function InputField( { label , type , placeholder } ) {
    return (
        <div className="mb-3">
            <label className="block text-pink-300 font-medium mb-3">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full p-3 border border-green-700 rounded"
            />
        </div>
    );
}
