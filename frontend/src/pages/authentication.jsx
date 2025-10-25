import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default function Authentication() {
   const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0); // 0 = login, 1 = signup
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {

       if (formState === 0) {
        await handleLogin(username, password);
        navigate("/home"); // Redirect after login
      }
      
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        setMessage(result || "Registered successfully!");
        setOpen(true);
        setError("");
        setFormState(0);
        setUsername("");
        setPassword("");
        setName("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)", // app bg
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: { xs: "90%", sm: 400 },
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            background: formState === 0
              ? "linear-gradient(135deg, #f9f9f9, #dfe9f3)" // Login bg
              : "linear-gradient(135deg, #fff0f6, #ffe0e9)", // Signup bg
          }}
        >
          <Avatar
            sx={{
              m: "auto",
              bgcolor: formState === 0 ? "primary.main" : "secondary.main",
            }}
          >
            {formState === 0 ? <LockOutlinedIcon /> : <PersonAddAltIcon />}
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
            {formState === 0 ? "Login to Voxa" : "Create Your Account"}
          </Typography>

          {/* Toggle Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
            <Button
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => setFormState(0)}
            >
              Login
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setFormState(1)}
            >
              Signup
            </Button>
          </Box>

          {/* Animated Forms */}
          <Box sx={{ mt: 3 }}>
            <AnimatePresence mode="wait">
              {formState === 0 ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>

            {/* Submit */}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
              color={formState === 0 ? "primary" : "secondary"}
              onClick={handleAuth}
            >
              {formState === 0 ? "Login" : "Register"}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </ThemeProvider>
  );
}
