
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { enhanceCvBulletPoints } from "@/ai/flows/cv-bullet-point-enhancement";

interface BulletEnhancerProps {
  bullets: string[];
  onEnhanced: (enhanced: string[]) => void;
}

export function BulletEnhancer({ bullets, onEnhanced }: BulletEnhancerProps) {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (bullets.length === 0 || bullets.every(b => !b.trim())) return;
    
    setLoading(true);
    try {
      const result = await enhanceCvBulletPoints({ bulletPoints: bullets });
      if (result.enhancedBulletPoints) {
        onEnhanced(result.enhancedBulletPoints);
      }
    } catch (error) {
      console.error("Failed to enhance bullets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 text-accent border-accent/20 hover:bg-accent/10"
      onClick={handleEnhance}
      disabled={loading || bullets.length === 0}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      AI Enhance
    </Button>
  );
}
