import api from "@/lib/axios";

export default async function getCsrfCookie() {
  return api.get("/sanctum/csrf-cookie");
}
