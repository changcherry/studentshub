import React, { useState, useEffect } from 'react';
import { api } from '../enum/api';
import { resp } from '../interface/resp';
import { Student } from '../interface/Student';

interface EditProps {
  student: Student;
  onUpdate: () => void;
}

const StudentEdit: React.FC<EditProps> = ({ student, onUpdate }) => {
  const [formData, setFormData] = useState<Student>(student);

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: resp<Student> = await asyncPost(api.updateStudent, formData);
      if (res.code === 200) {
        onUpdate(); // 通知父組件更新學生列表
      } else {
        alert('更新失敗，請稍後再試');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('網路錯誤，請檢查您的連線');
    }
  };

  return (
    <div>
      <h2>編輯學生資料</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
        <input type="text" name="sid" value={formData.sid} onChange={handleInputChange} />
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <input type="text" name="department" value={formData.department} onChange={handleInputChange} />
        <input type="text" name="class" value={formData.class} onChange={handleInputChange} />
        <input type="text" name="grade" value={formData.grade} onChange={handleInputChange} />
        <input type="Email" name="Email" value={formData.Email} onChange={handleInputChange} />
        <button type="submit">更新資料</button>
      </form>
    </div>
  );
};

export default StudentEdit;
function asyncPost(updateStudent: api, formData: Student): resp<Student> | PromiseLike<resp<Student>> {
    throw new Error('Function not implemented.');
}

