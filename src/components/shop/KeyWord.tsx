import type { FormEvent } from 'react'
import { SearchIcon } from 'lucide-react'
import { useSearchParams } from '../../hook/useSearchParams'

export const KeyWord = () => {
  const { searchParams, setParams } = useSearchParams()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const q = formData.get('q')?.toString()
    if (q) {
      setParams({ q })
    } else {
      setParams({ q: null }) // nullを設定することでパラメータを削除
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <label htmlFor="q" className="font-bold">
        キーワードから探す
      </label>
      <div className="flex h-10 w-full items-center rounded-md border border-input bg-background pr-2 text-sm">
        <input
          type="text"
          id="q"
          name="q"
          placeholder="店舗名・住所を入力"
          className="w-full px-3 py-2 focus:outline-none focus-visible:outline-1"
          defaultValue={searchParams.get('q')?.toString()}
        />
        <button type="submit" aria-label="検索する">
          <SearchIcon className="h-4 w-4 opacity-50" />
        </button>
      </div>
    </form>
  )
};