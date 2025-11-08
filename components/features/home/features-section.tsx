import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Calendar, Filter, Plus } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Plus,
      title: 'Create Tasks',
      description: 'Add new tasks with titles and descriptions',
      color: 'bg-blue-500'
    },
    {
      icon: CheckCircle2,
      title: 'Track Progress',
      description: 'Mark tasks as complete or incomplete',
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      title: 'Due Dates',
      description: 'Set and manage task deadlines',
      color: 'bg-purple-500'
    },
    {
      icon: Filter,
      title: 'Priority Levels',
      description: 'Organize tasks by Low, Medium, High priority',
      color: 'bg-orange-500'
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Core Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essential tools for effective task management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-0">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg mb-2">
                  {feature.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
