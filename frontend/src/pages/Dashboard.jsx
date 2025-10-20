import React, { useEffect, useState, useCallback } from "react";
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

  // 🔹 Fetch user's courses
  const fetchCourses = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      setCourses(data || []);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchCourses();
  }, [user, fetchCourses]);

  // 🔹 Add or update course
  async function handleSaveCourse() {
    console.log("👉 Save button clicked");
    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }

    if (!newCourse.title.trim()) return alert("Course Title is required!");
    if (!newCourse.platform.trim()) return alert("Platform name is required!");

    const payload = {
      user_id: user.id,
      title: newCourse.title.trim(),
      platform: newCourse.platform.trim(),
      course_url: newCourse.link || null,
      certificate_url: null,
      status: "In-Progress",
      notes: newCourse.notes || null,
      start_date: newCourse.start_date || null,
      end_date: newCourse.end_date || null,
    };

    if (editMode && selectedCourse) {
      console.log("📝 Updating existing course:", selectedCourse.id);
      const { error } = await supabase
        .from("courses")
        .update(payload)
        .eq("id", selectedCourse.id)
        .eq("user_id", user.id);

      if (error) {
        console.error("❌ Update failed:", error.message);
        alert("Update failed: " + error.message);
      } else {
        console.log("✅ Updated successfully!");
        await fetchCourses();
        closeForm();
      }
    } else {
      console.log("➕ Inserting new course:", payload);
      const { error } = await supabase.from("courses").insert([payload]);
      if (error) {
        console.error("❌ Insert failed:", error.message);
        alert("Insert failed: " + error.message);
      } else {
        console.log("✅ Course added successfully!");
        await fetchCourses();
        closeForm();
      }
    }
  }

  // 🔹 Delete course
  async function handleDelete(id) {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      alert("Delete failed: " + error.message);
    } else {
      fetchCourses();
    }
  }

  // 🔹 Form Open / Close
  function openForm(course = null) {
    if (course) {
      setEditMode(true);
      setSelectedCourse(course);
      setNewCourse({
        title: course.title || "",
        platform: course.platform || "",
        link: course.course_url || "",
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
             <Grid container spacing={3}>
  {courses.length === 0 ? (
    <Typography sx={{ mt: 2, ml: 1 }} color="text.secondary">
      No courses found. Add your first one!
    </Typography>
  ) : (
    courses.map((course) => (
      <Grid item xs={12} sm={6} md={4} key={course.id}>
        <Card
          className="course-card"
          sx={{
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
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
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(course.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1, mt: 0.5 }}
            >
              Platform: <b>{course.platform}</b>
            </Typography>

            {course.course_url && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <a
                  href={course.course_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  🔗 View Course
                </a>
              </Typography>
            )}

            <Typography variant="body2" sx={{ mb: 1 }}>
              Duration: <b>{course.start_date || "?"}</b> →{" "}
              <b>{course.end_date || "?"}</b>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: "italic",
                mb: 1.5,
                minHeight: "50px",
                overflow: "hidden",
              }}
            >
              {course.notes || "No notes added."}
            </Typography>

            <span
              style={{
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor:
                  course.status === "Completed"
                    ? "#C8E6C9"
                    : course.status === "In-Progress"
                    ? "#FFF9C4"
                    : "#BBDEFB",
                color:
                  course.status === "Completed"
                    ? "#2E7D32"
                    : course.status === "In-Progress"
                    ? "#F57F17"
                    : "#1565C0",
              }}
            >
              {course.status}
            </span>
          </CardContent>
        </Card>
      </Grid>
    ))
  )}
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
                label="Course URL (optional)"
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
            <Button
              variant="contained"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSaveCourse}
            >
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
