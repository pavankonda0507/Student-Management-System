export default function Profile() {
    let role = localStorage.getItem("userRole");
    role = role.substring(5); // Remove "ROLE_" prefix  
    return(
        <>
        <h1>This is Profile</h1>
        </>
    )
}