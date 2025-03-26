"use client";
// page.tsx

import PaginationControls from "@/app/components/common/PaginationController"
import {  PageBrandDTO, SupplierControllerService } from "@/gen";
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

const data = [
  'entry 1',
  'entry 2',
  'entry 3',
  'entry 4',
  'entry 5',
  'entry 6',
  'entry 7',
  'entry 8',
  'entry 9',
  'entry 10',
]

export default function SupplierAdminPage() {



  const [pageInfo, setPageInfo] = useState<PageBrandDTO>({} as PageBrandDTO);
  const [entries, setEntries] = useState([]);
  const params = useSearchParams();
  const page = Number(params.get("page")) || 0;

  useEffect(() => {

    const getPages = async () => {
      try {
        const pageInfo = await SupplierControllerService.getAllSuppliers({ page: page });
        if (pageInfo)
          setPageInfo(pageInfo)
        return pageInfo;
      } catch (error) {
      }
    }

    getPages();

  }, []);

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
        pageInfo.content.map((entry) => (
          <p key={entry.brandId}>{entry.name}</p>
        ))
      )
    )
  }

  return (

    <div className='flex flex-col gap-2 items-center'>

      {dataEntries()}
      {pageInfo && pageInfo.content && <PaginationControls
        isLast={pageInfo?.last}
        isFirst={pageInfo?.first}
        pageNumber={page}
      />}

    </div>
  )
}
