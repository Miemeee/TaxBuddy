import {
    Box,
    Button,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import AuthInput from "./AuthInput";
import { useLoginForm } from "../../../hooks/useLoginForm";

function LoginForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [apiError, setApiError] = useState("");

    const {
        form,
        showPass,
        canSubmit,
        updateField,
        togglePassword,
        submit,
    } = useLoginForm((completed) => {
        navigate(completed ? "/dashboard" : "/onboarding");
    });

    const handleSubmit = async (e) => {
        try {
            setApiError("");
            await submit(e);
        } catch (err) {
            const errorCode = err.response?.data?.errorCode || err.message;
            console.log("Code:", errorCode);
            const translatedMessage = t(`auth.errors.${errorCode}`);
            if (translatedMessage === `auth.errors.${errorCode}`) {
                setApiError(t("common.error"));
            } else {
                setApiError(translatedMessage);
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <AuthInput
                placeholder={t("auth.signin.contact")}
                value={form.email}
                onChange={updateField("email")}
                error={!!apiError}
                helperText={apiError}
            />

            <AuthInput
                placeholder={t("auth.signin.password")}
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={updateField("password")}
                error={!!apiError}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={togglePassword}>
                            {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!canSubmit}
                sx={submitBtn}
            >
                {t("auth.signin.submit")}
            </Button>

            <Typography mt={2} fontSize={14} color="text.secondary" textAlign="center">
                {t("auth.signin.noAccount")}{" "}
                <Typography
                    component={RouterLink}
                    to="/signup"
                    sx={linkStyle}
                >
                    {t("auth.signin.signup")}
                </Typography>
            </Typography>
        </Box>
    );
}

export default LoginForm;

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
    textDecoration: "none",
};