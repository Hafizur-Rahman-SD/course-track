import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  IconButton,
} from "@mui/material";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    platform: "",
    link: "",
    notes: "",
    start_date: "",
    end_date: "",
  });
  const [user, setUser] = useState(null);

  // 🔹 Load logged in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    getUser();
  }, []);

  // 🔹 Fetch user’s courses
  useEffect(() => {
    if (user) fetchCourses();
  }, [user]);

  async function fetchCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setCourses(data);
  }

  // 🔹 Add or update course
  async function handleSaveCourse() {
    if (!newCourse.title.trim()) return alert("Course Title is required!");
    if (!newCourse.platform.trim()) return alert("Platform name is required!");

    if (editMode && selectedCourse) {
      // Update existing
      const { error } = await supabase
        .from("courses")
        .update(newCourse)
        .eq("id", selectedCourse.id);
      if (!error) {
        await fetchCourses();
        closeForm();
      }
    } else {
      // Insert new
      const { error } = await supabase.from("courses").insert([
        {
          user_id: user.id,
          title: newCourse.title,
          platform: newCourse.platform,
          link: newCourse.link || null,
          notes: newCourse.notes || null,
          start_date: newCourse.start_date || null,
          end_date: newCourse.end_date || null,
        },
      ]);
      if (!error) {
        await fetchCourses();
        closeForm();
      }
    }
  }

  // 🔹 Delete course
  async function handleDelete(id) {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (!error) fetchCourses();
  }

  // 🔹 Form Open / Close
  function openForm(course = null) {
    if (course) {
      setEditMode(true);
      setSelectedCourse(course);
      setNewCourse({
        title: course.title || "",
        platform: course.platform || "",
        link: course.link || "",
        notes: course.notes || "",
        start_date: course.start_date || "",
        end_date: course.end_date || "",
      });
    } else {
      setEditMode(false);
      setSelectedCourse(null);
      setNewCourse({
        title: "",
        platform: "",
        link: "",
        notes: "",
        start_date: "",
        end_date: "",
      });
    }
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
    setEditMode(false);
    setSelectedCourse(null);
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          My Courses
        </Typography>

        <Button variant="contained" onClick={() => openForm()} sx={{ mb: 3 }}>
          + Add New Course
        </Button>

        <Grid container spacing={3}>
          {courses.length === 0 ? (
            <Typography sx={{ mt: 2, ml: 1 }} color="text.secondary">
              No courses found. Add your first one!
            </Typography>
          ) : (
            courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card className="course-card">
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight={700}>
                        {course.title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => openForm(course)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(course.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Typography color="text.secondary" variant="body2">
                      Platform: {course.platform}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Duration: {course.start_date || "?"} →{" "}
                      {course.end_date || "?"}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body2">
                      {course.notes || "No notes added."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* 🧾 Add/Edit Modal */}
        <Dialog
          open={open}
          onClose={closeForm}
          fullWidth
          maxWidth="sm"
          PaperProps={{ className: "custom-dialog" }}
        >
          <DialogTitle>
            {editMode ? "✏️ Edit Course" : "➕ Add New Course"}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Course Title *"
                required
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
              <TextField
                label="Platform (e.g. Coursera, Udemy)"
                required
                value={newCourse.platform}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, platform: e.target.value })
                }
              />
              <TextField
                label="Course Link (optional)"
                value={newCourse.link}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, link: e.target.value })
                }
              />
              <TextField
                label="Notes (optional)"
                multiline
                rows={2}
                value={newCourse.notes}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, notes: e.target.value })
                }
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newCourse.start_date}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, start_date: e.target.value })
                  }
                />
                <TextField
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newCourse.end_date}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, end_date: e.target.value })
                  }
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeForm}>Cancel</Button>
            <Button onClick={handleSaveCourse} variant="contained">
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
