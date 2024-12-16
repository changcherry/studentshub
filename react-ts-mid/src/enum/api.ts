const BASE_URL = "http://163.13.201.151:8877/api/v1";

export enum api {
    findAll = `${BASE_URL}/user/findAll`,  // 查詢所有學生
    addStudent = `${BASE_URL}/user/addStudent`  // 新增學生
}
