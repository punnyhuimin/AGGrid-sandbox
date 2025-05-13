"use client";

import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TestContextMenu from "../contextMenu/TestContextMenu";
import { CustomAggridRowMenu } from "../aggrid/CustomAggridRowMenu";
import { CustomAggridCellMenu } from "../aggrid/CustomAggridCellMenu";
import DurationPicker from "./DurationPickerCellRenderer";

export default function MainGrid() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {/* <HighlightedCard /> */}
          <TestContextMenu />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>{/* <PageViewsBarChart /> */}</Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <DurationPicker />

        <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
          Custom context menu (beyond AGGRID)
        </Typography>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomAggridCellMenu />
        </Grid>
        <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
          Custom context menu (w/ AGGRID)
        </Typography>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomAggridRowMenu />
        </Grid>
      </Grid>
    </Box>
  );
}
