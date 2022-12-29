import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Modal,
} from "@mui/material";
import { orange, blue, grey } from "@mui/material/colors";

import SearchIcon from "@mui/icons-material/Search";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import DownloadIcon from "@mui/icons-material/Download";
import DataPieChart from "./DataPieChart.jsx";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  minWidth: "95%",
});

const Logo = styled("div")(({ theme }) => ({
  backgroundColor: "primary",
  width: 60,
  height: 60,
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "40px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: blue[100],
  boxShadow: 24,
  p: 3,
};

function Navbar({ onChangeKeyword, searchKeywords, search, data }) {
  const today = new Date().toLocaleString("en-US");
  const [open, setOpen] = useState(false);
  const [statsPop, setStatsPop] = useState(false);
  const handleStatsClose = (e) => setStatsPop(false);
  const navigate = useNavigate();

  useEffect(() => {
    search(searchKeywords);
  }, [searchKeywords]);

  const logoutClick = (e) => {
    navigate("/");
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Logo>
          <img
            src="img/logo2.png"
            alt="logo"
            style={{ width: 60, height: 60, overflow: "auto" }}
          />
        </Logo>
        <Search>
          <SearchIcon size="large" sx={{ color: grey[500] }} />

          <InputBase
            placeholder="search by keyword..."
            onChange={onChangeKeyword}
            style={{ display: "hidden" }}
          />
        </Search>
        <Icons>
          <Tooltip title="Download Full Application Record">
            <Button>
              <DownloadIcon sx={{ fontSize: 30, color: "white" }} />
              <a
                href="/api/allApplications/report"
                download={`Application_Record_${today}.csv`}
                style={{ fontSize: 15, color: "white" }}
              >
                {" "}
                record
              </a>
            </Button>
          </Tooltip>
          <Tooltip title="Display Stats">
            <IconButton onClick={(e) => setStatsPop(true)}>
              <InsertChartIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{ width: 40, height: 40 }}
            src="xxxx.png"
            alt="Serena"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        {/* <MenuItem>My account</MenuItem> */}
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>
      <Modal open={statsPop} onClose={handleStatsClose}>
        <Box sx={style}>
          <Typography
            style={{ fontFamily: "Roboto", fontWeight: "600" }}
            variant="h6"
            component="h2"
          >
            {" "}
            Your Metrics
          </Typography>
          <DataPieChart data={data} />
        </Box>
      </Modal>
    </AppBar>
  );
}

export default Navbar;
