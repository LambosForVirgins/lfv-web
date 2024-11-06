import { forwardRef } from "react";

interface NameInputProps extends Common.ComponentProps {
  label: string;
  className?: string;
  onChange?: (name: string | undefined) => void;
}

export const NameInput = forwardRef<HTMLInputElement, NameInputProps>(
  ({ testID, label, onChange, ...props }, ref) => {
    return (
      <label data-testid={testID} className="grid grid-col-1">
        <span>{label}</span>
        <input
          ref={ref}
          required
          {...props}
          name="name"
          type="text"
          onChange={(event) => onChange?.(event.target.value)}
        />
      </label>
    );
  }
);
