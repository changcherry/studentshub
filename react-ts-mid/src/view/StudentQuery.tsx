// StudentQuery.tsx
//查詢
import React, { useState } from 'react';
import { asyncGet } from '../utils/fetch'; // 自定義的 HTTP 請求方法
import { api } from '../enum/api'; // API 枚舉
import { Student } from '../interface/Student'; // 學生介面
import { resp } from '../interface/resp'; // 通用回應介面
import Pagination from '../view/Pagination'; // 引入分頁元件

const StudentQuery: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // 用戶輸入查詢條件
  const [students, setStudents] = useState<Array<Student>>([]); // 學生列表
  const [currentPage, setCurrentPage] = useState(1); // 當前頁面
  const itemsPerPage = 10; // 每頁顯示的學生數量

  // 查詢學生資料
  const handleQuery = async () => {
    try {
        const queryParams = new URLSearchParams({ query }); // 將查詢參數傳遞給 asyncGet 方法
        const res: resp<Array<Student>> = await asyncGet(`${api.findStudent}?${queryParams.toString()}`);

        if (res.code === 200) {
            setStudents(res.body);
        } else {
            alert('查詢失敗，請稍後再試');
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('網路錯誤，請檢查您的連線');
    }
};


  // 分頁邏輯
  const paginatedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2>查詢學生資料</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="學號、姓名、院系..."
      />
      <button onClick={handleQuery}>查詢</button>

      <div>
        {paginatedStudents.map(student => (
          <div key={student._id}>
            <p>帳號: {student.userName}</p>
            <p>座號: {student.sid}</p>
            <p>姓名: {student.name}</p>
            <p>院系: {student.department}</p>
            <p>年級: {student.grade}</p>
            <p>班級: {student.class}</p>
            <p>Email: {student.Email}</p>
            <p>缺席次數: {student.absences ?? 0}</p>
          </div>
        ))}
      </div>

      <Pagination 
        totalItems={students.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default StudentQuery;
