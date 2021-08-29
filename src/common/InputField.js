import { useEffect } from "react";
export function InputField({ name, type, validationArr, pattern, value, placeholder, valueUpdator }) {
    // const [value, setValue] = useState('');
    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        handleErrors(name, value)
        if (!value) {

        }
        if (value && value.trim()) {
            // setValue(value);
            valueUpdator(name, value)
        }
    }
    const showErrors = (type, fieldName) => {
        if (type === 'required') {
            return (<p> {name}  is Required </p>)
        }
    }
    const handleErrors = (name, value) => {
        if (!value && validationArr.includes('required')) {
            showErrors('required', name)
        }
    }
    useEffect(() => {

    }, [value])
    return (
        <>
            <input onBlur={handleErrors} name={name} onChange={handleInputChange} value={value || ''} type={type || 'text'} placeholder={placeholder || 'input field'} />
        </>
    )
}