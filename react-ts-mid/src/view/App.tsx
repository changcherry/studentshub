import { useEffect, useRef, useState } from 'react';
import '../style/App.css';
import { asyncGet, asyncPost } from '../utils/fetch'; // 新增 asyncPost 方法
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import { resp } from '../interface/resp';



const App = () => {
  const [students, setStudents] = useState<Array<Student>>([]);
  const [error, setError] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    email: '',
    absences: 0,
    _id: '', // 假設後端會自動生成 ID
  });
  const cache = useRef<boolean>(false);

  // 取得學生列表
  const fetchStudents = async () => {
    // if (cache.current) return;
    console.log("fetching")
    // cache.current = true;
    try {
      const res: resp<Array<Student>> = await asyncGet(api.findAll);
      if (res.code === 200) {
        setStudents(res.body);
      } else {
        setError('無法獲取學生資料，請稍後再試');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('網路錯誤，請檢查您的連線');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 處理表單輸入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // 提交新增學生
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: resp<Student> = await asyncPost(api.addStudent, newStudent);
      if (res.code === 200) {
        setStudents([...students, res.body]); // 新增成功，更新列表
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
      console.error('Network error:', error);
      setError('網路錯誤，請檢查您的連線');
    }
  };

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
      {error && <p className="error">{error}</p>}
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
      {studentList}
    </div>
  );
};


export default App;