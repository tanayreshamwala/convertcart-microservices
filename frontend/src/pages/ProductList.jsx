import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import SegmentEditor from "../components/SegmentEditor";
import { fetchProducts } from "../api/ProductApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Handler for filtered results
  const handleFilteredResults = (filteredProducts) => {
    setProducts(filteredProducts);
  };

  // Handler to reset to all products
  const handleReset = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container sx={{ py: 4 }}>
      <SegmentEditor onEvaluate={handleFilteredResults} onReset={handleReset} />

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
