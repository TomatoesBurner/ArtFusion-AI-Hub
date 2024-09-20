// tests/user.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("../routers/userRoutes"); // 确保路径正确
const dotenv = require("dotenv");

// 加载环境变量
dotenv.config({ path: "./config.env" });

// 创建 Express 应用程序
const app = express();

// 中间件
app.use(express.json());

// 路由
app.use("/api/v1/users", userRouter);

// 测试开始前连接到测试数据库
beforeAll(async () => {
    const DB = process.env.DATABASE_JEST.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
    );
    mongoose
        .connect(DB)
        .then(() => console.log("DB connection successful!"))
        .catch((err) => console.error("DB connection error:", err));
});

// 测试结束后关闭数据库连接
afterAll(async () => {
    await mongoose.connection.close();
});

// 测试套件
describe("User Authentication Tests", () => {
    //在每个测试后清除数据库
    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
    });

    test("Should sign up a new user", async () => {
        const response = await request(app)
            .post("/api/v1/users/signup")
            .send({
                name: "testuser",
                email: "testuser@example.com",
                password: "testpassword",
                passwordConfirm: "testpassword",
            })
            .expect(201);
        expect(response.body.status).toBe("success");
        expect(response.body.data.user).toHaveProperty(
            "email",
            "testuser@example.com"
        );
    });
    test("Should login an existing user", async () => {
        // 创建一个新用户
        await request(app)
            .post("/api/v1/users/signup")
            .send({
                name: "loginuser",
                email: "loginuser@example.com",
                password: "loginpassword",
                passwordConfirm: "loginpassword",
            })
            .expect(201);

        // 测试登录功能
        const response = await request(app)
            .post("/api/v1/users/login")
            .send({
                email: "loginuser@example.com",
                password: "loginpassword",
            })
            .expect(200);

        expect(response.body.status).toBe("success");
        expect(response.body).toHaveProperty("token");
    });

    test("Should not login with incorrect password", async () => {
        // 创建一个新用户
        await request(app)
            .post("/api/v1/users/signup")
            .send({
                name: "wrongpassworduser",
                email: "wrongpassworduser@example.com",
                password: "correctpassword",
                passwordConfirm: "correctpassword",
            })
            .expect(201);
        // 使用错误的密码登录
        const response = await request(app)
            .post("/api/v1/users/login")
            .send({
                email: "wrongpassworduser@example.com",
                password: "incorrectpassword",
            })
            .expect(500);
    });
    test("Should register, login, and get the current user profile", async () => {
        // 1) First, register the user
        const registerResponse = await request(app)
            .post("/api/v1/users/signup")
            .send({
                name: "Test User",
                email: "testuser@example.com",
                password: "testpassword123",
                passwordConfirm: "testpassword123",
            })
            .expect(201);

        // Check if registration was successful
        expect(registerResponse.body.status).toBe("success");
        expect(registerResponse.body.data.user).toHaveProperty(
            "email",
            "testuser@example.com"
        );

        // 2) Then, login to get the token
        const loginResponse = await request(app)
            .post("/api/v1/users/login")
            .send({
                email: "testuser@example.com",
                password: "testpassword123",
            })
            .expect(200);

        const token = loginResponse.body.token;

        // Check if login was successful and token is received
        expect(loginResponse.body).toHaveProperty("token");

        // 3) Finally, use the token to access the protected route to get user profile
        const response = await request(app)
            .get("/api/v1/users/me")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        // Check if the response contains the correct user data
        expect(response.body.status).toBe("success");
        expect(response.body.data.user).toHaveProperty(
            "email",
            "testuser@example.com"
        );
    });
});
