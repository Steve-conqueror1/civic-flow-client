import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface FormFieldProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  icon: React.ReactNode;
  hint?: string;
  error?: string;
  endAddon?: React.ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { id, label, icon, hint, error, endAddon, required, ...inputProps },
    ref,
  ) => {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={id}>
          {label}{" "}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </Label>
        <InputGroup className="py-1.5 rounded-lg">
          <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>
          <InputGroupInput
            id={id}
            ref={ref}
            aria-required={required}
            aria-invalid={!!error}
            {...inputProps}
          />
          {endAddon && (
            <InputGroupAddon align="inline-end">{endAddon}</InputGroupAddon>
          )}
        </InputGroup>
        {hint && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
        )}
        {error && (
          <p role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";

export { FormField };
