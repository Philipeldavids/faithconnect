interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function SearchInput({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder="Search..."
      className="border rounded-lg px-3 py-2"
    />
  );
}