import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "20vw",
    maxWidth: "360px",
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const { logOut } = useAuth();
  const auth = React.useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const disconnect = async () => {
    try {
      const result = await logOut();
      auth.setAuth(result.data.auth);
    } catch (error) {
      console.log("Error logout");
    }
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <img
        src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
        style={{ width: "75px", margin: "20px 20px" }}
      />
      <Typography variant="h6" component="h6">
        test@sirena.app
      </Typography>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/dashboard">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </Link>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
        <ListItem button onClick={() => disconnect()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
