import { LucideSparkle } from 'lucide-react'
import React from 'react'

const tab = [
    {
        label: "Answer",
        icon: LucideSparkle
    },
    {
        label: "",
        icon: LucideSparkle
    },
    {
        label: "",
        icon: LucideSparkle
    },
    {
        label: "",
        icon: LucideSparkle
    },
]

function DisplayResult({searchInputRecord}) {

  return (
    <div className='text-white mt-7'>
        <h2 className='font-medium text-3xl line-clamp-2'>{searchInputRecord?.searchInput}</h2>
    </div>
  )
}

export default DisplayResult