import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Register from "./pages/register"
import Login from "./pages/login"
import AddBlog from "./pages/addblog"
import BlogDescription from "./pages/blogdescription"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<BlogDescription />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
