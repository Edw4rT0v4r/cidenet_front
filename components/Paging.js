import Pagination from 'react-bootstrap/Pagination'
import { useRouter } from 'next/router'

export default function Paging({currentPage, lastPage}) {
  const router = useRouter()

  let { query } = router

  let route = ''
  Object.entries(query).forEach(([key, value]) => {
    if (key !== 'page') {
      route += `&${key}=${value}`
    }
  });

  return (
    <div>
      <Pagination>
        <Pagination.Item disabled={currentPage <= 1} onClick={() => router.push(`?page=${currentPage - 1}${route}`)}>
          Previous
        </Pagination.Item>
        <Pagination.Item disabled={currentPage >= lastPage} onClick={() => router.push(`?page=${currentPage + 1}${route}`)}>
          Next
        </Pagination.Item>
      </Pagination>
    </div>
  )
}
