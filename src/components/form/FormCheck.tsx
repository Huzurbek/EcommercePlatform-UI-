import { Controller, FieldValues } from "react-hook-form";
import { IFormControl } from "../../types/global";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

export const FormCheck = <T extends FieldValues>(
  props: IFormControl<T> & CheckboxProps & { label: string }
) => {
  const { control, name, rules, required, label, ...refs } = props;

  return (
    <Controller
      {...{ control, name, rules: { ...rules, required } }}
      render={({ field: { value, ...field } }) => (
        <FormControlLabel
          label={label}
          control={<Checkbox {...refs} {...field} checked={value || false} />}
        />
      )}
    />
  );
};
