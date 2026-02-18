import {redirect} from "react-router";

function requireAuth() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return redirect("/login");

    return JSON.parse(userStr);
}

export default requireAuth;