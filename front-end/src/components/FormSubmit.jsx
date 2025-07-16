export function FormSubmit({label = "Enviar"}) {

    return (
        <input type="submit" value={label} className="form-submit"/>
    )
}