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
  const [demoMode, setDemoMode] = useState(false);

  // Load user or demo
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        setDemoMode(false);
      } else setDemoMode(true);
    };
    getUser();
  }, []);

  // Fetch user’s courses
  const fetchCourses = useCallback(async () => {
    if (demoMode) {
      setCourses([]);
      return;
    }
    if (!user) return;

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setCourses(data);
  }, [user, demoMode]);

  useEffect(() => {
    if (user && !demoMode) fetchCourses();
  }, [user, demoMode, fetchCourses]);

  // Add or update
  async function handleSaveCourse() {
    if (demoMode) return alert("🚀 Demo mode active — please sign up!");
    if (!user) return alert("User not found. Please log in again.");
    if (!newCourse.title.trim()) return alert("Title required!");
    if (!newCourse.platform.trim()) return alert("Platform required!");

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

    const { error } = editMode
      ? await supabase
          .from("courses")
          .update(payload)
          .eq("id", selectedCourse.id)
          .eq("user_id", user.id)
      : await supabase.from("courses").insert([payload]);

    if (error) alert(error.message);
    else {
      await fetchCourses();
      closeForm();
    }
  }

  // Delete
  async function handleDelete(id) {
    if (demoMode) return alert("❌ Can't delete in demo mode!");
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchCourses();
  }

  // 🔹 Status update handler
  async function handleStatusChange(courseId, newStatus) {
    if (demoMode) return alert("Demo mode — no updates allowed!");
    const { error } = await supabase
      .from("courses")
      .update({ status: newStatus })
      .eq("id", courseId)
      .eq("user_id", user.id);

    if (error) alert("Status update failed!");
    else {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, status: newStatus } : c
        )
      );
    }
  }

  // Form handlers
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

        {demoMode && (
          <div
            style={{
              background: "#FFF8E1",
              border: "1px solid #FFCA28",
              color: "#795548",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            ⚠️ Demo mode active — Login to save progress!
          </div>
        )}

        <Button variant="contained" onClick={() => openForm()} sx={{ mb: 3 }}>
          + Add New Course
        </Button>

        <Grid container spacing={3}>
          {courses.length === 0 ? (
            <Typography sx={{ mt: 2, ml: 1 }} color="text.secondary">
              No courses found. {demoMode ? "Try adding one for demo!" : "Add your first one!"}
            </Typography>
          ) : (
            courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  className="course-card"
                  sx={{
                    borderRadius: 4,
                    background: "linear-gradient(145deg, #f3f4f6, #ffffff)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: "#1f2937",
                          fontSize: "1.2rem",
                          textTransform: "capitalize",
                        }}
                      >
                        #{index + 1} — {course.title}
                      </Typography>

                      {!demoMode && (
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small" color="primary" onClick={() => openForm(course)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(course.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>

                    <Typography variant="subtitle2" sx={{ color: "#6b7280", mt: 0.5 }}>
                      📚 Platform: <b>{course.platform}</b>
                    </Typography>

                    {course.course_url && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <a
                          href={course.course_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#2563eb",
                            textDecoration: "none",
                            fontWeight: 500,
                          }}
                        >
                          🔗 Visit Course
                        </a>
                      </Typography>
                    )}

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      ⏰ Duration: <b>{course.start_date || "?"}</b> →{" "}
                      <b>{course.end_date || "?"}</b>
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1.5,
                        color: "#374151",
                        fontStyle: "italic",
                        minHeight: "60px",
                        lineHeight: "1.5",
                      }}
                    >
                      {course.notes || "No notes added yet."}
                    </Typography>

                    {/* 🔹 Dropdown for Status */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <select
                        value={course.status}
                        onChange={(e) => handleStatusChange(course.id, e.target.value)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "12px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          border: "1px solid #ddd",
                          backgroundColor:
                            course.status === "Completed"
                              ? "#dcfce7"
                              : course.status === "In-Progress"
                              ? "#fef9c3"
                              : "#e0f2fe",
                          color:
                            course.status === "Completed"
                              ? "#166534"
                              : course.status === "In-Progress"
                              ? "#92400e"
                              : "#1e3a8a",
                          transition: "0.3s ease",
                        }}
                      >
                        <option value="In-Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        Added on {new Date(course.created_at).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Add/Edit Modal */}
        <Dialog open={open} onClose={closeForm} fullWidth maxWidth="sm">
          <DialogTitle>{editMode ? "✏️ Edit Course" : "➕ Add New Course"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Course Title *" required value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
              <TextField label="Platform (e.g. Coursera, Udemy)" required value={newCourse.platform} onChange={(e) => setNewCourse({ ...newCourse, platform: e.target.value })} />
              <TextField label="Course URL (optional)" value={newCourse.link} onChange={(e) => setNewCourse({ ...newCourse, link: e.target.value })} />
              <TextField label="Notes (optional)" multiline rows={2} value={newCourse.notes} onChange={(e) => setNewCourse({ ...newCourse, notes: e.target.value })} />
              <Stack direction="row" spacing={2}>
                <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={newCourse.start_date} onChange={(e) => setNewCourse({ ...newCourse, start_date: e.target.value })} />
                <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} value={newCourse.end_date} onChange={(e) => setNewCourse({ ...newCourse, end_date: e.target.value })} />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeForm}>Cancel</Button>
            <Button variant="contained" onMouseDown={(e) => e.preventDefault()} onClick={handleSaveCourse}>
              {editMode ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
