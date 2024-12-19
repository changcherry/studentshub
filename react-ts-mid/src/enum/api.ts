const BASE_URL = "http://127.0.0.1:3000/api/v1";

export enum api {
    findAll = `${BASE_URL}/user/findAll`,  // 查詢所有學生
    addStudent = `${BASE_URL}/user/addStudent`  // 新增學生
}
