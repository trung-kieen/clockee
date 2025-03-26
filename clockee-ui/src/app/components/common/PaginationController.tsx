// PaginationControls.tsx
'use client'

import { FC } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  isFirst: boolean
  isLast: boolean
  pageNumber: number
  setPage: any
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    isFirst,
    isLast,
    pageNumber,
    setPage
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname();

  const page = Number(searchParams.get('page') ?? '1');

  function handleNext(): void {
    const params = new URLSearchParams(searchParams.toString())
    const newPage = page + 1;
    params.set("page", String(newPage));
    console.log(setPage);
    setPage(newPage);
    router.push(`${pathname}?${params.toString()}`)
  }

  function hanlePrevious(): void {
    if (page <= 0) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString())
    const newPage = page - 1;
    params.set("page", String(newPage));
    console.log(setPage);
    setPage(newPage)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='flex gap-2'>

      <div className="join">
        <button disabled={isFirst} className="join-item btn" onClick={hanlePrevious}>«</button>
        <button className="join-item btn">Page {pageNumber ?? 0}</button>
        <button disabled={isLast} className="join-item btn" onClick={handleNext}>»</button>
      </div>


    </div>
  )
}

export default PaginationControls
