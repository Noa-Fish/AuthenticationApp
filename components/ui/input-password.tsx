import * as React from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    suffix?: React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ suffix, className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <Input
                type={showPassword ? "text" : "password"}
                suffix={
                    showPassword ? (
                        <EyeIcon onClick={() => setShowPassword(false)} />
                    ) : (
                        <EyeOffIcon onClick={() => setShowPassword(true)} />
                    )
                }
                className={className}
                {...props}
                ref={ref}
                
            />
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
