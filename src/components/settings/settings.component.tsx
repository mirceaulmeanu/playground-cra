import {Box, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Switch} from "@mui/material";
import {useServices} from "../../react-hooks/use-services.hook";
import {useCallback} from "react";
import {observer} from "mobx-react";

export const Settings = observer(() => {
    const services = useServices();
    const handleThemeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if (value === 'light' || value === 'dark' || value === 'system') {
            services.settings.setTheme(value);
        }
    }, [services.settings]);

    const handleAddStreamFABVisibilityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        services.settings.setIsAddStreamFABShown(event.target.checked);
    }, [services.settings]);

    return <>
        <Box sx={{m: 2}}>
            <FormControl>
                <FormLabel id="theme-radio-buttons-group-label">Theme</FormLabel>
                <RadioGroup
                    aria-labelledby="theme-radio-buttons-group-label"
                    defaultValue="undefined"
                    name="theme-buttons-group"
                    value={services.settings.theme}
                    onChange={handleThemeChange}
                >
                    <FormControlLabel value="system" control={<Radio />} label="Same as system" />
                    <FormControlLabel value="light" control={<Radio />} label="Light" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Others</FormLabel>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={services.settings.isAddStreamFABShown} onChange={handleAddStreamFABVisibilityChange} />} label="Show '+' Add Stream button in main page" />
                </FormGroup>
            </FormControl>
        </Box>
    </>;
});
