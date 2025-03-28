import {
  Paper,
  Select,
  TextField,
  Button,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../services/axios";
import { Trash } from "@phosphor-icons/react";
import ComponenteNavBar from "../../components/AppBarAdmin";

interface Escala {
  id: string;
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
}

export function AdminAdicionarEscalas() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [diaSemana, setDiaSemana] = useState(0);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  async function buscarEscalas() {
    const res = await api.get(`/escalas/${user.id}`);
    setEscalas(res.data);
  }

  async function adicionarEscala() {
    await api.post("/escalas", {
      userId: user.id,
      diaSemana,
      horaInicio,
      horaFim,
    });
    setHoraInicio("");
    setHoraFim("");
    buscarEscalas();
  }

  async function removerEscala(id: string) {
    await api.delete(`/escalas/${id}`);
    buscarEscalas();
  }

  useEffect(() => {
    buscarEscalas();
  }, []);

  return (
    <>
      <ComponenteNavBar />
      <Container maxWidth="lg">
        <Box py={2}>
          <Typography variant="h4" gutterBottom>
            Painel RH - Escalas
          </Typography>

          <Paper sx={{ p: 3, mb: 4 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Dia da Semana</InputLabel>
              <Select
                value={diaSemana}
                label="Dia da Semana"
                onChange={(e) => setDiaSemana(Number(e.target.value))}
              >
                {[
                  "Domingo",
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                ].map((dia, index) => (
                  <MenuItem key={index} value={index}>
                    {dia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Hora Início"
              type="time"
              fullWidth
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Hora Fim"
              type="time"
              fullWidth
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={adicionarEscala} fullWidth>
              Adicionar Escala
            </Button>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Escalas Atuais</Typography>
            <List>
              {escalas.map((escala) => (
                <ListItem
                  key={escala.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => removerEscala(escala.id)}
                    >
                      <Trash />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${nomeDiaSemana(escala.diaSemana)} - ${
                      escala.horaInicio
                    } até ${escala.horaFim}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

function nomeDiaSemana(dia: number) {
  const dias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return dias[dia];
}
