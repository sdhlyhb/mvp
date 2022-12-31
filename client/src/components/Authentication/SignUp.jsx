/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { red, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { updateProfile } from "firebase/auth";
import { auth, registerWithEmailAndPassword } from "../../firebase";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/sdhlyhb">
        Serena Huang
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [pwMatch, setPwMatch] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    });
    if (!username) alert("Please enter username!");
    if (!pwConfirm) {
      alert("Please re-enter your password to confirm!");
    } else if (!pwMatch) {
      alert("Please check your password confirmation!");
    } else {
      registerWithEmailAndPassword(username, email, password);
    }
  };

  const checkPWMatch = (pw1, pw2) => {
    if (pw1 === pw2) {
      setPwMatch(true);
    } else {
      setPwMatch(false);
    }
  };

  useEffect(() => {
    checkPWMatch(password, pwConfirm);
  }, [pwConfirm]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="img/logo2.png"
            alt="logo"
            style={{ width: 180, height: 180, overflow: "auto" }}
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPW"
                  label="Confirm Your Password"
                  type="password"
                  id="confirmPW"
                  onChange={(e) => setPwConfirm(e.target.value)}
                />
              </Grid>
              {password && pwConfirm && !pwMatch ? (
                <Grid item xs>
                  {" "}
                  <Typography component="span" sx={{ color: red[700] }}>
                    Passwords do not match, please re-enter!
                  </Typography>{" "}
                </Grid>
              ) : password && pwConfirm && pwMatch ? (
                <Grid item xs>
                  {" "}
                  <Typography component="span" sx={{ color: green[700] }}>
                    Passwords matched!
                  </Typography>{" "}
                </Grid>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
