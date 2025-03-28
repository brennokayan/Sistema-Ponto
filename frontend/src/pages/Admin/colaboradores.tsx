import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import ComponenteNavBar from "../../components/AppBarAdmin";

interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  email: string;
}

export function AdminAdicionarColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  //   const user = JSON.parse(localStorage.getItem("user") || "{}");
  //   const [nome, setNome] = useState("");
  //   const [cargo, setCargo] = useState("");
  //   const [email, setEmail] = useState("");

  async function buscarColaboradores() {
    const res = await api.get(`/usuarios`);
    setColaboradores(res.data.usuarios);
  }
  //   async function buscarColaborador() {
  //     const res = await api.get(`/colaborador/${user.id}`);
  //     setColaboradores(res.data);
  //   }

  //   async function adicionarColaborador() {
  //     await api.post("/colaboradores", {
  //       userId: user.id,
  //       nome,
  //       cargo,
  //       email,
  //     });
  //     setNome("");
  //     setCargo("");
  //     setEmail("");
  //     buscarColaboradores();
  //   }

  async function removerColaborador(id: string) {
    await api.delete(`/colaboradores/${id}`);
    buscarColaboradores();
  }

  useEffect(() => {
    buscarColaboradores();
  }, []);

  console.log(colaboradores);

  return (
    <>
      <ComponenteNavBar />
      <Container maxWidth="lg">
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Painel RH - Colaboradores
          </Typography>

          {/* <Paper sx={{ p: 3, mb: 4 }}>
                <TextField
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={adicionarColaborador}>
                    Adicionar Colaborador
                </Button>
            </Paper> */}

          {colaboradores.map((colaborador) => (
            <Paper key={colaborador.id} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6">{colaborador.nome}</Typography>
              <Typography variant="body1">{colaborador.cargo}</Typography>
              <Typography variant="body1">{colaborador.email}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removerColaborador(colaborador.id)}
              >
                Desativar Colaborador
              </Button>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}
