import { Check } from "lucide-react";

interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
}

export const CustomCheckbox = ({ checked, onChange }: CustomCheckboxProps) => {
    return (
        <div
            onClick={onChange}
            className={`flex items-center justify-center w-5 h-5 cursor-pointer ${checked ? 'bg-green-500' : "bg-transparent"} rounded-full border border-gray-200 hover:border-blue-500`}
        >
            {checked ? <Check className="w-3.5 h-3.5" color="#ffffff" /> : ''}
        </div>
    )
}