import {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  RegisterOptions,
  FieldPath,
} from "react-hook-form";

export interface IFormControl<T extends FieldValues> {
  control: Control<T>;
  name: Path<UnPackAsyncDefaultValues<T>>;
  rules?: RegisterOptions<T, FieldPath<T>>;
  required?: boolean;
}
