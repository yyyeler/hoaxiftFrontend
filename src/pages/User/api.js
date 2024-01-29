import http from "@/lib/http";

export function getUserById(id){
    return http.get(`/api/v1/users/${id}`);
}