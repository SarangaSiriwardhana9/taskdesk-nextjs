import { Card, CardContent, CardTitle } from '@/components/ui/card';

export function BenefitsSection() {
  const benefits = [
    {
      stat: '3x',
      title: 'Boost Productivity',
      description: 'Clear priorities help you accomplish 3x more in less time',
      color: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      stat: '80%',
      title: 'Reduce Stress',
      description: 'Organized planning reduces anxiety by 80%',
      color: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      stat: '100%',
      title: 'Meet Deadlines',
      description: 'Smart scheduling ensures you never miss deadlines',
      color: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            "A task well planned is a task half done"
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proper task management transforms how you work and live
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-0">
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-2xl font-bold ${benefit.textColor}`}>
                    {benefit.stat}
                  </span>
                </div>
                <CardTitle className="mb-3">{benefit.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-0">
          <CardContent className="p-8 text-center">
            <blockquote className="text-xl font-medium text-muted-foreground italic mb-4">
              "The key is not to prioritize what's on your schedule, but to schedule your priorities."
            </blockquote>
            <p className="text-muted-foreground">
              Start your journey to better productivity today.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
