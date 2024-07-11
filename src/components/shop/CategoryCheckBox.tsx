import { useCallback } from 'react'
import { useSearchParams } from '../../hook/useSearchParams'
import type { StoreCategories } from '../../types/StoreCategories'

export const CategoryCheckBox = ({ categories }: { categories: StoreCategories[] }) => {
  const { searchParams, setParams } = useSearchParams()

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const selectedCategories = new Set(searchParams.get('categories')?.split(',') || [])
      if (selectedCategories.has(value)) {
        selectedCategories.delete(value)
      } else {
        selectedCategories.add(value)
      }
      if (selectedCategories.size === 0) {
        setParams({ categories: null }) // nullを設定することでパラメータを削除
      } else {
        setParams({ categories: Array.from(selectedCategories).join(',') })
      }
    },
    [searchParams, setParams]
  )

  return (
    <fieldset>
      <div className="grid gap-2">
        <legend className="font-bold">カテゴリーで絞り込む</legend>
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category.id}
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary"
                id={category.id}
                onChange={handleCheck}
                defaultChecked={searchParams.get('categories')?.split(',').includes(category.id)}
              />
              <div className="text-sm">
                <label className="font-medium" htmlFor={category.id}>
                  {category.title}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  )
};