import http from "./config";

const service = {
  create: (data) => http.post("/service", data),
  get: () => http.get("/service/all", { params: { page: 2, limit: 10 } }),
  delete: (id) => http.delete("/service", { params: { id: id } }),
  update: (item) => http.put("/service", item),
};

export default service;
