import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection({ onJoinCommunity }: { onJoinCommunity: () => void }) {
  return (
    <section 
      className="py-20 px-4"
      style={{ background: "var(--gradient-bg)" }}
    >
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Heart 
                    className="w-8 h-8" 
                    style={{ color: "var(--primary-blue)" }} 
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 
                className="text-4xl font-bold"
                style={{ color: "var(--primary-blue)" }}
              >
                Mitraa
              </h1>
              <p 
                className="text-lg mt-1"
                style={{ color: "var(--text-light)" }}
              >
                A Friend in Your Mental Health Journey
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-2xl mx-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGhlbHBpbmclMjBlYWNoJTIwb3RoZXIlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NTc2OTMzMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students helping each other with studies"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p 
              className="text-lg leading-relaxed"
              style={{ color: "var(--text-light)" }}
            >
              Connect with fellow students, share your experiences, and find support in a safe, 
              understanding community. Your mental health journey doesn't have to be walked alone.
            </p>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onJoinCommunity}
            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ 
              backgroundColor: "var(--green)",
              color: "white"
            }}
          >
            Join Community
          </Button>
        </div>
      </div>
    </section>
  );
}