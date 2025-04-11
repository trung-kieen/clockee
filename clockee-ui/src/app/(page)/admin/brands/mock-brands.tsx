
// Mock data diplay with paginate when not run server
export const mockPageResponseInfo = {
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
