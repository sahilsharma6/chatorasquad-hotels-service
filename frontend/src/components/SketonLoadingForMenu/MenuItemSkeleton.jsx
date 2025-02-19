import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const MenuItemSkeleton = () => (
    <Card className="overflow-hidden">
        <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Skeleton className="w-full sm:w-24 h-40 sm:h-24 rounded-lg" />
                <div className="flex-1 w-full space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-24 mt-4" />
                </div>
            </div>
        </CardContent>
    </Card>
)