import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import SectionCard from "../SectionCard";
import AddButton from "../Addbutton";
import IncomeChannelCard from "../IncomeChannelCard";

export default function IncomeChannelSection({ control }) {
    const { t } = useTranslation();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "incomeChannels",
    });

    useEffect(() => {
        if (fields.length === 0) {
            append({ name: "" });
        }
    }, [fields, append]);

    return (
        <SectionCard title={t("onboarding.incomechannels")}>
            {fields.map((item, index) => (
                <IncomeChannelCard
                    key={item.id}
                    index={index}
                    remove={() => {
                        if (fields.length === 1) return;
                        remove(index);
                    }}
                    isOnlyOne={fields.length === 1}
                />
            ))}

            <AddButton
                label={t("onboarding.addincomechannel")}
                onClick={() =>
                    append({
                        name: "",
                    })
                }
            />
        </SectionCard>
    );
}