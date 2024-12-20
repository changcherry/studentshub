import { useState } from 'react';
import { asyncPost } from '../utils/fetch'; // 假設有封裝的 POST 方法
import { api } from '../enum/api'; // 引入 API 定義

const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    Email: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // 清空之前的提示訊息

    try {
      const res = await asyncPost(api.insertOne, studentData);
      if (res.code === 200) {
        setMessage('學生新增成功');
      } else {
        setMessage('學生新增失敗，請稍後再試');
      }
    } catch (error) {
      console.error('網路錯誤:', error);
      setMessage('網路錯誤，請檢查您的連線');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="帳號"
          value={studentData.userName}
          onChange={handleChange}
          required
        />
    { /*  <input
          type="text"
          name="sid"
          placeholder="座號"
          value={studentData.sid}
          onChange={handleChange}
          required
        />*/}
        <input
          type="text"
          name="name"
          placeholder="姓名"
          value={studentData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="院系"
          value={studentData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="年級"
          value={studentData.grade}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="class"
          placeholder="班級"
          value={studentData.class}
          onChange={handleChange}
          required
        />
        <input
          type="Email"
          name="Email"
          placeholder="Email"
          value={studentData.Email}
          onChange={handleChange}
          required
        />
        <button type="submit">新增學生</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddStudentForm;
