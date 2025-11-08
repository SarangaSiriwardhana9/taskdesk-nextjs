import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export function CTASection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="p-0">
          <CardContent className="p-8 text-center">
            <CardTitle className="text-2xl mb-4">
              Start Managing Your Tasks
            </CardTitle>
            <p className="text-muted-foreground mb-6">
              Create an account to begin organizing your work with TaskDesk
            </p>
            <Link href={ROUTES.AUTH}>
              <Button variant="gradient" size="lg" className="gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
