import React, { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet, asyncPost } from '../utils/fetch'; // 引入封裝的 GET 和 POST 方法
import { api } from '../enum/api'; // 引入 API 枚舉
import { Student } from '../interface/Student'; // 引入 Student 接口
import { resp } from '../interface/resp'; // 引入通用回應接口

const App = () => {
  const [students, setStudents] = useState<Array<Student>>([]); // 儲存學生列表
  const [newStudent, setNewStudent] = useState<Student>({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    email: '',
    absences: 0,
    _id: '',
  }); // 儲存新學生資料
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息
  const [message, setMessage] = useState<string | null>(null); // 儲存操作成功或失敗提示訊息

  const cache = useRef<boolean>(false); // 避免多次請求的快取標誌

  // 獲取學生列表
  const fetchStudents = async () => {
    try {
      const res: resp<Array<Student>> = await asyncGet(api.findAll); // 調用後端 API
      if (res.code === 200) {
        setStudents(res.body); // 更新學生列表
      } else {
        setError('無法獲取學生資料，請稍後再試');
      }
    } catch (error) {
      console.error('網路錯誤:', error);
      setError('網路錯誤，請檢查您的連線');
    }
  };

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      fetchStudents(); // 組件掛載時調用
    }
  }, []);

  // 處理表單輸入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // 提交新增學生
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 清空錯誤訊息
    setMessage(null); // 清空提示訊息

    try {
      const res: resp<Student> = await asyncPost(api.addStudent, newStudent);
      if (res.code === 200) {
        setStudents([...students, res.body]); // 成功新增後更新學生列表
        setMessage('學生新增成功');
        setNewStudent({
          userName: '',
          sid: '',
          name: '',
          department: '',
          grade: '',
          class: '',
          email: '',
          absences: 0,
          _id: '',
        }); // 清空表單
      } else {
        setError('新增失敗，請稍後再試');
      }
    } catch (error) {
      console.error('網路錯誤:', error);
      setError('網路錯誤，請檢查您的連線');
    }
  };

  // 顯示學生列表
  const studentList = students.length > 0 ? (
    students.map((student: Student) => (
      <div className="student" key={student._id}>
        <p>帳號: {student.userName}</p>
        <p>座號: {student.sid}</p>
        <p>姓名: {student.name}</p>
        <p>院系: {student.department}</p>
        <p>年級: {student.grade}</p>
        <p>班級: {student.class}</p>
        <p>Email: {student.email}</p>
        <p>缺席次數: {student.absences ?? 0}</p>
      </div>
    ))
  ) : (
    <div className="loading">載入中...</div>
  );

  return (
    <div className="container">
      <header className="app-header">
        <h1>Welcome to Student Hub!</h1>
      </header>

      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}

      {/* 新增學生表單 */}
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          name="userName"
          placeholder="帳號"
          value={newStudent.userName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="sid"
          placeholder="座號"
          value={newStudent.sid}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="姓名"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="院系"
          value={newStudent.department}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="grade"
          placeholder="年級"
          value={newStudent.grade}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="class"
          placeholder="班級"
          value={newStudent.class}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={handleInputChange}
        />
        <button type="submit">新增學生</button>
      </form>

      {/* 顯示學生列表 */}
      {studentList}
    </div>
  );
};

export default App;
