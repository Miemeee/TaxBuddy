import React, { useState } from "react";
import { Box, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthInput from "./AuthInput";
import AcceptTerms from "../legal/AcceptTerms";

function SignupForm({ onOpenTerms, onOpenPrivacy }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !contact || !password || !acceptTerms) {
            alert(t("auth.signup.alert"));
            return;
        }

        localStorage.setItem("taxbuddy_user_name", username);
        navigate("/onboarding");
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <AuthInput
                placeholder={t("auth.signup.username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <AuthInput
                placeholder={t("auth.signup.contact")}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />

            <AuthInput
                placeholder={t("auth.signup.password")}
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                            {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />

            <AcceptTerms
                checked={acceptTerms}
                onChange={setAcceptTerms}
                onOpenTerms={onOpenTerms}
                onOpenPrivacy={onOpenPrivacy}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!acceptTerms}
                sx={submitBtn}
            >
                {t("auth.signup.submit")}
            </Button>

            <Typography mt={2} fontSize={14} color="text.secondary">
                {t("auth.signup.haveAccount")}{" "}
                <Typography component={RouterLink} to="/login" sx={linkStyle}>
                    {t("auth.signup.login")}
                </Typography>
            </Typography>
        </Box>
    );
}

export default SignupForm;

const submitBtn = {
    mt: 2,
    py: 1.6,
    borderRadius: 3,
    textTransform: "none",
    fontSize: 16,
    fontWeight: 600,
    bgcolor: "primary.main",

    boxShadow: (theme) =>
        `0px 10px 20px ${theme.palette.primary.main}55`,

    "&:hover": {
        bgcolor: "primary.dark",
    },
};

const linkStyle = {
    color: "info.main",
    cursor: "pointer",
    fontWeight: 500,
};