import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const CartSkeleton = () => (
    <Card className="sticky top-24">
        <CardContent className="p-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-4 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                    </div>
                ))}
            </div>
            <div className="border-t pt-4 space-y-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>
            <Skeleton className="h-10 w-full mt-6" />
        </CardContent>
    </Card>
)