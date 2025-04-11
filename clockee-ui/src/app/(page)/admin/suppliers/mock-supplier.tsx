// Mock data diplay with paginate when not run server
export const mockPageResponseInfo = {
  content: [
    {
      name: "Watch Supplier Ltd.",
      address: "789 Maple St",
      phone: "1122334455",
      email: "supplier@example.com",
      supplierId: 1,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 5,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalElements: 1,
  totalPages: 1,
  last: true,
  first: true,
  size: 1,
  number: 0,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  numberOfElements: 1,
  empty: false,
};
