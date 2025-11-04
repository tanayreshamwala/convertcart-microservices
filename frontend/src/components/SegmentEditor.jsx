import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { evaluateSegment } from "../api/SegmentApi.js";

const SegmentEditor = ({ onEvaluate, onReset }) => {
  const [rulesText, setRulesText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEvaluate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await evaluateSegment(rulesText);
      onEvaluate(data.result || []); // send filtered products to parent
    } catch (err) {
      setError(err.message || "Failed to evaluate filters");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRulesText("");
    setError(null);
    onReset(); // tell parent to reload all products
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Segment Editor
      </Typography>

      <TextField
        label="Enter filter rules (one per line)"
        multiline
        fullWidth
        minRows={4}
        value={rulesText}
        onChange={(e) => setRulesText(e.target.value)}
        placeholder={`price > 1000\nstock_status = instock\non_sale = true`}
        slotProps={{
          input: {
            sx: {
              color: "white", // text color
              "&::placeholder": { color: "rgba(255,255,255,0.7)" },
            },
          },
          label: {
            sx: { color: "rgba(255,255,255,0.8)" },
          },
          notchedOutline: {
            sx: { borderColor: "rgba(255,255,255,0.5)" },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEvaluate}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Evaluate Filter"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default SegmentEditor;
