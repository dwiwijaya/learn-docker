"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Circle, Edit3, Trash2, Plus, ListTodo, Clock, CheckCheck } from "lucide-react"

interface Task {
  _id: string
  title: string
  description: string
  completed: boolean
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [form, setForm] = useState({ title: "", description: "" })
  const [editId, setEditId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks")
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    }
  }

  const addOrUpdateTask = async () => {
    if (!form.title.trim()) return

    setLoading(true)
    try {
      const method = editId ? "PUT" : "POST"
      const url = editId ? `http://localhost:5000/tasks/${editId}` : "http://localhost:5000/tasks"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      setForm({ title: "", description: "" })
      setEditId(null)
      fetchTasks()
    } catch (error) {
      console.error("Failed to save task:", error)
    } finally {
      setLoading(false)
    }
  }

  const editTask = (task: Task) => {
    setForm({ title: task.title, description: task.description })
    setEditId(task._id)
  }

  const toggleComplete = async (task: Task) => {
    try {
      await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      })
      fetchTasks()
    } catch (error) {
      console.error("Failed to toggle task:", error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      fetchTasks()
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const cancelEdit = () => {
    setForm({ title: "", description: "" })
    setEditId(null)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ListTodo className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Task Manager
            </h1>
          </div>
          <p className="text-muted-foreground">Stay organized and productive with your personal task manager</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ListTodo className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Task Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {editId ? <Edit3 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {editId ? "Edit Task" : "Create New Task"}
            </CardTitle>
            <CardDescription>
              {editId ? "Update your task details below" : "Add a new task to your list"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  id="description"
                  placeholder="Enter task description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="min-h-[40px]"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={addOrUpdateTask}
                disabled={loading || !form.title.trim()}
                className="flex items-center gap-2"
              >
                {editId ? <Edit3 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {loading ? "Saving..." : editId ? "Update Task" : "Add Task"}
              </Button>
              {editId && (
                <Button variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ListTodo className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
              <p className="text-muted-foreground text-center">
                Create your first task to get started with organizing your work.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <h2 className="text-xl font-semibold">Pending Tasks</h2>
                  <Badge variant="secondary">{pendingTasks.length}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingTasks.map((task) => (
                    <Card key={task._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg leading-tight">{task.title}</h3>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                              )}
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              Pending
                            </Badge>
                          </div>

                          <Separator />

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleComplete(task)}
                              className="flex items-center gap-1"
                            >
                              <Circle className="h-4 w-4" />
                              Mark Done
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => editTask(task)}
                              className="flex items-center gap-1"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteTask(task._id)}
                              className="flex items-center gap-1 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCheck className="h-5 w-5 text-green-600" />
                  <h2 className="text-xl font-semibold">Completed Tasks</h2>
                  <Badge variant="secondary">{completedTasks.length}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {completedTasks.map((task) => (
                    <Card key={task._id} className="hover:shadow-md transition-shadow opacity-75">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg leading-tight line-through text-muted-foreground">
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 line-through">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            <Badge className="ml-2 bg-green-100 text-green-800">Completed</Badge>
                          </div>

                          <Separator />

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleComplete(task)}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Undo
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => editTask(task)}
                              className="flex items-center gap-1"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteTask(task._id)}
                              className="flex items-center gap-1 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
