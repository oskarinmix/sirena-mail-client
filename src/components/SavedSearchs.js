import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
// import Typography from '@material-ui/core/Typography';
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

import Axios from "axios";
// eslint-disable-next-line react/prop-types
const SavedSearchs = ({ setSearch, setIsToggled }) => {
  const [searchs, setSearchs] = useState(null);
  const [refetch, setRefetch] = useState(null);
  const classes = useStyles();

  React.useEffect(() => {
    const getSearchs = async () => {
      try {
        const result = await Axios({
          method: "get",
          withCredentials: true,
          url: "http://localhost:4000/search",
        });

        if (result.data.ok) {
          setSearchs(result.data.searchs);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getSearchs();
  }, [refetch]);

  const deleteSearch = async (id) => {
    try {
      const result = await Axios({
        method: "delete",
        withCredentials: true,
        url: `http://localhost:4000/search/${id}`,
      });

      if (result.data.ok) {
        setRefetch(!refetch);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {searchs && (
        <React.Fragment>
          <h1>Saved Search</h1>
          <div className={classes.demo}>
            <List dense={true}>
              {searchs.map((search) => (
                <ListItem key={search._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <BookmarkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={search.search} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="send"
                      onClick={() => {
                        setSearch(search.search);
                        setIsToggled(false);
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteSearch(search._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SavedSearchs;
