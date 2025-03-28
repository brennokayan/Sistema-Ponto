import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DefaultIcons } from "../utils/defaultIcons";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/defaultFunctions";

export default function ComponenteNavBar() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 2,
        }}
      >
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <DefaultIcons.Close color="red" />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {listaMenu.map((data) => (
          <ListItem key={data.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(data.path);
              }}
            >
              <ListItemIcon>{data.icone}</ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          borderTop: "1px solid lightgray",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              <DefaultIcons.Logout />
            </ListItemIcon>
            <ListItemText primary="Desconectar" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ListItemButton
            onClick={() => {
              window.open("https://github.com/brennokayan", "_blank");
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: {
                  xs: "0.45rem",
                  sm: "0.55rem",
                  md: "0.65rem",
                },
                color: "gray",
              }}
            >
              Desenvolvido por: Brenno Kayan 💜
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 4,
        alignItems: "center",
        padding: "10px",
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        position: "sticky",
        top: "0",
        zIndex: 1000,
      }}
    >
      {/* <Container maxWidth="lg" sx={{ display: "flex", gap: 2, alignItems: "center" }}> */}
      <IconButton onClick={toggleDrawer(true)}>
        <DefaultIcons.Menu />
      </IconButton>
      <Typography variant="h6" color="textPrimary">
        Olá, {JSON.parse(localStorage.getItem("user") || "{}").nome}!
      </Typography>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {/* </Container> */}
    </Box>
  );
}

const listaMenu = [
  {
    text: "Relógio Ponto",
    icone: <DefaultIcons.PainelDeControle size={24} />,
    path: "/painel",
  },
  {
    text: "Escalas",
    icone: <DefaultIcons.Lucros size={24} />,
    path: "/escala",
  },
  {
    text: "Colaboradores",
    icone: <DefaultIcons.Lucros size={24} />,
    path: "/colaboradores",
  },
];
