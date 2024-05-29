import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {useServices} from "../../react-hooks/use-services.hook";
import {useCallback} from "react";

export function Settings() {
    const services = useServices();
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if (value === 'light' || value === 'dark' || value === 'system') {
            services.settings.setTheme(value);
        }
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
                    onChange={handleChange}
                >
                    <FormControlLabel value="system" control={<Radio />} label="Same as system" />
                    <FormControlLabel value="light" control={<Radio />} label="Light" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                </RadioGroup>
            </FormControl>
        </Box>
    </>;
}