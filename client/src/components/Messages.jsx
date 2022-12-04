import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TodayIcon from '@mui/icons-material/Today';

export default function Messages(props) {
  return (
    <Box sx={{ maxWidth: 300 }}>
      <Card variant="outlined">
        <CardContent>
          <TodayIcon sx={{ fontSize: 30 }} />
          <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
            Today is {new Date().toLocaleDateString()}:
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            You have {props.interviews.length} pending interviews and{" "}
            {props.offers.length} OFFERS!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
