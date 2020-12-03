/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  flexible: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0% 5%",
    backgroundColor: theme.palette.background.paper,
  },
  title: { fontSize: "16px", fontWeight: "bold" },
}));
const Header = ({ controls }) => {
  const classes = useStyles();
  const { prevPage, nextPage, total, pagination, setPagination } = controls;
  return (
    <div className={classes.flexible}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Mail Inbox
      </Typography>
      <React.Fragment>
        <div>
          <IconButton
            onClick={() => setPagination(1)}
            aria-label="delete"
            className={classes.margin}
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={() => prevPage()}
            aria-label="delete"
            className={classes.margin}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => nextPage(total)}
            aria-label="delete"
            className={classes.margin}
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            onClick={() => setPagination(Math.floor(total / 20))}
            aria-label="delete"
            className={classes.margin}
          >
            <LastPageIcon />
          </IconButton>
        </div>
        <Typography variant="h6" component="h6" className={classes.title}>
          Page {pagination} of {Math.floor(total / 20)}
        </Typography>
      </React.Fragment>
    </div>
  );
};

export default Header;
