const InputField = ({ type, name, placeholder, value, onChange, onClick, readOnly, className }) => {
    return (
        <div className="relative w-full">
            <input
                className={`w-full px-4 py-2 border border-gray-300 rounded-md font-normal text-black leading-normal ${className}`}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onClick={onClick}
                readOnly={readOnly}
            />
        </div>
    );
};

export default InputField;
