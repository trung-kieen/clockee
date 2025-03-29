// PaginationControls.tsx
'use client'

import { FC } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


interface PaginationControlsProps {
  isFirst: boolean
  isLast: boolean
  pageNumber: number
  setPage: (page: number) => void
}

/**
 * Control url search param when user navigate page
 * Example of param: brand?page=5
 */
const PaginationControls: FC<PaginationControlsProps> = (

  {
    isFirst,
    isLast,
    pageNumber,
    setPage
  }
) => {


  // react hook to work with router, search param and current url path
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname();

  // Get current page from url param
  const page = Number(searchParams.get('page') ?? '0');

  /**
   * Handle move to next page, update url param
   */
  function handleNext(): void {
    changePage(page + 1);
  }


  /**
   * Handle move back previous page, update url param
   */
  function hanlePrevious(): void {
    if (page <= 0) {
      return;
    }
    changePage(page - 1)
  }


  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.has("page")) {
      params.set("page", String(page));
    } else {
      params.append("page", String(page));
    }
    setPage(page)
    router.push(`${pathname}?${params.toString()}`)

  }

  return (
    <div className="flex flex-col flex-end">
      <div className='flex gap-2 p-5'>

        <div className="join">
          <button disabled={isFirst} className="join-item btn" onClick={hanlePrevious}>«</button>
          <button className="join-item btn">Page {pageNumber ?? 0}</button>
          <button disabled={isLast} className="join-item btn" onClick={handleNext}>»</button>
        </div>


      </div>

    </div>
  )
}

export default PaginationControls
