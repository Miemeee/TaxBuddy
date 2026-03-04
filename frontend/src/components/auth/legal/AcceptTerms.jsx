import React from "react";
import { FormControlLabel, Checkbox, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

function AcceptTerms({
    checked,
    onChange,
    onOpenTerms,
    onOpenPrivacy,
}) {
    const { t } = useTranslation();

    return (
        <FormControlLabel
            sx={{ mt: 1, alignItems: "flex-start" }}
            control={
                <Checkbox
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
            }
            label={
                <Typography
                    lineHeight={1.6}
                    fontSize={13}
                    color="text.secondary"
                >
                    {t("auth.signup.acceptPrefix")}{" "}

                    <Box
                        component="span"
                        sx={linkStyle}
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenTerms();
                        }}
                    >
                        {t("auth.signup.terms")}
                    </Box>{" "}
                    &{" "}
                    <Box
                        component="span"
                        sx={linkStyle}
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenPrivacy();
                        }}
                    >
                        {t("auth.signup.privacy")}
                    </Box>
                </Typography>
            }
        />
    );
}

export default AcceptTerms;

const linkStyle = {
    color: "info.main",
    cursor: "pointer",
    fontWeight: 500,
};