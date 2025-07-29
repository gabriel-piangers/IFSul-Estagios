import { useAuth } from "../contexts/AuthProvider"

export function Unautorized() {
    const {user, isAutenticated} = useAuth()

    console.log(user)
    console.log("isAutenticated: ", isAutenticated)

    return (
        <main>
            <h1>Acesso negado</h1>
            <h3>Você não tem acesso a este página</h3>
        </main>
    )
}