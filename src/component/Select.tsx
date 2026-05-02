type SelectProps<T extends string> = {
    option: T[]
    value: T
    onChange: (value: T) => void
}

export default function Select<T extends string>({ option, value, onChange }: SelectProps<T>) {
    return (

        <select
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            className="rounded bg-background px-2 py-1"
        >
            {option.map((opt) => (
                <option key={opt} value={opt} className="border border-r-2">
                    {opt}
                </option>
            ))}
        </select>
    )
}