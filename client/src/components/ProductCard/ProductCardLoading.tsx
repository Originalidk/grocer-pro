import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Skeleton } from "@/components/ui/skeleton"

function ProductCardLoading() {
  return (
    <div className='h-[360px] w-[256px] flex flex-col items-center m-5 space-y-3 border-2 rounded-xl border-gray-100'>
      <Skeleton className="h-[150px] w-[200px] mt-5 mb-4 rounded-xl" />
      <Skeleton className="h-10 w-[200px] rounded-full" />
      <Skeleton className="h-5 w-[200px] rounded-full" />
      <Skeleton className="h-5 w-[200px] rounded-full" />
      <Skeleton className="h-5 w-[200px] rounded-full" />
    </div>
  )
}

export default ProductCardLoading