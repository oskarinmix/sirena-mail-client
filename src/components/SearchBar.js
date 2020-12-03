/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
    margin: "10px 5%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({ controls }) {
  const classes = useStyles();
  const { pagination, setTotal, setMails, setSearching, searching } = controls;
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    if (searching) {
      getMails();
    }
  }, [pagination]);
  const getMails = async () => {
    setSearching(true);
    try {
      const result = await Axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/mails",
        params: { page: pagination, search },
      });
      if (result.data) {
        setMails(result.data.mails);
        setTotal(result.data.total);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    // get the mails

    getMails();
  };
  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={(e) => handleSubmit(e)}
    >
      <InputBase
        className={classes.input}
        placeholder="Search Mails"
        inputProps={{ "aria-label": "search mails" }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
