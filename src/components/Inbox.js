import Axios from "axios";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import usePagination from "../hooks/usePagination";
import SearchBar from "./SearchBar";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Inbox() {
  const classes = useStyles();
  const [mails, setMails] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [searching, setSearching] = React.useState(false);
  const { pagination, nextPage, prevPage, setPagination } = usePagination();
  React.useEffect(() => {
    // get the mails
    const getMails = async () => {
      try {
        const result = await Axios({
          method: "get",
          withCredentials: true,
          // eslint-disable-next-line no-undef
          url: `${process.env.REACT_APP_HOST}/mails`,
          params: { page: pagination },
        });
        if (result.data) {
          setMails(result.data.mails);
          setTotal(result.data.total);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    if (!searching) {
      getMails();
    }
  }, [pagination]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header
        controls={{ nextPage, prevPage, total, pagination, setPagination }}
      />
      <SearchBar
        controls={{ pagination, setMails, setTotal, setSearching, searching }}
      />
      <List className={classes.root}>
        {mails && (
          <ul>
            {mails.map((mail) => {
              return (
                <React.Fragment key={mail.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={mail.firstName}
                        src={`/static/images/avatar/${mail.id % 3}).jpg`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={mail.subject} // Subject of the Email
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body1"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {`${mail.firstName} ${mail.lastName} - ${mail.email} `}{" "}
                            {/* Name and email of the sender*/}
                          </Typography>
                          {mail.message.substr(0, 60) + "..."}
                          {/* Preview of the Message*/}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })}
          </ul>
        )}
      </List>
    </div>
  );
}
