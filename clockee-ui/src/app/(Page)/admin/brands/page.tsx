"use client";

import PaginationControls from "@/app/components/common/PaginationController"
import { BrandControllerService, PageBrandDTO } from "@/gen";
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const mockPageResponseInfo = {
  content: [
    {
      brandId: 1,
      name: "Rolex"
    },
    {
      brandId: 2,
      name: "Omega"
    },
    {
      brandId: 3,
      name: "Casio"
    },
    {
      brandId: 4,
      name: "Seiko"
    },
    {
      brandId: 5,
      name: "Tag Heuer"
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 5,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    offset: 0,
    paged: true,
    unpaged: false
  },
  totalElements: 5,
  totalPages: 1,
  last: true,
  first: true,
  size: 5,
  number: 0,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true
  },
  numberOfElements: 5,
  empty: false
}


export default function BrandAdminPage() {



  // Control pagination information
  const [pageInfo, setPageInfo] = useState<PageBrandDTO>(mockPageResponseInfo as PageBrandDTO);



  const params = useSearchParams();
  const [page, setPage] = useState(Number(params.get("page")) || 0);

  useEffect(() => {

    const getPages = async () => {
      try {
        console.log(page)
        const pageInfo = await BrandControllerService.getAllBrands(page);
        if (pageInfo)
          setPageInfo(pageInfo)
        return pageInfo;
      } catch (error) {
      }
    }

    console.log("Fetch", page);
    getPages();

  }, [page]);

  /**
   * Manager list data as table
   */
  const dataEntries = () => {
    if (!(pageInfo?.content) || pageInfo.empty) {

      console.log("No such data")
      return (
        <div>No brand found</div>
      )
    }
    return (
      (
        <div>

          {
            pageInfo.content.map((entry) => {
              return (
                <p key={entry.brandId}>{entry.name}</p>
              )
            })
          }

        </div>
      )
    )
  }


  return (

    <div className='flex flex-col gap-2 items-center'>

      {dataEntries()}
      {pageInfo && pageInfo.content && <PaginationControls
        // TODO: native by use PageResponse
        isLast={page == pageInfo.totalPages}
        isFirst={page == 0}
        pageNumber={page}
        setPage={(page: number) => { setPage(page) }}
      />}

    </div>
  )
}
