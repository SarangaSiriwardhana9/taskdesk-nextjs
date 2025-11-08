export const CONFIG = {
  REDIRECT_DELAY: 300,
  HEADER_SCROLL_THRESHOLD: 20,
  TASK_GRID_LAYOUT: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  SKELETON_COUNTS: {
    HEADER: 3,
    TASKS: 6,
  },
  PAGINATION: {
    TASKS_PER_PAGE: 9,
    MAX_VISIBLE_PAGES: 5,
  },
} as const;

