import { FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const ReactHookFormSelect = (name, label, control, defaultValue, children, ...props) => {
    const labelId = `${name}-label`;
    return (
        <FormControl {...props}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                render={() => (
                    <Select labelId={labelId} label={label}>
                        {children}
                    </Select>
                )}
                name={name}
                control={control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
};

export default ReactHookFormSelect;

{/* <ReactHookFormSelect
    id="province"
    name="province"
    label="Tỉnh"
    control={control}
    defaultValue={"AN Giang"}
    variant="outlined"
    margin="normal"
>
    {provinceAPI.map((pro) => {
        return (
            <MenuItem key={pro.code} value={pro.code}>{pro.name}</MenuItem>
        )
    })}
</ReactHookFormSelect> */}