import { Card, Divider } from "@mui/material";
import SelectableGroupItem from "./SelectableGroupItem";

export default function SelectableGroupList({
    groups = [],
    selectedIds,
    toggleSelect,
    showChildToggle = true,
}) {
    return (
        <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
            {groups.map((group, index) => (
                <div key={group.type}>
                    <SelectableGroupItem
                        group={group}
                        selectedIds={selectedIds}
                        toggleSelect={toggleSelect}
                        showChildToggle={showChildToggle}
                    />

                    {index !== groups.length - 1 && <Divider />}
                </div>
            ))}
        </Card>
    );
}