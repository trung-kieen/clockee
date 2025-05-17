

export type AdminUserResponse = {
  userId: string;
  name: string;
  email: string;
  role: number;
  is_delete: number;
};

export const mockUsers: AdminUserResponse[] = [
  {
    userId: "user-001",
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    role: 1,
    is_delete: 0,
  },
  {
    userId: "user-002",
    name: "Trần Thị B",
    email: "thib@example.com",
    role: 2,
    is_delete: 0,
  },
  {
    userId: "user-003",
    name: "Lê Văn C",
    email: "vanc@example.com",
    role: 3,
    is_delete: 0,
  },
  {
    userId: "user-004",
    name: "Phạm Thị D",
    email: "thid@example.com",
    role: 4, // role không xác định
    is_delete: 0,
  },
];

export function updateMockUserById(
  users: AdminUserResponse[],
  id: string,
  updates: Partial<AdminUserResponse>
): AdminUserResponse[] {
  return users.map((user) =>
    user.userId === id ? { ...user, ...updates } : user
  );
}