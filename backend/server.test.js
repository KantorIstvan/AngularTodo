const request = require("supertest");
const { Pool } = require("pg");
const app = require("./server").app;

jest.mock("pg", () => {
  const mPool = {
    query: jest.fn().mockReturnValue(Promise.resolve()),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const pool = new Pool();

describe("Todo API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/todos", () => {
    it("should return all todos", async () => {
      const mockTodos = [
        {
          id: 1,
          title: "Test Todo",
          description: "Test description",
          completed: false,
        },
        {
          id: 2,
          title: "Another Todo",
          description: "Another description",
          completed: true,
        },
      ];

      pool.query.mockResolvedValueOnce({ rows: mockTodos });

      const response = await request(app)
        .get("/api/todos")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual(mockTodos);
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM todos");
    });

    it("should return 500 on database error", async () => {
      pool.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app)
        .get("/api/todos")
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = { title: "New Todo", description: "New description" };
      const createdTodo = {
        id: 3,
        title: "New Todo",
        description: "New description",
        completed: false,
        created_at: "2023-07-20T12:00:00Z",
      };

      pool.query.mockResolvedValueOnce({ rows: [createdTodo] });

      const response = await request(app)
        .post("/api/todos")
        .send(newTodo)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toEqual(createdTodo);
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
        [newTodo.title, newTodo.description]
      );
    });

    it("should return 400 if title is missing", async () => {
      const response = await request(app)
        .post("/api/todos")
        .send({ description: "Missing title" })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error", "Title is required");
      expect(pool.query).not.toHaveBeenCalled();
    });

    it("should return 500 on database error", async () => {
      pool.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app)
        .post("/api/todos")
        .send({ title: "Test", description: "Test" })
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("PUT /api/todos/:id", () => {
    it("should update a todo", async () => {
      const todoId = 1;
      const updatedData = {
        title: "Updated Todo",
        description: "Updated description",
        completed: true,
      };

      const updatedTodo = {
        ...updatedData,
        id: todoId,
        created_at: "2023-07-20T12:00:00Z",
        updated_at: "2023-07-21T12:00:00Z",
      };

      pool.query.mockResolvedValueOnce({ rows: [updatedTodo], rowCount: 1 });

      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send(updatedData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual(updatedTodo);
      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE todos SET title=$1, description=$2, completed=$3, updated_at=CURRENT_TIMESTAMP WHERE id=$4 RETURNING *",
        [
          updatedData.title,
          updatedData.description,
          updatedData.completed,
          todoId.toString(),
        ]
      );
    });

    it("should return 404 if todo not found", async () => {
      pool.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });

      const response = await request(app)
        .put("/api/todos/999")
        .send({
          title: "Not Found",
          description: "Not Found",
          completed: false,
        })
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Todo not found");
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete a todo", async () => {
      const todoId = 1;

      pool.query.mockResolvedValueOnce({ rowCount: 1 });

      await request(app).delete(`/api/todos/${todoId}`).expect(204);

      expect(pool.query).toHaveBeenCalledWith("DELETE FROM todos WHERE id=$1", [
        todoId.toString(),
      ]);
    });

    it("should return 404 if todo not found", async () => {
      pool.query.mockResolvedValueOnce({ rowCount: 0 });

      const response = await request(app)
        .delete("/api/todos/999")
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toHaveProperty("error", "Todo not found");
    });

    it("should return 500 on database error", async () => {
      pool.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app)
        .delete("/api/todos/1")
        .expect("Content-Type", /json/)
        .expect(500);

      expect(response.body).toHaveProperty("error");
    });
  });
});
