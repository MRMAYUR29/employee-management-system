import { useSelector } from "react-redux"

export default function Dashboard() {

    const user = useSelector(
        state => state.auth.user
    );

    return(
        <h2>Welcome {user?.name || "Guest"}</h2>
    )
}