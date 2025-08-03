export function FormSubmit({label = "Enviar", className= ""}) {

    return (
        <input type="submit" value={label} className={`form-submit ${className}`}/>
    )
}