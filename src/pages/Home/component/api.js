import http from "@/lib/http"

export function getAllUsers(page = 0){
    return http.get("/api/v1/users", {params: { page: page, size: 3}});
}