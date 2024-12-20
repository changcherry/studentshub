import React, { useEffect, useState } from 'react';
import '../style/App.css'; // 引入樣式
import { asyncGet, asyncPost } from '../utils/fetch'; // 引入自定義的 HTTP 請求方法
import { api } from '../enum/api'; // 引入 API 枚舉
import { Student } from '../interface/Student'; // 引入學生介面
import { resp } from '../interface/resp'; // 引入通用回應介面

// 主組件 App
const App = () => {
  // 狀態 hooks
  const [students, setStudents] = useState<Array<Student>>([]); // 儲存學生資料列表
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息
  const [sortCriteria, setSortCriteria] = useState<'sid' | 'name' | 'department'>('sid'); // 儲存目前的排序條件
  const [newStudent, setNewStudent] = useState<Student>({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    Email: '',
    absences: 0,
    _id: '', // 預設 _id 為空，假設後端會生成
  }); // 儲存新增學生的表單資料

  // 從伺服器獲取學生列表資料
  const fetchStudents = async () => {
    try {
      const res: resp<Array<Student>> = await asyncGet(api.findAll);
      if (res.code === 200) {
        const sortedData = res.body.sort((a, b) => {
          return Number(a.sid) - Number(b.sid);
        });
        
        setStudents(sortedData); // 更新狀態
      } else {
        setError('無法獲取學生資料，請稍後再試');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('網路錯誤，請檢查您的連線');
    }
  };
  
  


  // 組件掛載後自動調用 fetchStudents，類似於 componentDidMount
  useEffect(() => {
    fetchStudents();
  }, []); // 空依賴陣列，確保只執行一次

  // 處理新增學生表單的輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 獲取輸入框的 name 和 value
    setNewStudent({ ...newStudent, [name]: value }); // 動態更新對應的表單值
  };

  // 處理排序條件變更
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value as 'sid' | 'name' | 'department'); // 更新排序條件
  };

  // 根據當前的排序條件對學生列表進行排序
  const sortedStudents = [...students].sort((a, b) => {
    if (sortCriteria === 'sid') {
      return a.sid - b.sid; // 座號排序
    } else if (sortCriteria === 'name') {
     // return a.name.localeCompare(b.name); // 姓名排序
    } else if (sortCriteria === 'department') {
      return a.department.localeCompare(b.department); // 院系排序
    }
    return 0; // 若無條件則不進行排序
  });

  // 提交新增學生表單
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表單默認提交行為
    try {
      // 發送新增學生的請求
      const res: resp<Student> = await asyncPost(api.insertOne, newStudent);
      if (res.code === 200) {
        setStudents([...students, res.body]); // 若成功，將新學生加入列表
        setNewStudent({
          userName: '',
          sid: '',
          name: '',
          department: '',
          grade: '',
          class: '',
          Email: '',
          absences: 0,
          _id: '',
        }); // 清空表單
      } else {
        setError('新增失敗，請稍後再試'); // 顯示新增失敗訊息
      }
    } catch (error) {
      console.error('Network error:', error); // 捕獲請求錯誤
      setError('網路錯誤，請檢查您的連線'); // 顯示網路錯誤訊息
    }
  };

  return (
    <div className="container">
      {/* 頁面標題 */}
      <header className="app-header">
        <h1>Welcome to Student Hub!</h1>
      </header>

      {/* 錯誤訊息提示 */}
      {error && <p className="error">{error}</p>}

    {/*}  //{/* 排序選單
      <div className="sort-container">
        <label htmlFor="sort">排序方式：</label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="sid">座號</option>
          <option value="name">姓名</option>
          <option value="department">院系</option>
        </select>
      </div> */}

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
          name="class"
          placeholder="班級"
          value={newStudent.class}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="年級"
          value={newStudent.grade}
          onChange={handleInputChange}
        />
        <input
          type="Email"
          name="Email"
          placeholder="Email"
          value={newStudent.Email}
          onChange={handleInputChange}
        />
        <button type="submit">新增學生</button>
      </form>

      {/* 學生列表 */}
      {sortedStudents.length > 0 ? (
        sortedStudents.map((student) => (
          <div className="student" key={student._id}>
            <p>帳號: {student.userName}</p>
            <p>座號: {student.sid}</p>
            <p>姓名: {student.name}</p>
            <p>院系: {student.department}</p>
            <p>年級: {student.grade}</p>
            <p>班級: {student.class}</p>
            <p>Email: {student.Email}</p>
            <p>缺席次數: {student.absences ?? 0}</p>
          </div>
        ))
      ) : (
        <div className="loading">載入中...</div>
      )}
    </div>
  );
};

export default App;
