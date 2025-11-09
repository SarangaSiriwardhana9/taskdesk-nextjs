'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CONFIG } from '@/lib/constants';

export function TasksPageSkeleton() {
  return (
    <main className="min-h-screen bg-background pt-16 sm:pt-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
        <div className="space-y-8 sm:space-y-12">
          {/* Header Section Skeleton */}
          <div className="space-y-6 sm:space-y-8">
            {/* Title and Subtitle */}
            <div className="space-y-3 sm:space-y-4 text-center">
              <Skeleton className="h-10 sm:h-12 w-32 sm:w-48 rounded-xl mx-auto" />
              <Skeleton className="h-4 sm:h-6 w-48 sm:w-96 rounded-lg mx-auto" />
            </div>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {Array.from({ length: CONFIG.SKELETON_COUNTS.HEADER }).map((_, i) => (
                <div key={i} className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 sm:space-y-3 flex-1">
                      {/* Icon and Label */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Skeleton className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded" />
                        <Skeleton className="h-3 sm:h-4 w-16 sm:w-20 rounded" />
                      </div>
                      {/* Value */}
                      <Skeleton className="h-8 sm:h-9 w-8 sm:w-12 rounded" />
                    </div>
                    {/* Icon Background */}
                    <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task List Section Skeleton */}
          <div className="space-y-6 sm:space-y-8">
            {/* Filter/Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {/* Filter buttons */}
                <Skeleton className="h-9 w-16 rounded-md" />
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
              <div className="flex gap-2">
                {/* Sort dropdown */}
                <Skeleton className="h-9 w-32 rounded-md" />
              </div>
            </div>

            {/* Task Grid */}
            <div className={CONFIG.TASK_GRID_LAYOUT}>
              {Array.from({ length: CONFIG.SKELETON_COUNTS.TASKS }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4">
                  {/* Task Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      {/* Title */}
                      <Skeleton className="h-5 sm:h-6 w-3/4 rounded" />
                      {/* Description */}
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-2/3 rounded" />
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>

                  {/* Task Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      {/* Priority Badge */}
                      <Skeleton className="h-5 w-16 rounded-full" />
                      {/* Due Date */}
                      <Skeleton className="h-4 w-20 rounded" />
                    </div>
                    {/* More Actions */}
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-9 rounded-md" />
                  ))}
                </div>
                <Skeleton className="h-9 w-20 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button Skeleton */}
      <div className="fixed bottom-6 right-6">
        <Skeleton className="h-14 w-14 rounded-full" />
      </div>
    </main>
  );
}
