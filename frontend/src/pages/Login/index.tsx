import { Box, Paper, Typography, TextField, Alert, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
  
    async function handleLogin(e: React.FormEvent) {
      e.preventDefault();
      setLoading(true);
      setErro("");
  
      try {
        const response = await api.post("/login", { email, senha });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/painel");
      } catch (error: unknown) {
        console.error(error);
        setErro("Email ou senha inválidos");
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#f5f5f5"
      >
        <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
            Login
          </Typography>
  
          <form onSubmit={handleLogin}>
            <TextField
              label="E-mail"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
  
            {erro && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {erro}
              </Alert>
            )}
  
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
  