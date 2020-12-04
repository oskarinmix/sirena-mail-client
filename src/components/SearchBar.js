/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Swal from "sweetalert2";
import Modal from "./utils/Modal";
import Axios from "axios";
import SavedSearchs from "./SavedSearchs";
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
  const [isToggled, setIsToggled] = React.useState(false);

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
    // get the mails
    getMails();
  };

  const saveSearch = async () => {
    try {
      const result = await Axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/search",
        data: { search: search },
      });

      if (result.data.ok) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Your search has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error Saving.. Repeated Search",
        showConfirmButton: false,
        timer: 1000,
      });
    }
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

      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="save"
        disabled={search.length < 3}
        onClick={() => saveSearch()}
      >
        <SaveAltIcon />
      </IconButton>
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="saved"
        onClick={() => setIsToggled(true)}
      >
        <BookmarkIcon />
      </IconButton>
      <Modal on={isToggled} toggle={() => setIsToggled(!isToggled)}>
        <SavedSearchs setSearch={setSearch} setIsToggled={setIsToggled} />
      </Modal>
    </Paper>
  );
}
