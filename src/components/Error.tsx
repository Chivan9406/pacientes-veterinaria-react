import { ReactNode } from 'react'

function Error({children}: {children: ReactNode}) {
  return (
    <p className='text-red-600 text-sm mt-2'>{children}</p>
  )
}

export default Error