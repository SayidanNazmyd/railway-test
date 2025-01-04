const Todo = require('../models/Todo');

exports.getTodos = async(req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.status(200).json({
      message: "success",
      data: todos
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      user: req.user.id, 
    });

    res.status(200).json({
      message: "success",
      data: todo,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getTodo = async(req, res) => {
  try {
    const todo= await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found " })
    }
    res.status(200).json({
      message: "success",
      data: todo
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    // Menggunakan findByIdAndDelete sebagai pengganti remove()
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    // Cek apakah todo ditemukan
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan",
      });
    }

    // Kirim response sukses
    res.status(200).json({
      success: true,
      message: "Todo berhasil dihapus",
      data: deletedTodo,
    });
  } catch (err) {
    console.error("Error saat menghapus todo:", err.message);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus todo",
      error: err.message,
    });
  }
};

exports.updateTodo=async(req,res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found " })
    }
    
    todo= await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      message: "success",
      data: todo
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
