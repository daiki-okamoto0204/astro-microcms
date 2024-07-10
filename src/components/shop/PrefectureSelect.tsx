'use client'
import { useCallback } from 'react'
import type { Prefectures } from '../../types/Prefectures';

const PrefectureSelect = ({ prefectures }: { prefectures: Prefectures[] }) => {
//   const searchParams = useSearchParams()
//   const pathname = usePathname()
//   const { replace } = useRouter()

//   const handleChangeArea = useCallback(
//     (area: string) => {
//       const params = new URLSearchParams(searchParams)

//       if (area) {
//         const selectedPrefecture = prefectures.find((pref) => pref.id === area)
//         params.set('area', area)

//         if (!selectedPrefecture) return
//         params.set('currentLat', selectedPrefecture.lat.toString())
//         params.set('currentLng', selectedPrefecture.lng.toString())
//       } else {
//         params.delete('area')
//         params.delete('currentLat')
//         params.delete('currentLng')
//       }
//       replace(`${pathname}?${params.toString()}`)
//     },
//     [pathname, replace, searchParams, prefectures]
//   )

  return (
    <div className="grid gap-2">
      <label htmlFor="area" className="font-bold">
        エリアから探す
      </label>
      <select
        id="area"
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm "
        // onChange={(e) => {
        //   handleChangeArea(e.target.value)
        // }}
        // defaultValue={searchParams.get('area')?.toString()}
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
}

export default PrefectureSelect
