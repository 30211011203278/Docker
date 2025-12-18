const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// اتصال MongoDB
mongoose.connect('mongodb://localhost:27017/testDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// موديل البيانات
const MyData = require('./models/mydataschema');

// إعدادات EJS + Public
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method Override
app.use(methodOverride('_method'));

// ================= ROUTES =================

// 1️⃣ صفحة البحث / عرض كل البيانات (Search)
app.get('/', async (req, res) => {
  try {
    const allData = await MyData.find();
    res.render('user/search', { allData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 2️⃣ صفحة إضافة بيانات (Add Form)
app.get('/add', (req, res) => {
  res.render('user/add');
});

// 3️⃣ إنشاء بيانات جديدة (CREATE)
app.post('/add', async (req, res) => {
  try {
    await MyData.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 4️⃣ صفحة تعديل بيانات (Edit Form)
app.get('/edit/:id', async (req, res) => {
  try {
    const customer = await MyData.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.render('user/edit', { customer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 5️⃣ تحديث البيانات (UPDATE)
app.put('/edit/:id', async (req, res) => {
  try {
    await MyData.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 6️⃣ عرض بيانات واحدة بالتفصيل (VIEW)
app.get('/view/:id', async (req, res) => {
  try {
    const customer = await MyData.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.render('user/view', { customer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 7️⃣ حذف البيانات (DELETE)
app.delete('/delete/:id', async (req, res) => {
  try {
    await MyData.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// 1️⃣ صفحة البحث / عرض كل البيانات (Search)
app.get('/', async (req, res) => {
  try {
    const allData = await MyData.find();
    res.render('user/search', { allData }); // 👈 هنا يتم تحديد الملف
  } catch (err) {
    // ...
  }
});