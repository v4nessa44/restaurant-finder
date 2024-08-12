import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Chip, Link, Rating, Typography } from "@mui/material";

function RCard({ place }) {
  return (
    <Card sx={{ width: 400 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={place?.squareImgUrl || place.heroImgUrl}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {place.name}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" component="div">
            {place.currentOpenStatusText}
          </Typography>
          <Rating name="read-only" value={place.averageRating} readOnly />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop="10px"
        >
          <Link href={place.menuUrl}>Menu Url</Link>
          <Typography variant="subtitle2" component="div">
            {place.awardInfo === null
              ? "No Awards"
              : `${place.awardInfo?.awardType} - ${place.awardInfo?.year}`}
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap="5px"
          marginTop="10px"
        >
          {place.establishmentTypeAndCuisineTags.map((tag) => (
            <Chip label={tag} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default RCard;
