import Header from "@/components/Header";
import Products from "@/components/Products";
import { Box } from "@mui/material";
export default function Home() {
  return (
    <main>
      <Box
        sx={{
          mt: 14,
          px: 10,
        }}
      >
        <Header />
        <Products />
      </Box>
    </main>
  );
}
