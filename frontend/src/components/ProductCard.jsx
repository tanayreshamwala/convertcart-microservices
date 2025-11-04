import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        width: "15rem",          // makes sure the card fills its grid cell
        height: "100%",         // optional: equal height feel
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.15s ease",
        "&:hover": { transform: "scale(1.02)" },
      }}
      elevation={3}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
          ₹{product.price}
        </Typography>
        <Typography
          variant="body2"
          color={product.stock_status === "instock" ? "green" : "red"}
          sx={{ mt: 1 }}
        >
          {product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {product.on_sale ? (
            <Chip label="On Sale" color="success" size="small" />
          ) : (
            <Chip label="Off sale" color="error" size="small" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
