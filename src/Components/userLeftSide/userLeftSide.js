import style from "./userLeftSide.module.css";

// Components
import UserInfo from "../../Components/UserInfo/userinfo.js";

//Context
import { useUserContext } from "../../Context/userContext";

//Config
import { url } from "../../config";

// export default function UserLeftSide() {
//   const [user, setUser] = useUserContext();
//   return (
//     <section className={style.userSec}>
//       <div className={style.column2}>
//         <UserImage user={user} />
//         <UserInfo user={user} homepageEdit />
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Card from "../../MaterialUi/Card/card.js";
import Grid from "@material-ui/core/Grid";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // marginTop: "5rem",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // position: "absolute",
    // top: "50%",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: "0 2px 5px rgb(0 0 0 / 9%)",
    borderRadius: "5px",
    marginTop: "5rem",
    zIndex: "500",
    paddingBottom: "500px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function UserLeftSide() {
  const [user, setUser] = useUserContext();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const [allEvents, setAllEvents] = useState([]);

  async function get() {
    let res = await fetch(`${url}/events`);
    let data = await res.json();

    setAllEvents(data.payload);
  }

  useEffect(() => {
    get();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      > */}
      <div className={style.posContainer}>
        <div className={style.pos}>
          <Toolbar className={style.none}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <div className={style.arrowContainer}>
                <ArrowForwardIosIcon className={style.red} />
              </div>
            </IconButton>
          </Toolbar>
        </div>
      </div>
      {/* </AppBar> */}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <List>
          <section className={style.userSec}>
            {/* <UserImage user={user} width={"85px"} /> */}
            <UserInfo user={user} homepageEdit link width={"85px"} centre />

            <section
              className={`contentContainer`}
              style={{ paddingLeft: 0, paddingRight: 0, boxShadow: "none" }}
            >
              <h3>Events you're attending 📅</h3>
              <br />
              <div className={style.scroll}>
                <div className={style.marginTop}>
                  <Grid container spacing={3}>
                    {allEvents.map((item, index) => {
                      if (item.attendinglist?.includes(user.username)) {
                        let date = new Date(item.date).toDateString();
                        return (
                          <div className="maxWidth">
                            <Card
                              key={index}
                              date={date}
                              item={item}
                              userLeftSide
                            />
                          </div>
                        );
                      }
                    })}
                  </Grid>
                </div>
              </div>
            </section>
          </section>
        </List>

        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
