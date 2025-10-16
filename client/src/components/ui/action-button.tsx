import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
    icon: LucideIcon;
    variant: "success" | "delete";
    onClick: () => void;
    ariaLabel: string;
}

export const ActionButton = ({ icon: Icon, variant, onClick, ariaLabel }: ActionButtonProps) => {
    const variantStyles = {
        success: "bg-green-500 hover:bg-green-700",
        delete: "bg-red-500 hover:bg-red-700"
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center w-9 h-6 rounded-sm ${variantStyles[variant]}`}
            aria-label={ariaLabel}
        >
            <Icon className="w-3.5 h-3.5" color="#ffffff" />
        </button>
    );
};