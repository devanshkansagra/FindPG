import Cookie from "./Cookie";

export function isAuthenticated() {
    return !!Cookie.get("accessToken");
}