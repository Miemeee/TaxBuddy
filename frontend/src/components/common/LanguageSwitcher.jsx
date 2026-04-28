import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") || "th";
        i18n.changeLanguage(savedLang);
        setLang(savedLang);
    }, []);

    const handleChange = (_, newLang) => {
        if (!newLang) return;
        setLang(newLang);
        i18n.changeLanguage(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <ToggleButtonGroup
            value={lang}
            exclusive
            size="small"
            onChange={handleChange}
        >
            <ToggleButton value="th">TH</ToggleButton>
            <ToggleButton value="en">EN</ToggleButton>
        </ToggleButtonGroup>
    );
}