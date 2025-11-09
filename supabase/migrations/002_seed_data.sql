-- Seed data for demonstration (optional)
-- This file contains sample data for testing purposes
-- In production, this would be empty or contain essential reference data

-- Note: This seed data will only work after users are created through the auth system
-- The actual seeding should be done through the application after user registration

-- Example of how tasks would look (commented out since user_id needs to be real)
/*
INSERT INTO public.tasks (user_id, title, description, priority, due_date, completed) VALUES
    ('user-uuid-here', 'Welcome to TaskDesk', 'This is your first task! You can edit, complete, or delete it.', 'Medium', NOW() + INTERVAL '7 days', false),
    ('user-uuid-here', 'Explore the features', 'Try creating new tasks, setting priorities, and marking them as complete.', 'Low', NOW() + INTERVAL '3 days', false),
    ('user-uuid-here', 'Set up your workflow', 'Organize your tasks by priority and due dates to stay productive.', 'High', NOW() + INTERVAL '1 day', false);
*/

-- You can add any reference data or configuration here
-- For now, the schema is sufficient for the task management functionality
