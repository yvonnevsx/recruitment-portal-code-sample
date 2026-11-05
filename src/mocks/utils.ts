import type { PaginatedResponse } from '@lib/api/types';

export function paginate<T>(items: T[], url: URL): PaginatedResponse<T> {
  const page = Number(url.searchParams.get('page') ?? 1);
  const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);

  return {
    data,
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  };
}
