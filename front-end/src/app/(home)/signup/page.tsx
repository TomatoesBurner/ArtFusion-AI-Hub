import React from "react";
import Link from "next/link";
import { Button, Box, Typography, Divider } from "@mui/material";
import { Google, Instagram } from "@mui/icons-material";
import ClientRegisterForm from "@/components/ClientRegisterForm";


const RegisterPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Create an account
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Already have an account?{" "}
        <Link href="/login" passHref>
          <Button
            color="inherit"
            sx={{
              p: 0.8,
              backgroundColor: "#ffffff",
              color: "#000000",
              marginLeft: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Log in
          </Button>
        </Link>
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#222",
          p: 4,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <ClientRegisterForm />
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Google />}
          fullWidth
          sx={{ mb: 1 }}
        >
          Sign up with Google
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<Instagram />}
          fullWidth
          sx={{ mb: 2 }}
        >
          Sign up with Instagram
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          By clicking “Next”, “Sign up with Google” or “Sign up with Instagram”
          you agree to our Terms of Use and acknowledge that you have read and
          understand our Privacy Policy.
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
