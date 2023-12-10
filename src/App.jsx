import { useState } from "react";
import "./App.css";
// import {} from "";
import { Card } from "@mui/material";

function App() {
  const [book, setBook] = useState(null);
  function getBook() {}
  return (
    <>
      <Card>Hello</Card>
    </>
  );
}
function FilterableBookTable({}) {
  return;
}
function bookInfo() {
  return (
    <>
      <div>bookInfo</div>
    </>
  );
}
function SearchBar() {
  return (
    <>
      <form>
        <input
          type="
    text"
          value={filterText}
          placeholder="Search..."
        ></input>
      </form>
    </>
  );
}

function BookTable() {}

export default App;
