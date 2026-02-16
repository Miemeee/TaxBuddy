import React, { useState } from "react";
import { Box, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSignupForm } from "../../hooks/useSignUpForm";

import AuthInput from "./AuthInput";
import AcceptTerms from "../legal/AcceptTerms";

function SignupForm({ onOpenTerms, onOpenPrivacy }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        form,
        showPass,
        acceptTerms,
        canSubmit,
        updateField,
        togglePassword,
        setAcceptTerms,
        submit,
    } = useSignupForm(() => navigate("/onboarding"));

    return (
        <Box component="form" onSubmit={submit}>

            <AuthInput
                placeholder={t("auth.signup.username")}
                value={form.username}
                onChange={updateField("username")}
            />

            <AuthInput
                placeholder={t("auth.signup.contact")}
                value={form.contact}
                onChange={updateField("contact")}
            />

            <AuthInput
                placeholder={t("auth.signup.password")}
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={updateField("password")}
                endAdornment={
                    <IconButton onClick={togglePassword}>
                        {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                }
            />

            <AcceptTerms
                checked={acceptTerms}
                onChange={setAcceptTerms}
                onOpenTerms={onOpenTerms}
                onOpenPrivacy={onOpenPrivacy}
            />

            <Button type="submit" fullWidth
                variant="contained" disabled={!canSubmit}
                sx={submitBtn}>
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