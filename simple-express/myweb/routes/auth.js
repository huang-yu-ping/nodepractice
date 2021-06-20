const express = require('express')
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('multer');
const connection = require('../utils/db');
const { body, validationResult } = require("express-validator");
var router = express.Router();

// 註冊表單資料的驗證規則
const registerRules = [
    body("email").isEmail().withMessage("請正確輸入 Email 格式"),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").custom((value, { req }) => {
      return value === req.body.password;
    }),
  ];

//設定上傳檔案的儲存地方、方式
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // routes/auth.js -> 現在的位置
    // public/uploads -> 希望找到的位置
    // /routes/../public/uploads
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    // 抓出副檔名
    const ext = file.originalname.split(".").pop();
    // 組合出自己想要的檔案名稱
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});

//要用 multer 來做一個上傳工具 uploader
const uploader = multer({
    storage: myStorage,
    fileFilter: function (req, file, cb) {
      // console.log(file);
      //if (file.mimetype !== "image/jpeg") {
      //  return cb(new Error("不合法的 file type"), false);
      //}
      // file.originalname: Name of the file on the user's computer
      // 101.jpeg
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("是不合格的副檔名"));
      }
      // 檔案ＯＫ, 接受這個檔案
      cb(null, true);
    },
    limits: {
      // 限制檔案的上限 1M
      fileSize: 1024 * 1024,
    },
  });
//---------
router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', uploader.single('avatar'), registerRules, async (req, res) => {
    console.log(req.body)

    const Result = validationResult(req);
    if(!Result.isEmpty()) {
        return next(new Error("表單問題"))
    }
    let check = await connection.queryAsync(
        "SELECT * FROM members WHERE email = ?",
        req.body.email
      );
      if (check.length > 0) {
        return next(new Error("email已註冊"));
      }
    await bcrypt.hash(req.body.password, 10)

    let result = await connection.queryAsync(
        "INSERT INTO members (email, password, name, photo) VALUES (?);",
        [[req.body.email, req.body.password, req.body.name,`/uploads/${req.file.filename}`]]
    )




    res.send('成功');
})

module.exports = router;