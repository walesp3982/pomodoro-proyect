type SelectProps<T extends string> = {
    option: T[]
    value: T
    onChange: (value: T) => void
    label?: string
}

export default function Select<T extends string>({ option, value, onChange, label }: SelectProps<T>) {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="border border-r-2 bg-background px-2 py-1"
            >
                {option.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}