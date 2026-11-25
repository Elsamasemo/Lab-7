
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());


const books = [
  { id: 1, title: "rylee", author: "Robert C. Martin", year: 2008, available: true },
  { id: 2, title: "End of beginning", author: "Andrew Hunt", year: 1999, available: true },
];


app.get("/books", (req, res) => {
  res.json(books);
});

// GET /books/:id -> one book, or 404
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST /books -> add a book (title and author required), 201 with new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body || {};
  if (!title || !author || !year) {
    return res.status(400).json({ error: "title, author and year are required" });
  }

  const nextId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
  const newBook = { id: nextId, title, author, year, available: true };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE /books/:id -> remove the book, or 404
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const [removed] = books.splice(index, 1);
  res.json(removed);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});