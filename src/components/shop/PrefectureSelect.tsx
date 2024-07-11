import { useCallback } from 'react'
import usePrefectures from '../../hook/usePrefectures';

type Props = {
  value: string;
  onChange: (area: string) => void;
};

export const PrefectureSelect = ({ value, onChange }: Props) => {
  const { prefectures } = usePrefectures();

  const handleChangeArea = useCallback(
    (area: string) => {
      onChange(area);
    },
    [onChange]
  )

  return (
    <div className="grid gap-2">
      <label htmlFor="area" className="font-bold">
        エリアから探す
      </label>
      <select
        id="area"
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm "
        onChange={(e) => {
          handleChangeArea(e.target.value)
        }}
        value={value}
      >
        <option value="">エリアを選択</option>
        {prefectures.map((prefecture) => (
          <option key={prefecture.id} value={prefecture.id}>
            {prefecture.name}
          </option>
        ))}
      </select>
    </div>
  )
};