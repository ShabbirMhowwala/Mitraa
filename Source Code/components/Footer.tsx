import { Phone, Mail, Shield, Info } from "lucide-react";

export function Footer() {
  const helplineNumbers = [
    { name: "National Suicide Prevention Lifeline", number: "988" },
    { name: "Crisis Text Line", number: "Text HOME to 741741" },
    { name: "SAMHSA National Helpline", number: "1-800-662-4357" }
  ];

  return (
    <footer 
      className="py-12 px-4 text-white"
      style={{ backgroundColor: "var(--dark-blue)" }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5" />
              <h3 className="font-semibold">About Mitraa</h3>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              A safe space for students to connect, share experiences, and support 
              each other through mental health challenges. Together, we grow stronger.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mental Health Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Crisis Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Self-Help Tools</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-5 h-5" />
              <h3 className="font-semibold">Support</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Report Content</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Emergency Helplines */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Phone className="w-5 h-5" />
              <h3 className="font-semibold">Emergency Helplines</h3>
            </div>
            <div className="space-y-3">
              {helplineNumbers.map((helpline, index) => (
                <div key={index} className="text-sm">
                  <p className="text-blue-100">{helpline.name}</p>
                  <p className="font-medium text-white">{helpline.number}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-400/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-blue-100">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-blue-100">
              <Shield className="w-4 h-4" />
              <span>Safe Space • Confidential • Supportive</span>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-blue-100">
              © 2024 Mitraa - Student Mental Health Community. Built with care for student wellbeing.
            </p>
            <p className="text-xs text-blue-200 mt-2">
              If you're in crisis, please reach out for immediate help. You are not alone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}