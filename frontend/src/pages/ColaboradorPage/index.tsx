// src/pages/Painel.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Container,
} from "@mui/material";
import api from "../../services/axios";
import ButtonAppBar from "../../components/AppBarColaboradores";
import ComponenteNavBar from "../../components/AppBarAdmin";

interface Ponto {
  id: string;
  data: string;
  entrada?: string;
  almocoInicio?: string;
  almocoFim?: string;
  saida?: string;
}

export function Painel() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function baterPonto() {
    setLoading(true);
    setMensagem("");
    try {
      const response = await api.post("/ponto");
      setMensagem(response.data.message);
      buscarPontos();
    } catch (err) {
      setMensagem("Erro ao bater ponto.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function buscarPontos() {
    try {
      const response = await api.get(`/ponto/${user.id}`);
      setPontos(response.data);
    } catch (err: unknown) {
      console.error("Erro ao buscar pontos" + err);
    }
  }

  useEffect(() => {
    buscarPontos();
  }, []);

  return (
    <>
      {!JSON.parse(localStorage.getItem("user") || "{}").isAdmin ? <ButtonAppBar /> : <ComponenteNavBar />}
      <Container maxWidth="lg">
        <Box py={2}>

          <Button
            variant="contained"
            color="primary"
            onClick={baterPonto}
            disabled={loading}
            sx={{ mb: 3 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Bater ponto"
            )}
          </Button>

          {mensagem && (
            <Typography variant="body1" color="secondary" sx={{ mb: 2 }}>
              {mensagem}
            </Typography>
          )}

          <Paper elevation={2}>
            <List>
              {pontos.map((ponto) => (
                <>
                  <ListItem key={ponto.id}>
                    <ListItemText
                      primary={new Date(ponto.data).toLocaleDateString("pt-BR")}
                      secondary={
                        `Entrada: ${formatarHora(ponto.entrada)} | ` +
                        `Almoço: ${formatarHora(
                          ponto.almocoInicio
                        )} - ${formatarHora(ponto.almocoFim)} | ` +
                        `Saída: ${formatarHora(ponto.saida)}`
                      }
                    />
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

function formatarHora(data?: string) {
  if (!data) return "--:--";
  return new Date(data).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
