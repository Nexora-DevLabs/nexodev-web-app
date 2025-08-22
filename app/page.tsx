"use client";

import HomeHeader from "@/components/home/header";
import HomeHeroContent from "@/components/home/hero-content";
import ShaderBackground from "@/components/home/shader-background";

export default function NexoraLandingPage() {
  return (
    <ShaderBackground>
      <HomeHeader />
      <HomeHeroContent />
    </ShaderBackground>
  );
}
