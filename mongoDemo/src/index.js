app.post('/api/v1/user/addStudent', async (req, res) => {
  const { id, seat, name, department, grade, class: studentClass, email } = req.body;

  // 檢查所有必要的字段是否存在
  if (!id || !seat || !name || !department || !grade || !studentClass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 確認學生 ID 是否已存在
    const existingStudent = await User.findOne({ id });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this ID already exists' });
    }

    // 建立新學生
    const newStudent = new User({
      id,
      seat,
      name,
      department,
      grade,
      class: studentClass,
      email,
    });

    // 保存到資料庫
    const savedStudent = await newStudent.save();

    // 返回新增的學生資料
    res.status(201).json({
      message: 'Student added successfully',
      data: savedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student', details: error.message });
  }



  app.post('/addStudent', (req, res) => {
    try {
      const student = req.body;
      console.log('Request Body:', student); // 打印请求数据
      res.status(200).json({
        code: 200,
        message: '新增學生成功',
        body: student,
      });
    } catch (error) {
      console.error('Error:', error); // 打印错误信息
      res.status(500).json({
        code: 500,
        message: error.message,
      });
    }
  });
  
});
