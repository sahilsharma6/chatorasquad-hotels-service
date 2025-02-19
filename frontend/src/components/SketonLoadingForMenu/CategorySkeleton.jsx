import React from 'react'
import { MenuItemSkeleton } from './MenuItemSkeleton'
import { Skeleton } from '../ui/skeleton'

export const CategorySkeleton = () => (
    <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
                <MenuItemSkeleton key={i} />
            ))}
        </div>
    </div>
)