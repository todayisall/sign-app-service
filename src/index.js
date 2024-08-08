// 一个后端服务
const express = require("express");
const mockjs = require("mockjs");

const app = express();
const port = 6006;

// 模拟用户鉴权相关的接口
// 登录: /api/user-service/auth/user/login
// 注册: /api/user-service/auth/user/register
// 获取用户信息: /api/user-service/auth/user/getUserInfo
// 退出 /api/user-service/auth/user/logout

// 登录接口
app.post("/api/user-service/auth/user/login", (req, res) => {
  // 模拟一个token
  const token = mockjs.Random.string(32);
  res.send({
    code: 0,
    data: token,
    message: "登录成功",
  });
});

// 退出接口
app.post("/api/user-service/auth/user/logout", (req, res) => {
  res.send({
    code: 0,
    message: "退出成功",
  });
});

// 注册接口
app.post("/api/user-service/auth/user/register", (req, res) => {
  res.send({
    code: 0,
    message: "注册成功",
  });
});

/**
 * @description 获取用户信息
 * @method GET
 * @url /api/user-service/auth/user/getUserInfo
 * @return {Object} data - 用户信息
 *  - {String} 用户名 name
 *  - {String} - 头像 avatar
 *  - {String} - 手机号 phone
 *  - {Number} - 综合成绩 score
 *  */
app.get("/api/user-service/auth/user/getUserInfo", (req, res) => {
  res.send({
    code: 0,
    data: {
      name: mockjs.Random.cname(),
      avatar: mockjs.Random.image("200x200"),
      // 11位手机号
      phone: mockjs.Random.integer(10000000000, 19999999999),
      // 50 ～ 100
      score: mockjs.Random.integer(50, 100),
    },
    message: "获取用户信息成功",
  });
});

/**
 * @description 课程信息相关的接口
 * @method GET
 * @url /api/course-service/course/getCourseInfo
 * @return {Object} data - 课程信息
 * - {String} 常用单词 commonWords
 *   - {Number} - 已学习单词数 learnedWords
 *   - {Number} - 总单词数 totalWords
 * - {String} - 单词测试情况 wordTest
 *   - {Number} - 正确数 correct
 *   - {Number} - 总数 total
 * - {String} - 短语 phrase
 *   - {Number} - 已学习短语数 learnedPhrases
 *   - {Number} - 总短语数 totalPhrases
 * - {String} - 短语测试情况 phraseTest
 *   - {Number} - 正确数 correct
 *   - {Number} - 总数 total
 */
app.get("/api/course-service/course/progress", (req, res) => {
  res.send({
    code: 0,
    data: {
      commonWords: {
        learnedWords: mockjs.Random.integer(0, 1000),
        totalWords: mockjs.Random.integer(1000, 2000),
      },
      wordTest: {
        correct: mockjs.Random.integer(0, 100),
        total: mockjs.Random.integer(100, 200),
      },
      phrase: {
        learnedPhrases: mockjs.Random.integer(0, 100),
        totalPhrases: mockjs.Random.integer(100, 200),
      },
      phraseTest: {
        correct: mockjs.Random.integer(0, 100),
        total: mockjs.Random.integer(100, 200),
      },
    },
    message: "获取课程进度成功",
  });
});

/**
 * @description 课程详情
 * @method GET
 * @url /api/course-service/course/getCourseDetail
 * @return {Object} records - 课程详情
 */
app.get("/api/course-service/course/getCourseDetail", (req, res) => {
  // mock 20条记录
  res.send({
    code: 0,
    data: {
      records: mockjs.mock({
        "records|20": [
          {
            id: "@id",
            title: "@ctitle(5, 10)",
            "type|1": ["word", "phrase"],
            "status|1": ["learned", "unlearned"],
            "learnedTime|1-100": 1,
            "totalTime|1-100": 1,
          },
        ],
      }),
    },
    message: "获取课程详情成功",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`sign app listening at http://localhost:${port}`);
});
